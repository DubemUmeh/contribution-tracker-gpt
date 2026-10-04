import { createRootRoute, createRoute, Outlet, Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useMemo, useState, type ReactNode } from "react";
import {
  Activity, AlertTriangle, ArrowUpRight, BarChart3, CalendarDays, Check,
  ChevronDown, ClipboardPaste, Clock3, FileSpreadsheet, Filter, HelpCircle,
  LayoutDashboard, Menu, MoreHorizontal, Plus, Receipt, Search, Settings,
  ShieldCheck, Upload, Users, WalletCards, X
} from "lucide-react";
import { parseContributionText } from "./parser";

type Member={id:string;name:string};
type Payment={memberId:string;amount:number;date:string};
type Event={id:string;title:string;recipient:string;target:number;status:"active"|"closed"|"archived";deadline:string;payments:Payment[]};

export const members:Member[]=[
["1","Anusionwu, Kingsley Chigozie"],["2","Nwaozor Hillary"],["3","Hejirika Ifeanyi Francis"],
["4","Chukwubuikem Ugwu"],["5","Chidubem Paulinus Umeibekwe"],["6","Chukwuemeka Jonathan Onyekwelu"],
["7","Lawrence Chidubem Oguama"],["8","Chidera Kingsley Chinedu"],["9","Obinna Peter Anaezionwu"],
["10","Somtochukwu Francis Ocha"],["11","Chiagozie Christopher Ibeh"],["12","Somtochukwu Nwosu"],
["13","Nwasinoke Emmanuel Chetachukwu"],["14","Chimezie Evaristus Okoli"],["15","Chinedu Emmanuel Lazarus"],
["16","Chizuruoke Valerian Umeh"],["17","Gabriel Chimgozilim Mbanu"],["18","Nnamdi Paschal Okafor"],
["19","Chukwuebuka Michael Nwachukwu"],["20","Chukwubuikem Christopher Chiedozie"],
["21","Kyrian Chiemerie Anyoha"],["22","Obiora Paul Anaezionwu"]
].map(([id,name])=>({id,name}));

const amounts=[3500,2000,2000,2000,2000,2000,5000,5000,2000,2000,2000,2000,5000,3000,2000,2500,2000,2000,2000,2000,2000,2000];
export const events:Event[]=[{
 id:"evt-001",title:"Condolence contribution for our brother Eze Kelvin",recipient:"Eze Kelvin",
 target:62000,status:"active",deadline:"2026-10-15",
 payments:members.map((m,i)=>({memberId:m.id,amount:amounts[i],date:"2026-10-04"}))
}];

const naira=(n:number)=>new Intl.NumberFormat("en-NG",{style:"currency",currency:"NGN",maximumFractionDigits:0}).format(n);
const total=(e:Event)=>e.payments.reduce((a,p)=>a+p.amount,0);
const initials=(n:string)=>n.split(/\s+/).slice(0,2).map(x=>x[0]).join("").toUpperCase();

function IconButton({children,label,onClick}:{children:ReactNode;label:string;onClick?:()=>void}) {
 return <button className="crm-icon-button" aria-label={label} onClick={onClick}>{children}</button>;
}

function Sidebar({open,onClose}:{open:boolean;onClose:()=>void}) {
 const location=useLocation();
 const items=[
  {label:"Overview",to:"/admin",icon:LayoutDashboard},
  {label:"Events",to:"/admin/events",icon:CalendarDays,count:1},
  {label:"Classmates",to:"/admin/classmates",icon:Users,count:members.length},
  {label:"Payments",to:"/admin/payments",icon:Receipt},
  {label:"Imports",to:"/admin/import",icon:Upload},
 ];
 const reporting=[{label:"Participation",icon:BarChart3},{label:"Recent activity",icon:Activity}];
 return <aside className={"crm-sidebar "+(open?"is-open":"")}>
  <div className="crm-sidebar-head">
   <div className="crm-brand"><span className="crm-logo">CT</span><div><strong>Contribution Tracker</strong><small>Class contributions</small></div></div>
   <IconButton label="Close navigation" onClick={onClose}><X size={14}/></IconButton>
  </div>
  <div className="crm-sidebar-scroll">
   <nav aria-label="Primary">
    <div className="crm-nav-section">{items.map(({label,to,icon:Icon,count})=><Link key={to} to={to} className={"crm-nav-item "+(location.pathname===to?"active":"")} onClick={onClose}><Icon size={14}/><span>{label}</span>{count!==undefined&&<em>{count}</em>}</Link>)}</div>
    <div className="crm-nav-section"><div className="crm-nav-label">Reporting</div>{reporting.map(({label,icon:Icon})=><button key={label} className="crm-nav-item"><Icon size={14}/><span>{label}</span></button>)}</div>
    <div className="crm-nav-section"><div className="crm-nav-label">Workspace</div><button className="crm-nav-item"><Settings size={14}/><span>Settings</span></button><button className="crm-nav-item"><HelpCircle size={14}/><span>Help</span></button></div>
   </nav>
  </div>
  <div className="crm-trial"><div><strong>Administrator</strong><small>Private workspace</small></div><span className="crm-avatar">{initials("Dubem Umeh")}</span></div>
 </aside>;
}

function AdminShell({title,children}:{title:string;children:ReactNode}) {
 const [sidebarOpen,setSidebarOpen]=useState(false);
 return <div className="crm-app"><Sidebar open={sidebarOpen} onClose={()=>setSidebarOpen(false)}/><section className="crm-main">
  <header className="crm-header">
   <div className="crm-header-left"><IconButton label="Open navigation" onClick={()=>setSidebarOpen(true)}><Menu size={15}/></IconButton><h1>{title}</h1><span className="crm-status"><i/>Active</span></div>
   <div className="crm-header-actions"><IconButton label="Search"><Search size={14}/></IconButton><IconButton label="Notifications"><Activity size={14}/></IconButton><button className="crm-user"><span className="crm-avatar">{initials("Dubem Umeh")}</span><span>Dubem</span><ChevronDown size={12}/></button></div>
  </header>
  {children}
 </section></div>;
}

function PageHeader({title,description,action}:{title:string;description:string;action?:ReactNode}) {
 return <div className="crm-page-header"><div><h2>{title}</h2><p>{description}</p></div>{action}</div>;
}

function FilterButton({children}:{children:ReactNode}) { return <button className="crm-button secondary"><Filter size={13}/>{children}<ChevronDown size={12}/></button>; }

function Table({headers,rows}:{headers:string[];rows:ReactNode[][]}) {
 return <div className="crm-table-scroll"><table className="crm-table"><thead><tr>{headers.map(h=><th key={h}>{h}</th>)}</tr></thead><tbody>{rows.map((row,i)=><tr key={i}>{row.map((cell,j)=><td key={j}>{cell}</td>)}</tr>)}</tbody></table></div>;
}

function Dashboard() {
 const e=events[0],raised=total(e),participation=Math.round(e.payments.length/members.length*100);
 return <AdminShell title="Overview"><main className="crm-content">
  <PageHeader title="Overview" description="A clear view of the current class contribution activity." action={<Link className="crm-button primary" to="/admin/import"><Plus size={13}/> Record payments</Link>}/>
  <div className="crm-tabs"><Link className="active" to="/admin">Overview</Link><Link to="/admin/events">Events</Link><Link to="/admin/classmates">Classmates</Link><Link to="/admin/payments">Payments</Link></div>
  <div className="crm-metrics">{[
   ["Amount raised",naira(raised),WalletCards],["Contributors",e.payments.length+"/"+members.length,Users],
   ["Participation",participation+"%",Activity],["Current events","1",CalendarDays]
  ].map(([label,value,Icon])=><div className="crm-card crm-metric" key={String(label)}><Icon size={14}/><span>{label}</span><strong>{value}</strong><small>Current workspace</small></div>)}</div>
  <div className="crm-columns">
   <section className="crm-card"><div className="crm-card-head"><div><strong>Active contribution</strong><small>{e.title}</small></div><span className="crm-tag green">Active</span></div>
    <div className="crm-card-body"><div className="crm-detail-grid"><div><label>Recipient</label><strong>{e.recipient}</strong></div><div><label>Target</label><strong>{naira(e.target)}</strong></div><div><label>Deadline</label><strong>{e.deadline}</strong></div></div><div className="crm-progress"><span style={{width:Math.min(100,raised/e.target*100)+"%"}}/></div><div className="crm-progress-meta"><span>{naira(raised)} raised</span><span>{participation}% participation</span></div></div>
   </section>
   <section className="crm-card"><div className="crm-card-head"><div><strong>Recent activity</strong><small>Latest contribution records</small></div><Link to="/admin/payments" className="crm-link">View all <ArrowUpRight size={12}/></Link></div>
    {e.payments.slice(-6).reverse().map(p=>{const m=members.find(x=>x.id===p.memberId)!;return <div className="crm-activity" key={m.id}><span className="crm-avatar">{initials(m.name)}</span><div><strong>{m.name}</strong><small>Payment recorded · {p.date}</small></div><b>{naira(p.amount)}</b></div>})}
   </section>
  </div>
  <section className="crm-card crm-section"><div className="crm-card-head"><div><strong>Current event participation</strong><small>Roster status for {e.title}</small></div><Link className="crm-link" to="/admin/classmates">Open roster <ArrowUpRight size={12}/></Link></div>
   <Table headers={["Classmate","Status","Contribution","Last activity"]} rows={members.slice(0,8).map(m=>{const p=e.payments.find(x=>x.memberId===m.id);return [<div className="crm-person"><span className="crm-avatar">{initials(m.name)}</span><strong>{m.name}</strong></div>,<span className={"crm-tag "+(p?"green":"orange")}>{p?"Paid":"Unpaid"}</span>,p?naira(p.amount):"—",p?.date||"No payment"]})}/>
  </section>
 </main></AdminShell>;
}

function EventsPage() {
 const [q,setQ]=useState(""); const filtered=events.filter(e=>e.title.toLowerCase().includes(q.toLowerCase()));
 return <AdminShell title="Events"><main className="crm-content"><PageHeader title="Events" description="Create, track, close and archive contribution events." action={<button className="crm-button primary"><Plus size={13}/> New event</button>}/>
  <div className="crm-toolbar"><div className="crm-search"><Search size={14}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search events..."/></div><FilterButton>Status</FilterButton><FilterButton>Sort</FilterButton><span className="crm-record-count">{filtered.length} records</span></div>
  <section className="crm-card"><Table headers={["Event","Status","Recipient","Raised","Contributors","Deadline",""]} rows={filtered.map(e=>[<div><strong>{e.title}</strong><small>Created Oct 4, 2026</small></div>,<span className="crm-tag green">{e.status}</span>,e.recipient,naira(total(e)),e.payments.length+"/"+members.length,e.deadline,<MoreHorizontal size={15}/>])}/></section>
 </main></AdminShell>;
}

function Classmates() {
 const [q,setQ]=useState(""); const filtered=members.filter(m=>m.name.toLowerCase().includes(q.toLowerCase()));
 return <AdminShell title="Classmates"><main className="crm-content"><PageHeader title="Classmates" description="The official roster and each classmate's contribution history." action={<button className="crm-button primary"><Plus size={13}/> Add classmate</button>}/>
  <div className="crm-toolbar"><div className="crm-search"><Search size={14}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search classmates..."/></div><FilterButton>Participation</FilterButton><FilterButton>Sort</FilterButton><span className="crm-record-count">{filtered.length} records</span></div>
  <section className="crm-card"><Table headers={["Classmate","Events paid","Total contributed","Current event",""]} rows={filtered.map(m=>{const p=events[0].payments.find(x=>x.memberId===m.id);return [<div className="crm-person"><span className="crm-avatar">{initials(m.name)}</span><div><strong>{m.name}</strong><small>Official roster</small></div></div>,p?1:0,p?naira(p.amount):naira(0),<span className={"crm-tag "+(p?"green":"orange")}>{p?"Paid":"Unpaid"}</span>,<MoreHorizontal size={15}/>]})}/></section>
 </main></AdminShell>;
}

function Payments() {
 const [q,setQ]=useState(""); const rows=events[0].payments.filter(p=>members.find(m=>m.id===p.memberId)?.name.toLowerCase().includes(q.toLowerCase()));
 return <AdminShell title="Payments"><main className="crm-content"><PageHeader title="Payments" description="The private contribution ledger. Individual records are admin-only." action={<button className="crm-button secondary">Export</button>}/>
  <div className="crm-toolbar"><div className="crm-search"><Search size={14}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search payments..."/></div><FilterButton>Event</FilterButton><FilterButton>Date</FilterButton><span className="crm-record-count">{rows.length} records</span></div>
  <section className="crm-card"><Table headers={["Classmate","Amount","Event","Recorded",""]} rows={rows.map(p=>{const m=members.find(x=>x.id===p.memberId)!;return [<div className="crm-person"><span className="crm-avatar">{initials(m.name)}</span><strong>{m.name}</strong></div>,<strong>{naira(p.amount)}</strong>,events[0].title,p.date,<MoreHorizontal size={15}/>]})}/></section>
 </main></AdminShell>;
}

function ImportPage() {
 const [text,setText]=useState("");const [rows,setRows]=useState<ReturnType<typeof parseContributionText>>([]);
 return <AdminShell title="Imports"><main className="crm-content"><PageHeader title="Imports" description="Bring in WhatsApp lists or spreadsheets, review them, then save."/>
  <div className="crm-import-grid"><section className="crm-card"><div className="crm-card-head"><div><strong>Payment import</strong><small>Choose an input method</small></div></div><div className="crm-segment"><button className="active"><ClipboardPaste size={13}/> Paste list</button><button><FileSpreadsheet size={13}/> Spreadsheet</button><button><Receipt size={13}/> Manual</button></div><div className="crm-card-body"><div className="crm-callout"><ShieldCheck size={15}/><div><strong>Review before save</strong><span>Every imported row is matched against the roster. Uncertain names and duplicates must be resolved first.</span></div></div><textarea className="crm-textarea" value={text} onChange={e=>setText(e.target.value)} placeholder={"1. JOHN DOE 2k\n2. JANE DOE 5k\n3. NAME 2,500k"}/><div className="crm-form-actions"><button className="crm-button secondary" onClick={()=>setText("")}>Clear</button><button className="crm-button primary" onClick={()=>setRows(parseContributionText(text))}>Review import <ArrowUpRight size={12}/></button></div></div></section>
   <section className="crm-card"><div className="crm-card-head"><div><strong>Import safeguards</strong><small>What happens before data is committed</small></div></div><div className="crm-safeguard"><Check size={14}/><span>Normalize names and amounts</span></div><div className="crm-safeguard"><Check size={14}/><span>Match every row to the official roster</span></div><div className="crm-safeguard"><Check size={14}/><span>Flag uncertain matches and duplicates</span></div><div className="crm-safeguard"><Check size={14}/><span>Block duplicate event/member payments</span></div></section>
  </div>
  {rows.length>0&&<section className="crm-card crm-section"><div className="crm-card-head"><div><strong>Review import</strong><small>{rows.length} rows ready for administrator review</small></div><button className="crm-button primary">Confirm & save</button></div><Table headers={["Imported name","Amount","Roster match","Review"]} rows={rows.map(r=>[<strong>{r.name}</strong>,naira(r.amount),<span className={"crm-tag "+(r.confidence==="high"?"green":r.confidence==="medium"?"blue":"orange")}>{r.confidence}</span>,r.reason?<span className="crm-warning"><AlertTriangle size={13}/>{r.reason}</span>:<span className="crm-success"><Check size={13}/> Ready</span>])}/></section>}
 </main></AdminShell>;
}

function PublicChecker() {
 const [q,setQ]=useState("");const [id,setId]=useState<string>();const e=events[0];
 const matches=useMemo(()=>members.filter(m=>m.name.toLowerCase().includes(q.toLowerCase())).slice(0,7),[q]);
 const m=members.find(x=>x.id===id);const p=m&&e.payments.find(x=>x.memberId===m.id);
 return <div className="public-crm"><header className="public-header"><div className="crm-brand"><span className="crm-logo">CT</span><div><strong>Contribution Tracker</strong><small>Class contribution records</small></div></div><Link className="crm-button secondary" to="/login"><ShieldCheck size={13}/> Administrator</Link></header><main className="public-wrap"><div className="public-eyebrow">CLASS CONTRIBUTIONS</div><h1>Contribution history</h1><p className="public-intro">Search the official class roster to view your contribution summary. Individual payment records remain private.</p><div className="public-search"><Search size={15}/><input value={q} onChange={e=>{setQ(e.target.value);setId(undefined)}} placeholder="Search your name..."/></div>{q&&!m&&matches.length>0&&<div className="public-suggestions">{matches.map(x=><button key={x.id} onClick={()=>{setId(x.id);setQ(x.name)}}><span className="crm-avatar">{initials(x.name)}</span><div><strong>{x.name}</strong><small>Official class roster</small></div><ArrowUpRight size={13}/></button>)}</div>}{m&&<section className="public-result"><div className="public-person"><span className="crm-avatar large">{initials(m.name)}</span><div><strong>{m.name}</strong><span className="crm-tag green">Verified roster member</span></div></div><div className="public-stats"><div><strong>{p?1:0}</strong><span>Events paid</span></div><div><strong>{naira(p?.amount||0)}</strong><span>Total contributed</span></div><div><strong>{p?0:1}</strong><span>Missed events</span></div></div><div className="public-event"><div className="public-event-head"><div><strong>{e.title}</strong><small>Recipient: {e.recipient}</small></div><span className="crm-tag green">Active</span></div><div className="public-event-foot"><span>Raised <strong>{naira(total(e))}</strong></span><span className={p?"crm-success":"crm-warning"}>{p?<><Check size={13}/> Contribution recorded</>:<><Clock3 size={13}/> No contribution recorded</>}</span></div></div></section>}<div className="public-notes"><div><ShieldCheck size={16}/><div><strong>Private by design</strong><span>Public searches only return contribution summaries.</span></div></div><div><Users size={16}/><div><strong>{members.length} roster members</strong><span>Search results are restricted to the official class roster.</span></div></div></div></main></div>;
}

function Login() { const nav=useNavigate(); return <div className="login-crm"><div className="login-card"><div className="crm-brand"><span className="crm-logo">CT</span><div><strong>Contribution Tracker</strong><small>Administrator workspace</small></div></div><div className="login-copy"><h1>Sign in</h1><p>Access is limited to approved administrators.</p></div><form onSubmit={e=>{e.preventDefault();nav({to:"/admin"})}}><label>Email<input className="crm-input" type="email" placeholder="admin@example.com" required/></label><label>Password<input className="crm-input" type="password" placeholder="••••••••" required/></label><button className="crm-button primary full">Sign in</button></form><Link to="/" className="crm-link back">← Back to public checker</Link></div></div>; }

const root=createRootRoute({component:()=> <Outlet/>});
const pub=createRoute({getParentRoute:()=>root,path:"/",component:PublicChecker});
const login=createRoute({getParentRoute:()=>root,path:"/login",component:Login});
const admin=createRoute({getParentRoute:()=>root,path:"/admin",component:Dashboard});
const eventsRoute=createRoute({getParentRoute:()=>root,path:"/admin/events",component:EventsPage});
const classmatesRoute=createRoute({getParentRoute:()=>root,path:"/admin/classmates",component:Classmates});
const paymentsRoute=createRoute({getParentRoute:()=>root,path:"/admin/payments",component:Payments});
const importRoute=createRoute({getParentRoute:()=>root,path:"/admin/import",component:ImportPage});
export const routeTree=root.addChildren([pub,login,admin,eventsRoute,classmatesRoute,paymentsRoute,importRoute]);
export const router=createRouter({routeTree});
