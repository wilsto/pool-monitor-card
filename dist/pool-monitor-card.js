var PoolMonitorCard=function(e){"use strict";function __decorate(e,s,o,r){var l=arguments.length,p=l<3?s:r===null?r=Object.getOwnPropertyDescriptor(s,o):r,u;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")p=Reflect.decorate(e,s,o,r);else for(var h=e.length-1;h>=0;h--)if(u=e[h])p=(l<3?u(p):l>3?u(s,o,p):u(s,o))||p;return l>3&&p&&Object.defineProperty(s,o,p),p}typeof SuppressedError==="function"?SuppressedError:function(e,s,o){var r=new Error(o);return r.name="SuppressedError",r.error=e,r.suppressed=s,r};const t$2=e=>(s,o)=>{void 0!==o?o.addInitializer(()=>{customElements.define(e,s)}):customElements.define(e,s)};const s=globalThis,o=s.ShadowRoot&&(void 0===s.ShadyCSS||s.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),l=new WeakMap;let p=class n{constructor(e,s,o){if(this._$cssResult$=true,o!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=s}get styleSheet(){let e=this.o;const s=this.t;if(o&&void 0===e){const o=void 0!==s&&1===s.length;o&&(e=l.get(s)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&l.set(s,e))}return e}toString(){return this.cssText}};const r$3=e=>new p("string"==typeof e?e:e+"",void 0,r),i$3=(e,...s)=>{const o=1===e.length?e[0]:s.reduce((s,o,r)=>s+(e=>{if(true===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+e[r+1],e[0]);return new p(o,e,r)},S$1=(e,r)=>{if(o)e.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const o of r){const r=document.createElement("style"),l=s.litNonce;void 0!==l&&r.setAttribute("nonce",l),r.textContent=o.cssText,e.appendChild(r)}},u=o?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let s="";for(const o of e.cssRules)s+=o.cssText;return r$3(s)})(e):e;const{is:h,defineProperty:m,getOwnPropertyDescriptor:g,getOwnPropertyNames:_,getOwnPropertySymbols:v,getPrototypeOf:f}=Object,$=globalThis,b=$.trustedTypes,w=b?b.emptyScript:"",A=$.reactiveElementPolyfillSupport,d$1=(e,s)=>e,C={toAttribute(e,s){switch(s){case Boolean:e=e?w:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,s){let o=e;switch(s){case Boolean:o=null!==e;break;case Number:o=null===e?null:Number(e);break;case Object:case Array:try{o=JSON.parse(e)}catch(e){o=null}}return o}},f$1=(e,s)=>!h(e,s),P={attribute:true,type:String,converter:C,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),$.litPropertyMetadata??=new WeakMap;let E=class y extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,s=P){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(e)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(e,s),!s.noAccessor){const o=Symbol(),r=this.getPropertyDescriptor(e,o,s);void 0!==r&&m(this.prototype,e,r)}}static getPropertyDescriptor(e,s,o){const{get:r,set:l}=g(this.prototype,e)??{get(){return this[s]},set(e){this[s]=e}};return{get:r,set(s){const p=r?.call(this);l?.call(this,s),this.requestUpdate(e,p,o)},configurable:true,enumerable:true}}static getPropertyOptions(e){return this.elementProperties.get(e)??P}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const e=f(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const e=this.properties,s=[..._(e),...v(e)];for(const o of s)this.createProperty(o,e[o])}const e=this[Symbol.metadata];if(null!==e){const s=litPropertyMetadata.get(e);if(void 0!==s)for(const[e,o]of s)this.elementProperties.set(e,o)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const o=this._$Eu(e,s);void 0!==o&&this._$Eh.set(o,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const s=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const e of o)s.unshift(u(e))}else void 0!==e&&s.push(u(e));return s}static _$Eu(e,s){const o=s.attribute;return false===o?void 0:"string"==typeof o?o:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,s=this.constructor.elementProperties;for(const o of s.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,s,o){this._$AK(e,o)}_$ET(e,s){const o=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,o);if(void 0!==r&&true===o.reflect){const l=(void 0!==o.converter?.toAttribute?o.converter:C).toAttribute(s,o.type);this._$Em=e,null==l?this.removeAttribute(r):this.setAttribute(r,l),this._$Em=null}}_$AK(e,s){const o=this.constructor,r=o._$Eh.get(e);if(void 0!==r&&this._$Em!==r){const e=o.getPropertyOptions(r),l="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:C;this._$Em=r;const p=l.fromAttribute(s,e.type);this[r]=p??this._$Ej?.get(r)??p,this._$Em=null}}requestUpdate(e,s,o,r=false,l){if(void 0!==e){const p=this.constructor;if(false===r&&(l=this[e]),o??=p.getPropertyOptions(e),!((o.hasChanged??f$1)(l,s)||o.useDefault&&o.reflect&&l===this._$Ej?.get(e)&&!this.hasAttribute(p._$Eu(e,o))))return;this.C(e,s,o)}false===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,s,{useDefault:o,reflect:r,wrapped:l},p){o&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,p??s??this[e]),true!==l||void 0!==p)||(this._$AL.has(e)||(this.hasUpdated||o||(s=void 0),this._$AL.set(e,s)),true===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=true;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,s]of this._$Ep)this[e]=s;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[s,o]of e){const{wrapped:e}=o,r=this[s];true!==e||this._$AL.has(s)||void 0===r||this.C(s,void 0,o,r)}}let e=false;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(s)):this._$EM()}catch(s){throw e=false,this._$EM(),s}e&&this._$AE(s)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=false}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return true}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};E.elementStyles=[],E.shadowRootOptions={mode:"open"},E[d$1("elementProperties")]=new Map,E[d$1("finalized")]=new Map,A?.({ReactiveElement:E}),($.reactiveElementVersions??=[]).push("2.1.2");const T={attribute:true,type:String,converter:C,reflect:false,hasChanged:f$1},r$1=(e=T,s,o)=>{const{kind:r,metadata:l}=o;let p=globalThis.litPropertyMetadata.get(l);if(void 0===p&&globalThis.litPropertyMetadata.set(l,p=new Map),"setter"===r&&((e=Object.create(e)).wrapped=true),p.set(o.name,e),"accessor"===r){const{name:r}=o;return{set(o){const l=s.get.call(this);s.set.call(this,o),this.requestUpdate(r,l,e,true,o)},init(s){return void 0!==s&&this.C(r,void 0,e,s),s}}}if("setter"===r){const{name:r}=o;return function(o){const l=this[r];s.call(this,o),this.requestUpdate(r,l,e,true,o)}}throw Error("Unsupported decorator location: "+r)};function n$1(e){return(s,o)=>"object"==typeof o?r$1(e,s,o):((e,s,o)=>{const r=s.hasOwnProperty(o);return s.constructor.createProperty(o,e),r?Object.getOwnPropertyDescriptor(s,o):void 0})(e,s,o)}const O=globalThis,i$1=e=>e,j=O.trustedTypes,U=j?j.createPolicy("lit-html",{createHTML:e=>e}):void 0,F="$lit$",B=`lit$${Math.random().toFixed(9).slice(2)}$`,W="?"+B,q=`<${W}>`,G=document,c=()=>G.createComment(""),a=e=>null===e||"object"!=typeof e&&"function"!=typeof e,K=Array.isArray,d=e=>K(e)||"function"==typeof e?.[Symbol.iterator],J="[ \t\n\f\r]",X=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Y=/-->/g,Q=/>/g,tt=RegExp(`>|${J}(?:([^\\s"'>=/]+)(${J}*=${J}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),et=/'/g,it=/"/g,st=/^(?:script|style|textarea|title)$/i,x=e=>(s,...o)=>({_$litType$:e,strings:s,values:o}),ot=x(1),rt=Symbol.for("lit-noChange"),at=Symbol.for("lit-nothing"),nt=new WeakMap,lt=G.createTreeWalker(G,129);function V(e,s){if(!K(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==U?U.createHTML(s):s}const N=(e,s)=>{const o=e.length-1,r=[];let l,p=2===s?"<svg>":3===s?"<math>":"",u=X;for(let s=0;s<o;s++){const o=e[s];let h,m,g=-1,_=0;for(;_<o.length&&(u.lastIndex=_,m=u.exec(o),null!==m);)_=u.lastIndex,u===X?"!--"===m[1]?u=Y:void 0!==m[1]?u=Q:void 0!==m[2]?(st.test(m[2])&&(l=RegExp("</"+m[2],"g")),u=tt):void 0!==m[3]&&(u=tt):u===tt?">"===m[0]?(u=l??X,g=-1):void 0===m[1]?g=-2:(g=u.lastIndex-m[2].length,h=m[1],u=void 0===m[3]?tt:'"'===m[3]?it:et):u===it||u===et?u=tt:u===Y||u===Q?u=X:(u=tt,l=void 0);const v=u===tt&&e[s+1].startsWith("/>")?" ":"";p+=u===X?o+q:g>=0?(r.push(h),o.slice(0,g)+F+o.slice(g)+B+v):o+B+(-2===g?s:v)}return[V(e,p+(e[o]||"<?>")+(2===s?"</svg>":3===s?"</math>":"")),r]};class S{constructor({strings:e,_$litType$:s},o){let r;this.parts=[];let l=0,p=0;const u=e.length-1,h=this.parts,[m,g]=N(e,s);if(this.el=S.createElement(m,o),lt.currentNode=this.el.content,2===s||3===s){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(r=lt.nextNode())&&h.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const e of r.getAttributeNames())if(e.endsWith(F)){const s=g[p++],o=r.getAttribute(e).split(B),u=/([.?@])?(.*)/.exec(s);h.push({type:1,index:l,name:u[2],strings:o,ctor:"."===u[1]?I:"?"===u[1]?L:"@"===u[1]?z:H}),r.removeAttribute(e)}else e.startsWith(B)&&(h.push({type:6,index:l}),r.removeAttribute(e));if(st.test(r.tagName)){const e=r.textContent.split(B),s=e.length-1;if(s>0){r.textContent=j?j.emptyScript:"";for(let o=0;o<s;o++)r.append(e[o],c()),lt.nextNode(),h.push({type:2,index:++l});r.append(e[s],c())}}}else if(8===r.nodeType)if(r.data===W)h.push({type:2,index:l});else{let e=-1;for(;-1!==(e=r.data.indexOf(B,e+1));)h.push({type:7,index:l}),e+=B.length-1}l++}}static createElement(e,s){const o=G.createElement("template");return o.innerHTML=e,o}}function M(e,s,o=e,r){if(s===rt)return s;let l=void 0!==r?o._$Co?.[r]:o._$Cl;const p=a(s)?void 0:s._$litDirective$;return l?.constructor!==p&&(l?._$AO?.(false),void 0===p?l=void 0:(l=new p(e),l._$AT(e,o,r)),void 0!==r?(o._$Co??=[])[r]=l:o._$Cl=l),void 0!==l&&(s=M(e,l._$AS(e,s.values),l,r)),s}class R{constructor(e,s){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=s}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:s},parts:o}=this._$AD,r=(e?.creationScope??G).importNode(s,true);lt.currentNode=r;let l=lt.nextNode(),p=0,u=0,h=o[0];for(;void 0!==h;){if(p===h.index){let s;2===h.type?s=new k(l,l.nextSibling,this,e):1===h.type?s=new h.ctor(l,h.name,h.strings,this,e):6===h.type&&(s=new Z(l,this,e)),this._$AV.push(s),h=o[++u]}p!==h?.index&&(l=lt.nextNode(),p++)}return lt.currentNode=G,r}p(e){let s=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(e,o,s),s+=o.strings.length-2):o._$AI(e[s])),s++}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,s,o,r){this.type=2,this._$AH=at,this._$AN=void 0,this._$AA=e,this._$AB=s,this._$AM=o,this.options=r,this._$Cv=r?.isConnected??true}get parentNode(){let e=this._$AA.parentNode;const s=this._$AM;return void 0!==s&&11===e?.nodeType&&(e=s.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,s=this){e=M(this,e,s),a(e)?e===at||null==e||""===e?(this._$AH!==at&&this._$AR(),this._$AH=at):e!==this._$AH&&e!==rt&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):d(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==at&&a(this._$AH)?this._$AA.nextSibling.data=e:this.T(G.createTextNode(e)),this._$AH=e}$(e){const{values:s,_$litType$:o}=e,r="number"==typeof o?this._$AC(e):(void 0===o.el&&(o.el=S.createElement(V(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===r)this._$AH.p(s);else{const e=new R(r,this),o=e.u(this.options);e.p(s),this.T(o),this._$AH=e}}_$AC(e){let s=nt.get(e.strings);return void 0===s&&nt.set(e.strings,s=new S(e)),s}k(e){K(this._$AH)||(this._$AH=[],this._$AR());const s=this._$AH;let o,r=0;for(const l of e)r===s.length?s.push(o=new k(this.O(c()),this.O(c()),this,this.options)):o=s[r],o._$AI(l),r++;r<s.length&&(this._$AR(o&&o._$AB.nextSibling,r),s.length=r)}_$AR(e=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);e!==this._$AB;){const s=i$1(e).nextSibling;i$1(e).remove(),e=s}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,s,o,r,l){this.type=1,this._$AH=at,this._$AN=void 0,this.element=e,this.name=s,this._$AM=r,this.options=l,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=at}_$AI(e,s=this,o,r){const l=this.strings;let p=false;if(void 0===l)e=M(this,e,s,0),p=!a(e)||e!==this._$AH&&e!==rt,p&&(this._$AH=e);else{const r=e;let u,h;for(e=l[0],u=0;u<l.length-1;u++)h=M(this,r[o+u],s,u),h===rt&&(h=this._$AH[u]),p||=!a(h)||h!==this._$AH[u],h===at?e=at:e!==at&&(e+=(h??"")+l[u+1]),this._$AH[u]=h}p&&!r&&this.j(e)}j(e){e===at?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class I extends H{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===at?void 0:e}}class L extends H{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==at)}}class z extends H{constructor(e,s,o,r,l){super(e,s,o,r,l),this.type=5}_$AI(e,s=this){if((e=M(this,e,s,0)??at)===rt)return;const o=this._$AH,r=e===at&&o!==at||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,l=e!==at&&(o===at||r);r&&this.element.removeEventListener(this.name,this,o),l&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class Z{constructor(e,s,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=s,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){M(this,e)}}const ct=O.litHtmlPolyfillSupport;ct?.(S,k),(O.litHtmlVersions??=[]).push("3.3.2");const D=(e,s,o)=>{const r=o?.renderBefore??s;let l=r._$litPart$;if(void 0===l){const e=o?.renderBefore??null;r._$litPart$=l=new k(s.insertBefore(c(),e),e,void 0,o??{})}return l._$AI(e),l};const dt=globalThis;class i extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const s=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=D(s,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false)}render(){return rt}}i._$litElement$=true,i["finalized"]=true,dt.litElementHydrateSupport?.({LitElement:i});const pt=dt.litElementPolyfillSupport;pt?.({LitElement:i});(dt.litElementVersions??=[]).push("4.2.2");const ut={state:{1:"Too Low",2:"Acceptable Low",3:"Ideal",4:"Ideal",5:"Acceptable High",6:"Too High"},sensor:{temperature:"Temperature",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinity",cya:"Cyanuric Acid",calcium:"Calcium",phosphate:"Phosphate",alkalinity:"Alkalinity",free_chlorine:"Free Chlorine",total_chlorine:"Total Chlorine",pressure:"Filter Pressure",specific_gravity:"Specific Gravity",magnesium:"Magnesium",water_level:"Water Level",flow_rate:"Flow Rate",uv_radiation:"UV Radiation",product_volume:"Product Volume",product_weight:"Product Weight",ec:"Electrical Conductivity",bromine:"Bromine"},time:{seconds:"just now",minutes:"{minutes} minute ago",hours:"{hours} hour ago",days:"{days} day ago"},time_plural:{seconds:"just now",minutes:"{minutes} minutes ago",hours:"{hours} hours ago",days:"{days} days ago"}};const ht={state:{1:"Trop bas",2:"Acceptable bas",3:"Idéal",4:"Idéal",5:"Acceptable élevé",6:"Trop élevé"},sensor:{temperature:"Température",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinité",cya:"Acide cyanurique",calcium:"Calcium",phosphate:"Phosphate",alkalinity:"Alcalinité",free_chlorine:"Chlore libre",total_chlorine:"Chlore total",pressure:"Pression du filtre",specific_gravity:"Densité spécifique",magnesium:"Magnésium",water_level:"Niveau d'eau",flow_rate:"Débit",uv_radiation:"Radiation UV",product_volume:"Volume Produit",product_weight:"Poids Produit",ec:"Conductivité Électrique",bromine:"Brome"},time:{seconds:"à l'instant",minutes:"il y a {minutes} minute",hours:"il y a {hours} heure",days:"il y a {days} jour"},time_plural:{seconds:"à l'instant",minutes:"il y a {minutes} minutes",hours:"il y a {hours} heures",days:"il y a {days} jours"}};const mt={state:{1:"Demasiado bajo",2:"Aceptable bajo",3:"Perfecto",4:"Perfecto",5:"Aceptable alto",6:"Demasiado alto"},sensor:{temperature:"Temperatura",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinidad",cya:"Acido cianúrico",calcium:"Calcio",phosphate:"Fosfato",alkalinity:"Alcalinidad",free_chlorine:"Cloro libre",total_chlorine:"Cloro total",pressure:"Pressione du filter relativa",specific_gravity:"Densidad relativa",magnesium:"Magnesio",water_level:"Nivel de agua",flow_rate:"Caudal",uv_radiation:"Radiación UV",product_volume:"Volumen Producto",product_weight:"Peso Producto",ec:"Conductividad Eléctrica",bromine:"Bromo"},time:{seconds:"justo ahora",minutes:"hace {minutes} minuto",hours:"hace {hours} hora",days:"hace {days} día"},time_plural:{seconds:"justo ahora",minutes:"hace {minutes} minutos",hours:"hace {hours} horas",days:"hace {days} días"}};const gt={state:{1:"Zu niedrig",2:"Akzeptabler Tiefstwert",3:"Ideal",4:"Ideal",5:"Akzeptabler Hochwert",6:"Zu hoch"},sensor:{temperature:"Temperatur",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salzgehalt",cya:"Cyanursäure",calcium:"Kalzium",phosphate:"Phosphat",alkalinity:"Alkalinität",free_chlorine:"Freies Chlor",total_chlorine:"Gesamtchlor",pressure:"Sandfilterdruck",specific_gravity:"Spezifisches Gewicht",magnesium:"Magnesium",water_level:"Wasserstand",flow_rate:"Durchfluss",uv_radiation:"UV-Strahlung",product_volume:"Produktvolumen",product_weight:"Produktgewicht",ec:"Elektrische Leitfähigkeit",bromine:"Brom"},time:{seconds:"gerade erst",minutes:"vor {minutes} Minute",hours:"vor {hours} Stunde",days:"vor {days} Tag"},time_plural:{seconds:"gerade erst",minutes:"vor {minutes} Minuten",hours:"vor {hours} Stunden",days:"vor {days} Tagen"}};const _t={state:{1:"Troppo basso",2:"Accettabile basso",3:"Ideale",4:"Ideale",5:"Accettabile alto",6:"Troppo alto"},sensor:{temperature:"Temperatura",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinità",cya:"Acido cianurico",calcium:"Calcio",phosphate:"Fosfato",alkalinity:"Alcalinità",free_chlorine:"Cloro libero",total_chlorine:"Cloro totale",pressure:"Pressione filtro",specific_gravity:"Gravità specifica",magnesium:"Magnesio",water_level:"Livello dell'acqua",flow_rate:"Portata",uv_radiation:"Radiazione UV",product_volume:"Volume prodotto",product_weight:"Peso prodotto",ec:"Conducibilità Elettrica",bromine:"Bromo"},time:{seconds:"proprio ora",minutes:"{minutes} minuto fa",hours:"{hours} ora fa",days:"{days} giorno fa"},time_plural:{seconds:"proprio ora",minutes:"{minutes} minuti fa",hours:"{hours} ore fa",days:"{days} giorni fa"}};const vt={state:{1:"Te laag",2:"Acceptabel laag",3:"Ideaal",4:"Ideaal",5:"Acceptabel hoog",6:"Te hoog"},sensor:{temperature:"Temperatuur",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Zoutgehalte",cya:"Cyanuurzuur",calcium:"Calcium",phosphate:"Fosfaat",alkalinity:"Alkaliteit",free_chlorine:"Vrij chloor",total_chlorine:"Totaal chloor",pressure:"Filterdruk",specific_gravity:"Soortelijk gewicht",magnesium:"Magnesium",water_level:"Waterniveau",flow_rate:"Debiet",uv_radiation:"UV-straling",product_volume:"Productvolume",product_weight:"Productgewicht",ec:"Elektrische Geleidbaarheid",bromine:"Broom"},time:{seconds:"zojuist",minutes:"{minutes} minuut geleden",hours:"{hours} uur geleden",days:"{days} dag geleden"},time_plural:{seconds:"zojuist",minutes:"{minutes} minuten geleden",hours:"{hours} uur geleden",days:"{days} dagen geleden"}};const yt={state:{1:"Muito Baixo",2:"Torelavel mas Baixo",3:"Ideal",4:"Ideal",5:"Toleravel mas Alto",6:"Muito Alto"},sensor:{temperature:"Temperatura",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinidade",cya:"Ácido cianúrico",calcium:"Calcio",phosphate:"Fosfato",alkalinity:"Alcalinidade",free_chlorine:"Cloro livres",total_chlorine:"Cloro total",pressure:"Pressão do filtro",specific_gravity:"Gravidade específica",magnesium:"Magnésio",water_level:"Nivel de agua",flow_rate:"Caudal",uv_radiation:"Radiação UV",product_volume:"Volume Produto",product_weight:"Peso Produto",ec:"Condutividade Elétrica",bromine:"Bromo"},time:{seconds:"agora mesmo",minutes:"há {minutes} minuto",hours:"há {hours} hora",days:"há {days} dia"},time_plural:{seconds:"agora mesmo",minutes:"há {minutes} minutos",hours:"há {hours} horas",days:"há {days} dias"}};const ft={state:{1:"Muito Baixo",2:"Aceitavel Baixo",3:"Ideal",4:"Ideal",5:"Aceitavel Alto",6:"Muito Alto"},sensor:{temperature:"Temperatura",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinidade",cya:"Acido Cianurico",calcium:"Calcio",phosphate:"Fosfato",alkalinity:"Alcalinidade",free_chlorine:"Cloro Livre",total_chlorine:"Cloro Total",pressure:"Pressão no Filtro",specific_gravity:"Gravidade específica",magnesium:"Magnésio",water_level:"Nivel de agua",flow_rate:"Caudal",uv_radiation:"Radiação UV",product_volume:"Volume Produto",product_weight:"Peso Produto",ec:"Condutividade Elétrica",bromine:"Bromo"},time:{seconds:"agora mesmo",minutes:"há {minutes} minuto",hours:"há {hours} hora",days:"há {days} dia"},time_plural:{seconds:"agora mesmo",minutes:"há {minutes} minutos",hours:"há {hours} horas",days:"há {days} dias"}};const $t={state:{1:"Prea mic",2:"Mic",3:"Ideal",4:"Ideal",5:"Mare",6:"Prea mare"},sensor:{temperature:"Temperatură",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinitate",cya:"Acid cianuric",calcium:"Calciu",phosphate:"Fosfat",alkalinity:"Alcalinitate",free_chlorine:"Clor liber",total_chlorine:"Clor total",pressure:"Presiune filtru",specific_gravity:"Greutate specifică",magnesium:"Magneziu",water_level:"Nivel apă",flow_rate:"Debit",uv_radiation:"Radiație UV",product_volume:"Volum produs",product_weight:"Greutate produs",ec:"Conductivitate Electrică",bromine:"Brom"},time:{seconds:"chiar acum",minutes:"acum {minutes} minut",hours:"acum {hours} oră",days:"acum {days} zi"},time_plural:{seconds:"chiar acum",minutes:"acum {minutes} minute",hours:"acum {hours} ore",days:"acum {days} zile"}};const bt={state:{1:"Príliš nízky",2:"Akceptovateľne nízky",3:"Ideálny",4:"Ideálny",5:"Akceptovateľne vysoký",6:"Príliš vysoký"},sensor:{temperature:"Teplota",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinita",cya:"Kyselina kyanurová",calcium:"Vápnik",phosphate:"Fosfát",alkalinity:"Alkalinita",free_chlorine:"Voľný chlór",total_chlorine:"Celkový chlór",pressure:"Tlak filtra",specific_gravity:"Špecifická hmotnosť",magnesium:"Magnézium",water_level:"Úroveň vody",flow_rate:"Prietok",uv_radiation:"UV žiarenie",product_volume:"Objem produktu",product_weight:"Hmotnosť produktu",ec:"Elektrická Vodivosť",bromine:"Bróm"},time:{seconds:"práve teraz",minutes:"pred {minutes} minútou",hours:"pred {hours} hodinou",days:"pred {days} dňom"},time_plural:{seconds:"práve teraz",minutes:"pred {minutes} minútami",hours:"pred {hours} hodinami",days:"pred {days} dňami"}};const xt={state:{1:"נמוך מדי",2:"נמוך מאוד",3:"אידיאלי",4:"אידיאלי",5:"גבוה מאוד",6:"גבוה מדי"},sensor:{temperature:"טמפרטורה",ph:"PH",orp:"ORP",tds:"TDS",salinity:"מליחות",cya:"חומצה ציאנורית",calcium:"סידן",phosphate:"פוספט",alkalinity:"אלקליניות",free_chlorine:"כלור חופשי",total_chlorine:"כלור כולל",pressure:"לחץ מסנן",specific_gravity:"משקל סגולי",magnesium:"מגנזיום",water_level:"מפלס מים",flow_rate:"קצב זרימה",uv_radiation:"קרינת UV",product_volume:"נפח מוצר",product_weight:"משקל מוצר",ec:"מוליכות חשמלית",bromine:"ברום"},time:{seconds:"כרגע",minutes:"לפני {minutes} דקה",hours:"לפני {hours} שעה",days:"לפני {days} יום"},time_plural:{seconds:"כרגע",minutes:"לפני {minutes} דקות",hours:"לפני {hours} שעות",days:"לפני {days} ימים"}};const wt={state:{1:"Слишком низкий",2:"Приемлемо низкий",3:"Идеальный",4:"Идеальный",5:"Приемлемо высокий",6:"Слишком высокий"},sensor:{temperature:"Температура",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Соленость",cya:"Циануровая кислота",calcium:"Кальций",phosphate:"Фосфаты",alkalinity:"Щелочность",free_chlorine:"Свободный хлор",total_chlorine:"Общий хлор",pressure:"Давление фильтра",specific_gravity:"Удельный вес",magnesium:"Магний",water_level:"Уровень воды",flow_rate:"Расход воды",uv_radiation:"УФ-излучение",product_volume:"Объем продукта",product_weight:"Вес продукта",ec:"Электропроводность",bromine:"Бром"},time:{seconds:"только что",minutes:"{minutes} минуту назад",hours:"{hours} час назад",days:"{days} день назад"},time_plural:{seconds:"только что",minutes:"{minutes} минут назад",hours:"{hours} часов назад",days:"{days} дней назад"}};const At={state:{1:"Túl alacsony",2:"Elfogadhatóan alacsony",3:"Ideális",4:"Ideális",5:"Elfogadhatóan magas",6:"Túl magas"},sensor:{temperature:"Hőmérséklet",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Sótartalom",cya:"Cianursav",calcium:"Kalcium",phosphate:"Foszfát",alkalinity:"Lúgosság",free_chlorine:"Szabad klór",total_chlorine:"Összes klór",pressure:"Szűrő nyomás",specific_gravity:"Fajsúly",magnesium:"Magnézium",water_level:"Vízszint",flow_rate:"Áramlási sebesség",uv_radiation:"UV sugárzás",product_volume:"Termék térfogat",product_weight:"Termék tömeg",ec:"Elektromos vezetőképesség",bromine:"Bróm"},time:{seconds:"éppen most",minutes:"{minutes} perce",hours:"{hours} órája",days:"{days} napja"},time_plural:{seconds:"éppen most",minutes:"{minutes} perce",hours:"{hours} órája",days:"{days} napja"}};const kt={state:{1:"För Lågt",2:"Lågt, Acceptabelt",3:"Idealt",4:"Idealt",5:"Högt, Acceptabelt",6:"För Högt"},sensor:{temperature:"Temperatur",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salthalt",cya:"Cyanursyra",calcium:"Kalcium",phosphate:"Fosfat",alkalinity:"Alkalinitet",free_chlorine:"Klor Fritt",total_chlorine:"Klor Total",pressure:"Tryck Filter",specific_gravity:"Densitet",magnesium:"Magnesium",water_level:"Vattennivå",flow_rate:"Flödeshastighet",uv_radiation:"UV-Strålning",product_volume:"Produkt Volym",product_weight:"Produkt Vikt",ec:"Elektrisk Ledningsförmåga",bromine:"Brom"},time:{seconds:"nu",minutes:"{minutes} minut tillbaka",hours:"{hours} timme tillbaka",days:"{days} dag tillbaka"},time_plural:{seconds:"nu",minutes:"{minutes} minuter tillbaka",hours:"{hours} timmar tillbaka",days:"{days} dagar tillbaka"}};const St={state:{1:"Příliš nízká",2:"Přijatelně nízká",3:"Ideální",4:"Ideální",5:"Přijatelně vysoká",6:"Příliš vysoká"},sensor:{temperature:"Teplota",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinita",cya:"Kyselina kyanurová",calcium:"Vápník",phosphate:"Fosfát",alkalinity:"Alkalita",free_chlorine:"Volný chlór",total_chlorine:"Celkový chlór",pressure:"Tlak filtrace",specific_gravity:"Měrná hmotnost",magnesium:"Hořčík",water_level:"Hladina vody",flow_rate:"Průtok",uv_radiation:"UV záření",product_volume:"Objem přípravku",product_weight:"Hmotnost přípravku",ec:"Elektrická vodivost",bromine:"Brom"},time:{seconds:"právě nyní",minutes:"před {minutes} minutou",hours:"před {hours} hodinou",days:"před {days} dnem"},time_plural:{seconds:"právě nyní",minutes:"před {minutes} minutami",hours:"před {hours} hodinami",days:"před {days} dny"}};const Ct={en:ut,fr:ht,es:mt,de:gt,it:_t,nl:vt,pt:yt,"pt-br":ft,ro:$t,sk:bt,he:xt,ru:wt,hu:At,sv:kt,cs:St};const getTranslation=(e,s)=>{const o=s.split(".");let r=Ct[e]||Ct.en;for(const e of o)if(r&&typeof r==="object")r=r[e];else return s;return r||s};const formatTranslation=(e,s)=>{if(!s)return e;return Object.entries(s).reduce((e,[s,o])=>e.replace(`{${s}}`,String(o)),e)};const Pt=i$3`
  /** Host element styles */
  :host {
    background: var(--ha-card-background, var(--card-background-color, white));
    border-radius: var(--ha-card-border-radius, 12px);
    border-width: var(--ha-card-border-width, 4px);
    box-shadow: var(--ha-card-box-shadow);
    color: var(--primary-text-color);
    display: block;
    transition: all 0.3s ease-out 0s;
    position: relative;
    padding-top: 25px;
  }

  /** Section layouts */
  .section {
    padding-bottom: 10px;
    padding: 0px;
  }

  .section-compact {
    padding-bottom: 5px;
    padding: 0px;
  }

  /** Title styles */
  .pool-monitor-title {
    font-size: 1.5rem;
    font-weight: 500;
    padding-left: 15px;
    padding-bottom: 15px;
    margin: 0;
  }

  /** Entity image container */
  .pool-monitor-entity-img {
    text-align: right;
    width: 10%;
    float: left;
  }

  /** Main container layouts */
  .pool-monitor-container {
    display: grid;
    padding: 5px;
    height: 15px;
  }

  .pool-monitor-container-values {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    padding-top: 0px;
    padding-left: 20px;
    margin-top: -10px;
  }

  .pool-monitor-container-marker {
    display: grid;
    grid-template-columns: 10% repeat(6, 1fr) 5%;
    padding: 10px;
    grid-template-rows: 15px;
    line-height: 15px;
    position: relative;
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    padding: 0;
    grid-template-rows: 15px;
    line-height: 15px;
    position: relative;
    margin: 0px;
  }

  .pool-monitor-container-marker .marker {
    text-align: center;
    justify-self: center;
    min-width: 80px;
    height: 20px;
    padding-top: 5px;
    border-radius: 5px;
    position: absolute;
    z-index: 1;
    transform: translateX(-50%);
    white-space: nowrap;
    padding-left: 5px;
    padding-right: 5px;
  }

  .pool-monitor-container-marker .marker-state {
    width: 60px;
    position: absolute;
    z-index: 1;
  }

  .pool-monitor-container-marker .triangle {
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    position: absolute;
    bottom: 0px;
    transform: translateX(-50%);
  }

  .grid-item {
    padding: 7px 0;
    margin: 0;
  }

  .grid-item-text-box {
    font-size: 0.8em;
    text-align: center;
    font-weight: 700;
  }

  .item-row {
    grid-row: 1;
  }

  .cursor {
    text-align: center;
    justify-self: center;
    font-size: 13px;
    font-weight: 600;
    color: black;
    position: absolute;
    z-index: 1;
  }

  .cursor-text {
    position: absolute;
    width: 200px;
    height: 17px;
    padding-left: 3px;
    padding-right: 3px;
    padding-top: 0px;
    margin-top: -1px;
    font-size: 11px;
    font-weight: 500;
    text-align: right;
    color: black;
    justify-self: right;
    z-index: 1;
  }

  .progress-bar-child {
    height: 100%;
    width: 100%;
    border-radius: 5px;
  }

  .sensor-monitor-container {
    position: relative;
    height: 20px;
    margin: 0px 0px 0px 0px;
    border-radius: 5px;
    overflow: hidden;
  }

  .warning-message {
    background-color: var(--warning-color, rgba(255, 152, 0, 0.1));
    border-left: 4px solid var(--warning-color, #ff9800);
    border-radius: 4px;
    padding: 12px 16px;
    margin: 8px 0;
    color: var(--warning-text-color, var(--primary-text-color));
    font-size: 0.95em;
    line-height: 1.4;
    display: flex;
    align-items: center;
    animation: fadeIn 0.3s ease-in-out;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .warning-message ha-icon {
    color: var(--warning-color, #ff9800);
    margin-right: 12px;
    flex-shrink: 0;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;class cardContent{static generateTitle(e){const s=e.title!==void 0?ot` <h1 class="pool-monitor-title">${e.title}</h1> `:ot``;return ot`${s}`}static generateBody(e,s){if(!s)return ot` <div class="warning-message">No sensor data available</div> `;return ot`
      <!-- ##### ${s.name} section ##### -->
      <div class="section" @click=${()=>cardContent._moreinfo(s.entity)}>
        <div class="pool-monitor-container-marker">
          <div
            class="marker"
            style="background-color: ${s.color} ;color: black;left: ${s.pct_marker}%;"
          >
            ${s.value} ${s.unit}
          </div>
          <div
            class="marker-state"
            style="font-size: 0.8em; padding-top: 5px;color:${s.color};width: 200px;padding-${s.side_align}:40px;text-align:${s.side_align};background-color:transparent ;${s.side_align}: ${s.pct_state_step}%;"
          >
            ${s.state}
          </div>
          <div
            class="triangle"
            style="border-top: 10px solid ${s.color} ;left: ${s.pct_marker}%;"
          ></div>
        </div>
        ${!s.hide_icon?ot`
              <div class="pool-monitor-entity-img">
                ${s.is_mdi?ot`
                      <ha-icon icon="${s.mdi_icon}" style="width: 32px; height: 32px;"></ha-icon>
                    `:ot` <img src="${s.img_src}" style="width: 32px; height: 32px;" /> `}
              </div>
            `:""}
        <div class="pool-monitor-container">
          ${e.display.gradient?ot`
                <div
                  class="progress-bar-child"
                  style="background: linear-gradient(to right,
              ${s.mode==="heatflow"?`${e.colors.cool} 15%,\n                 ${e.colors.low} 50%,\n                 ${e.colors.warn} 85%`:`${e.colors.warn} 5%,\n                 ${e.colors.low} 30%,\n                 ${e.colors.normal},\n                 ${e.colors.normal},\n                 ${e.colors.low} 70%,\n                 ${e.colors.warn} 95%`}
            );"
                ></div>
              `:ot`
                <div class="grid-container">
                  <div
                    style="background-color: ${e.colors.warn}; grid-column: 1; border-radius: 5px 0px 0px 5px"
                    class="grid-item item-row"
                  ></div>
                  <div
                    style="background-color: ${e.colors.low}; grid-column: 2;"
                    class="grid-item item-row"
                  ></div>
                  <div
                    style="background-color: ${e.colors.normal}; grid-column: 3;"
                    class="grid-item item-row"
                  ></div>
                  <div
                    style="background-color: ${e.colors.normal}; grid-column: 4;"
                    class="grid-item item-row"
                  ></div>
                  <div
                    style="background-color: ${e.colors.low}; grid-column: 5;"
                    class="grid-item item-row"
                  ></div>
                  <div
                    style="background-color: ${e.colors.warn}; grid-column: 6; border-radius: 0px 5px 5px 0px;"
                    class="grid-item item-row"
                  ></div>
                </div>
                <div
                  style="display: flex; justify-content: space-between; margin: 0 10px; font-size: 0.7em; color: var(--secondary-text-color);"
                >
                  <span>${s.min}</span>
                  <span>${s.max}</span>
                </div>
              `}
          ${s.pct_min!==s.pct_cursor?ot`<div
                class="cursor-text"
                style="border-left: 2px solid ${e.colors.hi_low}; border-top: 2px solid ${e.colors.hi_low}; border-bottom: 2px solid ${e.colors.hi_low}; width: 2px; height: 12px; text-align:${s.side_align}; background-color:transparent; ${s.side_align}: ${s.pct_min}%;"
              ></div>`:""}
          ${s.pct_max!==s.pct_cursor?ot`<div
                class="cursor-text"
                style="border-right: 2px solid ${e.colors.hi_low}; border-top: 2px solid ${e.colors.hi_low}; border-bottom: 2px solid ${e.colors.hi_low}; width: 2px; height: 12px; text-align:${s.side_align}; background-color:transparent; ${s.side_align}: ${s.pct_max}%;"
              ></div>`:""}
        </div>
        <div class="pool-monitor-container-values">
          <div
            style="background-color: transparent; grid-column: 1 ; border-radius: 5px 0px 0px 5px"
            class="grid-item item-row"
          >
            <div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">
              ${s.setpoint_class[0]}
            </div>
          </div>
          <div style="background-color: transparent; grid-column: 2 ;" class="grid-item item-row">
            <div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">
              ${s.setpoint_class[1]}
            </div>
          </div>
          <div style="background-color: transparent; grid-column: 3 ;" class="grid-item item-row">
            <div
              style="font-size: 0.8em;color:${e.colors.normal};text-align:right;margin:-5px 2px 0 0 "
            >
              ${s.setpoint_class[2]}
            </div>
          </div>
          <div style="background-color: transparent; grid-column: 4 ;" class="grid-item item-row">
            <div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">
              ${s.setpoint_class[3]}
            </div>
          </div>
          <div style="background-color: transparent; grid-column: 5 ;" class="grid-item item-row">
            <div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">
              ${s.setpoint_class[4]}
            </div>
          </div>
          <div
            style="background-color: transparent; grid-column: 6 ; border-radius: 0px 5px 5px 0px;"
            class="grid-item item-row"
          ></div>
        </div>
      </div>
      <div style="text-align:left;padding-left:15px;">
        ${s.title}<br /><small style="position: relative;top:-5px;font-size:9px;color:lightgrey"
          >${s.last_updated}</small
        >
      </div>
    `}static generateCompactBody(e,s){if(!s)return ot` <div class="warning-message">No sensor data available</div> `;return ot`
      <!-- ##### ${s.name} section ##### -->
      <div class="section-compact" @click=${()=>cardContent._moreinfo(s.entity)}>
        ${!s.hide_icon?ot`
              <div class="pool-monitor-entity-img">
                ${s.is_mdi?ot`
                      <ha-icon icon="${s.mdi_icon}" style="width: 24px; height: 24px;"></ha-icon>
                    `:ot` <img src="${s.img_src}" style="width: 24px; height: 24px;" /> `}
              </div>
            `:""}
        <div class="pool-monitor-container">
          ${e.display.gradient?ot`
                <div
                  class="progress-bar-child"
                  style="background: linear-gradient(to right,
              ${s.mode==="heatflow"?`${e.colors.cool} 15%,\n                 ${e.colors.low} 50%,\n                 ${e.colors.warn} 85%`:`${e.colors.warn} 5%,\n                 ${e.colors.low} 30%,\n                 ${e.colors.normal},\n                 ${e.colors.normal},\n                 ${e.colors.low} 70%,\n                 ${e.colors.warn} 95%`}
            );"
                ></div>
              `:ot`
                <div class="grid-container">
                  <div
                    style="background-color: ${e.colors.warn}; grid-column: 1; border-radius: 5px 0px 0px 5px"
                    class="grid-item item-row"
                  ></div>
                  <div
                    style="background-color: ${e.colors.low}; grid-column: 2;"
                    class="grid-item item-row"
                  ></div>
                  <div
                    style="background-color: ${e.colors.normal}; grid-column: 3;"
                    class="grid-item item-row"
                  ></div>
                  <div
                    style="background-color: ${e.colors.normal}; grid-column: 4;"
                    class="grid-item item-row"
                  ></div>
                  <div
                    style="background-color: ${e.colors.low}; grid-column: 5;"
                    class="grid-item item-row"
                  ></div>
                  <div
                    style="background-color: ${e.colors.warn}; grid-column: 6; border-radius: 0px 5px 5px 0px;"
                    class="grid-item item-row"
                  ></div>
                </div>
                <div
                  style="display: flex; justify-content: space-between; margin: 0 10px; font-size: 0.7em; color: var(--secondary-text-color);"
                >
                  <span>${s.min}</span>
                  <span>${s.max}</span>
                </div>
              `}
          <div
            class="cursor-text"
            style="border-${s.side_align}: 5px solid ${e.marker}; text-align:${s.side_align};background-color:transparent ;${s.side_align}: ${s.pct_cursor}%;"
          >
            &nbsp; ${s.title} ${s.value} ${s.unit} ${s.separator} ${s.state} &nbsp;
          </div>
          ${s.pct_min!==s.pct_cursor?ot`<div
                class="cursor-text"
                style="border-left: 2px solid ${e.colors.hi_low}; border-top: 2px solid ${e.colors.hi_low}; border-bottom: 2px solid ${e.colors.hi_low}; width: 2px; height: 12px; text-align:${s.side_align}; background-color:transparent; ${s.side_align}: ${s.pct_min}%;"
              ></div>`:""}
          ${s.pct_max!==s.pct_cursor?ot`<div
                class="cursor-text"
                style="border-right: 2px solid ${e.colors.hi_low}; border-top: 2px solid ${e.colors.hi_low}; border-bottom: 2px solid ${e.colors.hi_low}; width: 2px; height: 12px; text-align:${s.side_align}; background-color:transparent; ${s.side_align}: ${s.pct_max}%;"
              ></div>`:""}
        </div>
        <div class="pool-monitor-container-values">
          <div
            style="background-color: transparent; grid-column: 1 ; border-radius: 5px 0px 0px 5px"
            class="grid-item item-row"
          >
            <div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">
              ${s.setpoint_class[0]}
            </div>
          </div>
          <div style="background-color: transparent; grid-column: 2 ;" class="grid-item item-row">
            <div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">
              ${s.setpoint_class[1]}
            </div>
          </div>
          <div style="background-color: transparent; grid-column: 3 ;" class="grid-item item-row">
            <div
              style="font-size: 0.8em;color:${e.colors.normal};text-align:right;margin:-5px 2px 0 0 "
            >
              ${s.setpoint_class[2]}
            </div>
          </div>
          <div style="background-color: transparent; grid-column: 4 ;" class="grid-item item-row">
            <div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">
              ${s.setpoint_class[3]}
            </div>
          </div>
          <div style="background-color: transparent; grid-column: 5 ;" class="grid-item item-row">
            <div style="font-size: 0.8em;text-align:right;margin:-5px 2px 0 0 ">
              ${s.setpoint_class[4]}
            </div>
          </div>
          <div
            style="background-color: transparent; grid-column: 6 ; border-radius: 0px 5px 5px 0px;"
            class="grid-item item-row"
          ></div>
        </div>
      </div>
    `}static _moreinfo(e){const s=new Event("hass-more-info",{bubbles:true,composed:true});s.detail={entityId:e};const o=document.querySelector("home-assistant");if(o)o.dispatchEvent(s)}}const Et={compact:false,show_names:true,show_labels:true,show_last_updated:false,show_icons:true,show_units:true,gradient:true,language:"en"};const Tt={low:"#fdcb6e",warn:"#e17055",normal:"#00b894",cool:"#00BFFF",marker:"#000000",hi_low:"#00000099"};function getDisplayConfig(){return Object.assign({},Et)}function getColorConfig(){return Object.assign({},Tt)}function getSensorConfig(e,s){if(!s[e])return{};return Object.assign({},s[e])}class MonitorCardBase extends i{render(){const e=this.getConfig();const s=this.processData();const o=e.display.compact?cardContent.generateCompactBody:cardContent.generateBody;if(!s||Object.keys(s).length===0)return ot` <div id="pool-monitor-card">
        <div class="warning-message">
          <ha-icon icon="mdi:alert"></ha-icon>
          <span>No valid sensor data available</span>
        </div>
      </div>`;return ot` <div id="pool-monitor-card">
      ${cardContent.generateTitle(e)}
      ${Object.values(s).map(s=>{if(s===null||s===void 0?void 0:s.invalid)return ot`
            <div class="warning-message">
              <ha-icon icon="mdi:alert"></ha-icon>
              <span
                >Sensor ${(s===null||s===void 0?void 0:s.name)||"unknown"} is not supported. Please verify its
                configuration and ensure it is compatible with the card.</span
              >
            </div>
          `;else if((s===null||s===void 0?void 0:s.value)===null)return ot`
            <div class="warning-message">
              <ha-icon icon="mdi:alert"></ha-icon>
              <span
                >Entity ${(s===null||s===void 0?void 0:s.entity)||"unknown"} could not be found. Please verify its
                name and ensure the entity is properly configured.</span
              >
            </div>
          `;return o(e,s)})}
    </div>`}processData(){const e={};const s=this.getConfig();Object.entries(s.sensors).forEach(([s,o])=>{const r=Array.isArray(o)?o:[o];r.forEach((o,r)=>{const l=`${s}_${r+1}`;e[l]=this.calculateData(s,o.title||this.getTranslatedText("sensor."+s),o.entity,o.min,o.max,o.setpoint,o.step,o.unit,o.icon,o.image_url,o.mode,o.min_limit,o.override_value,o.override,o.invalid)})});return e}getTranslatedText(e,s){var o;const r=((o=this.config)===null||o===void 0?void 0:o.display.language)||"en";const l=getTranslation(r,e);return formatTranslation(l,s)}calculateData(e,s,o,r,l,p,u,h,m,g,_,v,f,$,b){var w,A,C,P,E,T;const O={};const j=this.getConfig();const U=this.constructor.SENSORS||{};const F=getSensorConfig(e,U);const B=this.constructor.IMAGE_BASE_URL||"";O.name=e;O.invalid=b;O.mode=_;O.title=j.display.show_names?s:ot`&nbsp;`;O.hide_icon=false;O.is_mdi=false;if(!j.display.show_icons)O.hide_icon=true;else{const s=m||"";const o=g||"";if(s==="hide")O.hide_icon=true;else if(o)O.img_src=o;else if(s&&typeof s==="string"&&s.startsWith("mdi:")){O.is_mdi=true;O.mdi_icon=s}else if(B)O.img_src=`${B}/${e}.png`;else{O.is_mdi=true;O.mdi_icon="mdi:gauge"}}if(!this.hass||!this.hass.states||!this.hass.states[o]){console.warn(`Entity not found: ${o}`);O.value=null;O.entity=o;return O}const W=this.hass.states[o];const q=(w=this.hass.entities)===null||w===void 0?void 0:w[o];const G=(T=(P=(A=q===null||q===void 0?void 0:q.display_precision)!==null&&A!==void 0?A:(C=W.attributes)===null||C===void 0?void 0:C.display_precision)!==null&&P!==void 0?P:(E=W.attributes)===null||E===void 0?void 0:E.precision)!==null&&T!==void 0?T:this.countDecimals(parseFloat(W.state));const K=parseFloat(W.state);O.value=isNaN(K)?null:Number(K.toFixed(G));O.entity=o;if(j.display.show_last_updated)O.last_updated=this.timeFromNow(W.last_updated);O.unit=j.display.show_units?h||F.unit||"":"";if($)O.value=f||F.override;O.min_value=r!==void 0&&this.hass.states[r]&&!isNaN(parseFloat(this.hass.states[r].state))?parseFloat(this.hass.states[r].state):O.value;O.max_value=l!==void 0&&this.hass.states[l]&&!isNaN(parseFloat(this.hass.states[l].state))?parseFloat(this.hass.states[l].state):O.value;const J=p!=null?parseFloat(String(p)):F.setpoint!=null?parseFloat(String(F.setpoint)):O.value;const X=u!=null?parseFloat(String(u)):F.step!=null?parseFloat(String(F.step)):.1;const Y=Math.max(this.countDecimals(J),this.countDecimals(X));O.setpoint=J;const Q=v!==void 0?Number(v):-1/0;const tt=Math.max(Q,J-2*X);const et=Math.max(Q,J-X);const it=Math.max(Q,J);const st=Math.max(Q,J+X);const rt=Math.max(Q,J+2*X);O.setpoint_class=[tt.toFixed(Y),et.toFixed(Y),it.toFixed(Y),st.toFixed(Y),rt.toFixed(Y)];O.separator=j.display.show_labels?"-":"";O.color="transparent";if(O.value!==null)O.value=Math.max(Q,O.value);if(_==="heatflow")if(Number(O.value)<Number(O.setpoint_class[1])){O.state=j.display.show_labels?this.getTranslatedText("state.1"):"";O.color=j.colors.cool}else if(Number(O.value)>=Number(O.setpoint_class[1])&&Number(O.value)<Number(O.setpoint_class[3])){O.state=j.display.show_labels?this.getTranslatedText("state.3"):"";O.color=j.colors.low}else{O.state=j.display.show_labels?this.getTranslatedText("state.5"):"";O.color=j.colors.warn}else if(Number(O.value)<Number(O.setpoint_class[0])){O.state=j.display.show_labels?this.getTranslatedText("state.1"):"";O.color=j.colors.warn}else if(Number(O.value)>=Number(O.setpoint_class[0])&&Number(O.value)<Number(O.setpoint_class[1])){O.state=j.display.show_labels?this.getTranslatedText("state.2"):"";O.color=j.colors.low}else if(Number(O.value)>=Number(O.setpoint_class[1])&&Number(O.value)<Number(O.setpoint_class[2])){O.state=j.display.show_labels?this.getTranslatedText("state.3"):"";O.color=j.colors.normal}else if(Number(O.value)>=Number(O.setpoint_class[2])&&Number(O.value)<Number(O.setpoint_class[3])){O.state=j.display.show_labels?this.getTranslatedText("state.4"):"";O.color=j.colors.normal}else if(Number(O.value)>=Number(O.setpoint_class[3])&&Number(O.value)<Number(O.setpoint_class[4])){O.state=j.display.show_labels?this.getTranslatedText("state.5"):"";O.color=j.colors.low}else if(Number(O.value)>=Number(O.setpoint_class[4])){O.state=j.display.show_labels?this.getTranslatedText("state.6"):"";O.color=j.colors.warn}O.progressClass=e==="temperature"?"progress-temp":"progress";O.pct=Math.max(0,Math.min(98.5,Math.max(0,O.value-(J-3*X))/(6*X)*.85*100+15)).toFixed(0);O.pct_min=Math.max(0,Math.min(98.5,Math.max(0,O.min_value-(J-3*X))/(6*X)*.85*100+15)).toFixed(0);O.pct_max=Math.max(0,Math.min(98.5,Math.max(0,O.max_value-(J-3*X))/(6*X)*.85*100+15)).toFixed(0);O.pct_marker=O.value>O.setpoint?O.pct-12:O.pct-5;O.side_align=O.value>J?"right":"left";O.pct_cursor=O.value>J?100-parseFloat(O.pct):parseFloat(O.pct)-2;O.pct_state_step=O.value>J?105-parseFloat(O.pct):parseFloat(O.pct)+5;O.pct_min=O.value>J?100-parseFloat(O.pct_min):parseFloat(O.pct_min)-2;O.pct_max=O.value>J?100-parseFloat(O.pct_max):parseFloat(O.pct_max)-2;return O}countDecimals(e){if(e===void 0||e===null)return 0;if(Math.floor(e)===e)return 0;const s=e.toString();if(s.includes("."))return s.split(".")[1].length||0;return 0}timeFromNow(e){const s=new Date(e);const o=Date.now()-s.getTime();const t=(e,s)=>{const o=s===1?"time":"time_plural";const r={[e]:s};return this.getTranslatedText(`${o}.${e}`,r)};const r=Math.floor(o/6e4);const l=Math.floor(r/60);const p=Math.floor(l/24);if(r<1)return t("seconds",0);if(r<60)return t("minutes",r);if(l<24)return t("hours",l);return t("days",p)}getConfig(){return this.config}setConfig(e){const s=this.constructor.SENSORS||{};const o=Object.keys(s);const r={display:getDisplayConfig(),colors:getColorConfig()};const l=Object.assign(Object.assign({},e),{display:Object.assign(Object.assign({},r.display),e.display||{}),colors:Object.assign(Object.assign({},r.colors),e.colors||{}),sensors:{}});if(!e.sensors)throw new Error('Configuration requires sensors to be defined under the "sensors" key.');Object.entries(e.sensors).forEach(([e,r])=>{const p=s[e]||{};const u=Array.isArray(r)?[...r]:[Object.assign({},r)];if(u.length===0)throw new Error(`Empty sensor array for ${e}`);const h=u.map(e=>Object.assign(Object.assign(Object.assign({},p),e),{nameDefinedByUser:!!e.name}));h.forEach((s,r)=>{if(!s.entity)throw new Error(`Missing entity for ${e}[${r}]`);if(s.nameDefinedByUser)s.title=s.name;if(o.length>0&&!o.includes(e))s.invalid=true;else s.invalid=false});l.sensors[e]=h});this.config=l}}MonitorCardBase.SENSORS={};MonitorCardBase.IMAGE_BASE_URL="";MonitorCardBase.styles=Pt;__decorate([n$1({attribute:false})],MonitorCardBase.prototype,"hass",void 0);__decorate([n$1({attribute:false})],MonitorCardBase.prototype,"config",void 0);const Mt={temperature:{name:"Temperature",unit:"°C",setpoint:27,step:1,mode:"heatflow"},orp:{name:"ORP",unit:"mV",setpoint:700,step:50,mode:"centric",min_limit:0},ec:{name:"Electrical Conductivity",unit:"µS/cm",setpoint:4e3,step:200,mode:"centric",min_limit:0},tds:{name:"TDS",unit:"g/L",setpoint:5,step:.5,mode:"centric",min_limit:0},ph:{name:"pH",unit:"pH",setpoint:7.2,step:.2,mode:"centric",min_limit:0},salinity:{name:"Salinity",unit:"ppm",setpoint:3e3,step:500,mode:"centric",min_limit:0},cya:{name:"Cyanuric Acid",unit:"ppm",setpoint:40,step:10,mode:"centric",min_limit:0},calcium:{name:"Calcium",unit:"ppm",setpoint:300,step:100,mode:"centric",min_limit:0},phosphate:{name:"Phosphate",unit:"ppb",setpoint:50,step:10,mode:"centric",min_limit:0},alkalinity:{name:"Alkalinity",unit:"ppm",setpoint:100,step:20,mode:"centric",min_limit:0},free_chlorine:{name:"Free Chlorine",unit:"ppm",setpoint:3,step:.5,mode:"centric",min_limit:0},total_chlorine:{name:"Total Chlorine",unit:"ppm",setpoint:3,step:.5,mode:"centric",min_limit:0},pressure:{name:"Filter Pressure",unit:"psi",setpoint:12,step:2,mode:"centric"},specific_gravity:{name:"Specific Gravity",unit:"sg",setpoint:1.1,step:.2,mode:"centric"},magnesium:{name:"Magnesium",unit:"ppm",setpoint:1200,step:100,mode:"centric",min_limit:0},water_level:{name:"Water Level",unit:"%",setpoint:100,step:10,mode:"centric",min_limit:0},flow_rate:{name:"Flow Rate",unit:"m³/h",setpoint:10,step:1,mode:"centric",min_limit:0},uv_radiation:{name:"UV Radiation",unit:"mW/cm²",setpoint:4,step:1,mode:"centric",min_limit:0},product_volume:{name:"Product Volume",unit:"L",setpoint:20,step:5,mode:"centric",min_limit:0},product_weight:{name:"Product Weight",unit:"kg",setpoint:25,step:5,mode:"centric",min_limit:0},bromine:{name:"Bromine",unit:"ppm",setpoint:4,step:1,mode:"centric",min_limit:0}};const Ot="2.3.0";const Nt="2026-02-23-16-03";const Rt=`${Ot} (${Nt})`;console.info(`%c POOL-MONITORING-CARD %c ${Rt} `,"color: white; background: green; font-weight: 700;","color: green; background: white; font-weight: 700;");e.PoolMonitorCard=class PoolMonitorCard extends MonitorCardBase{};e.PoolMonitorCard.CARD_INFO={cardType:"pool-monitor-card",cardName:"Pool Monitor Card",cardDescription:'The "Pool Monitor Card" is a home assistant plugin that provides information about the temperature, pH, and ORP levels of your swimming pool'};e.PoolMonitorCard.SENSORS=Mt;e.PoolMonitorCard.IMAGE_BASE_URL="https://raw.githubusercontent.com/wilsto/pool-monitor-card/master/resources";e.PoolMonitorCard=__decorate([t$2("pool-monitor-card")],e.PoolMonitorCard);Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});return e}({});
//# sourceMappingURL=pool-monitor-card.js.map
