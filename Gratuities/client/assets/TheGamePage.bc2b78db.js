import{X as r,l as h,_ as m,C as _,g as y,c as k,A as i,a as s,b as c,m as n,Y as u,s as f,o as a}from"./index.353077fe.js";class v{async destroyBlock(l){const o=await r.put("/account",{currency:l});return h.log(o.data),o.data}}const d=new v;const b={setup(){let t=_({});function l(){t&&(t.value.health=t.value.maxHealth);let o=i.blocks[Math.floor(Math.random()*i.blocks.length)];h.log(o),t.value=o}return y(()=>{l()}),{block:t,account:k(()=>i.account),async mine(){let o=i.account;if(t.value.health>0&&(t.value.health-=1),t.value.health==0&&t.value.id!="mimic"){let e=t.value.value;o.currency+=e,await d.destroyBlock(e),setTimeout(l,5e3)}else if(t.value.health==0&&t.value.id=="mimic"){let e=-t.value.value;o.currency>=100&&(o.currency+=e),await d.destroyBlock(e),setTimeout(l,5e3)}}}}},g={key:0,class:"row"},x={class:"col-12 d-flex justify-content-center"},w={class:"fs-1 mt-3 text-light my-shadow"},p={class:"col-12 d-flex justify-content-center"},j={class:"text-light my-shadow fs-2"},B={class:"col-12 d-flex justify-content-center my-1"},S=["value","max"],H={class:"col-12 d-flex justify-content-center mt-1"},M={class:"fs-3 text-light my-shadow"},P={class:"col-12 d-flex justify-content-center mt-4"},T=["src","alt"],Y={key:1,class:"row"},C={class:"col-12 d-flex justify-content-center"},G={key:0,class:"fs-1 mt-3 text-light my-shadow"},I={key:1,class:"fs-1 mt-3 text-light my-shadow"},N={key:2,class:"fs-1 mt-3 text-light my-shadow"},A={class:"col-12 d-flex justify-content-center"},O={key:0,class:"fs-2 text-light my-shadow"},V={key:1,class:"fs-2 text-light my-shadow"},z={key:2,class:"fs-2 text-light my-shadow"},D={class:"col-12 d-flex justify-content-center mt-4"},E=["src","alt"];function R(t,l,o,e,X,q){return e.block?(a(),s("div",{key:0,class:"container-fluid backdrop",style:u({backgroundImage:`url(${e.block.backdrop})`})},[e.block.health>0?(a(),s("div",g,[c("div",x,[c("span",w,n(e.block.name),1)]),c("div",p,[c("span",j,n(e.block.health)+" / "+n(e.block.maxHealth),1)]),c("div",B,[c("progress",{value:e.block.health,max:e.block.maxHealth},null,8,S)]),c("div",H,[c("span",M,n(e.block.description),1)]),c("div",P,[c("img",{src:e.block.healthyPic,alt:e.block.name,class:"block",onClick:l[0]||(l[0]=F=>e.mine())},null,8,T)])])):(a(),s("div",Y,[c("div",C,[e.block.id!="chest"?(a(),s("span",G,n(e.block.name)+" Mined!",1)):e.block.id=="mimic"?(a(),s("span",I," OH NO! It was a mimic!")):(a(),s("span",N,"Sweet, you opened a chest!"))]),c("div",A,[e.block.id!="mimic"?(a(),s("span",O,"You earned \u20B2"+n(e.block.value)+"!",1)):e.block.id=="mimic"&&e.account.currency>=100?(a(),s("span",V,"You lost \u20B2"+n(e.block.value)+"...",1)):(a(),s("span",z,"You were so broke, the mimic took pity on you..."))]),c("div",D,[c("img",{src:e.block.destroyedPic,alt:e.block.name,class:"item"},null,8,E)])]))],4)):f("",!0)}const K=m(b,[["render",R],["__scopeId","data-v-3e7c6ec5"]]);export{K as default};
