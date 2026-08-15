var PoolMonitorCard=function(e){"use strict";function __rest(e,s){var o={};for(var l in e)if(Object.prototype.hasOwnProperty.call(e,l)&&s.indexOf(l)<0)o[l]=e[l];if(e!=null&&typeof Object.getOwnPropertySymbols==="function")for(var p=0,l=Object.getOwnPropertySymbols(e);p<l.length;p++)if(s.indexOf(l[p])<0&&Object.prototype.propertyIsEnumerable.call(e,l[p]))o[l[p]]=e[l[p]];return o}function __decorate(e,s,o,l){var p=arguments.length,u=p<3?s:l===null?l=Object.getOwnPropertyDescriptor(s,o):l,h;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")u=Reflect.decorate(e,s,o,l);else for(var m=e.length-1;m>=0;m--)if(h=e[m])u=(p<3?h(u):p>3?h(s,o,u):h(s,o))||u;return p>3&&u&&Object.defineProperty(s,o,u),u}typeof SuppressedError==="function"?SuppressedError:function(e,s,o){var l=new Error(o);return l.name="SuppressedError",l.error=e,l.suppressed=s,l};const s=globalThis,o=s.ShadowRoot&&(void 0===s.ShadyCSS||s.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,l=Symbol(),p=new WeakMap;let u=class n{constructor(e,s,o){if(this._$cssResult$=true,o!==l)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=s}get styleSheet(){let e=this.o;const s=this.t;if(o&&void 0===e){const o=void 0!==s&&1===s.length;o&&(e=p.get(s)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&p.set(s,e))}return e}toString(){return this.cssText}};const r$4=e=>new u("string"==typeof e?e:e+"",void 0,l),i$3=(e,...s)=>{const o=1===e.length?e[0]:s.reduce((s,o,l)=>s+(e=>{if(true===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+e[l+1],e[0]);return new u(o,e,l)},S$1=(e,l)=>{if(o)e.adoptedStyleSheets=l.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const o of l){const l=document.createElement("style"),p=s.litNonce;void 0!==p&&l.setAttribute("nonce",p),l.textContent=o.cssText,e.appendChild(l)}},h=o?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let s="";for(const o of e.cssRules)s+=o.cssText;return r$4(s)})(e):e;const{is:m,defineProperty:g,getOwnPropertyDescriptor:_,getOwnPropertyNames:v,getOwnPropertySymbols:f,getPrototypeOf:b}=Object,$=globalThis,w=$.trustedTypes,C=w?w.emptyScript:"",A=$.reactiveElementPolyfillSupport,d$1=(e,s)=>e,E={toAttribute(e,s){switch(s){case Boolean:e=e?C:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,s){let o=e;switch(s){case Boolean:o=null!==e;break;case Number:o=null===e?null:Number(e);break;case Object:case Array:try{o=JSON.parse(e)}catch(e){o=null}}return o}},f$1=(e,s)=>!m(e,s),P={attribute:true,type:String,converter:E,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),$.litPropertyMetadata??=new WeakMap;let O=class y extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,s=P){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(e)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(e,s),!s.noAccessor){const o=Symbol(),l=this.getPropertyDescriptor(e,o,s);void 0!==l&&g(this.prototype,e,l)}}static getPropertyDescriptor(e,s,o){const{get:l,set:p}=_(this.prototype,e)??{get(){return this[s]},set(e){this[s]=e}};return{get:l,set(s){const u=l?.call(this);p?.call(this,s),this.requestUpdate(e,u,o)},configurable:true,enumerable:true}}static getPropertyOptions(e){return this.elementProperties.get(e)??P}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const e=b(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const e=this.properties,s=[...v(e),...f(e)];for(const o of s)this.createProperty(o,e[o])}const e=this[Symbol.metadata];if(null!==e){const s=litPropertyMetadata.get(e);if(void 0!==s)for(const[e,o]of s)this.elementProperties.set(e,o)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const o=this._$Eu(e,s);void 0!==o&&this._$Eh.set(o,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const s=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const e of o)s.unshift(h(e))}else void 0!==e&&s.push(h(e));return s}static _$Eu(e,s){const o=s.attribute;return false===o?void 0:"string"==typeof o?o:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,s=this.constructor.elementProperties;for(const o of s.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,s,o){this._$AK(e,o)}_$ET(e,s){const o=this.constructor.elementProperties.get(e),l=this.constructor._$Eu(e,o);if(void 0!==l&&true===o.reflect){const p=(void 0!==o.converter?.toAttribute?o.converter:E).toAttribute(s,o.type);this._$Em=e,null==p?this.removeAttribute(l):this.setAttribute(l,p),this._$Em=null}}_$AK(e,s){const o=this.constructor,l=o._$Eh.get(e);if(void 0!==l&&this._$Em!==l){const e=o.getPropertyOptions(l),p="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:E;this._$Em=l;const u=p.fromAttribute(s,e.type);this[l]=u??this._$Ej?.get(l)??u,this._$Em=null}}requestUpdate(e,s,o,l=false,p){if(void 0!==e){const u=this.constructor;if(false===l&&(p=this[e]),o??=u.getPropertyOptions(e),!((o.hasChanged??f$1)(p,s)||o.useDefault&&o.reflect&&p===this._$Ej?.get(e)&&!this.hasAttribute(u._$Eu(e,o))))return;this.C(e,s,o)}false===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,s,{useDefault:o,reflect:l,wrapped:p},u){o&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,u??s??this[e]),true!==p||void 0!==u)||(this._$AL.has(e)||(this.hasUpdated||o||(s=void 0),this._$AL.set(e,s)),true===l&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=true;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,s]of this._$Ep)this[e]=s;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[s,o]of e){const{wrapped:e}=o,l=this[s];true!==e||this._$AL.has(s)||void 0===l||this.C(s,void 0,o,l)}}let e=false;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(s)):this._$EM()}catch(s){throw e=false,this._$EM(),s}e&&this._$AE(s)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=false}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return true}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};O.elementStyles=[],O.shadowRootOptions={mode:"open"},O[d$1("elementProperties")]=new Map,O[d$1("finalized")]=new Map,A?.({ReactiveElement:O}),($.reactiveElementVersions??=[]).push("2.1.2");const T=globalThis,i$1=e=>e,j=T.trustedTypes,F=j?j.createPolicy("lit-html",{createHTML:e=>e}):void 0,U="$lit$",B=`lit$${Math.random().toFixed(9).slice(2)}$`,q="?"+B,W=`<${q}>`,G=document,c=()=>G.createComment(""),a=e=>null===e||"object"!=typeof e&&"function"!=typeof e,K=Array.isArray,d=e=>K(e)||"function"==typeof e?.[Symbol.iterator],J="[ \t\n\f\r]",X=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Y=/-->/g,Q=/>/g,ee=RegExp(`>|${J}(?:([^\\s"'>=/]+)(${J}*=${J}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),te=/'/g,se=/"/g,ie=/^(?:script|style|textarea|title)$/i,x=e=>(s,...o)=>({_$litType$:e,strings:s,values:o}),oe=x(1),ae=Symbol.for("lit-noChange"),re=Symbol.for("lit-nothing"),ne=new WeakMap,le=G.createTreeWalker(G,129);function V(e,s){if(!K(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==F?F.createHTML(s):s}const N=(e,s)=>{const o=e.length-1,l=[];let p,u=2===s?"<svg>":3===s?"<math>":"",h=X;for(let s=0;s<o;s++){const o=e[s];let m,g,_=-1,v=0;for(;v<o.length&&(h.lastIndex=v,g=h.exec(o),null!==g);)v=h.lastIndex,h===X?"!--"===g[1]?h=Y:void 0!==g[1]?h=Q:void 0!==g[2]?(ie.test(g[2])&&(p=RegExp("</"+g[2],"g")),h=ee):void 0!==g[3]&&(h=ee):h===ee?">"===g[0]?(h=p??X,_=-1):void 0===g[1]?_=-2:(_=h.lastIndex-g[2].length,m=g[1],h=void 0===g[3]?ee:'"'===g[3]?se:te):h===se||h===te?h=ee:h===Y||h===Q?h=X:(h=ee,p=void 0);const f=h===ee&&e[s+1].startsWith("/>")?" ":"";u+=h===X?o+W:_>=0?(l.push(m),o.slice(0,_)+U+o.slice(_)+B+f):o+B+(-2===_?s:f)}return[V(e,u+(e[o]||"<?>")+(2===s?"</svg>":3===s?"</math>":"")),l]};class S{constructor({strings:e,_$litType$:s},o){let l;this.parts=[];let p=0,u=0;const h=e.length-1,m=this.parts,[g,_]=N(e,s);if(this.el=S.createElement(g,o),le.currentNode=this.el.content,2===s||3===s){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(l=le.nextNode())&&m.length<h;){if(1===l.nodeType){if(l.hasAttributes())for(const e of l.getAttributeNames())if(e.endsWith(U)){const s=_[u++],o=l.getAttribute(e).split(B),h=/([.?@])?(.*)/.exec(s);m.push({type:1,index:p,name:h[2],strings:o,ctor:"."===h[1]?I:"?"===h[1]?L:"@"===h[1]?z:H}),l.removeAttribute(e)}else e.startsWith(B)&&(m.push({type:6,index:p}),l.removeAttribute(e));if(ie.test(l.tagName)){const e=l.textContent.split(B),s=e.length-1;if(s>0){l.textContent=j?j.emptyScript:"";for(let o=0;o<s;o++)l.append(e[o],c()),le.nextNode(),m.push({type:2,index:++p});l.append(e[s],c())}}}else if(8===l.nodeType)if(l.data===q)m.push({type:2,index:p});else{let e=-1;for(;-1!==(e=l.data.indexOf(B,e+1));)m.push({type:7,index:p}),e+=B.length-1}p++}}static createElement(e,s){const o=G.createElement("template");return o.innerHTML=e,o}}function M(e,s,o=e,l){if(s===ae)return s;let p=void 0!==l?o._$Co?.[l]:o._$Cl;const u=a(s)?void 0:s._$litDirective$;return p?.constructor!==u&&(p?._$AO?.(false),void 0===u?p=void 0:(p=new u(e),p._$AT(e,o,l)),void 0!==l?(o._$Co??=[])[l]=p:o._$Cl=p),void 0!==p&&(s=M(e,p._$AS(e,s.values),p,l)),s}class R{constructor(e,s){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=s}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:s},parts:o}=this._$AD,l=(e?.creationScope??G).importNode(s,true);le.currentNode=l;let p=le.nextNode(),u=0,h=0,m=o[0];for(;void 0!==m;){if(u===m.index){let s;2===m.type?s=new k(p,p.nextSibling,this,e):1===m.type?s=new m.ctor(p,m.name,m.strings,this,e):6===m.type&&(s=new Z(p,this,e)),this._$AV.push(s),m=o[++h]}u!==m?.index&&(p=le.nextNode(),u++)}return le.currentNode=G,l}p(e){let s=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(e,o,s),s+=o.strings.length-2):o._$AI(e[s])),s++}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,s,o,l){this.type=2,this._$AH=re,this._$AN=void 0,this._$AA=e,this._$AB=s,this._$AM=o,this.options=l,this._$Cv=l?.isConnected??true}get parentNode(){let e=this._$AA.parentNode;const s=this._$AM;return void 0!==s&&11===e?.nodeType&&(e=s.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,s=this){e=M(this,e,s),a(e)?e===re||null==e||""===e?(this._$AH!==re&&this._$AR(),this._$AH=re):e!==this._$AH&&e!==ae&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):d(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==re&&a(this._$AH)?this._$AA.nextSibling.data=e:this.T(G.createTextNode(e)),this._$AH=e}$(e){const{values:s,_$litType$:o}=e,l="number"==typeof o?this._$AC(e):(void 0===o.el&&(o.el=S.createElement(V(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===l)this._$AH.p(s);else{const e=new R(l,this),o=e.u(this.options);e.p(s),this.T(o),this._$AH=e}}_$AC(e){let s=ne.get(e.strings);return void 0===s&&ne.set(e.strings,s=new S(e)),s}k(e){K(this._$AH)||(this._$AH=[],this._$AR());const s=this._$AH;let o,l=0;for(const p of e)l===s.length?s.push(o=new k(this.O(c()),this.O(c()),this,this.options)):o=s[l],o._$AI(p),l++;l<s.length&&(this._$AR(o&&o._$AB.nextSibling,l),s.length=l)}_$AR(e=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);e!==this._$AB;){const s=i$1(e).nextSibling;i$1(e).remove(),e=s}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,s,o,l,p){this.type=1,this._$AH=re,this._$AN=void 0,this.element=e,this.name=s,this._$AM=l,this.options=p,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=re}_$AI(e,s=this,o,l){const p=this.strings;let u=false;if(void 0===p)e=M(this,e,s,0),u=!a(e)||e!==this._$AH&&e!==ae,u&&(this._$AH=e);else{const l=e;let h,m;for(e=p[0],h=0;h<p.length-1;h++)m=M(this,l[o+h],s,h),m===ae&&(m=this._$AH[h]),u||=!a(m)||m!==this._$AH[h],m===re?e=re:e!==re&&(e+=(m??"")+p[h+1]),this._$AH[h]=m}u&&!l&&this.j(e)}j(e){e===re?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class I extends H{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===re?void 0:e}}class L extends H{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==re)}}class z extends H{constructor(e,s,o,l,p){super(e,s,o,l,p),this.type=5}_$AI(e,s=this){if((e=M(this,e,s,0)??re)===ae)return;const o=this._$AH,l=e===re&&o!==re||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,p=e!==re&&(o===re||l);l&&this.element.removeEventListener(this.name,this,o),p&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class Z{constructor(e,s,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=s,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){M(this,e)}}const ce=T.litHtmlPolyfillSupport;ce?.(S,k),(T.litHtmlVersions??=[]).push("3.3.2");const D=(e,s,o)=>{const l=o?.renderBefore??s;let p=l._$litPart$;if(void 0===p){const e=o?.renderBefore??null;l._$litPart$=p=new k(s.insertBefore(c(),e),e,void 0,o??{})}return p._$AI(e),p};const de=globalThis;class i extends O{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const s=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=D(s,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false)}render(){return ae}}i._$litElement$=true,i["finalized"]=true,de.litElementHydrateSupport?.({LitElement:i});const pe=de.litElementPolyfillSupport;pe?.({LitElement:i});(de.litElementVersions??=[]).push("4.2.2");const t=e=>(s,o)=>{void 0!==o?o.addInitializer(()=>{customElements.define(e,s)}):customElements.define(e,s)};const ue={attribute:true,type:String,converter:E,reflect:false,hasChanged:f$1},r$1=(e=ue,s,o)=>{const{kind:l,metadata:p}=o;let u=globalThis.litPropertyMetadata.get(p);if(void 0===u&&globalThis.litPropertyMetadata.set(p,u=new Map),"setter"===l&&((e=Object.create(e)).wrapped=true),u.set(o.name,e),"accessor"===l){const{name:l}=o;return{set(o){const p=s.get.call(this);s.set.call(this,o),this.requestUpdate(l,p,e,true,o)},init(s){return void 0!==s&&this.C(l,void 0,e,s),s}}}if("setter"===l){const{name:l}=o;return function(o){const p=this[l];s.call(this,o),this.requestUpdate(l,p,e,true,o)}}throw Error("Unsupported decorator location: "+l)};function n(e){return(s,o)=>"object"==typeof o?r$1(e,s,o):((e,s,o)=>{const l=s.hasOwnProperty(o);return s.constructor.createProperty(o,e),l?Object.getOwnPropertyDescriptor(s,o):void 0})(e,s,o)}function r(e){return n({...e,state:true,attribute:false})}const he={language:"English",state:{1:"Too Low",2:"Acceptable Low",3:"Ideal",4:"Ideal",5:"Acceptable High",6:"Too High"},sensor:{temperature:"Temperature",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinity",cya:"Cyanuric Acid",calcium:"Calcium",phosphate:"Phosphate",alkalinity:"Alkalinity",free_chlorine:"Free Chlorine",total_chlorine:"Total Chlorine",pressure:"Filter Pressure",specific_gravity:"Specific Gravity",magnesium:"Magnesium",water_level:"Water Level",flow_rate:"Flow Rate",uv_radiation:"UV Radiation",product_volume:"Product Volume",product_weight:"Product Weight",ec:"Electrical Conductivity",bromine:"Bromine",chlorinator:"Chlorinator",pump_speed:"Pump Speed",light_brightness:"Light Brightness",heat_pump_setpoint:"Heat Pump Setpoint"},time:{seconds:"just now",minutes:"{minutes} minute ago",hours:"{hours} hour ago",days:"{days} day ago"},time_plural:{seconds:"just now",minutes:"{minutes} minutes ago",hours:"{hours} hours ago",days:"{days} days ago"}};const me={language:"Français",state:{1:"Trop bas",2:"Acceptable bas",3:"Idéal",4:"Idéal",5:"Acceptable élevé",6:"Trop élevé"},sensor:{temperature:"Température",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinité",cya:"Acide cyanurique",calcium:"Calcium",phosphate:"Phosphate",alkalinity:"Alcalinité",free_chlorine:"Chlore libre",total_chlorine:"Chlore total",pressure:"Pression du filtre",specific_gravity:"Densité spécifique",magnesium:"Magnésium",water_level:"Niveau d'eau",flow_rate:"Débit",uv_radiation:"Radiation UV",product_volume:"Volume Produit",product_weight:"Poids Produit",ec:"Conductivité Électrique",bromine:"Brome",chlorinator:"Réglage du chlorateur",pump_speed:"Vitesse de pompe",light_brightness:"Luminosité éclairage",heat_pump_setpoint:"Consigne PAC"},time:{seconds:"à l'instant",minutes:"il y a {minutes} minute",hours:"il y a {hours} heure",days:"il y a {days} jour"},time_plural:{seconds:"à l'instant",minutes:"il y a {minutes} minutes",hours:"il y a {hours} heures",days:"il y a {days} jours"}};const ge={language:"Español",state:{1:"Demasiado bajo",2:"Aceptable bajo",3:"Perfecto",4:"Perfecto",5:"Aceptable alto",6:"Demasiado alto"},sensor:{temperature:"Temperatura",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinidad",cya:"Acido cianúrico",calcium:"Calcio",phosphate:"Fosfato",alkalinity:"Alcalinidad",free_chlorine:"Cloro libre",total_chlorine:"Cloro total",pressure:"Pressione du filter relativa",specific_gravity:"Densidad relativa",magnesium:"Magnesio",water_level:"Nivel de agua",flow_rate:"Caudal",uv_radiation:"Radiación UV",product_volume:"Volumen Producto",product_weight:"Peso Producto",ec:"Conductividad Eléctrica",bromine:"Bromo",chlorinator:"Ajuste de clorador",pump_speed:"Velocidad de bomba",light_brightness:"Brillo de luz",heat_pump_setpoint:"Consigna bomba de calor"},time:{seconds:"justo ahora",minutes:"hace {minutes} minuto",hours:"hace {hours} hora",days:"hace {days} día"},time_plural:{seconds:"justo ahora",minutes:"hace {minutes} minutos",hours:"hace {hours} horas",days:"hace {days} días"}};const _e={language:"Deutsch",state:{1:"Zu niedrig",2:"Akzeptabler Tiefstwert",3:"Ideal",4:"Ideal",5:"Akzeptabler Hochwert",6:"Zu hoch"},sensor:{temperature:"Temperatur",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salzgehalt",cya:"Cyanursäure",calcium:"Kalzium",phosphate:"Phosphat",alkalinity:"Alkalinität",free_chlorine:"Freies Chlor",total_chlorine:"Gesamtchlor",pressure:"Sandfilterdruck",specific_gravity:"Spezifisches Gewicht",magnesium:"Magnesium",water_level:"Wasserstand",flow_rate:"Durchfluss",uv_radiation:"UV-Strahlung",product_volume:"Produktvolumen",product_weight:"Produktgewicht",ec:"Elektrische Leitfähigkeit",bromine:"Brom",chlorinator:"Chlorator-Einstellung",pump_speed:"Pumpengeschwindigkeit",light_brightness:"Lichthelligkeit",heat_pump_setpoint:"Wärmepumpe Sollwert"},time:{seconds:"gerade erst",minutes:"vor {minutes} Minute",hours:"vor {hours} Stunde",days:"vor {days} Tag"},time_plural:{seconds:"gerade erst",minutes:"vor {minutes} Minuten",hours:"vor {hours} Stunden",days:"vor {days} Tagen"}};const ye={language:"Italiano",state:{1:"Troppo basso",2:"Accettabile basso",3:"Ideale",4:"Ideale",5:"Accettabile alto",6:"Troppo alto"},sensor:{temperature:"Temperatura",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinità",cya:"Acido cianurico",calcium:"Calcio",phosphate:"Fosfato",alkalinity:"Alcalinità",free_chlorine:"Cloro libero",total_chlorine:"Cloro totale",pressure:"Pressione filtro",specific_gravity:"Gravità specifica",magnesium:"Magnesio",water_level:"Livello dell'acqua",flow_rate:"Portata",uv_radiation:"Radiazione UV",product_volume:"Volume prodotto",product_weight:"Peso prodotto",ec:"Conducibilità Elettrica",bromine:"Bromo",chlorinator:"Impostazione clorinatore",pump_speed:"Velocità pompa",light_brightness:"Luminosità luce",heat_pump_setpoint:"Setpoint pompa di calore"},time:{seconds:"proprio ora",minutes:"{minutes} minuto fa",hours:"{hours} ora fa",days:"{days} giorno fa"},time_plural:{seconds:"proprio ora",minutes:"{minutes} minuti fa",hours:"{hours} ore fa",days:"{days} giorni fa"}};const ve={language:"Nederlands",state:{1:"Te laag",2:"Acceptabel laag",3:"Ideaal",4:"Ideaal",5:"Acceptabel hoog",6:"Te hoog"},sensor:{temperature:"Temperatuur",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Zoutgehalte",cya:"Cyanuurzuur",calcium:"Calcium",phosphate:"Fosfaat",alkalinity:"Alkaliteit",free_chlorine:"Vrij chloor",total_chlorine:"Totaal chloor",pressure:"Filterdruk",specific_gravity:"Soortelijk gewicht",magnesium:"Magnesium",water_level:"Waterniveau",flow_rate:"Debiet",uv_radiation:"UV-straling",product_volume:"Productvolume",product_weight:"Productgewicht",ec:"Elektrische Geleidbaarheid",bromine:"Broom",chlorinator:"Chloormaker instelling",pump_speed:"Pompsnelheid",light_brightness:"Lichthelderheid",heat_pump_setpoint:"Warmtepomp instelpunt"},time:{seconds:"zojuist",minutes:"{minutes} minuut geleden",hours:"{hours} uur geleden",days:"{days} dag geleden"},time_plural:{seconds:"zojuist",minutes:"{minutes} minuten geleden",hours:"{hours} uur geleden",days:"{days} dagen geleden"}};const fe={language:"Português",state:{1:"Muito Baixo",2:"Torelavel mas Baixo",3:"Ideal",4:"Ideal",5:"Toleravel mas Alto",6:"Muito Alto"},sensor:{temperature:"Temperatura",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinidade",cya:"Ácido cianúrico",calcium:"Calcio",phosphate:"Fosfato",alkalinity:"Alcalinidade",free_chlorine:"Cloro livres",total_chlorine:"Cloro total",pressure:"Pressão do filtro",specific_gravity:"Gravidade específica",magnesium:"Magnésio",water_level:"Nivel de agua",flow_rate:"Caudal",uv_radiation:"Radiação UV",product_volume:"Volume Produto",product_weight:"Peso Produto",ec:"Condutividade Elétrica",bromine:"Bromo",chlorinator:"Configuração do clorador",pump_speed:"Velocidade da bomba",light_brightness:"Brilho da luz",heat_pump_setpoint:"Ponto de ajuste bomba de calor"},time:{seconds:"agora mesmo",minutes:"há {minutes} minuto",hours:"há {hours} hora",days:"há {days} dia"},time_plural:{seconds:"agora mesmo",minutes:"há {minutes} minutos",hours:"há {hours} horas",days:"há {days} dias"}};const be={language:"Português (Brasil)",state:{1:"Muito Baixo",2:"Aceitavel Baixo",3:"Ideal",4:"Ideal",5:"Aceitavel Alto",6:"Muito Alto"},sensor:{temperature:"Temperatura",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinidade",cya:"Acido Cianurico",calcium:"Calcio",phosphate:"Fosfato",alkalinity:"Alcalinidade",free_chlorine:"Cloro Livre",total_chlorine:"Cloro Total",pressure:"Pressão no Filtro",specific_gravity:"Gravidade específica",magnesium:"Magnésio",water_level:"Nivel de agua",flow_rate:"Caudal",uv_radiation:"Radiação UV",product_volume:"Volume Produto",product_weight:"Peso Produto",ec:"Condutividade Elétrica",bromine:"Bromo",chlorinator:"Configuração do clorador",pump_speed:"Velocidade da bomba",light_brightness:"Brilho da luz",heat_pump_setpoint:"Ponto de ajuste bomba de calor"},time:{seconds:"agora mesmo",minutes:"há {minutes} minuto",hours:"há {hours} hora",days:"há {days} dia"},time_plural:{seconds:"agora mesmo",minutes:"há {minutes} minutos",hours:"há {hours} horas",days:"há {days} dias"}};const $e={language:"Română",state:{1:"Prea mic",2:"Mic",3:"Ideal",4:"Ideal",5:"Mare",6:"Prea mare"},sensor:{temperature:"Temperatură",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinitate",cya:"Acid cianuric",calcium:"Calciu",phosphate:"Fosfat",alkalinity:"Alcalinitate",free_chlorine:"Clor liber",total_chlorine:"Clor total",pressure:"Presiune filtru",specific_gravity:"Greutate specifică",magnesium:"Magneziu",water_level:"Nivel apă",flow_rate:"Debit",uv_radiation:"Radiație UV",product_volume:"Volum produs",product_weight:"Greutate produs",ec:"Conductivitate Electrică",bromine:"Brom",chlorinator:"Setare clorinator",pump_speed:"Viteza pompei",light_brightness:"Luminozitate lumina",heat_pump_setpoint:"Punct de reglaj pompa de caldura"},time:{seconds:"chiar acum",minutes:"acum {minutes} minut",hours:"acum {hours} oră",days:"acum {days} zi"},time_plural:{seconds:"chiar acum",minutes:"acum {minutes} minute",hours:"acum {hours} ore",days:"acum {days} zile"}};const we={language:"Slovenčina",state:{1:"Príliš nízky",2:"Akceptovateľne nízky",3:"Ideálny",4:"Ideálny",5:"Akceptovateľne vysoký",6:"Príliš vysoký"},sensor:{temperature:"Teplota",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinita",cya:"Kyselina kyanurová",calcium:"Vápnik",phosphate:"Fosfát",alkalinity:"Alkalinita",free_chlorine:"Voľný chlór",total_chlorine:"Celkový chlór",pressure:"Tlak filtra",specific_gravity:"Špecifická hmotnosť",magnesium:"Magnézium",water_level:"Úroveň vody",flow_rate:"Prietok",uv_radiation:"UV žiarenie",product_volume:"Objem produktu",product_weight:"Hmotnosť produktu",ec:"Elektrická Vodivosť",bromine:"Bróm",chlorinator:"Nastavenie chlórovača",pump_speed:"Rýchlosť čerpadla",light_brightness:"Jas svetla",heat_pump_setpoint:"Nastavená teplota tepelného čerpadla"},time:{seconds:"práve teraz",minutes:"pred {minutes} minútou",hours:"pred {hours} hodinou",days:"pred {days} dňom"},time_plural:{seconds:"práve teraz",minutes:"pred {minutes} minútami",hours:"pred {hours} hodinami",days:"pred {days} dňami"}};const xe={language:"עברית",state:{1:"נמוך מדי",2:"נמוך מאוד",3:"אידיאלי",4:"אידיאלי",5:"גבוה מאוד",6:"גבוה מדי"},sensor:{temperature:"טמפרטורה",ph:"PH",orp:"ORP",tds:"TDS",salinity:"מליחות",cya:"חומצה ציאנורית",calcium:"סידן",phosphate:"פוספט",alkalinity:"אלקליניות",free_chlorine:"כלור חופשי",total_chlorine:"כלור כולל",pressure:"לחץ מסנן",specific_gravity:"משקל סגולי",magnesium:"מגנזיום",water_level:"מפלס מים",flow_rate:"קצב זרימה",uv_radiation:"קרינת UV",product_volume:"נפח מוצר",product_weight:"משקל מוצר",ec:"מוליכות חשמלית",bromine:"ברום",chlorinator:"הגדרת מחלור",pump_speed:"מהירות משאבה",light_brightness:"בהירות תאורה",heat_pump_setpoint:"נקודת כיוון משאבת חום"},time:{seconds:"כרגע",minutes:"לפני {minutes} דקה",hours:"לפני {hours} שעה",days:"לפני {days} יום"},time_plural:{seconds:"כרגע",minutes:"לפני {minutes} דקות",hours:"לפני {hours} שעות",days:"לפני {days} ימים"}};const Se={language:"Русский",state:{1:"Слишком низкий",2:"Приемлемо низкий",3:"Идеальный",4:"Идеальный",5:"Приемлемо высокий",6:"Слишком высокий"},sensor:{temperature:"Температура",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Соленость",cya:"Циануровая кислота",calcium:"Кальций",phosphate:"Фосфаты",alkalinity:"Щелочность",free_chlorine:"Свободный хлор",total_chlorine:"Общий хлор",pressure:"Давление фильтра",specific_gravity:"Удельный вес",magnesium:"Магний",water_level:"Уровень воды",flow_rate:"Расход воды",uv_radiation:"УФ-излучение",product_volume:"Объем продукта",product_weight:"Вес продукта",ec:"Электропроводность",bromine:"Бром",chlorinator:"Настройка хлоратора",pump_speed:"Скорость насоса",light_brightness:"Яркость освещения",heat_pump_setpoint:"Уставка теплового насоса"},time:{seconds:"только что",minutes:"{minutes} минуту назад",hours:"{hours} час назад",days:"{days} день назад"},time_plural:{seconds:"только что",minutes:"{minutes} минут назад",hours:"{hours} часов назад",days:"{days} дней назад"}};const Ce={language:"Magyar",state:{1:"Túl alacsony",2:"Elfogadhatóan alacsony",3:"Ideális",4:"Ideális",5:"Elfogadhatóan magas",6:"Túl magas"},sensor:{temperature:"Hőmérséklet",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Sótartalom",cya:"Cianursav",calcium:"Kalcium",phosphate:"Foszfát",alkalinity:"Lúgosság",free_chlorine:"Szabad klór",total_chlorine:"Összes klór",pressure:"Szűrő nyomás",specific_gravity:"Fajsúly",magnesium:"Magnézium",water_level:"Vízszint",flow_rate:"Áramlási sebesség",uv_radiation:"UV sugárzás",product_volume:"Termék térfogat",product_weight:"Termék tömeg",ec:"Elektromos vezetőképesség",bromine:"Bróm",chlorinator:"Klórozó beállítás",pump_speed:"Szivattyú sebesség",light_brightness:"Fény fényerő",heat_pump_setpoint:"Hőszivattyú beállítás"},time:{seconds:"éppen most",minutes:"{minutes} perce",hours:"{hours} órája",days:"{days} napja"},time_plural:{seconds:"éppen most",minutes:"{minutes} perce",hours:"{hours} órája",days:"{days} napja"}};const ke={language:"Svenska",state:{1:"För Lågt",2:"Lågt, Acceptabelt",3:"Idealt",4:"Idealt",5:"Högt, Acceptabelt",6:"För Högt"},sensor:{temperature:"Temperatur",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salthalt",cya:"Cyanursyra",calcium:"Kalcium",phosphate:"Fosfat",alkalinity:"Alkalinitet",free_chlorine:"Klor Fritt",total_chlorine:"Klor Total",pressure:"Tryck Filter",specific_gravity:"Densitet",magnesium:"Magnesium",water_level:"Vattennivå",flow_rate:"Flödeshastighet",uv_radiation:"UV-Strålning",product_volume:"Produkt Volym",product_weight:"Produkt Vikt",ec:"Elektrisk Ledningsförmåga",bromine:"Brom",chlorinator:"Kloratorinställning",pump_speed:"Pumphastighet",light_brightness:"Ljusstyrka",heat_pump_setpoint:"Värmepump börvärde"},time:{seconds:"nu",minutes:"{minutes} minut tillbaka",hours:"{hours} timme tillbaka",days:"{days} dag tillbaka"},time_plural:{seconds:"nu",minutes:"{minutes} minuter tillbaka",hours:"{hours} timmar tillbaka",days:"{days} dagar tillbaka"}};const Ae={language:"Čeština",state:{1:"Příliš nízká",2:"Přijatelně nízká",3:"Ideální",4:"Ideální",5:"Přijatelně vysoká",6:"Příliš vysoká"},sensor:{temperature:"Teplota",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinita",cya:"Kyselina kyanurová",calcium:"Vápník",phosphate:"Fosfát",alkalinity:"Alkalita",free_chlorine:"Volný chlór",total_chlorine:"Celkový chlór",pressure:"Tlak filtrace",specific_gravity:"Měrná hmotnost",magnesium:"Hořčík",water_level:"Hladina vody",flow_rate:"Průtok",uv_radiation:"UV záření",product_volume:"Objem přípravku",product_weight:"Hmotnost přípravku",ec:"Elektrická vodivost",bromine:"Brom",chlorinator:"Nastavení chlorátoru",pump_speed:"Rychlost čerpadla",light_brightness:"Jas světla",heat_pump_setpoint:"Nastavená hodnota tepelného čerpadla"},time:{seconds:"právě nyní",minutes:"před {minutes} minutou",hours:"před {hours} hodinou",days:"před {days} dnem"},time_plural:{seconds:"právě nyní",minutes:"před {minutes} minutami",hours:"před {hours} hodinami",days:"před {days} dny"}};const Ee={en:he,fr:me,es:ge,de:_e,it:ye,nl:ve,pt:fe,"pt-br":be,ro:$e,sk:we,he:xe,ru:Se,hu:Ce,sv:ke,cs:Ae};const getTranslation=(e,s)=>{const o=s.split(".");let l=Ee[e]||Ee.en;for(const e of o)if(l&&typeof l==="object")l=l[e];else return s;return l||s};const formatTranslation=(e,s)=>{if(!s)return e;return Object.entries(s).reduce((e,[s,o])=>e.replace(`{${s}}`,String(o)),e)};const Pe=i$3`
  /**
   * The card renders an ha-card, which carries Home Assistant's own background,
   * radius, border and shadow — and which card-mod can target, as it does on
   * every other card. :host used to imitate all of that, which is why a
   * card-mod rule on ha-card matched nothing here (#1).
   */
  :host {
    display: block;
  }

  ha-card {
    overflow: hidden;
    transition: all 0.3s ease-out 0s;
    position: relative;
    padding-top: 25px;
  }

  /** Section layouts */
  .section {
    padding-bottom: 10px;
    padding: 0px;
  }

  .section.disabled {
    opacity: 0.4;
    filter: grayscale(0.8);
    pointer-events: none;
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
    flex-shrink: 0;
    margin-top: 35px;
  }

  .section-compact .pool-monitor-entity-img {
    margin-top: 0;
  }

  .section-row {
    display: flex;
    align-items: flex-start;
  }

  /** Unified gauge container — marker, bar, labels share same coordinate space */
  .sensor-gauge {
    flex: 1;
    min-width: 0;
  }

  .gauge-marker-zone {
    position: relative;
    height: 35px;
  }

  .gauge-marker-zone .marker {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    height: 20px;
    padding: 2px 8px;
    border-radius: 5px;
    position: absolute;
    top: 0;
    z-index: 2;
    white-space: nowrap;
    font-size: 13px;
    font-weight: 600;
  }

  .gauge-marker-zone .marker-state {
    font-size: 0.85em;
    font-weight: 400;
    opacity: 0.9;
  }

  .gauge-marker-zone .triangle {
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    position: absolute;
    bottom: 0px;
    z-index: 2;
  }

  /** Main container layouts */
  .pool-monitor-container {
    display: grid;
    padding: 5px 0;
    height: 15px;
    position: relative;
  }

  .gauge-labels {
    position: relative;
    height: 18px;
    margin-top: -5px;
  }

  .gauge-label {
    position: absolute;
    transform: translateX(-50%);
    font-size: 0.8em;
    white-space: nowrap;
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
    height: 15px;
    padding-left: 3px;
    padding-right: 3px;
    padding-top: 0px;
    top: 5px;
    font-size: 11px;
    font-weight: 500;
    text-align: right;
    color: black;
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

  .status-container {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 15px 10px;
    cursor: pointer;
  }

  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 0.85em;
    font-weight: 600;
    color: white;
    text-transform: capitalize;
  }

  .status-badge ha-icon {
    color: white;
  }

  .status-friendly-name {
    font-size: 0.8em;
    color: var(--secondary-text-color, #888);
  }

  /**
   * Static sizing lives here, not in inline style attributes. An inline style
   * beats any injected stylesheet by specificity, so card-mod could not reach
   * these — which is what @apsmith12 ran into asking to adjust element and font
   * sizes (#1). Dynamic values (computed positions, colours from the reading)
   * stay inline: they change per render.
   */
  .entity-icon {
    width: 32px;
    height: 32px;
  }

  .entity-icon-compact {
    width: 24px;
    height: 24px;
  }

  .gauge-scale {
    display: flex;
    justify-content: space-between;
    margin: 0 10px;
    font-size: 0.7em;
    color: var(--secondary-text-color);
  }

  .status-note {
    font-size: 0.85em;
    opacity: 0.7;
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

  .battery-indicator {
    font-size: 9px;
    vertical-align: middle;
    margin-left: 4px;
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
`;class cardContent{static generateTitle(e){const s=e.title!==void 0?oe` <h1 class="pool-monitor-title">${e.title}</h1> `:oe``;return oe`${s}`}static generateStatusBadge(e){return oe`
      <div class="status-container" @click=${()=>cardContent._moreinfo(e.entity_id)}>
        <span class="status-badge" style="background-color: ${e.color};">
          <ha-icon icon="${e.icon}" style="--mdc-icon-size: 16px;"></ha-icon>
          ${e.label}
        </span>
        ${e.friendly_name?oe`<span class="status-friendly-name">${e.friendly_name}</span>`:""}
      </div>
    `}static generateBody(e,s){if(!s)return oe` <div class="warning-message">No sensor data available</div> `;const o=s.pct_marker;const l=o<=1?"translateX(0)":o>=99?"translateX(-100%)":"translateX(-50%)";return oe`
      <!-- ##### ${s.name} section ##### -->
      <div
        class="${s.disabled?"section disabled":"section"}"
        @click=${()=>cardContent._moreinfo(s.entity)}
      >
        <div class="section-row">
          ${!s.hide_icon?oe`
                <div class="pool-monitor-entity-img">
                  ${s.is_mdi?oe` <ha-icon icon="${s.mdi_icon}" class="entity-icon"></ha-icon> `:oe` <img src="${s.img_src}" class="entity-icon" /> `}
                </div>
              `:""}
          <div class="sensor-gauge">
            <div class="gauge-marker-zone">
              <div
                class="marker"
                style="background-color: ${s.color};color: black;left: ${o}%;transform: ${l};"
              >
                ${s.side_align==="right"&&s.state?oe`<span class="marker-state">${s.state}</span>`:""}
                ${s.value!=null?`${s.value} ${s.unit}`:"—"}
                ${s.side_align==="left"&&s.state?oe`<span class="marker-state">${s.state}</span>`:""}
              </div>
              <div
                class="triangle"
                style="border-top: 8px solid ${s.color};left: ${o}%;transform: ${l};"
              ></div>
            </div>
            <div class="pool-monitor-container">
              ${e.display.gradient?oe`
                    <div
                      class="progress-bar-child"
                      style="background: linear-gradient(to right,
                  ${s.mode==="heatflow"?`${e.colors.cool} 15%,\n                     ${e.colors.low} 50%,\n                     ${e.colors.warn} 85%`:`${e.colors.warn} 5%,\n                     ${e.colors.low} 30%,\n                     ${e.colors.normal},\n                     ${e.colors.normal},\n                     ${e.colors.low} 70%,\n                     ${e.colors.warn} 95%`}
                );"
                    ></div>
                  `:oe`
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
                    <div class="gauge-scale">
                      <span>${s.min}</span>
                      <span>${s.max}</span>
                    </div>
                  `}
              ${s.pct_min!==s.pct_cursor?oe`<div
                    class="cursor-text"
                    style="border-left: 2px solid ${e.colors.hi_low}; border-top: 2px solid ${e.colors.hi_low}; border-bottom: 2px solid ${e.colors.hi_low}; width: 2px; height: 12px; text-align:${s.side_align}; background-color:transparent; ${s.side_align}: ${s.pct_min}%;"
                  ></div>`:""}
              ${s.pct_max!==s.pct_cursor?oe`<div
                    class="cursor-text"
                    style="border-right: 2px solid ${e.colors.hi_low}; border-top: 2px solid ${e.colors.hi_low}; border-bottom: 2px solid ${e.colors.hi_low}; width: 2px; height: 12px; text-align:${s.side_align}; background-color:transparent; ${s.side_align}: ${s.pct_max}%;"
                  ></div>`:""}
            </div>
            <div class="gauge-labels">
              <span class="gauge-label" style="left: ${s.label_positions[0]}%"
                >${s.setpoint_class[0]}</span
              >
              <span class="gauge-label" style="left: ${s.label_positions[1]}%"
                >${s.setpoint_class[1]}</span
              >
              <span
                class="gauge-label"
                style="left: ${s.label_positions[2]}%;color:${e.colors.normal}"
                >${s.setpoint_class[2]}</span
              >
              <span class="gauge-label" style="left: ${s.label_positions[3]}%"
                >${s.setpoint_class[3]}</span
              >
              <span class="gauge-label" style="left: ${s.label_positions[4]}%"
                >${s.setpoint_class[4]}</span
              >
            </div>
          </div>
        </div>
      </div>
      <div
        style="display:flex;justify-content:space-between;align-items:center;padding:0 15px;margin-top:-5px;font-size:${e.display.name_font_size||"0.8em"};color:var(--secondary-text-color);"
      >
        <span
          style="${e.display.name_font_weight?`font-weight:${e.display.name_font_weight}`:""}"
        >
          ${s.title}
          ${s.battery_icon?oe`<span class="battery-indicator" style="color: ${s.battery_color};">
                <ha-icon icon="${s.battery_icon}" style="--mdc-icon-size: 14px;"></ha-icon>
                ${s.battery_level!=null?oe`${s.battery_level}%`:""}
              </span>`:""}
        </span>
        ${s.last_updated?oe`<span class="status-note">${s.last_updated}</span>`:""}
      </div>
    `}static generateCompactBody(e,s){if(!s)return oe` <div class="warning-message">No sensor data available</div> `;return oe`
      <!-- ##### ${s.name} section ##### -->
      <div class="section-compact" @click=${()=>cardContent._moreinfo(s.entity)}>
        <div class="section-row">
          ${!s.hide_icon?oe`
                <div class="pool-monitor-entity-img">
                  ${s.is_mdi?oe`
                        <ha-icon icon="${s.mdi_icon}" class="entity-icon-compact"></ha-icon>
                      `:oe` <img src="${s.img_src}" class="entity-icon-compact" /> `}
                </div>
              `:""}
          <div class="sensor-gauge">
            <div class="pool-monitor-container">
              ${e.display.gradient?oe`
                    <div
                      class="progress-bar-child"
                      style="background: linear-gradient(to right,
                  ${s.mode==="heatflow"?`${e.colors.cool} 15%,\n                     ${e.colors.low} 50%,\n                     ${e.colors.warn} 85%`:`${e.colors.warn} 5%,\n                     ${e.colors.low} 30%,\n                     ${e.colors.normal},\n                     ${e.colors.normal},\n                     ${e.colors.low} 70%,\n                     ${e.colors.warn} 95%`}
                );"
                    ></div>
                  `:oe`
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
                    <div class="gauge-scale">
                      <span>${s.min}</span>
                      <span>${s.max}</span>
                    </div>
                  `}
              <div
                class="cursor-text"
                style="border-${s.side_align}: 5px solid ${e.colors.marker}; text-align:${s.side_align};background-color:transparent ;${s.side_align}: ${s.pct_cursor}%;${e.display.name_font_size?`font-size:${e.display.name_font_size}`:""}${e.display.name_font_weight?`;font-weight:${e.display.name_font_weight}`:""}"
              >
                &nbsp; ${s.title} ${s.value!=null?`${s.value} ${s.unit}`:"—"}
                ${s.separator} ${s.state}
                ${s.battery_icon?oe`<ha-icon
                        icon="${s.battery_icon}"
                        style="--mdc-icon-size: 12px; color: ${s.battery_color};"
                      ></ha-icon
                      >${s.battery_level!=null?oe`${s.battery_level}%`:""}`:""}
                &nbsp;
              </div>
              ${s.pct_min!==s.pct_cursor?oe`<div
                    class="cursor-text"
                    style="border-left: 2px solid ${e.colors.hi_low}; border-top: 2px solid ${e.colors.hi_low}; border-bottom: 2px solid ${e.colors.hi_low}; width: 2px; height: 12px; text-align:${s.side_align}; background-color:transparent; ${s.side_align}: ${s.pct_min}%;"
                  ></div>`:""}
              ${s.pct_max!==s.pct_cursor?oe`<div
                    class="cursor-text"
                    style="border-right: 2px solid ${e.colors.hi_low}; border-top: 2px solid ${e.colors.hi_low}; border-bottom: 2px solid ${e.colors.hi_low}; width: 2px; height: 12px; text-align:${s.side_align}; background-color:transparent; ${s.side_align}: ${s.pct_max}%;"
                  ></div>`:""}
            </div>
            <div class="gauge-labels">
              <span class="gauge-label" style="left: ${s.label_positions[0]}%"
                >${s.setpoint_class[0]}</span
              >
              <span class="gauge-label" style="left: ${s.label_positions[1]}%"
                >${s.setpoint_class[1]}</span
              >
              <span
                class="gauge-label"
                style="left: ${s.label_positions[2]}%;color:${e.colors.normal}"
                >${s.setpoint_class[2]}</span
              >
              <span class="gauge-label" style="left: ${s.label_positions[3]}%"
                >${s.setpoint_class[3]}</span
              >
              <span class="gauge-label" style="left: ${s.label_positions[4]}%"
                >${s.setpoint_class[4]}</span
              >
            </div>
          </div>
        </div>
      </div>
    `}static _moreinfo(e){const s=new Event("hass-more-info",{bubbles:true,composed:true});s.detail={entityId:e};const o=document.querySelector("home-assistant");if(o)o.dispatchEvent(s)}}const Oe={compact:false,show_names:true,show_labels:true,show_last_updated:false,show_icons:true,show_units:true,gradient:true,language:"en"};const Me={low:"#fdcb6e",warn:"#e17055",normal:"#00b894",cool:"#00BFFF",hazardous:"#8e44ad",marker:"#000000",hi_low:"#00000099"};function getDisplayConfig(){return Object.assign({},Oe)}function getColorConfig(){return Object.assign({},Me)}function getSensorConfig(e,s){if(!s[e])return{};return Object.assign({},s[e])}class MonitorCardBase extends i{render(){const e=this.getConfig();const s=this.processData();const o=this.resolveStatus();const l=e.display.compact?cardContent.generateCompactBody:cardContent.generateBody;if(!s||Object.keys(s).length===0)return oe` <ha-card
        ><div id="pool-monitor-card">
          <div class="warning-message">
            <ha-icon icon="mdi:alert"></ha-icon>
            <span>No valid sensor data available</span>
          </div>
        </div></ha-card
      >`;return oe` <ha-card
      ><div id="pool-monitor-card">
        ${cardContent.generateTitle(e)}
        ${o?cardContent.generateStatusBadge(o):""}
        ${Object.values(s).map(s=>{if(s===null||s===void 0?void 0:s.invalid)return oe`
              <div class="warning-message">
                <ha-icon icon="mdi:alert"></ha-icon>
                <span
                  >Sensor ${(s===null||s===void 0?void 0:s.name)||"unknown"} is not supported. Please verify its
                  configuration and ensure it is compatible with the card.</span
                >
              </div>
            `;else if(s===null||s===void 0?void 0:s.not_found)return oe`
              <div class="warning-message">
                <ha-icon icon="mdi:alert"></ha-icon>
                <span
                  >Entity ${(s===null||s===void 0?void 0:s.entity)||"unknown"} could not be found. Please verify its
                  name and ensure the entity is properly configured.</span
                >
              </div>
            `;return l(e,s)})}
      </div></ha-card
    >`}getCardSize(){var e,s,o,l;if(!((e=this.config)===null||e===void 0?void 0:e.sensors))return 3;const p=Object.values(this.config.sensors).reduce((e,s)=>e+(Array.isArray(s)?s.length:1),0);const u=(o=(s=this.config)===null||s===void 0?void 0:s.display)===null||o===void 0?void 0:o.compact;const h=((l=this.config)===null||l===void 0?void 0:l.title)?1:0;return h+p*(u?2:3)}getGridOptions(){const e=this.getCardSize();return{rows:e,min_rows:Math.max(2,Math.ceil(e/2)),columns:12,min_columns:6}}processData(){const e={};const s=this.getConfig();Object.entries(s.sensors).forEach(([s,o])=>{const l=Array.isArray(o)?o:[o];l.forEach((o,l)=>{var p,u,h,m,g;const _=`${s}_${l+1}`;e[_]=this.calculateData(s,o.title||this.getTranslatedText("sensor."+s),o.entity,o.min,o.max,o.setpoint,o.step,o.unit,o.icon,o.image_url,o.mode,o.min_limit,o.override_value,o.override,o.invalid,o.step_low,o.step_high,o.last_updated_entity,o.last_updated_attribute,o.setpoint_entity,o.min_limit_entity,o.limits,o.direction);if(o.availability_entity){const s=(h=(u=(p=this.hass)===null||p===void 0?void 0:p.states)===null||u===void 0?void 0:u[o.availability_entity])===null||h===void 0?void 0:h.state;e[_].disabled=s==="off"||s==="unavailable"}if(o.battery_entity){const s=(g=(m=this.hass)===null||m===void 0?void 0:m.states)===null||g===void 0?void 0:g[o.battery_entity];if(!s||s.state==="unavailable"||s.state==="unknown"){e[_].battery_level=null;e[_].battery_icon="mdi:battery-unknown";e[_].battery_color="var(--disabled-text-color, #bdbdbd)"}else{const o=parseFloat(s.state);if(isNaN(o)){e[_].battery_level=null;e[_].battery_icon="mdi:battery-unknown";e[_].battery_color="var(--disabled-text-color, #bdbdbd)"}else{e[_].battery_level=o;e[_].battery_icon=o>50?"mdi:battery":o>=20?"mdi:battery-50":"mdi:battery-20";e[_].battery_color=o>50?"var(--state-sensor-battery-high-color, #4caf50)":o>=20?"var(--state-sensor-battery-medium-color, #ff9800)":"var(--state-sensor-battery-low-color, #f44336)"}}}})});return e}getTranslatedText(e,s){var o;const l=((o=this.config)===null||o===void 0?void 0:o.display.language)||"en";const p=getTranslation(l,e);return formatTranslation(p,s)}calculateData(e,s,o,l,p,u,h,m,g,_,v,f,b,$,w,C,A,E,P,O,T,j,F){var U,B,q,W,G,K;const J={};const X=this.getConfig();const Y=this.constructor.SENSORS||{};const Q=getSensorConfig(e,Y);const ee=this.constructor.IMAGE_BASE_URL||"";J.name=e;J.invalid=w;J.mode=v;J.title=X.display.show_names?s:oe`&nbsp;`;J.hide_icon=false;J.is_mdi=false;if(!X.display.show_icons)J.hide_icon=true;else{const s=g||"";const o=_||"";if(s==="hide")J.hide_icon=true;else if(o)J.img_src=o;else if(s&&typeof s==="string"&&s.startsWith("mdi:")){J.is_mdi=true;J.mdi_icon=s}else if(ee)J.img_src=`${ee}/${e}.png`;else{J.is_mdi=true;J.mdi_icon="mdi:gauge"}}if(!this.hass||!this.hass.states||!this.hass.states[o]){console.warn(`Entity not found: ${o}`);J.value=null;J.entity=o;J.not_found=true;return J}const te=this.hass.states[o];const se=(U=this.hass.entities)===null||U===void 0?void 0:U[o];const ie=(K=(W=(B=se===null||se===void 0?void 0:se.display_precision)!==null&&B!==void 0?B:(q=te.attributes)===null||q===void 0?void 0:q.display_precision)!==null&&W!==void 0?W:(G=te.attributes)===null||G===void 0?void 0:G.precision)!==null&&K!==void 0?K:this.countDecimals(parseFloat(te.state));const ae=parseFloat(te.state);J.entity=o;if(isNaN(ae)){J.value=null;J.state="";J.color="var(--disabled-text-color, #bdbdbd)";J.pct="50";J.pct_min="50";J.pct_max="50";J.pct_cursor="50";J.pct_marker=50;J.pct_state_step="50";J.side_align="left";J.separator="";J.unit="";J.setpoint_class=["","","","",""];J.label_positions=[50,50,50,50,50];J.progressClass="";if(X.display.show_last_updated)J.last_updated=this.resolveLastUpdated(te,E,P);return J}J.value=Number(ae.toFixed(ie));if(X.display.show_last_updated)J.last_updated=this.resolveLastUpdated(te,E,P);J.unit=X.display.show_units?m||Q.unit||"":"";if($)J.value=b||Q.override;const asBound=e=>typeof e==="number"&&!isNaN(e)?e:void 0;const asEntity=e=>typeof e==="string"&&e!==""?e:void 0;const re=asBound(l);const ne=asBound(p);const le=asEntity(l);const ce=asEntity(p);J.min_value=le!==void 0&&this.hass.states[le]&&!isNaN(parseFloat(this.hass.states[le].state))?parseFloat(this.hass.states[le].state):J.value;J.max_value=ce!==void 0&&this.hass.states[ce]&&!isNaN(parseFloat(this.hass.states[ce].state))?parseFloat(this.hass.states[ce].state):J.value;const de=this.resolveEntityNumber(O);const pe=de!=null?de:u!=null?parseFloat(String(u)):Q.setpoint!=null?parseFloat(String(Q.setpoint)):J.value;const ue=h!=null?parseFloat(String(h)):Q.step!=null?parseFloat(String(Q.step)):.1;const he=C!=null?parseFloat(String(C)):Q.step_low!=null?parseFloat(String(Q.step_low)):ue;const me=A!=null?parseFloat(String(A)):Q.step_high!=null?parseFloat(String(Q.step_high)):ue;const ge=Array.isArray(j)&&j.length===4;const _e=(j||[]).map(Number);const ye=ge?Math.max(..._e.map(e=>this.countDecimals(e)),0):Math.max(this.countDecimals(pe),this.countDecimals(he),this.countDecimals(me));J.setpoint=pe;const ve=this.resolveEntityNumber(T);const fe=ve!=null?ve:f!==void 0?Number(f):-1/0;const be=ge?Math.max(fe,re!=null?re:0):Math.max(fe,pe-2*he);const $e=ge?Math.max(fe,_e[0]):Math.max(fe,pe-he);const we=ge?Math.max(fe,_e[1]):Math.max(fe,pe);const xe=ge?Math.max(fe,_e[2]):Math.max(fe,pe+me);const Se=ge?Math.max(fe,_e[3]):Math.max(fe,pe+2*me);J.setpoint_class=[be.toFixed(ye),$e.toFixed(ye),we.toFixed(ye),xe.toFixed(ye),Se.toFixed(ye)];J.separator=X.display.show_labels?"-":"";J.color="transparent";if(J.value!==null)J.value=Math.max(fe,J.value);if(ge){const e=[X.colors.cool,X.colors.normal,X.colors.low,X.colors.warn,X.colors.hazardous];const s=["state.1","state.2","state.3","state.5","state.6"];if(F==="higher_is_better"){e.reverse();s.reverse()}const o=Number(J.value);const l=[1,2,3,4].findIndex(e=>o<Number(J.setpoint_class[e]));const p=l===-1?4:l;J.color=e[p];J.state=X.display.show_labels?this.getTranslatedText(s[p]):""}else if(v==="heatflow")if(Number(J.value)<Number(J.setpoint_class[1])){J.state=X.display.show_labels?this.getTranslatedText("state.1"):"";J.color=X.colors.cool}else if(Number(J.value)>=Number(J.setpoint_class[1])&&Number(J.value)<Number(J.setpoint_class[3])){J.state=X.display.show_labels?this.getTranslatedText("state.3"):"";J.color=X.colors.normal}else{J.state=X.display.show_labels?this.getTranslatedText("state.5"):"";J.color=X.colors.warn}else if(Number(J.value)<Number(J.setpoint_class[0])){J.state=X.display.show_labels?this.getTranslatedText("state.1"):"";J.color=X.colors.warn}else if(Number(J.value)>=Number(J.setpoint_class[0])&&Number(J.value)<Number(J.setpoint_class[1])){J.state=X.display.show_labels?this.getTranslatedText("state.2"):"";J.color=X.colors.low}else if(Number(J.value)>=Number(J.setpoint_class[1])&&Number(J.value)<Number(J.setpoint_class[2])){J.state=X.display.show_labels?this.getTranslatedText("state.3"):"";J.color=X.colors.normal}else if(Number(J.value)>=Number(J.setpoint_class[2])&&Number(J.value)<Number(J.setpoint_class[3])){J.state=X.display.show_labels?this.getTranslatedText("state.4"):"";J.color=X.colors.normal}else if(Number(J.value)>=Number(J.setpoint_class[3])&&Number(J.value)<Number(J.setpoint_class[4])){J.state=X.display.show_labels?this.getTranslatedText("state.5"):"";J.color=X.colors.low}else if(Number(J.value)>=Number(J.setpoint_class[4])){J.state=X.display.show_labels?this.getTranslatedText("state.6"):"";J.color=X.colors.warn}J.progressClass=e==="temperature"?"progress-temp":"progress";const Ce=re!=null?re:pe-3*he;const ke=ne!=null?ne:pe+3*me;const Ae=ke-Ce;J.bar_min=Ce;J.bar_max=ke;const clamp01=e=>Math.max(0,Math.min(1,e));const toRatio=e=>Ae>0?clamp01((e-Ce)/Ae):0;const Ee=toRatio(J.value);J.pct=(Ee*100).toFixed(1);J.pct_marker=Ee*100;J.side_align=J.value>pe?"right":"left";J.pct_cursor=J.value>pe?100-Ee*100:Ee*100;J.pct_state_step=J.value>pe?100-Ee*100+1:Ee*100+1;const Pe=toRatio(J.min_value)*100;const Oe=toRatio(J.max_value)*100;J.pct_min=J.value>pe?100-Pe:Pe;J.pct_max=J.value>pe?100-Oe:Oe;J.label_positions=[toRatio(be)*100,toRatio($e)*100,toRatio(we)*100,toRatio(xe)*100,toRatio(Se)*100];return J}countDecimals(e){if(e===void 0||e===null)return 0;if(Math.floor(e)===e)return 0;const s=e.toString();if(s.includes("."))return s.split(".")[1].length||0;return 0}resolveStatus(){var e,s,o;const l=this.getConfig();const p=l.status_entity;if(!p)return null;const u=(s=(e=this.hass)===null||e===void 0?void 0:e.states)===null||s===void 0?void 0:s[p];if(!u)return null;const h=u.state;if(h==="unavailable"||h==="unknown")return null;const m=l.colors;const g=(o=u.attributes)===null||o===void 0?void 0:o.friendly_name;const _=parseFloat(h);let v;if(!isNaN(_))v=_<=33?"danger":_<=66?"warning":"good";else{const e=h.toLowerCase();const s=["safe","good","ok","healthy","optimal","green","normal"];const o=["warning","caution","moderate","yellow"];const l=["danger","critical","bad","poor","unsafe","red","high","low"];if(s.includes(e))v="good";else if(o.includes(e))v="warning";else if(l.includes(e))v="danger";else v="unknown"}const f={good:m.normal,warning:m.low,danger:m.warn,unknown:"var(--disabled-text-color, #bdbdbd)"};const b={good:"mdi:check-circle",warning:"mdi:alert",danger:"mdi:alert-octagon",unknown:"mdi:help-circle"};return{label:h,color:f[v],icon:b[v],friendly_name:g,entity_id:p}}resolveEntityNumber(e){var s,o;if(!e)return null;const l=(o=(s=this.hass)===null||s===void 0?void 0:s.states)===null||o===void 0?void 0:o[e];if(!l)return null;const p=parseFloat(l.state);return isNaN(p)?null:p}resolveLastUpdated(e,s,o){var l,p,u;const h=s?(p=(l=this.hass)===null||l===void 0?void 0:l.states)===null||p===void 0?void 0:p[s]:e;if(!h)return this.timeFromNow(e.last_updated);if(o){const e=(u=h.attributes)===null||u===void 0?void 0:u[o];if(e)return this.timeFromNow(String(e))}return this.timeFromNow(h.last_updated)}timeFromNow(e){const s=new Date(e);const o=Date.now()-s.getTime();const t=(e,s)=>{const o=s===1?"time":"time_plural";const l={[e]:s};return this.getTranslatedText(`${o}.${e}`,l)};const l=Math.floor(o/6e4);const p=Math.floor(l/60);const u=Math.floor(p/24);if(l<1)return t("seconds",0);if(l<60)return t("minutes",l);if(p<24)return t("hours",p);return t("days",u)}getConfig(){return this.config}setConfig(e){const s=this.constructor.SENSORS||{};const o=Object.keys(s);const l={display:getDisplayConfig(),colors:getColorConfig()};const p=Object.assign(Object.assign({},e),{status_entity:e.status_entity,display:Object.assign(Object.assign({},l.display),e.display||{}),colors:Object.assign(Object.assign({},l.colors),e.colors||{}),sensors:{}});if(!e.sensors)throw new Error('Configuration requires sensors to be defined under the "sensors" key.');Object.entries(e.sensors).forEach(([e,l])=>{const u=s[e]||{};const h=Array.isArray(l)?[...l]:[Object.assign({},l)];if(h.length===0)throw new Error(`Empty sensor array for ${e}`);const m=h.map(e=>Object.assign(Object.assign(Object.assign({},u),e),{nameDefinedByUser:!!e.name}));m.forEach((s,l)=>{if(!s.entity)throw new Error(`Missing entity for ${e}[${l}]`);if(s.nameDefinedByUser)s.title=s.name;if(o.length>0&&!o.includes(e))s.invalid=true;else s.invalid=false});p.sensors[e]=m});this.config=p}}MonitorCardBase.SENSORS={};MonitorCardBase.IMAGE_BASE_URL="";MonitorCardBase.styles=Pe;__decorate([n({attribute:false})],MonitorCardBase.prototype,"hass",void 0);__decorate([n({attribute:false})],MonitorCardBase.prototype,"config",void 0);function defineCard(e,s){if(customElements.get(e)){console.warn(`[${e}] another custom card already registered this element name, so this one `+`will not render. Both cannot coexist — keep the one you want and remove the other.`);return}customElements.define(e,s)}const Te={temperature:{name:"Temperature",unit:"°C",setpoint:27,step:1,mode:"heatflow",category:"water_chemistry"},orp:{name:"ORP",unit:"mV",setpoint:700,step:50,mode:"centric",min_limit:0,category:"water_chemistry"},ec:{name:"Electrical Conductivity",unit:"µS/cm",setpoint:4e3,step:200,mode:"centric",min_limit:0,category:"water_chemistry"},tds:{name:"TDS",unit:"g/L",setpoint:5,step:.5,mode:"centric",min_limit:0,category:"water_chemistry"},ph:{name:"pH",unit:"pH",setpoint:7.2,step:.2,mode:"centric",min_limit:0,category:"water_chemistry"},salinity:{name:"Salinity",unit:"ppm",setpoint:3e3,step:500,mode:"centric",min_limit:0,category:"chemical_balance"},cya:{name:"Cyanuric Acid",unit:"ppm",setpoint:40,step:10,mode:"centric",min_limit:0,category:"chemical_balance"},calcium:{name:"Calcium",unit:"ppm",setpoint:300,step:100,mode:"centric",min_limit:0,category:"chemical_balance"},phosphate:{name:"Phosphate",unit:"ppb",setpoint:50,step:10,mode:"centric",min_limit:0,category:"chemical_balance"},alkalinity:{name:"Alkalinity",unit:"ppm",setpoint:100,step:20,mode:"centric",min_limit:0,category:"chemical_balance"},free_chlorine:{name:"Free Chlorine",unit:"ppm",setpoint:3,step:.5,mode:"centric",min_limit:0,category:"treatment"},total_chlorine:{name:"Total Chlorine",unit:"ppm",setpoint:3,step:.5,mode:"centric",min_limit:0,category:"treatment"},bromine:{name:"Bromine",unit:"ppm",setpoint:4,step:1,mode:"centric",min_limit:0,category:"treatment"},pressure:{name:"Filter Pressure",unit:"psi",setpoint:12,step:2,mode:"centric",category:"treatment"},specific_gravity:{name:"Specific Gravity",unit:"sg",setpoint:1.1,step:.2,mode:"centric",category:"treatment"},magnesium:{name:"Magnesium",unit:"ppm",setpoint:1200,step:100,mode:"centric",min_limit:0,category:"treatment"},chlorinator:{name:"Chlorinator Setting",unit:"%",setpoint:50,step:10,mode:"heatflow",min_limit:0,category:"treatment"},water_level:{name:"Water Level",unit:"%",setpoint:100,step:10,mode:"centric",min_limit:0,category:"equipment"},flow_rate:{name:"Flow Rate",unit:"m³/h",setpoint:10,step:1,mode:"centric",min_limit:0,category:"equipment"},uv_radiation:{name:"UV Radiation",unit:"mW/cm²",setpoint:4,step:1,mode:"centric",min_limit:0,category:"equipment"},product_volume:{name:"Product Volume",unit:"L",setpoint:20,step:5,mode:"centric",min_limit:0,category:"equipment"},product_weight:{name:"Product Weight",unit:"kg",setpoint:25,step:5,mode:"centric",min_limit:0,category:"equipment"},pump_speed:{name:"Pump Speed",unit:"%",setpoint:50,step:10,mode:"heatflow",min_limit:0,category:"equipment"},light_brightness:{name:"Light Brightness",unit:"%",setpoint:80,step:10,mode:"heatflow",min_limit:0,category:"equipment"},heat_pump_setpoint:{name:"Heat Pump Setpoint",unit:"°C",setpoint:28,step:1,mode:"centric",min_limit:10,category:"equipment"}};const je="2.13.1";const Ne="2026-08-15-20-05";const ze=`${je} (${Ne})`;console.info(`%c POOL-MONITORING-CARD %c ${ze} `,"color: white; background: green; font-weight: 700;","color: green; background: white; font-weight: 700;");window.customCards=window.customCards||[];window.customCards.push({type:"pool-monitor-card",name:"Pool Monitor Card",description:"Monitor your pool water parameters with 21 preset sensors",preview:true,documentationURL:"https://github.com/wilsto/pool-monitor-card"});class PoolMonitorCard extends MonitorCardBase{static async getConfigElement(){await Promise.resolve().then(()=>Le);return document.createElement("pool-monitor-card-editor")}static getStubConfig(){return{sensors:{temperature:{entity:""}}}}}PoolMonitorCard.CARD_INFO={cardType:"pool-monitor-card",cardName:"Pool Monitor Card",cardDescription:'The "Pool Monitor Card" is a home assistant plugin that provides information about the temperature, pH, and ORP levels of your swimming pool'};PoolMonitorCard.SENSORS=Te;PoolMonitorCard.IMAGE_BASE_URL="https://raw.githubusercontent.com/wilsto/pool-monitor-card/master/resources";defineCard("pool-monitor-card",PoolMonitorCard);function fireEvent(e,s,o){e.dispatchEvent(new CustomEvent(s,{bubbles:true,composed:true,detail:o}))}const Fe=Object.entries(Ee).map(([e,s])=>({value:e,label:s.language||e}));const He=[{name:"title",selector:{text:{}}},{name:"status_entity",label:"Status entity",selector:{entity:{}}}];const Re=[{name:"compact",selector:{boolean:{}}},{name:"show_names",selector:{boolean:{}}},{name:"show_labels",selector:{boolean:{}}},{name:"show_last_updated",selector:{boolean:{}}},{name:"show_icons",selector:{boolean:{}}},{name:"show_units",selector:{boolean:{}}},{name:"gradient",selector:{boolean:{}}},{name:"language",selector:{select:{options:Fe}}},{name:"name_font_size",label:"Name font size (e.g. 0.8em, 14px)",selector:{text:{}}},{name:"name_font_weight",label:"Name font weight",selector:{select:{options:[{value:"",label:"Default"},{value:"normal",label:"Normal"},{value:"bold",label:"Bold"},{value:"300",label:"Light (300)"},{value:"600",label:"Semi-bold (600)"}]}}}];const Ue=[{name:"low",label:"Low",selector:{text:{}}},{name:"warn",label:"Warn",selector:{text:{}}},{name:"normal",label:"Normal",selector:{text:{}}},{name:"cool",label:"Cool",selector:{text:{}}},{name:"marker",label:"Marker",selector:{text:{}}},{name:"hi_low",label:"Hi/Low",selector:{text:{}}}];const De=i$3`
  .card-config {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .section {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .section-header {
    font-weight: 500;
    font-size: 14px;
    color: var(--primary-text-color);
    margin-bottom: 4px;
  }

  ha-expansion-panel {
    --expansion-panel-summary-padding: 0 16px;
    --expansion-panel-content-padding: 0 16px 16px;
  }

  /* Sensor editor styles */
  .sensor-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .sensor-row {
    border: 1px solid var(--divider-color);
    border-radius: 8px;
    overflow: hidden;
  }

  .sensor-row-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    cursor: pointer;
    background: var(--secondary-background-color);
  }

  .sensor-row-header:hover {
    background: var(--primary-background-color);
  }

  .sensor-row-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 500;
  }

  .sensor-row-actions {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .sensor-row-content {
    padding: 8px 12px 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    border-top: 1px solid var(--divider-color);
  }

  .sensor-row-entity {
    display: flex;
    gap: 8px;
    align-items: flex-end;
  }

  .sensor-row-entity ha-entity-picker {
    flex: 1;
  }

  .sensor-advanced {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-top: 8px;
    border-top: 1px dashed var(--divider-color);
  }

  .sensor-field-row {
    display: flex;
    gap: 8px;
  }

  .sensor-field-row > * {
    flex: 1;
  }

  .add-sensor-row {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .add-sensor-row > *:first-child {
    flex: 1;
  }

  .freeform-input {
    display: flex;
    gap: 8px;
    align-items: flex-end;
  }

  .freeform-input .text-field {
    flex: 1;
  }

  /* Native text field. HA removed ha-textfield in 2026.5 and states plainly
     that custom cards should not depend on its internal components, so the
     editor styles its own inputs with HA's CSS variables instead. */
  .text-field {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
    min-width: 0;
  }

  .text-field-label {
    font-size: 12px;
    color: var(--secondary-text-color);
  }

  .text-field-input {
    width: 100%;
    box-sizing: border-box;
    padding: 8px 12px;
    border: 1px solid var(--divider-color);
    border-radius: 8px;
    background: var(--secondary-background-color);
    color: var(--primary-text-color);
    font-size: 14px;
    font-family: inherit;
  }

  .text-field-input:hover {
    border-color: var(--primary-color);
  }

  .text-field-input:focus {
    outline: none;
    border-color: var(--primary-color);
  }

  ha-icon-button {
    --mdc-icon-button-size: 36px;
    --mdc-icon-size: 20px;
  }

  .delete-btn {
    color: var(--error-color);
  }

  .expand-btn {
    color: var(--secondary-text-color);
  }

  .sensor-select {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid var(--divider-color);
    border-radius: 8px;
    background: var(--secondary-background-color);
    color: var(--primary-text-color);
    font-size: 14px;
    cursor: pointer;
    appearance: auto;
  }

  .sensor-select:hover {
    border-color: var(--primary-color);
  }

  .sensor-select:focus {
    outline: none;
    border-color: var(--primary-color);
  }

  .empty-message {
    padding: 16px;
    text-align: center;
    color: var(--secondary-text-color);
    font-style: italic;
  }
`;class MonitorEditorBase extends i{setConfig(e){this._config=Object.assign(Object.assign({},e),{display:Object.assign(Object.assign({},Oe),e.display),colors:Object.assign(Object.assign({},Me),e.colors),sensors:e.sensors||{}})}render(){if(!this.hass||!this._config)return oe``;return oe`
      <div class="card-config">
        <div class="section">
          <ha-form
            .hass=${this.hass}
            .data=${{title:this._config.title||"",status_entity:this._config.status_entity||""}}
            .schema=${He}
            .computeLabel=${this._computeLabel}
            @value-changed=${this._generalChanged}
          ></ha-form>
        </div>

        <div class="section">
          <div class="section-header">Sensors</div>
          ${this.renderSensorSection()}
        </div>

        <ha-expansion-panel .header=${"Display Options"}>
          <ha-form
            .hass=${this.hass}
            .data=${this._config.display}
            .schema=${Re}
            .computeLabel=${this._computeLabel}
            @value-changed=${this._displayChanged}
          ></ha-form>
        </ha-expansion-panel>

        <ha-expansion-panel .header=${"Colors"}>
          <ha-form
            .hass=${this.hass}
            .data=${this._config.colors}
            .schema=${Ue}
            .computeLabel=${this._computeLabel}
            @value-changed=${this._colorsChanged}
          ></ha-form>
        </ha-expansion-panel>
      </div>
    `}_generalChanged(e){e.stopPropagation();const s=e.detail.value;this._config=Object.assign(Object.assign({},this._config),{title:s.title||void 0,status_entity:s.status_entity||void 0});this._fireConfigChanged()}_displayChanged(e){e.stopPropagation();this._config=Object.assign(Object.assign({},this._config),{display:Object.assign(Object.assign({},this._config.display),e.detail.value)});this._fireConfigChanged()}_colorsChanged(e){e.stopPropagation();this._config=Object.assign(Object.assign({},this._config),{colors:Object.assign(Object.assign({},this._config.colors),e.detail.value)});this._fireConfigChanged()}_sensorsChanged(e){e.stopPropagation();this._config=Object.assign(Object.assign({},this._config),{sensors:e.detail.sensors});this._fireConfigChanged()}_fireConfigChanged(){fireEvent(this,"config-changed",{config:this._config})}_computeLabel(e){const s=e.label||e.name;return s.replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase())}}MonitorEditorBase.styles=De;__decorate([n({attribute:false})],MonitorEditorBase.prototype,"hass",void 0);__decorate([r()],MonitorEditorBase.prototype,"_config",void 0);class MonitorSensorEditor extends i{constructor(){super(...arguments);this.sensors={};this.registry={};this.freeform=false;this._expanded={};this._newSensorType=""}render(){const e=Object.entries(this.sensors);return oe`
      <div class="sensor-list">
        ${e.length===0?oe`<div class="empty-message">No sensors configured. Add one below.</div>`:e.map(([e,s])=>this._renderSensorType(e,s))}
        ${this._renderAddSensor()}
      </div>
    `}_textField(e){const handle=s=>e.onChange(s.target.value);const s=e.numeric?"number":"text";return oe`
      <label class="text-field">
        <span class="text-field-label">${e.label}</span>
        ${e.live?oe`<input
              class="text-field-input"
              type=${s}
              .value=${e.value}
              @input=${handle}
            />`:oe`<input
              class="text-field-input"
              type=${s}
              .value=${e.value}
              @change=${handle}
            />`}
      </label>
    `}_renderSensorType(e,s){if(Array.isArray(s))return oe`${s.map((o,l)=>this._renderSensorRow(e,o,l,s.length>1))}`;return this._renderSensorRow(e,s,0,false)}_renderSensorRow(e,s,o,l){const p=l?`${e}-${o}`:e;const u=this._expanded[p]||false;const h=this.registry[e];const m=(h===null||h===void 0?void 0:h.name)||e;const g=l?`${m} #${o+1}`:m;return oe`
      <div class="sensor-row">
        <div class="sensor-row-header" @click=${()=>this._toggleExpand(p)}>
          <div class="sensor-row-title">
            <ha-icon icon=${u?"mdi:chevron-down":"mdi:chevron-right"}></ha-icon>
            <span>${g}</span>
            ${s.entity?oe`<span
                  style="color: var(--secondary-text-color); font-weight: normal; font-size: 12px;"
                  >${s.entity}</span
                >`:re}
          </div>
          <div class="sensor-row-actions">
            <ha-icon-button
              class="delete-btn"
              .path=${"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"}
              @click=${s=>{s.stopPropagation();this._removeSensor(e,o)}}
            ></ha-icon-button>
          </div>
        </div>
        ${u?this._renderSensorFields(e,s,o):re}
      </div>
    `}_renderSensorFields(e,s,o){return oe`
      <div class="sensor-row-content">
        <ha-entity-picker
          .hass=${this.hass}
          .value=${s.entity||""}
          .label=${"Entity"}
          allow-custom-entity
          @value-changed=${s=>this._updateField(e,o,"entity",s.detail.value)}
        ></ha-entity-picker>

        <div class="sensor-field-row">
          ${this._textField({label:"Name override",value:s.name||"",onChange:s=>this._updateField(e,o,"name",s||void 0)})}
          ${this._textField({label:"Unit override",value:s.unit||"",onChange:s=>this._updateField(e,o,"unit",s||void 0)})}
        </div>

        <div class="sensor-field-row">
          ${this._textField({label:"Setpoint",value:s.setpoint!=null?String(s.setpoint):"",numeric:true,onChange:s=>this._updateField(e,o,"setpoint",s?Number(s):void 0)})}
          ${this._textField({label:"Step",value:s.step!=null?String(s.step):"",numeric:true,onChange:s=>this._updateField(e,o,"step",s?Number(s):void 0)})}
          ${this._textField({label:"Min limit",value:s.min_limit!=null?String(s.min_limit):"",numeric:true,onChange:s=>this._updateField(e,o,"min_limit",s?Number(s):void 0)})}
        </div>

        <div class="sensor-field-row">
          ${this._textField({label:"Step low",value:s.step_low!=null?String(s.step_low):"",numeric:true,onChange:s=>this._updateField(e,o,"step_low",s?Number(s):void 0)})}
          ${this._textField({label:"Step high",value:s.step_high!=null?String(s.step_high):"",numeric:true,onChange:s=>this._updateField(e,o,"step_high",s?Number(s):void 0)})}
        </div>

        <div class="sensor-field-row">
          <ha-entity-picker
            .hass=${this.hass}
            .value=${s.min||""}
            .label=${"Min entity"}
            allow-custom-entity
            @value-changed=${s=>this._updateField(e,o,"min",s.detail.value||void 0)}
          ></ha-entity-picker>
          <ha-entity-picker
            .hass=${this.hass}
            .value=${s.max||""}
            .label=${"Max entity"}
            allow-custom-entity
            @value-changed=${s=>this._updateField(e,o,"max",s.detail.value||void 0)}
          ></ha-entity-picker>
        </div>

        <div class="sensor-field-row">
          <ha-icon-picker
            .hass=${this.hass}
            .value=${s.icon||""}
            .label=${"Icon"}
            @value-changed=${s=>this._updateField(e,o,"icon",s.detail.value||void 0)}
          ></ha-icon-picker>
          ${this._textField({label:"Image URL",value:s.image_url||"",onChange:s=>this._updateField(e,o,"image_url",s||void 0)})}
        </div>

        <ha-entity-picker
          .hass=${this.hass}
          .value=${s.availability_entity||""}
          .label=${"Availability entity (optional — grays out when off)"}
          .includeDomains=${["binary_sensor","switch","input_boolean"]}
          allow-custom-entity
          @value-changed=${s=>this._updateField(e,o,"availability_entity",s.detail.value||void 0)}
        ></ha-entity-picker>

        <ha-entity-picker
          .hass=${this.hass}
          .value=${s.battery_entity||""}
          .label=${"Battery entity (optional — shows battery level)"}
          .includeDomains=${["sensor"]}
          allow-custom-entity
          @value-changed=${s=>this._updateField(e,o,"battery_entity",s.detail.value||void 0)}
        ></ha-entity-picker>

        <div class="sensor-field-row">
          <ha-entity-picker
            .hass=${this.hass}
            .value=${s.last_updated_entity||""}
            .label=${"Last updated entity (optional)"}
            allow-custom-entity
            @value-changed=${s=>this._updateField(e,o,"last_updated_entity",s.detail.value||void 0)}
          ></ha-entity-picker>
          ${this._textField({label:"Last updated attribute",value:s.last_updated_attribute||"",onChange:s=>this._updateField(e,o,"last_updated_attribute",s||void 0)})}
        </div>

        <div class="sensor-field-row">
          <ha-entity-picker
            .hass=${this.hass}
            .value=${s.setpoint_entity||""}
            .label=${"Setpoint entity (optional — overrides static setpoint)"}
            .includeDomains=${["input_number","number","sensor"]}
            allow-custom-entity
            @value-changed=${s=>this._updateField(e,o,"setpoint_entity",s.detail.value||void 0)}
          ></ha-entity-picker>
          <ha-entity-picker
            .hass=${this.hass}
            .value=${s.min_limit_entity||""}
            .label=${"Min limit entity (optional — overrides static min_limit)"}
            .includeDomains=${["input_number","number","sensor"]}
            allow-custom-entity
            @value-changed=${s=>this._updateField(e,o,"min_limit_entity",s.detail.value||void 0)}
          ></ha-entity-picker>
        </div>

        ${this.freeform||!this.registry[e]?oe`
              <div class="sensor-field-row">
                <label class="text-field">
                  <span class="text-field-label">Mode</span>
                  <select
                    class="sensor-select"
                    @change=${s=>this._updateField(e,o,"mode",s.target.value)}
                  >
                    <option value="centric" ?selected=${(s.mode||"centric")==="centric"}>
                      Centric
                    </option>
                    <option value="heatflow" ?selected=${s.mode==="heatflow"}>
                      Heatflow
                    </option>
                  </select>
                </label>
              </div>
            `:re}
      </div>
    `}_renderAddSensor(){if(this.freeform)return oe`
        <div class="freeform-input">
          ${this._textField({label:"Sensor type key",value:this._newSensorType,live:true,onChange:e=>{this._newSensorType=e}})}
          <ha-icon-button
            .path=${"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"}
            @click=${this._addFreeformSensor}
          ></ha-icon-button>
        </div>
      `;const e=Object.entries(this.registry).filter(([e])=>!this.sensors[e]).map(([e,s])=>({value:e,label:s.name,category:s.category||"other"}));if(e.length===0)return oe`<div class="empty-message">All sensor types are configured.</div>`;const s={water_chemistry:"Essential Water Chemistry",chemical_balance:"Chemical Balance",treatment:"Treatment & Sanitization",equipment:"Equipment & Maintenance",other:"Other"};const o=e.reduce((e,s)=>{const o=s.category;if(!e[o])e[o]=[];e[o].push(s);return e},{});const l=["water_chemistry","chemical_balance","treatment","equipment","other"];return oe`
      <div class="add-sensor-row">
        <select
          class="sensor-select"
          @change=${e=>{const s=e.target;const o=s.value;if(o){this._addPresetSensor(o);s.value=""}}}
        >
          <option value="">Add sensor...</option>
          ${l.filter(e=>{var s;return((s=o[e])===null||s===void 0?void 0:s.length)>0}).map(e=>oe`
                <option disabled>— ${s[e]} —</option>
                ${o[e].map(e=>oe`<option value=${e.value}>${e.label}</option>`)}
              `)}
        </select>
      </div>
    `}_toggleExpand(e){this._expanded=Object.assign(Object.assign({},this._expanded),{[e]:!this._expanded[e]})}_addPresetSensor(e){const s=Object.assign(Object.assign({},this.sensors),{[e]:{entity:""}});this._expanded=Object.assign(Object.assign({},this._expanded),{[e]:true});this._fireSensorsChanged(s)}_addFreeformSensor(){const e=this._newSensorType.trim().toLowerCase().replace(/\s+/g,"_").replace(/[^a-z0-9_]/g,"");if(!e)return;if(this.sensors[e]){const s=this.sensors[e];const o=Array.isArray(s)?[...s]:[s];o.push({entity:""});const l=Object.assign(Object.assign({},this.sensors),{[e]:o});const p=`${e}-${o.length-1}`;this._expanded=Object.assign(Object.assign({},this._expanded),{[p]:true});this._fireSensorsChanged(l)}else{const s=Object.assign(Object.assign({},this.sensors),{[e]:{entity:""}});this._expanded=Object.assign(Object.assign({},this._expanded),{[e]:true});this._fireSensorsChanged(s)}this._newSensorType=""}_removeSensor(e,s){const o=this.sensors[e];if(Array.isArray(o)){const l=o.filter((e,o)=>o!==s);if(l.length===0){const s=this.sensors,o=e;s[o];const l=__rest(s,[typeof o==="symbol"?o:o+""]);this._fireSensorsChanged(l)}else if(l.length===1)this._fireSensorsChanged(Object.assign(Object.assign({},this.sensors),{[e]:l[0]}));else this._fireSensorsChanged(Object.assign(Object.assign({},this.sensors),{[e]:l}))}else{const s=this.sensors,o=e;s[o];const l=__rest(s,[typeof o==="symbol"?o:o+""]);this._fireSensorsChanged(l)}}_updateField(e,s,o,l){const p=this.sensors[e];if(Array.isArray(p)){const u=[...p];u[s]=Object.assign(Object.assign({},u[s]),{[o]:l});if(l===void 0||l==="")delete u[s][o];this._fireSensorsChanged(Object.assign(Object.assign({},this.sensors),{[e]:u}))}else{const s=Object.assign(Object.assign({},p),{[o]:l});if(l===void 0||l==="")delete s[o];this._fireSensorsChanged(Object.assign(Object.assign({},this.sensors),{[e]:s}))}}_fireSensorsChanged(e){this.dispatchEvent(new CustomEvent("sensors-changed",{bubbles:true,composed:true,detail:{sensors:e}}))}}MonitorSensorEditor.styles=De;__decorate([n({attribute:false})],MonitorSensorEditor.prototype,"hass",void 0);__decorate([n({attribute:false})],MonitorSensorEditor.prototype,"sensors",void 0);__decorate([n({attribute:false})],MonitorSensorEditor.prototype,"registry",void 0);__decorate([n({type:Boolean})],MonitorSensorEditor.prototype,"freeform",void 0);__decorate([r()],MonitorSensorEditor.prototype,"_expanded",void 0);__decorate([r()],MonitorSensorEditor.prototype,"_newSensorType",void 0);if(!customElements.get("monitor-sensor-editor"))customElements.define("monitor-sensor-editor",MonitorSensorEditor);let Be=class PoolMonitorCardEditor extends MonitorEditorBase{get sensorsRegistry(){return Te}get hasPresets(){return true}renderSensorSection(){return oe`
      <monitor-sensor-editor
        .hass=${this.hass}
        .sensors=${this._config.sensors||{}}
        .registry=${this.sensorsRegistry}
        @sensors-changed=${this._sensorsChanged}
      ></monitor-sensor-editor>
    `}};Be=__decorate([t("pool-monitor-card-editor")],Be);const Le=Object.freeze(Object.defineProperty({__proto__:null,get PoolMonitorCardEditor(){return Be}},Symbol.toStringTag,{value:"Module"}));e.PoolMonitorCard=PoolMonitorCard;Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});return e}({});
//# sourceMappingURL=pool-monitor-card.js.map
