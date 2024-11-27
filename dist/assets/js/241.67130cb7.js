"use strict";(self["webpackChunkmayunf"]=self["webpackChunkmayunf"]||[]).push([[241],{2335:function(t,n,e){e.d(n,{a:function(){return l},c:function(){return m},g:function(){return a},s:function(){return f}});var o=e(5518);
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const r="ION-CONTENT",s="ion-content",c=".ion-content-scroll-host",i=`${s}, ${c}`,u=t=>t.tagName===r,a=async t=>u(t)?(await new Promise((n=>(0,o.c)(t,n))),t.getScrollElement()):t,l=t=>t.closest(i),f=(t,n)=>{if(u(t)){const e=t;return e.scrollToTop(n)}return Promise.resolve(t.scrollTo({top:0,left:0,behavior:n>0?"smooth":"auto"}))},m=(t,n,e,o)=>{if(u(t)){const r=t;return r.scrollByPoint(n,e,o)}return Promise.resolve(t.scrollBy({top:e,left:n,behavior:o>0?"smooth":"auto"}))}},9241:function(t,n,e){e.r(n),e.d(n,{startStatusTap:function(){return c}});var o=e(5808),r=e(2335),s=e(5518);
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
const c=()=>{const t=window;t.addEventListener("statusTap",(()=>{(0,o.gv)((()=>{const n=t.innerWidth,e=t.innerHeight,c=document.elementFromPoint(n/2,e/2);if(!c)return;const i=(0,r.a)(c);i&&new Promise((t=>(0,s.c)(i,t))).then((()=>{(0,o.bN)((async()=>{i.style.setProperty("--overflow","hidden"),await(0,r.s)(i,300),i.style.removeProperty("--overflow")}))}))}))}))}}}]);