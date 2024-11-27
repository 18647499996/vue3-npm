"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var __assign=function(){return(__assign=Object.assign||function(e){for(var n,t=1,r=arguments.length;t<r;t++)for(var a in n=arguments[t])Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a]);return e}).apply(this,arguments)};function __awaiter(e,n,t,r){return new(t||(t=Promise))(function(a,i){function s(e){try{c(r.next(e))}catch(e){i(e)}}function o(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var n;e.done?a(e.value):(n=e.value,n instanceof t?n:new t(function(e){e(n)})).then(s,o)}c((r=r.apply(e,n||[])).next())})}function __generator(e,n){var t,r,a,i,s={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return i={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function o(i){return function(o){return function(i){if(t)throw new TypeError("Generator is already executing.");for(;s;)try{if(t=1,r&&(a=2&i[0]?r.return:i[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,i[1])).done)return a;switch(r=0,a&&(i=[2&i[0],a.value]),i[0]){case 0:case 1:a=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,r=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!(a=(a=s.trys).length>0&&a[a.length-1])&&(6===i[0]||2===i[0])){s=0;continue}if(3===i[0]&&(!a||i[1]>a[0]&&i[1]<a[3])){s.label=i[1];break}if(6===i[0]&&s.label<a[1]){s.label=a[1],a=i;break}if(a&&s.label<a[2]){s.label=a[2],s.ops.push(i);break}a[2]&&s.ops.pop(),s.trys.pop();continue}i=n.call(e,s)}catch(e){i=[6,e],r=0}finally{t=a=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,o])}}}var Message=function(){function e(){}return e.add=function(n){e.HANDLE_LIST.push(n),window.addEventListener("message",n,!1)},e.remove=function(n){var t=e.HANDLE_LIST.indexOf(n);t>=0&&e.HANDLE_LIST.splice(t,1),window.removeEventListener("message",n,!1)},e.empty=function(){for(;e.HANDLE_LIST.length;)window.removeEventListener("message",e.HANDLE_LIST.shift(),!1)},e.parse=function(e){try{return"object"==typeof e?e:e?JSON.parse(e):e}catch(n){return console.log("Message.parse Error:",n),e}},e.HANDLE_LIST=[],e}();function isPlainObject(e){if(!e)return!1;for(var n=e;null!==Object.getPrototypeOf(n);)n=Object.getPrototypeOf(n);return Object.getPrototypeOf(e)===n}function isFunction(e){return"[object Function]"==={}.toString.call(e)}function dispatchFullScreenChange(e){["fullscreen","fullscreenElement"].forEach(function(n){Object.defineProperty(document,n,{get:function(){return!!e.status},configurable:!0})});var n=new CustomEvent("fullscreenchange");document.dispatchEvent(n)}function addStylesheetRules(e){var n=document.createElement("style");document.head.appendChild(n);var t=n.sheet;t.insertRule(e,t.cssRules.length)}var officeTypes,officeNameTypes,modeTypes,fullScreenStatus,variables={origin:""};function setGlobalData(e,n){variables[e]=n}function getGlobalData(e){return variables[e]}function isUnsafeMessage(e){var n=getGlobalData("origin");return!!function(e,n){return e!==n&&(e.replace(/www\./i,"").toLowerCase()!==n.replace(/www\./i,"").toLowerCase()||(e.match("www.")?void 0:(setGlobalData("origin",n),!1)))}(n,e.origin)&&(console.warn("postMessage 域名检查不通过",{safeOrigin:n,eventOrigin:e.origin}),!0)}function makeId(){var e=0;return function(){return e+=1}}!function(e){e.unknown="unknown",e.spreadsheet="s",e.writer="w",e.presentation="p",e.pdf="f"}(officeTypes||(officeTypes={})),function(e){e.wps="w",e.et="s",e.presentation="p",e.pdf="f"}(officeNameTypes||(officeNameTypes={})),function(e){e.nomal="nomal",e.simple="simple"}(modeTypes||(modeTypes={})),function(e){e[e.requestFullscreen=1]="requestFullscreen",e[e.exitFullscreen=0]="exitFullscreen"}(fullScreenStatus||(fullScreenStatus={}));var iframe,mountResizeObserver,getId=makeId(),getIframe=function(e,n,t){void 0===t&&(t=!0);var r=n;if(!iframe){var a=handleMountResize.bind(null,r);(iframe=document.createElement("iframe")).classList.add("web-office-iframe");var i={id:"office-iframe",src:e,scrolling:"no",frameborder:"0",allowfullscreen:"allowfullscreen",webkitallowfullscreen:"true",mozallowfullscreen:"true",allow:"clipboard-read; clipboard-write"};for(var s in r?(i.style="width: "+r.clientWidth+"px; height: "+r.clientHeight+"px;",t&&window.addEventListener("resize",a)):((r=document.createElement("div")).classList.add("web-office-default-container"),addStylesheetRules(".web-office-default-container {position: absolute; padding: 0;  margin: 0; width: 100%; height: 100%; left: 0; top: 0;}"),document.body.appendChild(r),i.style="position: fixed; top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%;"),i)iframe.setAttribute(s,i[s]);r.appendChild(iframe),iframe.destroy=function(){iframe.parentNode.removeChild(iframe),iframe=null,window.removeEventListener("resize",a),mountResizeObserver&&(mountResizeObserver.disconnect(),mountResizeObserver=null)}}return iframe};function handleMountResize(e){var n=e.clientHeight,t=e.clientWidth;0!==n||0!==t||mountResizeObserver?0===n&&0===t||!mountResizeObserver||(mountResizeObserver.disconnect(),mountResizeObserver=null):window.ResizeObserver&&(mountResizeObserver=new ResizeObserver(function(n){handleMountResize(e)})).observe(e),iframe.style.cssText+="height: "+n+"px; width: "+t+"px"}var sendMsgToWps=function(e){getIframe().contentWindow&&getIframe().contentWindow.postMessage(JSON.stringify(e),getGlobalData("origin"))};function apiSender(e,n,t){return new Promise(function(r){var a=getId(),i=function(e){if(!isUnsafeMessage(e)){var n=Message.parse(e.data);n.eventName===t&&n.msgId===a&&(r(n.data),Message.remove(i))}};Message.add(i),sendMsgToWps({data:e,msgId:a,eventName:n})})}var apiChannelOld=function(e){return apiSender(e,"wps.jssdk.api","wps.api.reply")},apiBasicChannel=function(e){return apiSender(e,"api.basic","api.basic.reply")},setterCallbacks={idMap:{}};function setterCallbackSubscribe(e){return __awaiter(this,void 0,void 0,function(){var n,t,r,a,i,s,o,c,l,u;return __generator(this,function(d){switch(d.label){case 0:return isUnsafeMessage(e)?[2]:(n=Message.parse(e.data),t=n.eventName,r=n.callbackId,a=n.data,r&&(i=setterCallbacks.idMap[r])?(s=i.split(":"),o=s[0],c=s[1],"api.callback"===t&&setterCallbacks[o]&&setterCallbacks[o][c]?[4,(u=setterCallbacks[o][c]).callback.apply(u,a.args)]:[3,2]):[3,2]);case 1:l=d.sent(),sendMsgToWps({result:l,callbackId:r,eventName:"api.callback.reply"}),d.label=2;case 2:return[2]}})})}var handleApiSetter=function(e){return __awaiter(void 0,void 0,void 0,function(){function n(){return Object.keys(setterCallbacks.idMap).find(function(e){return setterCallbacks.idMap[e]===r+":"+t})}var t,r,a,i,s,o,c,l,u;return __generator(this,function(d){switch(d.label){case 0:return t=e.prop,r=e.parentObjId,[4,reduceArgs([a=e.value])];case 1:return i=d.sent(),s=i[0],o=i[1],e.value=s[0],c=Object.keys(o)[0],l=setterCallbacks[r],null===a&&l&&l[t]&&((u=n())&&delete setterCallbacks.idMap[u],delete l[t],Object.keys(l).length||delete setterCallbacks[r],Object.keys(setterCallbacks.idMap).length||Message.remove(setterCallbackSubscribe)),c&&(Object.keys(setterCallbacks.idMap).length||Message.add(setterCallbackSubscribe),setterCallbacks[r]||(setterCallbacks[r]={}),setterCallbacks[r][t]={callbackId:c,callback:o[c]},(u=n())&&delete setterCallbacks.idMap[u],setterCallbacks.idMap[c]=r+":"+t),[2]}})})},apiChannel=function(e,n,t,r){return __awaiter(void 0,void 0,void 0,function(){var a,i,s,o,c,l,u,d;return __generator(this,function(f){switch(f.label){case 0:return a=getId(),o=new Promise(function(e,n){i=e,s=n}),c={},n.args?[4,reduceArgs(n.args)]:[3,2];case 1:l=f.sent(),u=l[0],d=l[1],n.args=u,c=d,f.label=2;case 2:return"api.setter"!==e?[3,4]:[4,handleApiSetter(n)];case 3:f.sent(),f.label=4;case 4:return handleSendApiChannel([{eventName:e,data:n,msgId:a},function(){var n=this,l=function(o){return __awaiter(n,void 0,void 0,function(){var n,u,d;return __generator(this,function(f){switch(f.label){case 0:return isUnsafeMessage(o)?[2]:"api.callback"===(n=Message.parse(o.data)).eventName&&n.callbackId&&c[n.callbackId]?[4,c[n.callbackId].apply(c,n.data.args)]:[3,2];case 1:u=f.sent(),sendMsgToWps({result:u,eventName:"api.callback.reply",callbackId:n.callbackId}),f.label=2;case 2:return n.eventName===e+".reply"&&n.msgId===a&&(n.error?((d=new Error("")).stack=n.error+"\n"+t,r&&r(),s(d)):i(n.result),Message.remove(l)),[2]}})})};return Message.add(l),o}]),[2,o]}})})};function reduceArgs(e){return __awaiter(this,void 0,void 0,function(){var n,t,r,a,i,s,o,c,l,u,d;return __generator(this,function(f){switch(f.label){case 0:n={},t=[],r=e.slice(0),f.label=1;case 1:return r.length?(a=void 0,[4,r.shift()]):[3,13];case 2:return(i=f.sent())&&i.done?[4,i.done()]:[3,4];case 3:f.sent(),f.label=4;case 4:if(!isPlainObject(a))return[3,11];for(o in a={},s=[],i)s.push(o);c=0,f.label=5;case 5:return c<s.length?(l=s[c],u=i[l],/^[A-Z]/.test(l)?u&&u.done?[4,u.done()]:[3,7]:[3,8]):[3,10];case 6:f.sent(),f.label=7;case 7:u&&u.objId?u={objId:u.objId}:"function"==typeof u&&(d=getId(),n[d]=u,u={callbackId:d}),f.label=8;case 8:a[l]=u,f.label=9;case 9:return c++,[3,5];case 10:return[3,12];case 11:i&&i.objId?a={objId:i.objId}:"function"==typeof i&&void 0===i.objId?(d=getId(),n[d]=i,a={callbackId:d}):a=i,f.label=12;case 12:return t.push(a),[3,1];case 13:return[2,[t,n]]}})})}function handleSendApiChannel(e){var n=e[0],t=e[1];"function"==typeof(n=__assign({},n)).data&&(n.data=n.data()),t(),sendMsgToWps(n)}var userConfHandler=function(e,n){void 0===n&&(n=!0);var t=__assign({},e),r=t.headers,a=void 0===r?{}:r,i=t.subscriptions,s=void 0===i?{}:i,o=t.mode,c=void 0===o?modeTypes.nomal:o,l=t.commonOptions,u=a.backBtn,d=void 0===u?{}:u,f=a.shareBtn,p=void 0===f?{}:f,v=a.otherMenuBtn,b=void 0===v?{}:v,g=function(e,t){e.subscribe&&"function"==typeof e.subscribe&&(e.callback=t,s[t]=e.subscribe,n&&delete e.subscribe)};if(g(d,"wpsconfig_back_btn"),g(p,"wpsconfig_share_btn"),g(b,"wpsconfig_other_menu_btn"),b.items&&Array.isArray(b.items)){var h=[];b.items.forEach(function(e,n){switch(void 0===e&&(e={}),e.type){case"export_img":e.type=1,e.callback="export_img";break;case"export_pdf":e.type=1,e.callback="export_pdf";break;case"save_version":e.type=1,e.callback="save_version";break;case"about_wps":e.type=1,e.callback="about_wps";break;case"split_line":e.type=2;break;case"custom":e.type=3,g(e,"wpsconfig_other_menu_btn_"+n),h.push(e)}}),h.length&&(isMobile||isInMiniProgram)&&(b.items=h)}t.url=t.url||t.wpsUrl;var m=[];if((c===modeTypes.simple||l&&!1===l.isShowTopArea)&&m.push("simple","hidecmb"),t.debug&&m.push("debugger"),t.url&&m.length&&(t.url=t.url+(t.url.indexOf("?")>=0?"&":"?")+m.join("&")),l&&(l.isParentFullscreen||l.isBrowserViewFullscreen)&&(document.addEventListener("fullscreenchange",handleFullscreenChange),document.addEventListener("webkitfullscreenchange",handleFullscreenChange),document.addEventListener("mozfullscreenchange",handleFullscreenChange)),t.wordOptions&&(t.wpsOptions=t.wordOptions),t.excelOptions&&(t.etOptions=t.excelOptions),t.pptOptions&&(t.wppOptions=t.pptOptions),"object"==typeof s.print){var w="wpsconfig_print";"function"==typeof s.print.subscribe&&(s[w]=s.print.subscribe,t.print={callback:w},void 0!==s.print.custom&&(t.print.custom=s.print.custom)),delete s.print}"function"==typeof s.exportPdf&&(s[w="wpsconfig_export_pdf"]=s.exportPdf,t.exportPdf={callback:w},delete s.exportPdf);return t.commandBars&&setCommandBars(t.commandBars,!1),__assign(__assign({},t),{subscriptions:s})},getOfficeType=function(e){void 0===e&&(e="");var n="";if(!n&&e){var t=e.toLowerCase();-1!==t.indexOf("/office/s/")&&(n=officeTypes.spreadsheet),-1!==t.indexOf("/office/w/")&&(n=officeTypes.writer),-1!==t.indexOf("/office/p/")&&(n=officeTypes.presentation),-1!==t.indexOf("/office/f/")&&(n=officeTypes.pdf)}if(!n){var r=e.match(/[\?&]type=([a-z]+)/)||[];n=officeNameTypes[r[1]]||""}return n};function setCommandBars(e,n){void 0===n&&(n=!0);var t=e.map(function(e){var n=e.attributes;if(!Array.isArray(n)){var t=[];for(var r in n)if(n.hasOwnProperty(r)){var a={name:r,value:n[r]};t.push(a)}e.attributes=t}return e});return n&&sendMsgToWps({data:t,eventName:"setCommandBars"}),t}var agent=window.navigator.userAgent.toLowerCase(),isMobile=/Android|webOS|iPhone|iPod|BlackBerry|iPad/i.test(agent),isInMiniProgram=function(){try{return-1!==window._parent.location.search.indexOf("from=wxminiprogram")}catch(e){return!1}}();function handleFullscreenChange(){var e={status:fullScreenStatus.requestFullscreen},n=document,t=n.fullscreenElement||n.webkitFullscreenElement||n.mozFullScreenElement;e.status=t?fullScreenStatus.requestFullscreen:fullScreenStatus.exitFullscreen,sendMsgToWps({data:e,eventName:"fullscreenchange"})}function removeFullscreenEventListener(){document.removeEventListener("fullscreenchange",handleFullscreenChange)}var clearSetterCallbacks=function(){setterCallbacks.idMap={}};function eventDeprecatedMsg(){console.group("JSSDK 事件机制调整说明"),console.warn("jssdk.on、jssdk.off 和 jssdk.Application.Sub 将在后续版本中被弃用，建议使用改进后的 ApiEvent"),console.warn("具体请参考：https://wwo.wps.cn/docs/front-end/basic-usage/events/intro/"),console.groupEnd()}function mitt(e){return e=e||Object.create(null),{on:function(n,t){(e[n]||(e[n]=[])).push(t)},off:function(n,t){e[n]&&e[n].splice(e[n].indexOf(t)>>>0,1)},emit:function(n,t){(e[n]||[]).slice().map(function(e){e(t)}),(e["*"]||[]).slice().map(function(e){e(n,t)})}}}var objId=0,collectObjIdHandlers=new Set;function createObjId(e){return objId+=1,!e&&collectObjId(objId),objId}function collectObjId(e){collectObjIdHandlers.forEach(function(n){return n(e)})}function makeCollectObjIdHandle(e){return function(){var n=[],t=function(e){n.push(e)};return collectObjIdHandlers.add(t),{End:function(){e(n),collectObjIdHandlers.delete(t)}}}}function getError(){var e=new Error("");return(e.stack||e.message||"").split("\n").slice(2).join("\n")}function destroyApplication(){collectObjIdHandlers=new Set,objId=0}function initApplication(e,n){var t=this,r=n.Events,a=n.Enum,i=n.Props,s=i[0],o=i[1],c={objId:objId};switch(assign(c,s,o),c.Events=r,c.Enum=a,e.Enum=c.Enum,e.Events=c.Events,e.Props=i,getOfficeType(e.url)){case officeTypes.writer:e.WordApplication=e.WpsApplication=function(){return c};break;case officeTypes.spreadsheet:e.ExcelApplication=e.EtApplication=function(){return c};break;case officeTypes.presentation:e.PPTApplication=e.WppApplication=function(){return c};break;case officeTypes.pdf:e.PDFApplication=function(){return c}}e.Application=c,e.Free=function(e){return apiChannel("api.free",{objId:e},"")},e.Stack=c.Stack=makeCollectObjIdHandle(function(n){e&&e.Free(n)});var l={};Message.add(function(e){return __awaiter(t,void 0,void 0,function(){var n,t,r,a,i;return __generator(this,function(s){switch(s.label){case 0:return isUnsafeMessage(e)?[2]:"api.event"===(n=Message.parse(e.data)).eventName&&n.data?(t=n.data,r=t.eventName,a=t.data,(i=l[r])?[4,i(a)]:[3,2]):[3,2];case 1:s.sent(),s.label=2;case 2:return[2]}})})}),c.Sub={};var u=function(e){var n=r[e];Object.defineProperty(c.Sub,n,{set:function(e){eventDeprecatedMsg(),l[n]=e,sendMsgToWps({eventName:"api.event.register",data:{eventName:n,register:!!e,objId:objId+=1}})}})};for(var d in r)u(d)}var polyfillApi=["ExportAsFixedFormat","GetOperatorsInfo","ImportDataIntoFields","ReplaceText","ReplaceBookmark","GetBookmarkText","GetComments"];function assign(e,n,t){for(var r=n.slice(0),a=function(){var n=r.shift();!n.alias&&~polyfillApi.indexOf(n.prop)&&r.push(__assign(__assign({},n),{alias:n.prop+"Async"})),Object.defineProperty(e,n.alias||n.prop,{get:function(){var r=this,a=1===n.cache,i=a&&this["__"+n.prop+"CacheValue"];if(!i){var s=getError(),o=createObjId(a),c=function(){for(var r,a=[],i=0;i<arguments.length;i++)a[i]=arguments[i];return void 0!==n.caller?assign(r={objId:createObjId()},t[n.caller],t):r={},wrapper(c,r,"api.caller",{obj:c,args:a,parentObjId:e.objId,objId:r.objId,prop:n.prop},s),r};return c.objId=-1,void 0!==n.getter&&(c.objId=o,assign(c,t[n.getter],t)),wrapper(e,c,"api.getter",{parentObjId:e.objId,objId:c.objId,prop:n.prop},s,function(){delete r["__"+n.prop+"CacheValue"]}),a&&(this["__"+n.prop+"CacheValue"]=c),c}return i},set:function(t){var r=getError();return wrapper(e,{},"api.setter",{value:t,parentObjId:e.objId,objId:-1,prop:n.prop},r)}})};r.length;)a()}function wrapper(e,n,t,r,a,i){var s,o=(e.done?e.done():Promise.resolve()).then(function(){return s||(s=apiChannel(t,r,a,i)),s});n.done=function(){return o},n.then=function(e,t){return r.objId>=0?(n.then=null,n.catch=null,o.then(function(){e(n)}).catch(function(e){return t(e)})):o.then(e,t)},n.catch=function(e){return o.catch(e)},n.Destroy=function(){return apiChannel("api.free",{objId:n.objId},"")}}var eventRegistry={};function reMountEvent(e){var n=[];Object.keys(eventRegistry).forEach(function(t){eventRegistry[t].forEach(function(r){var a=t;e.off(a,r),n.push({handle:r,eventName:a})}),delete eventRegistry[t]}),n.forEach(function(e){var n=e.eventName,t=e.handle;null==sdkInstance||sdkInstance.ApiEvent.AddApiEventListener(n,t)})}var sdkInstance=null,EVENT_TYPES={fileOpen:"fileOpen",tabSwitch:"tabSwitch",fileSaved:"fileSaved",fileStatus:"fileStatus",fullscreenChange:"fullscreenChange",error:"error",stage:"stage"},EVENT_NAME={getToken:"api.getToken",onToast:"event.toast",onHyperLinkOpen:"event.hyperLinkOpen",getClipboardData:"api.getClipboardData"};function listener(e,n,t,r,a,i,s){var o=this;void 0===t&&(t={});Message.add(function(c){return __awaiter(o,void 0,void 0,function(){var o,l,u,d,f,p,v,b,g,h,m,w,_,y,k,E,T,O,I;return __generator(this,function(C){switch(C.label){case 0:return isUnsafeMessage(c)?[2]:(o=Message.parse(c.data),l=o.eventName,u=void 0===l?"":l,d=o.data,f=void 0===d?null:d,p=o.url,v=void 0===p?null:p,-1!==["wps.jssdk.api"].indexOf(u)?[2]:"ready"!==u?[3,1]:(a.apiReadySended&&reMountEvent(n),sendMsgToWps({eventName:"setConfig",data:__assign(__assign({},t),{version:e.version})}),e.tokenData&&e.setToken(__assign(__assign({},e.tokenData),{hasRefreshTokenConfig:!!t.refreshToken})),e.iframeReady=!0,[3,15]));case 1:return"error"!==u?[3,2]:(n.emit(EVENT_TYPES.error,f),[3,15]);case 2:return"open.result"!==u?[3,3]:(void 0!==(null===(T=null==f?void 0:f.fileInfo)||void 0===T?void 0:T.officeVersion)&&(e.mainVersion=f.fileInfo.officeVersion,console.log("WebOfficeSDK Main Version: V"+e.mainVersion)),n.emit(EVENT_TYPES.fileOpen,f),[3,15]);case 3:return"api.scroll"!==u?[3,4]:(window.scrollTo(f.x,f.y),[3,15]);case 4:if(u!==EVENT_NAME.getToken)return[3,9];b={token:!1},C.label=5;case 5:return C.trys.push([5,7,,8]),[4,a.refreshToken()];case 6:return b=C.sent(),[3,8];case 7:return g=C.sent(),console.error("refreshToken: "+(g||"fail to get")),[3,8];case 8:return sendMsgToWps({eventName:EVENT_NAME.getToken+".reply",data:b}),[3,15];case 9:if(u!==EVENT_NAME.getClipboardData)return[3,14];h={text:"",html:""},C.label=10;case 10:return C.trys.push([10,12,,13]),[4,a.getClipboardData()];case 11:return h=C.sent(),[3,13];case 12:return m=C.sent(),console.error("getClipboardData: "+(m||"fail to get")),[3,13];case 13:return sendMsgToWps({eventName:EVENT_NAME.getClipboardData+".reply",data:h}),[3,15];case 14:u===EVENT_NAME.onToast?a.onToast(f):u===EVENT_NAME.onHyperLinkOpen?a.onHyperLinkOpen(f):"stage"===u?n.emit(EVENT_TYPES.stage,f):"event.callback"===u?(w=f.eventName,_=f.data,y=w,"fullScreenChange"===w&&(y=EVENT_TYPES.fullscreenChange),"file.saved"===w&&(y=EVENT_TYPES.fileStatus),((null===(O=t.commonOptions)||void 0===O?void 0:O.isBrowserViewFullscreen)||(null===(I=t.commonOptions)||void 0===I?void 0:I.isParentFullscreen))&&"fullscreenchange"===y&&(k=_.status,E=_.isDispatchEvent,t.commonOptions.isBrowserViewFullscreen?handleBrowserViewFullscreen(k,i,s,E):t.commonOptions.isParentFullscreen&&handleParenFullscreenEvent(k,i,t.commonOptions.isParentFullscreen)),n.emit(y,_)):"api.ready"===u&&initApplication(e,f),C.label=15;case 15:return"function"==typeof r[u]&&r[u](e,v||f),[2]}})})})}function makeReady(e){return new Promise(function(n){var t=function(r){isUnsafeMessage(r)||Message.parse(r.data).eventName===e&&(n(),Message.remove(t))};Message.add(t)})}function config(e){var n=this;void 0===e&&(e={}),sdkInstance&&sdkInstance.destroy();try{var t=userConfHandler(e),r=t.subscriptions,a=void 0===r?{}:r,i=t.mount,s=void 0===i?null:i,o=t.url,c=t.refreshToken,l=t.onToast,u=t.onHyperLinkOpen,d=t.getClipboardData;setGlobalData("origin",(o.match(/https*:\/\/[^\/]+/g)||[])[0]);var f=getIframe(o,s),p=makeReady("ready"),v=makeReady("open.result"),b=makeReady("api.ready"),g=s?{width:s.clientWidth+"px",height:s.clientHeight+"px"}:{width:"100vw",height:"100vh"};delete t.mount,o&&delete t.url,delete t.subscriptions;var h=mitt(),m={apiReadySended:!1},w=function(e,t,r){return __awaiter(n,void 0,void 0,function(){return __generator(this,function(n){switch(n.label){case 0:return function(e,n,t){if(eventRegistry[e]){var r=!!eventRegistry[e].find(function(e){return e===n});return r&&"off"===t?(h.off(e,n),eventRegistry[e]=eventRegistry[e].filter(function(e){return e!==n}),!!eventRegistry[e].length||(eventRegistry[e]=void 0,!1)):(r||"on"!==t||(eventRegistry[e].push(n),h.on(e,n)),!0)}return"on"===t?(eventRegistry[e]=[],eventRegistry[e].push(n),!1):"off"===t||void 0}(e,t,r)?[3,2]:[4,p];case 1:n.sent(),function(e,n){var t=e.eventName,r=e.type,a=e.handle;"on"===n?h.on(t,a):h.off(t,a),"base.event"===r&&sendMsgToWps({eventName:"basic.event",data:{eventName:t,action:n}}),eventDeprecatedMsg()}(function(e,n){var t=e,r="base.event";switch(t){case EVENT_TYPES.fileSaved:console.warn("fileSaved事件监听即将弃用， 推荐使用fileStatus进行文件状态的监听"),t="fileStatus";break;case EVENT_TYPES.fullscreenChange:t="fullscreenchange";break;case"error":case"fileOpen":r="callback.event"}return{eventName:t,type:r,handle:n}}(e,t),r),n.label=2;case 2:return[2]}})})};return sdkInstance={url:o,iframe:f,version:"1.1.19",iframeReady:!1,tokenData:null,commandBars:null,tabs:{getTabs:function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){switch(e.label){case 0:return[4,p];case 1:return e.sent(),[2,apiBasicChannel({api:"tab.getTabs"})]}})})},switchTab:function(e){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(n){switch(n.label){case 0:return[4,p];case 1:return n.sent(),[2,apiBasicChannel({api:"tab.switchTab",args:{tabKey:e}})]}})})}},setCooperUserColor:function(e){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(n){switch(n.label){case 0:return[4,p];case 1:return n.sent(),[2,apiBasicChannel({api:"setCooperUserColor",args:e})]}})})},setToken:function(e){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(n){switch(n.label){case 0:return[4,p];case 1:return n.sent(),sdkInstance.tokenData=e,sendMsgToWps({eventName:"setToken",data:e}),[2]}})})},ready:function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){switch(e.label){case 0:return m.apiReadySended?[3,2]:[4,v];case 1:e.sent(),m.apiReadySended=!0,sendMsgToWps({eventName:"api.ready"}),e.label=2;case 2:return[4,b];case 3:return e.sent(),[2,new Promise(function(e){return setTimeout(function(){return e(null==sdkInstance?void 0:sdkInstance.Application)},0)})]}})})},destroy:function(){eventRegistry={},f.destroy(),Message.empty(),sdkInstance=null,destroyApplication(),removeFullscreenEventListener(),clearSetterCallbacks()},save:function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){switch(e.label){case 0:return[4,p];case 1:return e.sent(),[2,apiChannelOld({api:"save"})]}})})},setCommandBars:function(e){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(n){switch(n.label){case 0:return[4,p];case 1:return n.sent(),setCommandBars(e),[2]}})})},updateConfig:function(e){return void 0===e&&(e={}),__awaiter(this,void 0,void 0,function(){return __generator(this,function(n){switch(n.label){case 0:return[4,p];case 1:return n.sent(),e.commandBars?(console.warn("Deprecated: `updateConfig()` 方法即将废弃，请使用`setCommandBars()`代替`updateConfig()`更新`commandBars`配置。"),[4,setCommandBars(e.commandBars)]):[3,3];case 2:n.sent(),n.label=3;case 3:return[2]}})})},executeCommandBar:function(e){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(n){switch(n.label){case 0:return[4,p];case 1:return n.sent(),setCommandBars([{cmbId:e,attributes:[{name:"click",value:!0}]}]),[2]}})})},on:function(e,n){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){return[2,this.ApiEvent.AddApiEventListener(e,n)]})})},off:function(e,n){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){return[2,this.ApiEvent.RemoveApiEventListener(e,n)]})})},ApiEvent:{AddApiEventListener:function(e,n){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){switch(t.label){case 0:return[4,w(e,n,"on")];case 1:return[2,t.sent()]}})})},RemoveApiEventListener:function(e,n){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){switch(t.label){case 0:return[4,w(e,n,"off")];case 1:return[2,t.sent()]}})})}}},handleFunctionConfig(t,c,l,u,m,d),listener(sdkInstance,h,t,a,m,f,g),sdkInstance}catch(e){console.error(e)}}function handleFunctionConfig(e,n,t,r,a,i){n&&isFunction(n)&&(a.refreshToken=n,e.refreshToken={eventName:EVENT_NAME.getToken}),i&&isFunction(i)&&(a.getClipboardData=i,e.getClipboardData={eventName:EVENT_NAME.getClipboardData}),t&&isFunction(t)&&(a.onToast=t,e.onToast={eventName:EVENT_NAME.onToast}),r&&isFunction(r)&&(a.onHyperLinkOpen=r,e.onHyperLinkOpen={eventName:EVENT_NAME.onHyperLinkOpen})}function handleParenFullscreenEvent(e,n,t){var r=document.querySelector(t),a=r&&1===r.nodeType?r:n;if(0===e){var i=document;(i.exitFullscreen||i.mozCancelFullScreen||i.msExitFullscreen||i.webkitCancelFullScreen||i.webkitExitFullscreen).call(document)}else if(1===e){(a.requestFullscreen||a.mozRequestFullScreen||a.msRequestFullscreen||a.webkitRequestFullscreen).call(a)}}function handleBrowserViewFullscreen(e,n,t,r){0===e?n.style="position: static; width: "+t.width+"; height: "+t.height:1===e&&(n.style="position: absolute; width: 100%; height: 100%"),r&&dispatchFullScreenChange({status:e})}console.log("WebOfficeSDK JS-SDK V1.1.19");var wps=Object.freeze({__proto__:null,listener:listener,config:config});window.WPS=wps;var config$1=config,index={config:config$1};exports.config=config$1,exports.default=index;
