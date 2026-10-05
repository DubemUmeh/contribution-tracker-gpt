import type { Company, SortKey } from "@/data/classmates";
export type ClassmateFilters={sortBy:SortKey;owner:string;stage:string;activityWindow:number};
export const TODAY="2026-10-04"; export const ALL_OWNERS="all"; export const ANY_STAGE="any";
export const DEFAULT_FILTERS:ClassmateFilters={sortBy:"pipelineValue",owner:ALL_OWNERS,stage:ANY_STAGE,activityWindow:90};
export function activeFilterCount({owner,stage,activityWindow}:ClassmateFilters){return [owner!==ALL_OWNERS,stage!==ANY_STAGE,activityWindow!==DEFAULT_FILTERS.activityWindow].filter(Boolean).length}
export function filterClassmates(items:Company[],f:ClassmateFilters){return items.filter(x=>(f.owner===ALL_OWNERS||x.owner===f.owner)&&(f.stage===ANY_STAGE||x.tags.includes(f.stage as never))&&x.activityDays<=f.activityWindow).sort((a,b)=>f.sortBy==="name"?a.name.localeCompare(b.name):f.sortBy==="openDeals"?b.openDeals-a.openDeals:f.sortBy==="winProbability"?b.winProbability-a.winProbability:f.sortBy==="lastInteraction"?b.lastInteraction.date.localeCompare(a.lastInteraction.date):b.pipelineValue-a.pipelineValue)}
export function classmatesCsvRows(items:Company[]){return [["Classmate","Status","Administrator","Events Paid","Amount Contributed","Payment Status","Last Contribution"],...items.map(x=>[x.name,x.tags.join("; "),x.owner,x.openDeals,x.pipelineValue,x.winProbability+"%",x.lastInteraction.date])]}
export function splitTags(tags:Company["tags"]){return {visible:tags.slice(0,2),hidden:Math.max(0,tags.length-2)}}
export function companyHealth(c:Company){return {discovery:c.winProbability,evaluation:c.winProbability,procurement:c.winProbability}}
export function companyActivity(c:Company){return {total:c.pipelineValue?1:0,touches:c.openDeals,emails:c.openDeals,meetings:c.openDeals,calls:c.openDeals}}
export function formatDate(iso:string){const [,m,d]=iso.split("-").map(Number);return new Date(Date.UTC(2026,m-1,d)).toLocaleDateString("en-US",{month:"short",day:"numeric",timeZone:"UTC"})}
export function formatMoney(v:number){return v.toLocaleString("en-NG")}
export function daysSince(iso:string){return Math.max(0,Math.round((Date.parse(TODAY)-Date.parse(iso))/(86400000)))}
export function slugify(v:string){return v.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}
