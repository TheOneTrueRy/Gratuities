import{_ as R,C as V,g as U,h as q,D as A,c as d,y as k,M as B,P as g,A as r,H as L,N as D,a as o,b as s,q as h,w as f,m,n as u,J as M,K as P,L as G,s as C,F as I,v as w,f as _,z as v,o as i,t as Y,p as F,e as j}from"./index.7887cbc9.js";const z={setup(){const l=V({});async function n(){try{await k.getHighestRatedBusinesses()}catch(a){g.error(a.message,"[GETTING HIGHEST RATED BUSINESSES]")}}async function y(){try{await B.getHighestRatedProfiles()}catch(a){g.error(a.message,"[GETTING HIGHEST RATED PROFILES]")}}function e(){try{r.businesses=[]}catch(a){g.error(a.message,"Clearing Businesses")}}return U(()=>{n(),y()}),q(()=>{e()}),A(async()=>{r.account.id&&Y.getTipsGiven()}),{editable:l,account:d(()=>r.account),businesses:d(()=>r.businesses),profiles:d(()=>r.profiles),searchType:d(()=>r.searchType),highestTipEver:d(()=>r.highestTipEver),highestTipEverGiven:d(()=>r.highestTipEverGiven),theme:d(()=>r.account.theme),async search(){try{let a=l.value;await k.getBusinessesByQuery(a),await B.getProfilesByQuery(a)}catch(a){g.error(a.message,"[SEARCHING]")}},searchTypeProfiles(){r.searchType="profiles"},searchTypeBusinesses(){r.searchType="businesses"}}},components:{ProfileCard:L,BusinessCard:D}},c=l=>(F("data-v-42ca5a66"),l=l(),j(),l),Q={class:"container-fluid"},J={class:"row pb-1 mt-3 d-flex flex-column align-items-center justify-content-center"},K={key:0},O={class:"col-12 text-center"},W=["src","alt"],X={class:"col-12 text-center"},Z={class:"mt-2 mb-3 rounded text-center user-name"},$={key:0,class:"col-12 text-center"},ee={class:"biggest-tip"},se=_("Your Biggest Tip Sent: "),te=c(()=>s("br",null,null,-1)),oe=_(" to "),ie={key:1,class:"col-12 text-center"},ne=c(()=>s("h6",{class:"biggest-tip"},[s("span",null,"No Tips Given Yet")],-1)),ae=[ne],re={key:2,class:"col-12 text-center mb-4"},ce={class:"biggest-tip"},le=_("Your Biggest Tip received: "),de=c(()=>s("br",null,null,-1)),he=_(" from "),ue={key:3,class:"col-12 text-center"},_e=c(()=>s("h6",{class:"biggest-tip"},"No Tips Received Yet",-1)),me=[_e],pe={key:1},ge=c(()=>s("div",{class:"col-12 text-center my-5"},[s("h2",null,"Log-In or Sign-Up now to get started!")],-1)),fe=[ge],ve={class:"col-12 col-md-6"},ye={class:"d-flex justify-content-center mb-4"},be={class:"btn-group",role:"group","aria-label":"Basic outlined example"},Te={class:"input-group"},Se=c(()=>s("button",{class:"btn btn-outline-secondary",type:"submit",id:"button-addon2"},[s("i",{class:"mdi mdi-magnify"})],-1)),xe={key:2},Ee=c(()=>s("div",{class:"col-12 col-md-8 offset-md-2 my-3"},[s("h6",null,"Top Businesses:")],-1)),ke={class:"col-12 employee-card rounded col-md-8 offset-md-2"},Be={key:3},Pe=c(()=>s("div",{class:"col-12 col-md-8 offset-md-2 my-3"},[s("h6",null,"Top Profiles:")],-1)),Ge={class:"col-12 employee-card rounded col-md-8 offset-md-2",id:"employee-card"};function Ce(l,n,y,e,a,Ie){var b,T,S,x;const p=v("router-link"),H=v("BusinessCard"),N=v("ProfileCard");return i(),o("div",Q,[s("div",J,[(b=e.account)!=null&&b.id?(i(),o("div",K,[s("div",O,[h(p,{to:{name:"Account"}},{default:f(()=>{var t,E;return[s("img",{class:"profile-picture border border-dark border-2 elevation-1",src:(t=e.account)==null?void 0:t.picture,alt:(E=e.account)==null?void 0:E.picture,title:"Go to your account page!",onerror:"this.src='broken-image.png'"},null,8,W)]}),_:1})]),s("div",X,[s("h2",Z,m((T=e.account)==null?void 0:T.name),1)]),e.highestTipEverGiven?(i(),o("div",$,[s("h6",ee,[se,s("span",{class:u(e.theme?"cash":"cash-light")},"\u20B2"+m(e.highestTipEverGiven.tip.toLocaleString("en-US")),3),te,oe,h(p,{class:u([e.theme?"text-dark":"text-success","underline"]),to:{name:"Profile",params:{profileId:(S=e.highestTipEverGiven.receiver)==null?void 0:S.id}}},{default:f(()=>{var t;return[_(m((t=e.highestTipEverGiven.receiver)==null?void 0:t.name),1)]}),_:1},8,["class","to"])])])):(i(),o("div",ie,ae)),e.highestTipEver?(i(),o("div",re,[s("h6",ce,[le,s("span",{class:u(e.theme?"cash":"cash-light")},"\u20B2"+m(e.highestTipEver.tip.toLocaleString("en-US")),3),de,he,h(p,{class:u([e.theme?"text-dark":"text-success","underline"]),to:{name:"Profile",params:{profileId:(x=e.highestTipEver.giver)==null?void 0:x.id}}},{default:f(()=>{var t;return[_(m((t=e.highestTipEver.giver)==null?void 0:t.name),1)]}),_:1},8,["class","to"])])])):(i(),o("div",ue,me))])):(i(),o("div",pe,fe)),s("div",ve,[s("div",ye,[s("div",be,[s("button",{onClick:n[0]||(n[0]=t=>e.searchTypeProfiles()),type:"button",class:u(["btn",[e.theme?"btn-outline-dark":"btn-outline-light"]])},"Profiles",2),s("button",{onClick:n[1]||(n[1]=t=>e.searchTypeBusinesses()),type:"button",class:u(["btn",[e.theme?"btn-outline-dark":"btn-outline-light"]])},"Businesses",2)])]),s("div",null,[s("form",{onSubmit:n[4]||(n[4]=M(t=>e.search(),["prevent"]))},[s("div",Te,[e.searchType=="businesses"?P((i(),o("input",{key:0,"onUpdate:modelValue":n[2]||(n[2]=t=>e.editable.query=t),class:"form-control",placeholder:"Search businesses...","aria-describedby":"button-addon2","aria-label":"Search",type:"text"},null,512)),[[G,e.editable.query]]):C("",!0),e.searchType=="profiles"?P((i(),o("input",{key:1,"onUpdate:modelValue":n[3]||(n[3]=t=>e.editable.query=t),class:"form-control",placeholder:"Search profiles...","aria-describedby":"button-addon2","aria-label":"Search",type:"text"},null,512)),[[G,e.editable.query]]):C("",!0),Se])],32)])]),e.searchType=="businesses"?(i(),o("div",xe,[Ee,(i(!0),o(I,null,w(e.businesses,t=>(i(),o("div",ke,[h(H,{business:t,title:`Visit ${t==null?void 0:t.name}'s business page!'`},null,8,["business","title"])]))),256))])):(i(),o("div",Be,[Pe,(i(!0),o(I,null,w(e.profiles,t=>(i(),o("div",Ge,[h(p,{to:{name:"Profile",params:{profileId:t==null?void 0:t.id}}},{default:f(()=>[h(N,{profile:t,title:`Visit ${t==null?void 0:t.name}'s profile page!`},null,8,["profile","title"])]),_:2},1032,["to"])]))),256))]))])])}const He=R(z,[["render",Ce],["__scopeId","data-v-42ca5a66"]]);export{He as default};
