import{_ as N,u as j,g as I,h as L,c,t as T,P as h,l as f,A as a,B as U,T as V,i as z,j as F,E as Y,k as q,a as o,b as s,f as y,m as g,q as r,r as D,w as H,s as J,n as _,F as m,v as b,x as K,y as Q,z as d,o as t,p as W,e as X}from"./index.b6eedb59.js";const Z={setup(){j();async function u(){try{await K.calculateAccountRating()}catch(n){h.error(n.message),f.error(n)}}async function l(){try{await T.getTipsReceived()}catch(n){h.error(n.message),f.error(n)}}async function k(){try{await T.getTipsGiven()}catch(n){h.error(n.message),f.error(n)}}async function e(){try{const n=a.account.id;await Q.getMyBusiness(n)}catch(n){h.error(n.message),f.error(n)}}function x(){try{a.businesses=[]}catch(n){h.error(n.message,"Clearing Businesses")}}return I(()=>{setTimeout(e,1e3),l(),k(),u()}),L(()=>{x()}),{businesses:c(()=>a.businesses),account:c(()=>a.account),tipType:c(()=>a.tipType),receivedTips:c(()=>a.receivedTips),givenTips:c(()=>a.givenTips),highestTipMonth:c(()=>a.highestTipMonth),highestTipEver:c(()=>a.highestTipEver),availableToPayout:c(()=>a.availableToPayout),theme:c(()=>a.account.theme),async cashOut(n){try{await T.cashOut(n)}catch(p){h.error(p.message),f.error(p)}},showReceivedTips(){a.tipType="received"},showGivenTips(){a.tipType="given"}}},components:{Business:U,Tip:V,TipGiven:z,ProfileStarRating:F,EditAccountOffcanvas:Y,AddBusinessOffCanvas:q}},v=u=>(W("data-v-5370efe6"),u=u(),X(),u),$={class:"container-fluid"},ee={class:"row"},se={class:"col-12 d-flex justify-content-center align-items-center mt-2 mb-0"},te={class:"text-center"},oe={class:"col-5 col-md-3 offset-md-2 ps-3 text-center d-flex align-items-center"},ne=["src","alt"],ie={class:"col-7 col-md-5 ps-3"},ae={class:"justify-content-start row"},ce={class:"col-11 col-md-8"},le=y("Available to Payout: "),re={class:"d-flex justify-content-between align-items-center mt-1 w-100"},de=["disabled"],ue=v(()=>s("h6",null,"Biggest Tip:",-1)),he=y("This Month: "),_e={key:1},fe=y("Ever: "),me={key:1},ve=v(()=>s("div",{class:"col-12 col-md-6 offset-md-3 d-flex justify-content-around pe-4 mt-1"},[s("button",{"data-bs-toggle":"offcanvas","data-bs-target":"#addBusiness","aria-controls":"offcanvasExample",class:"btn figma-buttons text-light elevation-3 rounded-pill hover-text"},"New Business"),s("button",{"data-bs-toggle":"offcanvas","data-bs-target":"#offcanvasExample","aria-controls":"offcanvasExample",class:"btn figma-buttons text-light elevation-3 rounded-pill hover-text"},"Edit Account")],-1)),pe=v(()=>s("div",{class:"col-12 col-md-6 offset-md-3 mt-3"},[s("h1",null,"Recent Tips:")],-1)),ge={class:"col-12 col-md-6 offset-md-3 my-1 d-flex justify-content-center"},be={class:"btn-group",role:"group","aria-label":"Basic radio toggle button group"},ye={key:0,class:"col-12 col-md-6 offset-md-3 tips-section"},Te={class:"TipCard"},ke={key:1,class:"col-12 col-md-6 offset-md-3 tips-section"},xe={class:"TipCard"},Be={key:2,class:"col-12 col-md-6 offset-md-3 mt-3"},we=v(()=>s("h1",null,"My Business:",-1)),Se={class:"col-12 col-md-6 offset-md-3 my-4"},Pe={key:3,class:"col-12 col-md-6 offset-md-3 mt-3"},Ee=v(()=>s("h1",null,"My Businesses:",-1)),Ae={class:"col-12 col-md-6 offset-md-3 my-4"},Ce={key:4};function Re(u,l,k,e,x,n){var w,S,P,E;const p=d("ProfileStarRating"),C=d("router-link"),R=d("Tip"),M=d("TipGiven"),B=d("Business"),G=d("AddBusinessOffCanvas"),O=d("EditAccountOffcanvas");return t(),o(m,null,[s("div",$,[s("div",ee,[s("div",se,[s("h1",te,[y(g((w=e.account)==null?void 0:w.name)+" ",1),s("div",null,[r(p,{rating:(S=e.account)==null?void 0:S.rating},null,8,["rating"])])])]),s("div",oe,[e.account.id?(t(),D(C,{key:0,to:{name:"Profile",params:{profileId:(P=e.account)==null?void 0:P.id}}},{default:H(()=>{var i,A;return[s("img",{class:"elevation-3 rounded user-picture",src:(i=e.account)==null?void 0:i.picture,alt:(A=e.account)==null?void 0:A.name,title:"Go to your profile page",onerror:"this.src='broken-image.png'"},null,8,ne)]}),_:1},8,["to"])):J("",!0)]),s("div",ie,[s("div",ae,[s("div",ce,[s("h6",null,[le,s("div",re,[e.availableToPayout?(t(),o("i",{key:0,class:_(["fs-5",e.theme?"cash":"cash-light"])},"\u20B2"+g((E=e.availableToPayout)==null?void 0:E.toLocaleString("en-US")),3)):(t(),o("i",{key:1,class:_(["fs-5",e.theme?"cash":"cash-light"])},"\u20B20.00",2)),s("button",{onClick:l[0]||(l[0]=i=>e.cashOut(e.availableToPayout)),class:"btn btn-outline-success btn-sm fw-bold",style:{"--bs-btn-padding-y":".25rem","--bs-btn-padding-x":".5rem","--bs-btn-font-size":".75rem"},disabled:!e.availableToPayout},"cash out",8,de)])]),ue,s("ul",null,[s("li",null,[he,e.highestTipMonth?(t(),o("i",{key:0,class:_(["fs-5",e.theme?"cash":"cash-light"])},"\u20B2"+g(e.highestTipMonth.toLocaleString("en-US")),3)):(t(),o("i",_e,"No Tips Yet"))]),s("li",null,[fe,e.highestTipEver?(t(),o("i",{key:0,class:_(["fs-5",e.theme?"cash":"cash-light"])},"\u20B2"+g(e.highestTipEver.tip.toLocaleString("en-US")),3)):(t(),o("i",me,"No Tips Yet"))])])])])]),ve,pe,s("div",ge,[s("div",be,[s("input",{onClick:l[1]||(l[1]=i=>e.showReceivedTips()),type:"radio",class:"btn-check",name:"btnradio",id:"btnradio1",autocomplete:"off",checked:""}),s("label",{class:_(["btn",e.theme?"btn-outline-dark":"btn-outline-light"]),for:"btnradio1"},"Received",2),s("input",{onClick:l[2]||(l[2]=i=>e.showGivenTips()),type:"radio",class:"btn-check",name:"btnradio",id:"btnradio2",autocomplete:"off"}),s("label",{class:_(["btn",e.theme?"btn-outline-dark":"btn-outline-light"]),for:"btnradio2"},"\xA0\xA0Given\xA0\xA0",2)])]),e.tipType=="received"?(t(),o("div",ye,[(t(!0),o(m,null,b(e.receivedTips,i=>(t(),o("div",Te,[r(R,{tip:i},null,8,["tip"])]))),256))])):(t(),o("div",ke,[(t(!0),o(m,null,b(e.givenTips,i=>(t(),o("div",xe,[r(M,{tip:i},null,8,["tip"])]))),256))])),e.businesses.length==1?(t(),o("div",Be,[we,(t(!0),o(m,null,b(e.businesses,i=>(t(),o("div",Se,[r(B,{business:i},null,8,["business"])]))),256))])):e.businesses.length>1?(t(),o("div",Pe,[Ee,(t(!0),o(m,null,b(e.businesses,i=>(t(),o("div",Ae,[r(B,{business:i},null,8,["business"])]))),256))])):(t(),o("div",Ce))])]),r(G),r(O)],64)}const Ge=N(Z,[["render",Re],["__scopeId","data-v-5370efe6"]]);export{Ge as default};
