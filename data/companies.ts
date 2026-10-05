export const SEGMENTS = ["Paid", "Unpaid", "Current Event", "Past Event"] as const;
export const STAGES = ["Active", "Closed", "Archived"] as const;
export type Segment = (typeof SEGMENTS)[number];
export type Stage = (typeof STAGES)[number];
export type Tag = Segment | Stage;
export type TagTone = "blue"|"purple"|"green"|"moss"|"red"|"orange"|"amber"|"teal"|"yellow"|"neutral";
export const TAG_TONES: Record<Tag, TagTone> = {
  Paid:"green", Unpaid:"orange", "Current Event":"blue", "Past Event":"neutral",
  Active:"green", Closed:"neutral", Archived:"neutral",
};
export type Owner={name:string;avatar:string;email:string;phone:string;role:string};
const AVATARS=Array.from({length:10},(_,i)=>"/assets/images/_common/avatars/avatar-"+(i+1)+".svg");
export const OWNERS:Owner[]=[{name:"Class Administrator",avatar:"/assets/images/_common/avatars/avatar-1.svg",email:"admin@contribution-tracker.local",phone:"",role:"Administrator"}];
export const CURRENT_USER:Owner={name:"Class Administrator",avatar:"/assets/images/_common/avatars/avatar-1.svg",email:"admin@contribution-tracker.local",phone:"",role:"Administrator"};
export function ownerByName(name:string){return OWNERS.find(x=>x.name===name)||OWNERS[0]}
export function profileByName(name:string){return name===CURRENT_USER.name?CURRENT_USER:ownerByName(name)}
export type Company={
 id:string;name:string;tags:Tag[];owner:string;openDeals:number;pipelineValue:number;
 winProbability:number;trend:number[];lastInteraction:{date:string;label:string};activityDays:number;logo?:string;
};
export const TREND_PATTERN=[false,true,true,false,true,true,false,true,false,true,false,true,true,false];
export const DEFAULT_TREND=[2,2,3,3,2,5,7,5,4,5,4,3,5,8];
const entries=[
["1","ANUSIONWU, KINGSLEY CHIGOZIE",3500],["2","NWAOZOR HILLARY",2000],["3","HEJIRIKA IFEANYI FRANCIS",2000],
["4","CHUKWUBUIKEM UGWU",2000],["5","CHIDUBEM PAULINUS UMEIBEKWE",2000],["6","CHUKWUEMEKA JONATHAN ONYEKWELU",2000],
["7","LAWRENCE CHIDUBEM OGUAMA",5000],["8","Chidera Kingsley Chinedu",5000],["9","OBINNA PETER ANAEZIONWU",2000],
["10","SOMTOCHUKWU FRANCIS OCHA",2000],["11","CHIAGOZIE CHRISTOPHER IBEH",2000],["12","SOMTOCHUKWU NWOSU",2000],
["13","NWASINOKE EMMANUEL CHETACHUKWU",5000],["14","CHIMEZIE EVARISTUS OKOLI",3000],["15","CHINEDU EMMANUEL LAZARUS",2000],
["16","Chizuruoke Valerian Umeh",2500],["17","GABRIEL CHIMGOZILIM MBANU",2000],["18","NNAMDI PASCHAL OKAFOR",2000],
["19","CHUKWUEBUKA MICHAEL NWACHUKWU",2000],["20","CHUKWUBUIKEM CHRISTOPHER CHIEDOZIE",2000],["21","KYRIAN CHIEMERIE ANYOHA",2000],["22","OBIORA PAUL ANAEZIONWU",2000]
] as const;
export const COMPANIES:Company[]=entries.map(([id,name,amount])=>({
 id,name,tags:["Paid","Current Event"],owner:"Class Administrator",openDeals:1,pipelineValue:amount,
 winProbability:100,trend:[amount/1000,amount/1000+1,amount/1000+2,amount/1000+1,amount/1000+3],
 lastInteraction:{date:"2026-10-04",label:"Contribution"},activityDays:0
}));
export const SORT_OPTIONS=[{value:"pipelineValue",label:"Amount Contributed"},{value:"winProbability",label:"Payment Status"},{value:"openDeals",label:"Events Paid"},{value:"lastInteraction",label:"Last Contribution"},{value:"name",label:"Classmate Name"}] as const;
export type SortKey=(typeof SORT_OPTIONS)[number]["value"];
export const INTERACTION_TYPES=["Contribution","Reminder","Roster Update","Event Created"] as const;
export const ACTIVITY_WINDOWS=[7,30,60,90] as const;
export type ActivityWindow=(typeof ACTIVITY_WINDOWS)[number];
export const TREND_WINDOWS=["Last 7 Days","Last 30 Days","Last 90 Days"];
export type ScoreCard={title:string;description:string;reviewer:string;reviewerAvatar:string;updated:string;verdict:string;stars:number};
export const SCORE_CARDS:ScoreCard[]=[{title:"Contribution status",description:"Current contribution status for the selected classmate.",reviewer:"Class Administrator",reviewerAvatar:CURRENT_USER.avatar,updated:"Updated today",verdict:"Recorded",stars:5}];
export const CURRENT_EVENT={title:"Condolence contribution for our brother Eze Kelvin",recipient:"Eze Kelvin",target:62000,deadline:"2026-10-15",status:"Active"};
export const TOTAL_RAISED=COMPANIES.reduce((sum,item)=>sum+item.pipelineValue,0);
