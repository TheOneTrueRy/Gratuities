import{_ as Q,u as U,C as M,D as V,e as c,A as s,P as d,O as h,H as z,R as W,Q as Y,S as q,U as H,V as J,g as K,W as X,c as r,i as t,m as l,p,k as F,q as D,F as N,r as Z,x as f,o as i,y as $,z as ee,M as u,s as te}from"./index.92ec1678.js";const oe={setup(){const a=U(),n=M({});async function y(){try{const e=a.params.profileId;await u.generateQRCode(e)}catch(e){d.error("[GENERATING QR CODE]",e)}}async function o(){try{const e=a.params.profileId;await u.getProfileById(e)}catch(e){d.error("[GETTING PROFILE BY ID]",e)}}async function w(){try{const e=a.params.profileId;await te.calculateProfileRating(e)}catch(e){d.error(e.message,"[CALCULATING PROFILE RATING]")}}async function I(){try{const e=a.params.profileId;await u.getReviewsByProfileId(e)}catch(e){d.error("[GETTING REVIEWS BY PROFILEID]",e.message)}}async function b(){try{const e=a.params.profileId;await h.getChat(e)}catch(e){d.error(e,"[getting chat]")}}async function m(){try{await h.getFeedbackInChat()}catch(e){d.error(e,"[getting feedback]")}}return V(async()=>{a.params.profileId&&(o(),y(),I(),w(),b())}),{editable:n,route:a,QRCode:c(()=>s.QRCode),profile:c(()=>s.profile),profiles:c(()=>s.profiles),reviews:c(()=>s.reviews),businesses:c(()=>s.businesses),account:c(()=>s.account),theme:c(()=>s.account.theme),chat:c(()=>s.chat),searchTypeDate(){s.reviewSearchType="date",s.reviews.sort(function(e,v){return new Date(e.createdAt)-new Date(v.createdAt)}).reverse()},searchTypeRating(){s.reviewSearchType="rating",s.reviews.sort(function(e,v){return e.rating-v.rating}).reverse()},async openChat(){try{await m()}catch(e){d.error(e,"[open chat]")}},async createChat(){try{const e=a.params.profileId;await h.createChat(e),await m()}catch(e){d.error(e,"[creating chat]")}}}},components:{ProfileCard:z,ReviewCard:W,ProfileCarousel:Y,RateProfileOffcanvas:q,FeedbackOffcanvas:H,TipUserModal:J,ProfileStarRating:K,AddEmployee:X}},_=a=>($("data-v-5e3d2365"),a=a(),ee(),a),ae={class:"ProfilePage"},se={class:"container-fluid"},ne={class:"row mt-1"},re={class:"col-12"},ie={class:"row align-items-center"},ce={class:"col-6 d-md-none"},de={class:"fs-1 mb-1"},le={key:0,class:"col-6 offset-md-6 text-end"},fe={class:"btn dropstart"},_e=_(()=>t("button",{class:"btn btn-secondary-outline btn-sm dropdown-toggle fs-4",type:"button","data-bs-toggle":"dropdown","aria-expanded":"false"}," ... ",-1)),pe={class:"dropdown-menu text-center"},ve=_(()=>t("li",null,[t("a",{class:"dropdown-item selectable","data-bs-toggle":"offcanvas","data-bs-target":"#offcanvasTop","aria-controls":"offcanvasTop"},"Add to business")],-1)),ge=_(()=>t("a",{class:"dropdown-item selectable","data-bs-toggle":"offcanvas","data-bs-target":"#offcanvasBottom","aria-controls":"offcanvasBottom"},"Send feedback",-1)),be=[ge],me=_(()=>t("a",{class:"dropdown-item selectable","data-bs-toggle":"offcanvas","data-bs-target":"#offcanvasBottom","aria-controls":"offcanvasBottom"},"Open Chat",-1)),he=[me],ue={class:"row justify-content-center"},ye={class:"col-12"},we={class:"col-12 mt-2 d-flex flex-column justify-content-center align-items-center"},Ie={key:0,class:"pt-2"},Ce={class:"col-12 d-md-flex justify-content-center d-none fs-2"},Re={class:"d-flex justify-content-around my-2"},Pe={key:0,class:"col-6 d-flex justify-content-center"},ke=_(()=>t("button",{class:"btn tip-button elevation-2 rounded-pill px-4","data-bs-toggle":"modal","data-bs-target":"#tipUserModal"},"Tip",-1)),Te=[ke],xe={key:1,class:"col-6 d-flex justify-content-center"},Se=_(()=>t("button",{class:"btn review-button elevation-2 rounded-pill","data-bs-toggle":"offcanvas","data-bs-target":"#reviewOffcanvas","aria-controls":"reviewOffcanvas"},"Review",-1)),Ee=[Se],Be={class:"col-12 mt-1"},Oe={class:"d-flex flex-column align-items-center"},Ae=_(()=>t("div",{class:"mb-2"},[t("span",null," Sort reviews by: ")],-1)),Fe={class:"btn-group",role:"group","aria-label":"Basic outlined example"},De={class:"row justify-content-center my-3"},Ne={class:"col-11 rounded p-2 col-md-8"};function Ge(a,n,y,o,w,I){var C,R,P,k,T,x,S,E,B,O,A;const b=f("ProfileStarRating"),m=f("ProfileCarousel"),e=f("ReviewCard"),v=f("RateProfileOffcanvas"),G=f("TipUserModal"),j=f("AddEmployee"),L=f("FeedbackOffcanvas");return i(),r(N,null,[t("div",ae,[t("div",se,[t("div",ne,[t("div",re,[t("div",ie,[t("div",ce,[t("div",de,[l(b,{rating:(C=o.profile)==null?void 0:C.rating},null,8,["rating"])])]),((R=o.account)==null?void 0:R.id)!=((P=o.profile)==null?void 0:P.id)?(i(),r("div",le,[t("div",fe,[_e,t("ul",pe,[ve,((k=o.profile)==null?void 0:k.openToFeedback)&&!o.chat?(i(),r("li",{key:0,onClick:n[0]||(n[0]=g=>o.createChat())},be)):p("",!0),((T=o.profile)==null?void 0:T.openToFeedback)&&o.chat?(i(),r("li",{key:1,onClick:n[1]||(n[1]=g=>o.openChat())},he)):p("",!0)])])])):p("",!0)]),t("div",ue,[t("div",ye,[l(m)]),t("div",we,[t("h1",null,F((x=o.profile)==null?void 0:x.name),1),(S=o.profile)!=null&&S.bio?(i(),r("p",Ie,'"'+F((E=o.profile)==null?void 0:E.bio)+'"',1)):p("",!0)]),t("div",Ce,[l(b,{rating:(B=o.profile)==null?void 0:B.rating},null,8,["rating"])]),t("div",Re,[((O=o.profile)==null?void 0:O.id)!=o.account.id?(i(),r("div",Pe,Te)):p("",!0),((A=o.profile)==null?void 0:A.id)!=o.account.id?(i(),r("div",xe,Ee)):p("",!0)]),t("div",Be,[t("div",Oe,[Ae,t("div",Fe,[t("button",{onClick:n[2]||(n[2]=g=>o.searchTypeDate()),type:"button",class:D(["btn btn-sm",o.theme?"btn-outline-dark":"btn-outline-light"]),style:{"--bs-btn-padding-y":".25rem","--bs-btn-padding-x":".5rem","--bs-btn-font-size":".75rem"}},"Date",2),t("button",{onClick:n[3]||(n[3]=g=>o.searchTypeRating()),type:"button",class:D(["btn btn-sm",o.theme?"btn-outline-dark":"btn-outline-light"]),style:{"--bs-btn-padding-y":".25rem","--bs-btn-padding-x":".5rem","--bs-btn-font-size":".75rem"}},"Rating",2)])])])]),t("div",De,[(i(!0),r(N,null,Z(o.reviews,g=>(i(),r("div",Ne,[l(e,{review:g},null,8,["review"])]))),256))])])])])]),l(v),l(G),l(j),l(L)],64)}const Le=Q(oe,[["render",Ge],["__scopeId","data-v-5e3d2365"]]);export{Le as default};
