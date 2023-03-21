import{_ as R,C as U,b as V,d as q,D as A,e as d,v as k,M as B,P as v,A as a,H as L,N as D,c as o,i as s,m as h,w as f,k as m,q as u,J as F,K as P,L as G,p as I,F as C,r as w,j as _,x as g,o as i,t as M,y as Y,z as j}from"./index.c3d5967c.js";const z={setup(){const l=U({});async function n(){try{await k.getHighestRatedBusinesses()}catch(r){v.error("[GETTING HIGHEST RATED BUSINESSES]",r)}}async function b(){try{await B.getHighestRatedProfiles()}catch(r){v.error("[GETTING HIGHEST RATED PROFILES]",r)}}function e(){try{a.businesses=[]}catch(r){v.error(r.message,"Clearing Businesses")}}return V(()=>{n(),b()}),q(()=>{e()}),A(async()=>{a.account.id&&M.getTipsGiven()}),{editable:l,account:d(()=>a.account),businesses:d(()=>a.businesses),profiles:d(()=>a.profiles),searchType:d(()=>a.searchType),highestTipEver:d(()=>a.highestTipEver),highestTipEverGiven:d(()=>a.highestTipEverGiven),theme:d(()=>a.account.theme),async search(){try{let r=l.value;await k.getBusinessesByQuery(r),await B.getProfilesByQuery(r)}catch(r){v.error("SEARCHING FOR BUSINESSES",r)}},searchTypeProfiles(){a.searchType="profiles"},searchTypeBusinesses(){a.searchType="businesses"}}},components:{ProfileCard:L,BusinessCard:D}},c=l=>(Y("data-v-d49b0670"),l=l(),j(),l),O={class:"container-fluid"},Q={class:"row pb-1 mt-3 d-flex flex-column align-items-center justify-content-center"},J={key:0},K={class:"col-12 text-center"},W=["src","alt"],X={class:"col-12 text-center"},Z={class:"mt-2 mb-3 rounded text-center user-name"},$={key:0,class:"col-12 text-center"},ee={class:"biggest-tip"},se=_("Your Biggest Tip Sent: "),te=c(()=>s("br",null,null,-1)),oe=_(" to "),ie={key:1,class:"col-12 text-center"},ne=c(()=>s("h6",{class:"biggest-tip"},[s("span",null,"No Tips Given Yet")],-1)),re=[ne],ae={key:2,class:"col-12 text-center mb-4"},ce={class:"biggest-tip"},le=_("Your Biggest Tip received: "),de=c(()=>s("br",null,null,-1)),he=_(" from "),ue={key:3,class:"col-12 text-center"},_e=c(()=>s("h6",{class:"biggest-tip"},"No Tips Received Yet",-1)),me=[_e],pe={key:1},ve=c(()=>s("div",{class:"col-12 text-center my-5"},[s("h2",null,"Log-In or Sign-Up now to get started!")],-1)),fe=[ve],ge={class:"col-12 col-md-6"},be={class:"d-flex justify-content-center mb-4"},ye={class:"btn-group",role:"group","aria-label":"Basic outlined example"},Te={class:"input-group"},Se=c(()=>s("button",{class:"btn btn-outline-secondary",type:"submit",id:"button-addon2"},[s("i",{class:"mdi mdi-magnify"})],-1)),xe={key:2},Ee=c(()=>s("div",{class:"col-12 col-md-8 offset-md-2 my-3"},[s("h6",null,"Top Businesses:")],-1)),ke={class:"col-12 rounded col-md-8 offset-md-2"},Be={key:3},Pe=c(()=>s("div",{class:"col-12 col-md-8 offset-md-2 my-3"},[s("h6",null,"Top Profiles:")],-1)),Ge={class:"col-12 employee-card rounded col-md-8 offset-md-2",id:"employee-card"};function Ie(l,n,b,e,r,Ce){var y,T,S,x;const p=g("router-link"),H=g("BusinessCard"),N=g("ProfileCard");return i(),o("div",O,[s("div",Q,[(y=e.account)!=null&&y.id?(i(),o("div",J,[s("div",K,[h(p,{to:{name:"Account"}},{default:f(()=>{var t,E;return[s("img",{class:"profile-picture border border-dark border-2 elevation-1",src:(t=e.account)==null?void 0:t.picture,alt:(E=e.account)==null?void 0:E.picture,title:"Go to your account page!"},null,8,W)]}),_:1})]),s("div",X,[s("h2",Z,m((T=e.account)==null?void 0:T.name),1)]),e.highestTipEverGiven?(i(),o("div",$,[s("h6",ee,[se,s("span",{class:u(e.theme?"cash":"cash-light")},"\u20B2"+m(e.highestTipEverGiven.tip.toLocaleString("en-US")),3),te,oe,h(p,{class:u([e.theme?"text-dark":"text-success","underline"]),to:{name:"Profile",params:{profileId:(S=e.highestTipEverGiven.receiver)==null?void 0:S.id}}},{default:f(()=>{var t;return[_(m((t=e.highestTipEverGiven.receiver)==null?void 0:t.name),1)]}),_:1},8,["class","to"])])])):(i(),o("div",ie,re)),e.highestTipEver?(i(),o("div",ae,[s("h6",ce,[le,s("span",{class:u(e.theme?"cash":"cash-light")},"\u20B2"+m(e.highestTipEver.tip.toLocaleString("en-US")),3),de,he,h(p,{class:u([e.theme?"text-dark":"text-success","underline"]),to:{name:"Profile",params:{profileId:(x=e.highestTipEver.giver)==null?void 0:x.id}}},{default:f(()=>{var t;return[_(m((t=e.highestTipEver.giver)==null?void 0:t.name),1)]}),_:1},8,["class","to"])])])):(i(),o("div",ue,me))])):(i(),o("div",pe,fe)),s("div",ge,[s("div",be,[s("div",ye,[s("button",{onClick:n[0]||(n[0]=t=>e.searchTypeProfiles()),type:"button",class:u(["btn",[e.theme?"btn-outline-dark":"btn-outline-light"]])},"Profiles",2),s("button",{onClick:n[1]||(n[1]=t=>e.searchTypeBusinesses()),type:"button",class:u(["btn",[e.theme?"btn-outline-dark":"btn-outline-light"]])},"Businesses",2)])]),s("div",null,[s("form",{onSubmit:n[4]||(n[4]=F(t=>e.search(),["prevent"]))},[s("div",Te,[e.searchType=="businesses"?P((i(),o("input",{key:0,"onUpdate:modelValue":n[2]||(n[2]=t=>e.editable.query=t),class:"form-control",placeholder:"Search businesses...","aria-describedby":"button-addon2","aria-label":"Search",type:"text"},null,512)),[[G,e.editable.query]]):I("",!0),e.searchType=="profiles"?P((i(),o("input",{key:1,"onUpdate:modelValue":n[3]||(n[3]=t=>e.editable.query=t),class:"form-control",placeholder:"Search profiles...","aria-describedby":"button-addon2","aria-label":"Search",type:"text"},null,512)),[[G,e.editable.query]]):I("",!0),Se])],32)])]),e.searchType=="businesses"?(i(),o("div",xe,[Ee,(i(!0),o(C,null,w(e.businesses,t=>(i(),o("div",ke,[h(H,{business:t},null,8,["business"])]))),256))])):(i(),o("div",Be,[Pe,(i(!0),o(C,null,w(e.profiles,t=>(i(),o("div",Ge,[h(p,{to:{name:"Profile",params:{profileId:t==null?void 0:t.id}}},{default:f(()=>[h(N,{profile:t,title:`Visit ${t==null?void 0:t.name}'s profile page!`},null,8,["profile","title"])]),_:2},1032,["to"])]))),256))]))])])}const He=R(z,[["render",Ie],["__scopeId","data-v-d49b0670"]]);export{He as default};
