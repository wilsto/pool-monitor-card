var PoolMonitorCard=function(e){"use strict";function __rest(e,s){var o={};for(var l in e)if(Object.prototype.hasOwnProperty.call(e,l)&&s.indexOf(l)<0)o[l]=e[l];if(e!=null&&typeof Object.getOwnPropertySymbols==="function")for(var p=0,l=Object.getOwnPropertySymbols(e);p<l.length;p++)if(s.indexOf(l[p])<0&&Object.prototype.propertyIsEnumerable.call(e,l[p]))o[l[p]]=e[l[p]];return o}function __decorate(e,s,o,l){var p=arguments.length,u=p<3?s:l===null?l=Object.getOwnPropertyDescriptor(s,o):l,h;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")u=Reflect.decorate(e,s,o,l);else for(var m=e.length-1;m>=0;m--)if(h=e[m])u=(p<3?h(u):p>3?h(s,o,u):h(s,o))||u;return p>3&&u&&Object.defineProperty(s,o,u),u}typeof SuppressedError==="function"?SuppressedError:function(e,s,o){var l=new Error(o);return l.name="SuppressedError",l.error=e,l.suppressed=s,l};const s=globalThis,o=s.ShadowRoot&&(void 0===s.ShadyCSS||s.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,l=Symbol(),p=new WeakMap;let u=class n{constructor(e,s,o){if(this._$cssResult$=true,o!==l)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=s}get styleSheet(){let e=this.o;const s=this.t;if(o&&void 0===e){const o=void 0!==s&&1===s.length;o&&(e=p.get(s)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&p.set(s,e))}return e}toString(){return this.cssText}};const r$4=e=>new u("string"==typeof e?e:e+"",void 0,l),i$3=(e,...s)=>{const o=1===e.length?e[0]:s.reduce((s,o,l)=>s+(e=>{if(true===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+e[l+1],e[0]);return new u(o,e,l)},S$1=(e,l)=>{if(o)e.adoptedStyleSheets=l.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const o of l){const l=document.createElement("style"),p=s.litNonce;void 0!==p&&l.setAttribute("nonce",p),l.textContent=o.cssText,e.appendChild(l)}},h=o?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let s="";for(const o of e.cssRules)s+=o.cssText;return r$4(s)})(e):e;const{is:m,defineProperty:g,getOwnPropertyDescriptor:_,getOwnPropertyNames:f,getOwnPropertySymbols:v,getPrototypeOf:b}=Object,$=globalThis,w=$.trustedTypes,C=w?w.emptyScript:"",A=$.reactiveElementPolyfillSupport,d$1=(e,s)=>e,E={toAttribute(e,s){switch(s){case Boolean:e=e?C:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,s){let o=e;switch(s){case Boolean:o=null!==e;break;case Number:o=null===e?null:Number(e);break;case Object:case Array:try{o=JSON.parse(e)}catch(e){o=null}}return o}},f$1=(e,s)=>!m(e,s),P={attribute:true,type:String,converter:E,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),$.litPropertyMetadata??=new WeakMap;let O=class y extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,s=P){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(e)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(e,s),!s.noAccessor){const o=Symbol(),l=this.getPropertyDescriptor(e,o,s);void 0!==l&&g(this.prototype,e,l)}}static getPropertyDescriptor(e,s,o){const{get:l,set:p}=_(this.prototype,e)??{get(){return this[s]},set(e){this[s]=e}};return{get:l,set(s){const u=l?.call(this);p?.call(this,s),this.requestUpdate(e,u,o)},configurable:true,enumerable:true}}static getPropertyOptions(e){return this.elementProperties.get(e)??P}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const e=b(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const e=this.properties,s=[...f(e),...v(e)];for(const o of s)this.createProperty(o,e[o])}const e=this[Symbol.metadata];if(null!==e){const s=litPropertyMetadata.get(e);if(void 0!==s)for(const[e,o]of s)this.elementProperties.set(e,o)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const o=this._$Eu(e,s);void 0!==o&&this._$Eh.set(o,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const s=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const e of o)s.unshift(h(e))}else void 0!==e&&s.push(h(e));return s}static _$Eu(e,s){const o=s.attribute;return false===o?void 0:"string"==typeof o?o:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,s=this.constructor.elementProperties;for(const o of s.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,s,o){this._$AK(e,o)}_$ET(e,s){const o=this.constructor.elementProperties.get(e),l=this.constructor._$Eu(e,o);if(void 0!==l&&true===o.reflect){const p=(void 0!==o.converter?.toAttribute?o.converter:E).toAttribute(s,o.type);this._$Em=e,null==p?this.removeAttribute(l):this.setAttribute(l,p),this._$Em=null}}_$AK(e,s){const o=this.constructor,l=o._$Eh.get(e);if(void 0!==l&&this._$Em!==l){const e=o.getPropertyOptions(l),p="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:E;this._$Em=l;const u=p.fromAttribute(s,e.type);this[l]=u??this._$Ej?.get(l)??u,this._$Em=null}}requestUpdate(e,s,o,l=false,p){if(void 0!==e){const u=this.constructor;if(false===l&&(p=this[e]),o??=u.getPropertyOptions(e),!((o.hasChanged??f$1)(p,s)||o.useDefault&&o.reflect&&p===this._$Ej?.get(e)&&!this.hasAttribute(u._$Eu(e,o))))return;this.C(e,s,o)}false===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,s,{useDefault:o,reflect:l,wrapped:p},u){o&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,u??s??this[e]),true!==p||void 0!==u)||(this._$AL.has(e)||(this.hasUpdated||o||(s=void 0),this._$AL.set(e,s)),true===l&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=true;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,s]of this._$Ep)this[e]=s;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[s,o]of e){const{wrapped:e}=o,l=this[s];true!==e||this._$AL.has(s)||void 0===l||this.C(s,void 0,o,l)}}let e=false;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(s)):this._$EM()}catch(s){throw e=false,this._$EM(),s}e&&this._$AE(s)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=false}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return true}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};O.elementStyles=[],O.shadowRootOptions={mode:"open"},O[d$1("elementProperties")]=new Map,O[d$1("finalized")]=new Map,A?.({ReactiveElement:O}),($.reactiveElementVersions??=[]).push("2.1.2");const T=globalThis,i$1=e=>e,j=T.trustedTypes,F=j?j.createPolicy("lit-html",{createHTML:e=>e}):void 0,B="$lit$",U=`lit$${Math.random().toFixed(9).slice(2)}$`,q="?"+U,W=`<${q}>`,G=document,c=()=>G.createComment(""),a=e=>null===e||"object"!=typeof e&&"function"!=typeof e,K=Array.isArray,d=e=>K(e)||"function"==typeof e?.[Symbol.iterator],X="[ \t\n\f\r]",J=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Y=/-->/g,Q=/>/g,ee=RegExp(`>|${X}(?:([^\\s"'>=/]+)(${X}*=${X}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),te=/'/g,ie=/"/g,se=/^(?:script|style|textarea|title)$/i,x=e=>(s,...o)=>({_$litType$:e,strings:s,values:o}),oe=x(1),ae=Symbol.for("lit-noChange"),ne=Symbol.for("lit-nothing"),re=new WeakMap,le=G.createTreeWalker(G,129);function V(e,s){if(!K(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==F?F.createHTML(s):s}const N=(e,s)=>{const o=e.length-1,l=[];let p,u=2===s?"<svg>":3===s?"<math>":"",h=J;for(let s=0;s<o;s++){const o=e[s];let m,g,_=-1,f=0;for(;f<o.length&&(h.lastIndex=f,g=h.exec(o),null!==g);)f=h.lastIndex,h===J?"!--"===g[1]?h=Y:void 0!==g[1]?h=Q:void 0!==g[2]?(se.test(g[2])&&(p=RegExp("</"+g[2],"g")),h=ee):void 0!==g[3]&&(h=ee):h===ee?">"===g[0]?(h=p??J,_=-1):void 0===g[1]?_=-2:(_=h.lastIndex-g[2].length,m=g[1],h=void 0===g[3]?ee:'"'===g[3]?ie:te):h===ie||h===te?h=ee:h===Y||h===Q?h=J:(h=ee,p=void 0);const v=h===ee&&e[s+1].startsWith("/>")?" ":"";u+=h===J?o+W:_>=0?(l.push(m),o.slice(0,_)+B+o.slice(_)+U+v):o+U+(-2===_?s:v)}return[V(e,u+(e[o]||"<?>")+(2===s?"</svg>":3===s?"</math>":"")),l]};class S{constructor({strings:e,_$litType$:s},o){let l;this.parts=[];let p=0,u=0;const h=e.length-1,m=this.parts,[g,_]=N(e,s);if(this.el=S.createElement(g,o),le.currentNode=this.el.content,2===s||3===s){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(l=le.nextNode())&&m.length<h;){if(1===l.nodeType){if(l.hasAttributes())for(const e of l.getAttributeNames())if(e.endsWith(B)){const s=_[u++],o=l.getAttribute(e).split(U),h=/([.?@])?(.*)/.exec(s);m.push({type:1,index:p,name:h[2],strings:o,ctor:"."===h[1]?I:"?"===h[1]?L:"@"===h[1]?z:H}),l.removeAttribute(e)}else e.startsWith(U)&&(m.push({type:6,index:p}),l.removeAttribute(e));if(se.test(l.tagName)){const e=l.textContent.split(U),s=e.length-1;if(s>0){l.textContent=j?j.emptyScript:"";for(let o=0;o<s;o++)l.append(e[o],c()),le.nextNode(),m.push({type:2,index:++p});l.append(e[s],c())}}}else if(8===l.nodeType)if(l.data===q)m.push({type:2,index:p});else{let e=-1;for(;-1!==(e=l.data.indexOf(U,e+1));)m.push({type:7,index:p}),e+=U.length-1}p++}}static createElement(e,s){const o=G.createElement("template");return o.innerHTML=e,o}}function M(e,s,o=e,l){if(s===ae)return s;let p=void 0!==l?o._$Co?.[l]:o._$Cl;const u=a(s)?void 0:s._$litDirective$;return p?.constructor!==u&&(p?._$AO?.(false),void 0===u?p=void 0:(p=new u(e),p._$AT(e,o,l)),void 0!==l?(o._$Co??=[])[l]=p:o._$Cl=p),void 0!==p&&(s=M(e,p._$AS(e,s.values),p,l)),s}class R{constructor(e,s){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=s}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:s},parts:o}=this._$AD,l=(e?.creationScope??G).importNode(s,true);le.currentNode=l;let p=le.nextNode(),u=0,h=0,m=o[0];for(;void 0!==m;){if(u===m.index){let s;2===m.type?s=new k(p,p.nextSibling,this,e):1===m.type?s=new m.ctor(p,m.name,m.strings,this,e):6===m.type&&(s=new Z(p,this,e)),this._$AV.push(s),m=o[++h]}u!==m?.index&&(p=le.nextNode(),u++)}return le.currentNode=G,l}p(e){let s=0;for(const o of this._$AV)void 0!==o&&(void 0!==o.strings?(o._$AI(e,o,s),s+=o.strings.length-2):o._$AI(e[s])),s++}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,s,o,l){this.type=2,this._$AH=ne,this._$AN=void 0,this._$AA=e,this._$AB=s,this._$AM=o,this.options=l,this._$Cv=l?.isConnected??true}get parentNode(){let e=this._$AA.parentNode;const s=this._$AM;return void 0!==s&&11===e?.nodeType&&(e=s.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,s=this){e=M(this,e,s),a(e)?e===ne||null==e||""===e?(this._$AH!==ne&&this._$AR(),this._$AH=ne):e!==this._$AH&&e!==ae&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):d(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==ne&&a(this._$AH)?this._$AA.nextSibling.data=e:this.T(G.createTextNode(e)),this._$AH=e}$(e){const{values:s,_$litType$:o}=e,l="number"==typeof o?this._$AC(e):(void 0===o.el&&(o.el=S.createElement(V(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===l)this._$AH.p(s);else{const e=new R(l,this),o=e.u(this.options);e.p(s),this.T(o),this._$AH=e}}_$AC(e){let s=re.get(e.strings);return void 0===s&&re.set(e.strings,s=new S(e)),s}k(e){K(this._$AH)||(this._$AH=[],this._$AR());const s=this._$AH;let o,l=0;for(const p of e)l===s.length?s.push(o=new k(this.O(c()),this.O(c()),this,this.options)):o=s[l],o._$AI(p),l++;l<s.length&&(this._$AR(o&&o._$AB.nextSibling,l),s.length=l)}_$AR(e=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);e!==this._$AB;){const s=i$1(e).nextSibling;i$1(e).remove(),e=s}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,s,o,l,p){this.type=1,this._$AH=ne,this._$AN=void 0,this.element=e,this.name=s,this._$AM=l,this.options=p,o.length>2||""!==o[0]||""!==o[1]?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=ne}_$AI(e,s=this,o,l){const p=this.strings;let u=false;if(void 0===p)e=M(this,e,s,0),u=!a(e)||e!==this._$AH&&e!==ae,u&&(this._$AH=e);else{const l=e;let h,m;for(e=p[0],h=0;h<p.length-1;h++)m=M(this,l[o+h],s,h),m===ae&&(m=this._$AH[h]),u||=!a(m)||m!==this._$AH[h],m===ne?e=ne:e!==ne&&(e+=(m??"")+p[h+1]),this._$AH[h]=m}u&&!l&&this.j(e)}j(e){e===ne?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class I extends H{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===ne?void 0:e}}class L extends H{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==ne)}}class z extends H{constructor(e,s,o,l,p){super(e,s,o,l,p),this.type=5}_$AI(e,s=this){if((e=M(this,e,s,0)??ne)===ae)return;const o=this._$AH,l=e===ne&&o!==ne||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,p=e!==ne&&(o===ne||l);l&&this.element.removeEventListener(this.name,this,o),p&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class Z{constructor(e,s,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=s,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){M(this,e)}}const ce=T.litHtmlPolyfillSupport;ce?.(S,k),(T.litHtmlVersions??=[]).push("3.3.2");const D=(e,s,o)=>{const l=o?.renderBefore??s;let p=l._$litPart$;if(void 0===p){const e=o?.renderBefore??null;l._$litPart$=p=new k(s.insertBefore(c(),e),e,void 0,o??{})}return p._$AI(e),p};const de=globalThis;class i extends O{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const s=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=D(s,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false)}render(){return ae}}i._$litElement$=true,i["finalized"]=true,de.litElementHydrateSupport?.({LitElement:i});const pe=de.litElementPolyfillSupport;pe?.({LitElement:i});(de.litElementVersions??=[]).push("4.2.2");const t=e=>(s,o)=>{void 0!==o?o.addInitializer(()=>{customElements.define(e,s)}):customElements.define(e,s)};const ue={attribute:true,type:String,converter:E,reflect:false,hasChanged:f$1},r$1=(e=ue,s,o)=>{const{kind:l,metadata:p}=o;let u=globalThis.litPropertyMetadata.get(p);if(void 0===u&&globalThis.litPropertyMetadata.set(p,u=new Map),"setter"===l&&((e=Object.create(e)).wrapped=true),u.set(o.name,e),"accessor"===l){const{name:l}=o;return{set(o){const p=s.get.call(this);s.set.call(this,o),this.requestUpdate(l,p,e,true,o)},init(s){return void 0!==s&&this.C(l,void 0,e,s),s}}}if("setter"===l){const{name:l}=o;return function(o){const p=this[l];s.call(this,o),this.requestUpdate(l,p,e,true,o)}}throw Error("Unsupported decorator location: "+l)};function n(e){return(s,o)=>"object"==typeof o?r$1(e,s,o):((e,s,o)=>{const l=s.hasOwnProperty(o);return s.constructor.createProperty(o,e),l?Object.getOwnPropertyDescriptor(s,o):void 0})(e,s,o)}function r(e){return n({...e,state:true,attribute:false})}const he={language:"English",state:{1:"Too Low",2:"Acceptable Low",3:"Ideal",4:"Ideal",5:"Acceptable High",6:"Too High"},band:{1:"Good",2:"Fair",3:"Moderate",4:"Poor",5:"Very Poor"},editor:{attribute:"Attribute",attribute_hint:"Leave empty to use the state",required:"required",incomplete:"incomplete",inherited:"inherited",entity_required:"The only field you have to fill. Everything else already has a value.",sec_content:"Content",sec_appearance:"Appearance",sec_scale:"Scale",sec_linked:"Linked entities",sec_timestamp:"Timestamp",scale_mode:"How the bands are set",scale_from_setpoint:"From a setpoint",scale_from_limits:"Explicit thresholds",scale_hint_setpoint:"Four bands derived from the setpoint, one step apart.",scale_hint_limits:"Give the four boundaries yourself, for a reading whose ideal sits at one end.",direction:"Reads",lower_is_better:"Lower is better",higher_is_better:"Higher is better",limit_1:"Boundary 1",limit_2:"Boundary 2",limit_3:"Boundary 3",limit_4:"Boundary 4",values_changed:"{count} changed",preview:"Preview",sec_appearance_sub:"icon, image",sec_linked_sub:"setpoint, bounds, availability, battery",sec_timestamp_sub:"where the measurement time comes from",mode:"Mode",mode_centric:"Centric",mode_heatflow:"Heatflow",entity:"Entity",name_override:"Name override",unit_override:"Unit override",setpoint:"Setpoint",step:"Step",min_limit:"Min limit",step_low:"Step low",step_high:"Step high",min_entity:"Min entity",max_entity:"Max entity",icon:"Icon",image_url:"Image URL",availability_entity:"Availability entity (optional, grays out when off)",battery_entity:"Battery entity (optional, shows battery level)",last_updated_entity:"Last updated entity (optional)",last_updated_attribute:"Last updated attribute",setpoint_entity:"Setpoint entity (optional, overrides static setpoint)",min_limit_entity:"Min limit entity (optional, overrides static min_limit)",sensor_type_key:"Sensor type key",all_configured:"All sensor types are configured.",display_options:"Display Options",colors:"Colors",card_title:"Card title",compact:"Compact mode",show_names:"Show names",show_labels:"Show state labels",show_last_updated:"Show last updated",show_icons:"Show icons",show_units:"Show units",gradient:"Gradient bar",language:"Language",status_entity:"Status entity",name_font_size:"Name font size (e.g. 0.8em, 14px)",name_font_weight:"Name font weight",font_weight:{default:"Default",normal:"Normal",bold:"Bold",light:"Light (300)",semi_bold:"Semi-bold (600)"},category:{water_chemistry:"Essential Water Chemistry",chemical_balance:"Chemical Balance",treatment:"Treatment & Sanitization",equipment:"Equipment & Maintenance",other:"Other"},color:{low:"Low",warn:"Warn",normal:"Normal",fair:"Fair",cool:"Cool",hazardous:"Hazardous",marker:"Marker",hi_low:"Hi/Low"}},sensor:{humidity:"Humidity",filtration_time:"Filtration Time",pump_energy:"Pump Energy",co:"Carbon Monoxide",temperature:"Temperature",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinity",cya:"Cyanuric Acid",calcium:"Calcium",phosphate:"Phosphate",alkalinity:"Alkalinity",free_chlorine:"Free Chlorine",total_chlorine:"Total Chlorine",pressure:"Filter Pressure",specific_gravity:"Specific Gravity",magnesium:"Magnesium",water_level:"Water Level",flow_rate:"Flow Rate",uv_radiation:"UV Radiation",product_volume:"Product Volume",product_weight:"Product Weight",ec:"Electrical Conductivity",bromine:"Bromine",chlorinator:"Chlorinator",pump_speed:"Pump Speed",light_brightness:"Light Brightness",heat_pump_setpoint:"Heat Pump Setpoint"},time:{seconds:"just now",minutes:"{minutes} minute ago",hours:"{hours} hour ago",days:"{days} day ago"},time_plural:{seconds:"just now",minutes:"{minutes} minutes ago",hours:"{hours} hours ago",days:"{days} days ago"}};const me={language:"Français",state:{1:"Trop bas",2:"Acceptable bas",3:"Idéal",4:"Idéal",5:"Acceptable élevé",6:"Trop élevé"},band:{1:"Bon",2:"Moyen",3:"Dégradé",4:"Mauvais",5:"Très mauvais"},editor:{attribute:"Attribut",attribute_hint:"Laisser vide pour utiliser l'état",required:"obligatoire",incomplete:"à compléter",inherited:"hérité",entity_required:"Le seul champ à remplir. Tout le reste a déjà une valeur.",sec_content:"Contenu",sec_appearance:"Apparence",sec_scale:"Échelle",sec_linked:"Entités liées",sec_timestamp:"Horodatage",scale_mode:"Comment les bandes sont définies",scale_from_setpoint:"À partir d’une consigne",scale_from_limits:"Seuils explicites",scale_hint_setpoint:"Quatre bandes dérivées de la consigne, espacées d’un pas.",scale_hint_limits:"Donnez vous-même les quatre bornes, pour une grandeur dont l’idéal est à un bout.",direction:"Se lit",lower_is_better:"Moins est mieux",higher_is_better:"Plus est mieux",limit_1:"Borne 1",limit_2:"Borne 2",limit_3:"Borne 3",limit_4:"Borne 4",values_changed:"{count} modifiée(s)",preview:"Aperçu",sec_appearance_sub:"icône, image",sec_linked_sub:"consigne, bornes, disponibilité, pile",sec_timestamp_sub:"d’où vient la date de mesure",mode:"Mode",mode_centric:"Centrée",mode_heatflow:"Flux de chaleur",entity:"Entité",name_override:"Nom personnalisé",unit_override:"Unité personnalisée",setpoint:"Consigne",step:"Pas",min_limit:"Borne basse",step_low:"Pas vers le bas",step_high:"Pas vers le haut",min_entity:"Entité du minimum",max_entity:"Entité du maximum",icon:"Icône",image_url:"URL de l'image",availability_entity:"Entité de disponibilité (facultatif, grise la ligne quand elle est éteinte)",battery_entity:"Entité de batterie (facultatif, affiche le niveau)",last_updated_entity:"Entité de dernière mesure (facultatif)",last_updated_attribute:"Attribut de dernière mesure",setpoint_entity:"Entité de consigne (facultatif, remplace la consigne fixe)",min_limit_entity:"Entité de borne basse (facultatif, remplace la borne fixe)",sensor_type_key:"Clé du type de capteur",all_configured:"Tous les types de capteurs sont déjà configurés.",display_options:"Affichage",colors:"Couleurs",card_title:"Titre de la carte",compact:"Mode compact",show_names:"Afficher les noms",show_labels:"Afficher l'état",show_last_updated:"Afficher la dernière mesure",show_icons:"Afficher les icônes",show_units:"Afficher les unités",gradient:"Barre en dégradé",language:"Langue",status_entity:"Entité d'état",name_font_size:"Taille du nom (ex. 0.8em, 14px)",name_font_weight:"Graisse du nom",font_weight:{default:"Par défaut",normal:"Normale",bold:"Grasse",light:"Fine (300)",semi_bold:"Demi-grasse (600)"},category:{water_chemistry:"Chimie de l'eau",chemical_balance:"Équilibre chimique",treatment:"Traitement et désinfection",equipment:"Équipement et entretien",other:"Autre"},color:{low:"Basse",warn:"Alerte",normal:"Normale",fair:"Moyenne",cool:"Froide",hazardous:"Dangereuse",marker:"Repère",hi_low:"Min/Max"}},sensor:{humidity:"Humidité",filtration_time:"Temps de filtration",pump_energy:"Énergie pompe",co:"Monoxyde de carbone",temperature:"Température",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinité",cya:"Acide cyanurique",calcium:"Calcium",phosphate:"Phosphate",alkalinity:"Alcalinité",free_chlorine:"Chlore libre",total_chlorine:"Chlore total",pressure:"Pression du filtre",specific_gravity:"Densité spécifique",magnesium:"Magnésium",water_level:"Niveau d'eau",flow_rate:"Débit",uv_radiation:"Radiation UV",product_volume:"Volume Produit",product_weight:"Poids Produit",ec:"Conductivité Électrique",bromine:"Brome",chlorinator:"Réglage du chlorateur",pump_speed:"Vitesse de pompe",light_brightness:"Luminosité éclairage",heat_pump_setpoint:"Consigne PAC"},time:{seconds:"à l'instant",minutes:"il y a {minutes} minute",hours:"il y a {hours} heure",days:"il y a {days} jour"},time_plural:{seconds:"à l'instant",minutes:"il y a {minutes} minutes",hours:"il y a {hours} heures",days:"il y a {days} jours"}};const ge={language:"Español",state:{1:"Demasiado bajo",2:"Aceptable bajo",3:"Perfecto",4:"Perfecto",5:"Aceptable alto",6:"Demasiado alto"},sensor:{temperature:"Temperatura",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinidad",cya:"Acido cianúrico",calcium:"Calcio",phosphate:"Fosfato",alkalinity:"Alcalinidad",free_chlorine:"Cloro libre",total_chlorine:"Cloro total",pressure:"Pressione du filter relativa",specific_gravity:"Densidad relativa",magnesium:"Magnesio",water_level:"Nivel de agua",flow_rate:"Caudal",uv_radiation:"Radiación UV",product_volume:"Volumen Producto",product_weight:"Peso Producto",ec:"Conductividad Eléctrica",bromine:"Bromo",chlorinator:"Ajuste de clorador",pump_speed:"Velocidad de bomba",light_brightness:"Brillo de luz",heat_pump_setpoint:"Consigna bomba de calor"},time:{seconds:"justo ahora",minutes:"hace {minutes} minuto",hours:"hace {hours} hora",days:"hace {days} día"},time_plural:{seconds:"justo ahora",minutes:"hace {minutes} minutos",hours:"hace {hours} horas",days:"hace {days} días"}};const _e={language:"Deutsch",state:{1:"Zu niedrig",2:"Akzeptabler Tiefstwert",3:"Ideal",4:"Ideal",5:"Akzeptabler Hochwert",6:"Zu hoch"},sensor:{temperature:"Temperatur",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salzgehalt",cya:"Cyanursäure",calcium:"Kalzium",phosphate:"Phosphat",alkalinity:"Alkalinität",free_chlorine:"Freies Chlor",total_chlorine:"Gesamtchlor",pressure:"Sandfilterdruck",specific_gravity:"Spezifisches Gewicht",magnesium:"Magnesium",water_level:"Wasserstand",flow_rate:"Durchfluss",uv_radiation:"UV-Strahlung",product_volume:"Produktvolumen",product_weight:"Produktgewicht",ec:"Elektrische Leitfähigkeit",bromine:"Brom",chlorinator:"Chlorator-Einstellung",pump_speed:"Pumpengeschwindigkeit",light_brightness:"Lichthelligkeit",heat_pump_setpoint:"Wärmepumpe Sollwert"},time:{seconds:"gerade erst",minutes:"vor {minutes} Minute",hours:"vor {hours} Stunde",days:"vor {days} Tag"},time_plural:{seconds:"gerade erst",minutes:"vor {minutes} Minuten",hours:"vor {hours} Stunden",days:"vor {days} Tagen"}};const ye={language:"Italiano",state:{1:"Troppo basso",2:"Accettabile basso",3:"Ideale",4:"Ideale",5:"Accettabile alto",6:"Troppo alto"},sensor:{temperature:"Temperatura",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinità",cya:"Acido cianurico",calcium:"Calcio",phosphate:"Fosfato",alkalinity:"Alcalinità",free_chlorine:"Cloro libero",total_chlorine:"Cloro totale",pressure:"Pressione filtro",specific_gravity:"Gravità specifica",magnesium:"Magnesio",water_level:"Livello dell'acqua",flow_rate:"Portata",uv_radiation:"Radiazione UV",product_volume:"Volume prodotto",product_weight:"Peso prodotto",ec:"Conducibilità Elettrica",bromine:"Bromo",chlorinator:"Impostazione clorinatore",pump_speed:"Velocità pompa",light_brightness:"Luminosità luce",heat_pump_setpoint:"Setpoint pompa di calore"},time:{seconds:"proprio ora",minutes:"{minutes} minuto fa",hours:"{hours} ora fa",days:"{days} giorno fa"},time_plural:{seconds:"proprio ora",minutes:"{minutes} minuti fa",hours:"{hours} ore fa",days:"{days} giorni fa"}};const fe={language:"Nederlands",state:{1:"Te laag",2:"Acceptabel laag",3:"Ideaal",4:"Ideaal",5:"Acceptabel hoog",6:"Te hoog"},sensor:{temperature:"Temperatuur",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Zoutgehalte",cya:"Cyanuurzuur",calcium:"Calcium",phosphate:"Fosfaat",alkalinity:"Alkaliteit",free_chlorine:"Vrij chloor",total_chlorine:"Totaal chloor",pressure:"Filterdruk",specific_gravity:"Soortelijk gewicht",magnesium:"Magnesium",water_level:"Waterniveau",flow_rate:"Debiet",uv_radiation:"UV-straling",product_volume:"Productvolume",product_weight:"Productgewicht",ec:"Elektrische Geleidbaarheid",bromine:"Broom",chlorinator:"Chloormaker instelling",pump_speed:"Pompsnelheid",light_brightness:"Lichthelderheid",heat_pump_setpoint:"Warmtepomp instelpunt"},time:{seconds:"zojuist",minutes:"{minutes} minuut geleden",hours:"{hours} uur geleden",days:"{days} dag geleden"},time_plural:{seconds:"zojuist",minutes:"{minutes} minuten geleden",hours:"{hours} uur geleden",days:"{days} dagen geleden"}};const ve={language:"Português",state:{1:"Muito Baixo",2:"Torelavel mas Baixo",3:"Ideal",4:"Ideal",5:"Toleravel mas Alto",6:"Muito Alto"},sensor:{temperature:"Temperatura",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinidade",cya:"Ácido cianúrico",calcium:"Calcio",phosphate:"Fosfato",alkalinity:"Alcalinidade",free_chlorine:"Cloro livres",total_chlorine:"Cloro total",pressure:"Pressão do filtro",specific_gravity:"Gravidade específica",magnesium:"Magnésio",water_level:"Nivel de agua",flow_rate:"Caudal",uv_radiation:"Radiação UV",product_volume:"Volume Produto",product_weight:"Peso Produto",ec:"Condutividade Elétrica",bromine:"Bromo",chlorinator:"Configuração do clorador",pump_speed:"Velocidade da bomba",light_brightness:"Brilho da luz",heat_pump_setpoint:"Ponto de ajuste bomba de calor"},time:{seconds:"agora mesmo",minutes:"há {minutes} minuto",hours:"há {hours} hora",days:"há {days} dia"},time_plural:{seconds:"agora mesmo",minutes:"há {minutes} minutos",hours:"há {hours} horas",days:"há {days} dias"}};const be={language:"Português (Brasil)",state:{1:"Muito Baixo",2:"Aceitavel Baixo",3:"Ideal",4:"Ideal",5:"Aceitavel Alto",6:"Muito Alto"},sensor:{temperature:"Temperatura",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinidade",cya:"Acido Cianurico",calcium:"Calcio",phosphate:"Fosfato",alkalinity:"Alcalinidade",free_chlorine:"Cloro Livre",total_chlorine:"Cloro Total",pressure:"Pressão no Filtro",specific_gravity:"Gravidade específica",magnesium:"Magnésio",water_level:"Nivel de agua",flow_rate:"Caudal",uv_radiation:"Radiação UV",product_volume:"Volume Produto",product_weight:"Peso Produto",ec:"Condutividade Elétrica",bromine:"Bromo",chlorinator:"Configuração do clorador",pump_speed:"Velocidade da bomba",light_brightness:"Brilho da luz",heat_pump_setpoint:"Ponto de ajuste bomba de calor"},time:{seconds:"agora mesmo",minutes:"há {minutes} minuto",hours:"há {hours} hora",days:"há {days} dia"},time_plural:{seconds:"agora mesmo",minutes:"há {minutes} minutos",hours:"há {hours} horas",days:"há {days} dias"}};const $e={language:"Română",state:{1:"Prea mic",2:"Mic",3:"Ideal",4:"Ideal",5:"Mare",6:"Prea mare"},sensor:{temperature:"Temperatură",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinitate",cya:"Acid cianuric",calcium:"Calciu",phosphate:"Fosfat",alkalinity:"Alcalinitate",free_chlorine:"Clor liber",total_chlorine:"Clor total",pressure:"Presiune filtru",specific_gravity:"Greutate specifică",magnesium:"Magneziu",water_level:"Nivel apă",flow_rate:"Debit",uv_radiation:"Radiație UV",product_volume:"Volum produs",product_weight:"Greutate produs",ec:"Conductivitate Electrică",bromine:"Brom",chlorinator:"Setare clorinator",pump_speed:"Viteza pompei",light_brightness:"Luminozitate lumina",heat_pump_setpoint:"Punct de reglaj pompa de caldura"},time:{seconds:"chiar acum",minutes:"acum {minutes} minut",hours:"acum {hours} oră",days:"acum {days} zi"},time_plural:{seconds:"chiar acum",minutes:"acum {minutes} minute",hours:"acum {hours} ore",days:"acum {days} zile"}};const we={language:"Slovenčina",state:{1:"Príliš nízky",2:"Akceptovateľne nízky",3:"Ideálny",4:"Ideálny",5:"Akceptovateľne vysoký",6:"Príliš vysoký"},sensor:{temperature:"Teplota",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinita",cya:"Kyselina kyanurová",calcium:"Vápnik",phosphate:"Fosfát",alkalinity:"Alkalinita",free_chlorine:"Voľný chlór",total_chlorine:"Celkový chlór",pressure:"Tlak filtra",specific_gravity:"Špecifická hmotnosť",magnesium:"Magnézium",water_level:"Úroveň vody",flow_rate:"Prietok",uv_radiation:"UV žiarenie",product_volume:"Objem produktu",product_weight:"Hmotnosť produktu",ec:"Elektrická Vodivosť",bromine:"Bróm",chlorinator:"Nastavenie chlórovača",pump_speed:"Rýchlosť čerpadla",light_brightness:"Jas svetla",heat_pump_setpoint:"Nastavená teplota tepelného čerpadla"},time:{seconds:"práve teraz",minutes:"pred {minutes} minútou",hours:"pred {hours} hodinou",days:"pred {days} dňom"},time_plural:{seconds:"práve teraz",minutes:"pred {minutes} minútami",hours:"pred {hours} hodinami",days:"pred {days} dňami"}};const xe={language:"עברית",state:{1:"נמוך מדי",2:"נמוך מאוד",3:"אידיאלי",4:"אידיאלי",5:"גבוה מאוד",6:"גבוה מדי"},sensor:{temperature:"טמפרטורה",ph:"PH",orp:"ORP",tds:"TDS",salinity:"מליחות",cya:"חומצה ציאנורית",calcium:"סידן",phosphate:"פוספט",alkalinity:"אלקליניות",free_chlorine:"כלור חופשי",total_chlorine:"כלור כולל",pressure:"לחץ מסנן",specific_gravity:"משקל סגולי",magnesium:"מגנזיום",water_level:"מפלס מים",flow_rate:"קצב זרימה",uv_radiation:"קרינת UV",product_volume:"נפח מוצר",product_weight:"משקל מוצר",ec:"מוליכות חשמלית",bromine:"ברום",chlorinator:"הגדרת מחלור",pump_speed:"מהירות משאבה",light_brightness:"בהירות תאורה",heat_pump_setpoint:"נקודת כיוון משאבת חום"},time:{seconds:"כרגע",minutes:"לפני {minutes} דקה",hours:"לפני {hours} שעה",days:"לפני {days} יום"},time_plural:{seconds:"כרגע",minutes:"לפני {minutes} דקות",hours:"לפני {hours} שעות",days:"לפני {days} ימים"}};const Se={language:"Русский",state:{1:"Слишком низкий",2:"Приемлемо низкий",3:"Идеальный",4:"Идеальный",5:"Приемлемо высокий",6:"Слишком высокий"},sensor:{temperature:"Температура",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Соленость",cya:"Циануровая кислота",calcium:"Кальций",phosphate:"Фосфаты",alkalinity:"Щелочность",free_chlorine:"Свободный хлор",total_chlorine:"Общий хлор",pressure:"Давление фильтра",specific_gravity:"Удельный вес",magnesium:"Магний",water_level:"Уровень воды",flow_rate:"Расход воды",uv_radiation:"УФ-излучение",product_volume:"Объем продукта",product_weight:"Вес продукта",ec:"Электропроводность",bromine:"Бром",chlorinator:"Настройка хлоратора",pump_speed:"Скорость насоса",light_brightness:"Яркость освещения",heat_pump_setpoint:"Уставка теплового насоса"},time:{seconds:"только что",minutes:"{minutes} минуту назад",hours:"{hours} час назад",days:"{days} день назад"},time_plural:{seconds:"только что",minutes:"{minutes} минут назад",hours:"{hours} часов назад",days:"{days} дней назад"}};const Ce={language:"Magyar",state:{1:"Túl alacsony",2:"Elfogadhatóan alacsony",3:"Ideális",4:"Ideális",5:"Elfogadhatóan magas",6:"Túl magas"},sensor:{temperature:"Hőmérséklet",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Sótartalom",cya:"Cianursav",calcium:"Kalcium",phosphate:"Foszfát",alkalinity:"Lúgosság",free_chlorine:"Szabad klór",total_chlorine:"Összes klór",pressure:"Szűrő nyomás",specific_gravity:"Fajsúly",magnesium:"Magnézium",water_level:"Vízszint",flow_rate:"Áramlási sebesség",uv_radiation:"UV sugárzás",product_volume:"Termék térfogat",product_weight:"Termék tömeg",ec:"Elektromos vezetőképesség",bromine:"Bróm",chlorinator:"Klórozó beállítás",pump_speed:"Szivattyú sebesség",light_brightness:"Fény fényerő",heat_pump_setpoint:"Hőszivattyú beállítás"},time:{seconds:"éppen most",minutes:"{minutes} perce",hours:"{hours} órája",days:"{days} napja"},time_plural:{seconds:"éppen most",minutes:"{minutes} perce",hours:"{hours} órája",days:"{days} napja"}};const Ae={language:"Svenska",state:{1:"För Lågt",2:"Lågt, Acceptabelt",3:"Idealt",4:"Idealt",5:"Högt, Acceptabelt",6:"För Högt"},sensor:{temperature:"Temperatur",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salthalt",cya:"Cyanursyra",calcium:"Kalcium",phosphate:"Fosfat",alkalinity:"Alkalinitet",free_chlorine:"Klor Fritt",total_chlorine:"Klor Total",pressure:"Tryck Filter",specific_gravity:"Densitet",magnesium:"Magnesium",water_level:"Vattennivå",flow_rate:"Flödeshastighet",uv_radiation:"UV-Strålning",product_volume:"Produkt Volym",product_weight:"Produkt Vikt",ec:"Elektrisk Ledningsförmåga",bromine:"Brom",chlorinator:"Kloratorinställning",pump_speed:"Pumphastighet",light_brightness:"Ljusstyrka",heat_pump_setpoint:"Värmepump börvärde"},time:{seconds:"nu",minutes:"{minutes} minut tillbaka",hours:"{hours} timme tillbaka",days:"{days} dag tillbaka"},time_plural:{seconds:"nu",minutes:"{minutes} minuter tillbaka",hours:"{hours} timmar tillbaka",days:"{days} dagar tillbaka"}};const ke={language:"Čeština",state:{1:"Příliš nízká",2:"Přijatelně nízká",3:"Ideální",4:"Ideální",5:"Přijatelně vysoká",6:"Příliš vysoká"},sensor:{temperature:"Teplota",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinita",cya:"Kyselina kyanurová",calcium:"Vápník",phosphate:"Fosfát",alkalinity:"Alkalita",free_chlorine:"Volný chlór",total_chlorine:"Celkový chlór",pressure:"Tlak filtrace",specific_gravity:"Měrná hmotnost",magnesium:"Hořčík",water_level:"Hladina vody",flow_rate:"Průtok",uv_radiation:"UV záření",product_volume:"Objem přípravku",product_weight:"Hmotnost přípravku",ec:"Elektrická vodivost",bromine:"Brom",chlorinator:"Nastavení chlorátoru",pump_speed:"Rychlost čerpadla",light_brightness:"Jas světla",heat_pump_setpoint:"Nastavená hodnota tepelného čerpadla"},time:{seconds:"právě nyní",minutes:"před {minutes} minutou",hours:"před {hours} hodinou",days:"před {days} dnem"},time_plural:{seconds:"právě nyní",minutes:"před {minutes} minutami",hours:"před {hours} hodinami",days:"před {days} dny"}};const Ee={language:"Català",state:{1:"Massa baix",2:"Aceptable baix",3:"Perfecte",4:"Perfecte",5:"Aceptable alt",6:"Massa alt"},sensor:{temperature:"Temperatura",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinitat",cya:"Ácid cianúric",calcium:"Calci",phosphate:"Fosfat",alkalinity:"Alcalinitat",free_chlorine:"Clor lliure",total_chlorine:"Clor total",pressure:"Presió del filtre relativa",specific_gravity:"Densitat relativa",magnesium:"Magnesi",water_level:"Nivell aigua",flow_rate:"Cabal",uv_radiation:"Radiació UV",product_volume:"Volum Producte",product_weight:"Pes Producte",ec:"Conductivitat Eléctrica",bromine:"Brom",chlorinator:"Ajust del clorador",pump_speed:"Velocitat de bomba",light_brightness:"Brillantor de llum",heat_pump_setpoint:"Consigna bomba de calor"},time:{seconds:"ara mateix",minutes:"fa {minutes} minut",hours:"fa {hours} hora",days:"fa {days} dia"},time_plural:{seconds:"ara mateix",minutes:"fa {minutes} minuts",hours:"fa {hours} hores",days:"fa {days} dies"}};const Pe={language:"Dansk",state:{1:"For lavt",2:"Acceptabelt lavt",3:"Perfekt",4:"Perfekt",5:"Acceptabelt højt",6:"For højt"},sensor:{temperature:"Temperatur",ph:"pH",orp:"ORP",tds:"TDS",salinity:"Salinitet",cya:"Cyanursyre",calcium:"Kalcium",phosphate:"Fosfat",alkalinity:"Alkalitet",free_chlorine:"Frit klor",total_chlorine:"Totalt klor",pressure:"Tryk",specific_gravity:"Relativ vægtfylde",magnesium:"Magnesium",water_level:"Vandniveau",flow_rate:"Flowrate",uv_radiation:"UV-stråling",product_volume:"Produktvolumen",product_weight:"Produktvægt",ec:"Elektrisk ledningsevne",bromine:"Brom",chlorinator:"Chlorinator",pump_speed:"Pumpehastighed",light_brightness:"Lysstyrke",heat_pump_setpoint:"Varmepumpe setpoint"},time:{seconds:"lige nu",minutes:"for {minutes} minut siden",hours:"for {hours} time siden",days:"for {days} dag siden"},time_plural:{seconds:"lige nu",minutes:"for {minutes} minutter siden",hours:"for {hours} timer siden",days:"for {days} dage siden"}};const Oe={en:he,fr:me,es:ge,de:_e,it:ye,nl:fe,pt:ve,"pt-br":be,ro:$e,sk:we,he:xe,ru:Se,hu:Ce,sv:Ae,cs:ke,ca:Ee,da:Pe};const lookup=(e,s)=>{let o=e;for(const e of s.split("."))if(o&&typeof o==="object")o=o[e];else return;return typeof o==="string"?o:void 0};const getTranslation=(e,s)=>{var o,l;return(l=(o=lookup(Oe[e],s))!==null&&o!==void 0?o:lookup(Oe.en,s))!==null&&l!==void 0?l:s};const formatTranslation=(e,s)=>{if(!s)return e;return Object.entries(s).reduce((e,[s,o])=>e.replace(`{${s}}`,String(o)),e)};const Me=i$3`
  /**
   * The card renders an ha-card, which carries Home Assistant's own background,
   * radius, border and shadow, and which card-mod can target, as it does on
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

  /** Unified gauge container, marker, bar, labels share same coordinate space */
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
   * these, which is what @apsmith12 ran into asking to adjust element and font
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

  /* The device's own battery, shown once beside the card status rather than
     repeated on every measurement (pool-monitor-card#81). */
  .card-battery {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    margin-left: 8px;
    font-size: 0.8em;
    font-weight: 600;
  }

  /* The status of one measurement, next to its name (pool-monitor-card#82). */
  .sensor-status {
    display: inline-block;
    margin-left: 6px;
    padding: 0 6px;
    border-radius: 8px;
    font-size: 0.7em;
    font-weight: 700;
    line-height: 1.5;
    color: #ffffff;
    vertical-align: middle;
    cursor: pointer;
  }
`;const labelShift=e=>{if(e<=.5)return"translateX(0)";if(e>=99.5)return"translateX(-100%)";return"translateX(-50%)"};class cardContent{static generateTitle(e){const s=e.title!==void 0?oe` <h1 class="pool-monitor-title">${e.title}</h1> `:oe``;return oe`${s}`}static generateStatusBadge(e,s){return oe`
      <div class="status-container">
        <span
          class="status-badge"
          style="background-color: ${e.color};"
          @click=${()=>cardContent._moreinfo(e.entity_id)}
        >
          <ha-icon icon="${e.icon}" style="--mdc-icon-size: 16px;"></ha-icon>
          ${e.label}
        </span>
        ${e.friendly_name?oe`<span class="status-friendly-name">${e.friendly_name}</span>`:""}
        ${s?cardContent.generateCardBattery(s):""}
      </div>
    `}static generateCardBattery(e){return oe`
      <span class="card-battery" style="color: ${e.color};">
        <ha-icon icon="${e.icon}" style="--mdc-icon-size: 16px;"></ha-icon>
        ${e.level!=null?oe`${e.level}%`:""}
      </span>
    `}static generateSensorStatus(e){return oe`
      <span
        class="sensor-status"
        style="background-color: ${e.color};"
        @click=${s=>{s.stopPropagation();cardContent._moreinfo(e.entity_id)}}
        >${e.label}</span
      >
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
                ${s.value!=null?`${s.value} ${s.unit}`:","}
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
                  ${s.monotonic_stops?s.monotonic_stops:s.mode==="heatflow"?`${e.colors.cool} 15%,\n                     ${e.colors.low} 50%,\n                     ${e.colors.warn} 85%`:`${e.colors.warn} 5%,\n                     ${e.colors.low} 30%,\n                     ${e.colors.normal},\n                     ${e.colors.normal},\n                     ${e.colors.low} 70%,\n                     ${e.colors.warn} 95%`}
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
              <span
                class="gauge-label"
                style="left: ${s.label_positions[0]}%;transform:${labelShift(s.label_positions[0])}"
                >${s.setpoint_class[0]}</span
              >
              <span
                class="gauge-label"
                style="left: ${s.label_positions[1]}%;transform:${labelShift(s.label_positions[1])}"
                >${s.setpoint_class[1]}</span
              >
              <span
                class="gauge-label"
                style="left: ${s.label_positions[2]}%;transform:${labelShift(s.label_positions[2])};color:${e.colors.normal}"
                >${s.setpoint_class[2]}</span
              >
              <span
                class="gauge-label"
                style="left: ${s.label_positions[3]}%;transform:${labelShift(s.label_positions[3])}"
                >${s.setpoint_class[3]}</span
              >
              <span
                class="gauge-label"
                style="left: ${s.label_positions[4]}%;transform:${labelShift(s.label_positions[4])}"
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
          ${s.title} ${s.status?cardContent.generateSensorStatus(s.status):""}
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
                  ${s.monotonic_stops?s.monotonic_stops:s.mode==="heatflow"?`${e.colors.cool} 15%,\n                     ${e.colors.low} 50%,\n                     ${e.colors.warn} 85%`:`${e.colors.warn} 5%,\n                     ${e.colors.low} 30%,\n                     ${e.colors.normal},\n                     ${e.colors.normal},\n                     ${e.colors.low} 70%,\n                     ${e.colors.warn} 95%`}
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
                &nbsp; ${s.title} ${s.value!=null?`${s.value} ${s.unit}`:","}
                ${s.separator} ${s.state}
                ${s.status?cardContent.generateSensorStatus(s.status):""}
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
              <span
                class="gauge-label"
                style="left: ${s.label_positions[0]}%;transform:${labelShift(s.label_positions[0])}"
                >${s.setpoint_class[0]}</span
              >
              <span
                class="gauge-label"
                style="left: ${s.label_positions[1]}%;transform:${labelShift(s.label_positions[1])}"
                >${s.setpoint_class[1]}</span
              >
              <span
                class="gauge-label"
                style="left: ${s.label_positions[2]}%;transform:${labelShift(s.label_positions[2])};color:${e.colors.normal}"
                >${s.setpoint_class[2]}</span
              >
              <span
                class="gauge-label"
                style="left: ${s.label_positions[3]}%;transform:${labelShift(s.label_positions[3])}"
                >${s.setpoint_class[3]}</span
              >
              <span
                class="gauge-label"
                style="left: ${s.label_positions[4]}%;transform:${labelShift(s.label_positions[4])}"
                >${s.setpoint_class[4]}</span
              >
            </div>
          </div>
        </div>
      </div>
    `}static _moreinfo(e){const s=new Event("hass-more-info",{bubbles:true,composed:true});s.detail={entityId:e};const o=document.querySelector("home-assistant");if(o)o.dispatchEvent(s)}}const Te={compact:false,show_names:true,show_labels:true,show_last_updated:false,show_icons:true,show_units:true,gradient:true,language:"en"};const je={low:"#fdcb6e",warn:"#e17055",normal:"#00b894",fair:"#7ec181",cool:"#00BFFF",hazardous:"#8e44ad",marker:"#000000",hi_low:"#00000099"};function getDisplayConfig(){return Object.assign({},Te)}function getColorConfig(){return Object.assign({},je)}function getSensorConfig(e,s){if(!s[e])return{};return Object.assign({},s[e])}class MonitorCardBase extends i{render(){const e=this.getConfig();const s=this.processData();const o=this.resolveStatus();const l=this.resolveCardBattery();const p=e.display.compact?cardContent.generateCompactBody:cardContent.generateBody;if(!s||Object.keys(s).length===0)return oe` <ha-card
        ><div id="pool-monitor-card">
          <div class="warning-message">
            <ha-icon icon="mdi:alert"></ha-icon>
            <span>No valid sensor data available</span>
          </div>
        </div></ha-card
      >`;return oe` <ha-card
      ><div id="pool-monitor-card">
        ${cardContent.generateTitle(e)}
        ${o?cardContent.generateStatusBadge(o,l):l?oe`<div class="status-container">
                ${cardContent.generateCardBattery(l)}
              </div>`:""}
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
            `;return p(e,s)})}
      </div></ha-card
    >`}getCardSize(){var e,s,o,l;if(!((e=this.config)===null||e===void 0?void 0:e.sensors))return 3;const p=Object.values(this.config.sensors).reduce((e,s)=>e+(Array.isArray(s)?s.length:1),0);const u=(o=(s=this.config)===null||s===void 0?void 0:s.display)===null||o===void 0?void 0:o.compact;const h=((l=this.config)===null||l===void 0?void 0:l.title)?1:0;return h+p*(u?2:3)}getGridOptions(){const e=this.getCardSize();return{rows:e,min_rows:Math.max(2,Math.ceil(e/2)),columns:12,min_columns:6}}processData(){const e={};const s=this.getConfig();Object.entries(s.sensors).forEach(([s,o])=>{const l=Array.isArray(o)?o:[o];l.forEach((o,l)=>{var p,u,h;const m=`${s}_${l+1}`;e[m]=this.calculateData(s,o.title||this.getTranslatedText("sensor."+s),o.entity,o.min,o.max,o.setpoint,o.step,o.unit,o.icon,o.image_url,o.mode,o.min_limit,o.override_value,o.override,o.invalid,o.step_low,o.step_high,o.last_updated_entity,o.last_updated_attribute,o.setpoint_entity,o.min_limit_entity,o.limits,o.direction,o.attribute);if(o.availability_entity){const s=(h=(u=(p=this.hass)===null||p===void 0?void 0:p.states)===null||u===void 0?void 0:u[o.availability_entity])===null||h===void 0?void 0:h.state;e[m].disabled=s==="off"||s==="unavailable"}if(o.battery_entity){const s=this.resolveBattery(o.battery_entity);e[m].battery_level=s.level;e[m].battery_icon=s.icon;e[m].battery_color=s.color}e[m].status=o.status_entity?this.resolveStatus(o.status_entity):null})});return e}getTranslatedText(e,s){var o;const l=((o=this.config)===null||o===void 0?void 0:o.display.language)||"en";const p=getTranslation(l,e);return formatTranslation(p,s)}calculateData(e,s,o,l,p,u,h,m,g,_,f,v,b,$,w,C,A,E,P,O,T,j,F,B){var U,q,W,G,K,X,J;const Y={};const Q=this.getConfig();const ee=this.constructor.SENSORS||{};const te=getSensorConfig(e,ee);const ie=this.constructor.IMAGE_BASE_URL||"";Y.name=e;Y.invalid=w;Y.mode=f;Y.title=Q.display.show_names?s:oe`&nbsp;`;Y.hide_icon=false;Y.is_mdi=false;if(!Q.display.show_icons)Y.hide_icon=true;else{const s=g||"";const o=_||"";if(s==="hide")Y.hide_icon=true;else if(o)Y.img_src=o;else if(s&&typeof s==="string"&&s.startsWith("mdi:")){Y.is_mdi=true;Y.mdi_icon=s}else if(ie)Y.img_src=`${ie}/${e}.png`;else{Y.is_mdi=true;Y.mdi_icon="mdi:gauge"}}if(!this.hass||!this.hass.states||!this.hass.states[o]){console.warn(`Entity not found: ${o}`);Y.value=null;Y.entity=o;Y.not_found=true;return Y}const se=this.hass.states[o];const ae=(U=this.hass.entities)===null||U===void 0?void 0:U[o];const ne=B?(q=se.attributes)===null||q===void 0?void 0:q[B]:se.state;const re=(J=(K=(W=ae===null||ae===void 0?void 0:ae.display_precision)!==null&&W!==void 0?W:(G=se.attributes)===null||G===void 0?void 0:G.display_precision)!==null&&K!==void 0?K:(X=se.attributes)===null||X===void 0?void 0:X.precision)!==null&&J!==void 0?J:this.countDecimals(parseFloat(ne));const le=parseFloat(ne);Y.entity=o;if(isNaN(le)){Y.value=null;Y.state="";Y.color="var(--disabled-text-color, #bdbdbd)";Y.pct="50";Y.pct_min="50";Y.pct_max="50";Y.pct_cursor="50";Y.pct_marker=50;Y.pct_state_step="50";Y.side_align="left";Y.separator="";Y.unit="";Y.setpoint_class=["","","","",""];Y.label_positions=[50,50,50,50,50];Y.progressClass="";if(Q.display.show_last_updated)Y.last_updated=this.resolveLastUpdated(se,E,P);return Y}Y.value=Number(le.toFixed(re));if(Q.display.show_last_updated)Y.last_updated=this.resolveLastUpdated(se,E,P);Y.unit=Q.display.show_units?m||te.unit||"":"";if($)Y.value=b||te.override;const asBound=e=>typeof e==="number"&&!isNaN(e)?e:void 0;const asEntity=e=>typeof e==="string"&&e!==""?e:void 0;const ce=asBound(l);const de=asBound(p);const pe=asEntity(l);const ue=asEntity(p);Y.min_value=pe!==void 0&&this.hass.states[pe]&&!isNaN(parseFloat(this.hass.states[pe].state))?parseFloat(this.hass.states[pe].state):Y.value;Y.max_value=ue!==void 0&&this.hass.states[ue]&&!isNaN(parseFloat(this.hass.states[ue].state))?parseFloat(this.hass.states[ue].state):Y.value;const he=this.resolveEntityNumber(O);const me=he!=null?he:u!=null?parseFloat(String(u)):te.setpoint!=null?parseFloat(String(te.setpoint)):Y.value;const ge=h!=null?parseFloat(String(h)):te.step!=null?parseFloat(String(te.step)):.1;const _e=C!=null?parseFloat(String(C)):te.step_low!=null?parseFloat(String(te.step_low)):ge;const ye=A!=null?parseFloat(String(A)):te.step_high!=null?parseFloat(String(te.step_high)):ge;const fe=Array.isArray(j)&&j.length===4;const ve=(j||[]).map(Number);const be=fe?Math.max(...ve.map(e=>this.countDecimals(e)),0):Math.max(this.countDecimals(me),this.countDecimals(_e),this.countDecimals(ye));Y.setpoint=me;const $e=this.resolveEntityNumber(T);const we=$e!=null?$e:v!==void 0?Number(v):-1/0;const xe=fe?Math.max(we,ce!=null?ce:0):Math.max(we,me-2*_e);const Se=fe?Math.max(we,ve[0]):Math.max(we,me-_e);const Ce=fe?Math.max(we,ve[1]):Math.max(we,me);const Ae=fe?Math.max(we,ve[2]):Math.max(we,me+ye);const ke=fe?Math.max(we,ve[3]):Math.max(we,me+2*ye);Y.setpoint_class=[xe.toFixed(be),Se.toFixed(be),Ce.toFixed(be),Ae.toFixed(be),ke.toFixed(be)];Y.separator=Q.display.show_labels?"-":"";Y.color="transparent";let Ee=null;if(Y.value!==null)Y.value=Math.max(we,Y.value);if(fe){Ee=[Q.colors.normal,Q.colors.fair,Q.colors.low,Q.colors.warn,Q.colors.hazardous];const e=["band.1","band.2","band.3","band.4","band.5"];if(F==="higher_is_better"){Ee.reverse();e.reverse()}const s=Number(Y.value);const o=[1,2,3,4].findIndex(e=>s<Number(Y.setpoint_class[e]));const l=o===-1?4:o;Y.color=Ee[l];Y.state=Q.display.show_labels?this.getTranslatedText(e[l]):""}else if(f==="heatflow")if(Number(Y.value)<Number(Y.setpoint_class[1])){Y.state=Q.display.show_labels?this.getTranslatedText("state.1"):"";Y.color=Q.colors.cool}else if(Number(Y.value)>=Number(Y.setpoint_class[1])&&Number(Y.value)<Number(Y.setpoint_class[3])){Y.state=Q.display.show_labels?this.getTranslatedText("state.3"):"";Y.color=Q.colors.normal}else{Y.state=Q.display.show_labels?this.getTranslatedText("state.5"):"";Y.color=Q.colors.warn}else if(Number(Y.value)<Number(Y.setpoint_class[0])){Y.state=Q.display.show_labels?this.getTranslatedText("state.1"):"";Y.color=Q.colors.warn}else if(Number(Y.value)>=Number(Y.setpoint_class[0])&&Number(Y.value)<Number(Y.setpoint_class[1])){Y.state=Q.display.show_labels?this.getTranslatedText("state.2"):"";Y.color=Q.colors.low}else if(Number(Y.value)>=Number(Y.setpoint_class[1])&&Number(Y.value)<Number(Y.setpoint_class[2])){Y.state=Q.display.show_labels?this.getTranslatedText("state.3"):"";Y.color=Q.colors.normal}else if(Number(Y.value)>=Number(Y.setpoint_class[2])&&Number(Y.value)<Number(Y.setpoint_class[3])){Y.state=Q.display.show_labels?this.getTranslatedText("state.4"):"";Y.color=Q.colors.normal}else if(Number(Y.value)>=Number(Y.setpoint_class[3])&&Number(Y.value)<Number(Y.setpoint_class[4])){Y.state=Q.display.show_labels?this.getTranslatedText("state.5"):"";Y.color=Q.colors.low}else if(Number(Y.value)>=Number(Y.setpoint_class[4])){Y.state=Q.display.show_labels?this.getTranslatedText("state.6"):"";Y.color=Q.colors.warn}Y.progressClass=e==="temperature"?"progress-temp":"progress";const Pe=ce!=null?ce:fe?xe:me-3*_e;const Oe=de!=null?de:fe?ke:me+3*ye;const Me=Oe-Pe;Y.bar_min=Pe;Y.bar_max=Oe;const clamp01=e=>Math.max(0,Math.min(1,e));const toRatio=e=>Me>0?clamp01((e-Pe)/Me):0;const Te=toRatio(Y.value);Y.pct=(Te*100).toFixed(1);Y.pct_marker=Te*100;Y.side_align=Y.value>me?"right":"left";Y.pct_cursor=Y.value>me?100-Te*100:Te*100;Y.pct_state_step=Y.value>me?100-Te*100+1:Te*100+1;const je=toRatio(Y.min_value)*100;const ze=toRatio(Y.max_value)*100;Y.pct_min=Y.value>me?100-je:je;Y.pct_max=Y.value>me?100-ze:ze;Y.label_positions=[toRatio(xe)*100,toRatio(Se)*100,toRatio(Ce)*100,toRatio(Ae)*100,toRatio(ke)*100];if(Ee)Y.monotonic_stops=Ee.map((e,s)=>`${e} ${Y.label_positions[s]}%`).join(", ");return Y}countDecimals(e){if(e===void 0||e===null)return 0;if(Math.floor(e)===e)return 0;const s=e.toString();if(s.includes("."))return s.split(".")[1].length||0;return 0}resolveBattery(e){var s,o;const l={level:null,icon:"mdi:battery-unknown",color:"var(--disabled-text-color, #bdbdbd)"};const p=(o=(s=this.hass)===null||s===void 0?void 0:s.states)===null||o===void 0?void 0:o[e];if(!p||p.state==="unavailable"||p.state==="unknown")return l;const u=parseFloat(p.state);if(isNaN(u))return l;return{level:u,icon:u>50?"mdi:battery":u>=20?"mdi:battery-50":"mdi:battery-20",color:u>50?"var(--state-sensor-battery-high-color, #4caf50)":u>=20?"var(--state-sensor-battery-medium-color, #ff9800)":"var(--state-sensor-battery-low-color, #f44336)"}}resolveCardBattery(){const e=this.getConfig().battery_entity;return e?this.resolveBattery(e):null}resolveStatus(e){var s,o,l;const p=this.getConfig();const u=e!==null&&e!==void 0?e:p.status_entity;if(!u)return null;const h=(o=(s=this.hass)===null||s===void 0?void 0:s.states)===null||o===void 0?void 0:o[u];if(!h)return null;const m=h.state;if(m==="unavailable"||m==="unknown")return null;const g=p.colors;const _=(l=h.attributes)===null||l===void 0?void 0:l.friendly_name;const f=parseFloat(m);let v;if(!isNaN(f))v=f<=33?"danger":f<=66?"warning":"good";else{const e=m.toLowerCase();const s=["safe","good","ok","healthy","optimal","green","normal"];const o=["warning","caution","moderate","yellow"];const l=["danger","critical","bad","poor","unsafe","red","high","low"];if(s.includes(e))v="good";else if(o.includes(e))v="warning";else if(l.includes(e))v="danger";else v="unknown"}const b={good:g.normal,warning:g.low,danger:g.warn,unknown:"var(--disabled-text-color, #bdbdbd)"};const $={good:"mdi:check-circle",warning:"mdi:alert",danger:"mdi:alert-octagon",unknown:"mdi:help-circle"};return{label:m,color:b[v],icon:$[v],friendly_name:_,entity_id:u}}resolveEntityNumber(e){var s,o;if(!e)return null;const l=(o=(s=this.hass)===null||s===void 0?void 0:s.states)===null||o===void 0?void 0:o[e];if(!l)return null;const p=parseFloat(l.state);return isNaN(p)?null:p}resolveLastUpdated(e,s,o){var l,p,u;const h=s?(p=(l=this.hass)===null||l===void 0?void 0:l.states)===null||p===void 0?void 0:p[s]:e;if(!h)return this.timeFromNow(e.last_updated);if(o){const e=(u=h.attributes)===null||u===void 0?void 0:u[o];if(e)return this.timeFromNow(String(e))}return this.timeFromNow(h.last_updated)}timeFromNow(e){const s=new Date(e);const o=Date.now()-s.getTime();const t=(e,s)=>{const o=s===1?"time":"time_plural";const l={[e]:s};return this.getTranslatedText(`${o}.${e}`,l)};const l=Math.floor(o/6e4);const p=Math.floor(l/60);const u=Math.floor(p/24);if(l<1)return t("seconds",0);if(l<60)return t("minutes",l);if(p<24)return t("hours",p);return t("days",u)}getConfig(){return this.config}setConfig(e){const s=this.constructor.SENSORS||{};const o=Object.keys(s);const l={display:getDisplayConfig(),colors:getColorConfig()};const p=Object.assign(Object.assign({},e),{status_entity:e.status_entity,display:Object.assign(Object.assign({},l.display),e.display||{}),colors:Object.assign(Object.assign({},l.colors),e.colors||{}),sensors:{}});if(!e.sensors)throw new Error('Configuration requires sensors to be defined under the "sensors" key.');Object.entries(e.sensors).forEach(([e,l])=>{const u=s[e]||{};const h=Array.isArray(l)?[...l]:[Object.assign({},l)];if(h.length===0)throw new Error(`Empty sensor array for ${e}`);const m=h.map(e=>Object.assign(Object.assign(Object.assign({},u),e),{nameDefinedByUser:!!e.name}));m.forEach((s,l)=>{if(!s.entity)throw new Error(`Missing entity for ${e}[${l}]`);if(s.nameDefinedByUser)s.title=s.name;if(o.length>0&&!o.includes(e))s.invalid=true;else s.invalid=false});p.sensors[e]=m});this.config=p}}MonitorCardBase.SENSORS={};MonitorCardBase.IMAGE_BASE_URL="";MonitorCardBase.styles=Me;__decorate([n({attribute:false})],MonitorCardBase.prototype,"hass",void 0);__decorate([n({attribute:false})],MonitorCardBase.prototype,"config",void 0);function defineCard(e,s){if(customElements.get(e)){console.warn(`[${e}] another custom card already registered this element name, so this one `+`will not render. Both cannot coexist, keep the one you want and remove the other.`);return}customElements.define(e,s)}const ze={temperature:{name:"Temperature",unit:"°C",setpoint:27,step:1,mode:"heatflow",category:"water_chemistry"},orp:{name:"ORP",unit:"mV",setpoint:700,step:50,mode:"centric",min_limit:0,category:"water_chemistry"},ec:{name:"Electrical Conductivity",unit:"µS/cm",setpoint:4e3,step:200,mode:"centric",min_limit:0,category:"water_chemistry"},tds:{name:"TDS",unit:"g/L",setpoint:5,step:.5,mode:"centric",min_limit:0,category:"water_chemistry"},ph:{name:"pH",unit:"pH",setpoint:7.2,step:.2,mode:"centric",min_limit:0,category:"water_chemistry"},salinity:{name:"Salinity",unit:"ppm",setpoint:3e3,step:500,mode:"centric",min_limit:0,category:"chemical_balance"},cya:{name:"Cyanuric Acid",unit:"ppm",setpoint:40,step:10,mode:"centric",min_limit:0,category:"chemical_balance"},calcium:{name:"Calcium",unit:"ppm",setpoint:300,step:100,mode:"centric",min_limit:0,category:"chemical_balance"},phosphate:{name:"Phosphate",unit:"ppb",setpoint:50,step:10,mode:"centric",min_limit:0,category:"chemical_balance"},alkalinity:{name:"Alkalinity",unit:"ppm",setpoint:100,step:20,mode:"centric",min_limit:0,category:"chemical_balance"},free_chlorine:{name:"Free Chlorine",unit:"ppm",setpoint:3,step:.5,mode:"centric",min_limit:0,category:"treatment"},total_chlorine:{name:"Total Chlorine",unit:"ppm",setpoint:3,step:.5,mode:"centric",min_limit:0,category:"treatment"},bromine:{name:"Bromine",unit:"ppm",setpoint:4,step:1,mode:"centric",min_limit:0,category:"treatment"},pressure:{name:"Filter Pressure",unit:"psi",setpoint:12,step:2,mode:"centric",category:"treatment"},specific_gravity:{name:"Specific Gravity",unit:"sg",setpoint:1.1,step:.2,mode:"centric",category:"treatment"},magnesium:{name:"Magnesium",unit:"ppm",setpoint:1200,step:100,mode:"centric",min_limit:0,category:"treatment"},chlorinator:{name:"Chlorinator Setting",unit:"%",setpoint:50,step:10,mode:"heatflow",min_limit:0,category:"treatment"},water_level:{name:"Water Level",unit:"%",setpoint:100,step:10,mode:"centric",min_limit:0,category:"equipment"},flow_rate:{name:"Flow Rate",unit:"m³/h",setpoint:10,step:1,mode:"centric",min_limit:0,category:"equipment"},uv_radiation:{name:"UV Radiation",unit:"mW/cm²",setpoint:4,step:1,mode:"centric",min_limit:0,category:"equipment"},product_volume:{name:"Product Volume",unit:"L",setpoint:20,step:5,mode:"centric",min_limit:0,category:"equipment"},product_weight:{name:"Product Weight",unit:"kg",setpoint:25,step:5,mode:"centric",min_limit:0,category:"equipment"},humidity:{name:"Humidity",unit:"%",icon:"mdi:water-percent",setpoint:60,step:10,mode:"centric",min_limit:0,category:"equipment"},filtration_time:{name:"Filtration Time",unit:"h",icon:"mdi:timer-outline",setpoint:8,step:2,mode:"centric",min_limit:0,category:"equipment"},pump_energy:{name:"Pump Energy",unit:"kWh",icon:"mdi:lightning-bolt",setpoint:5,step:2,mode:"heatflow",min_limit:0,category:"equipment"},pump_speed:{name:"Pump Speed",unit:"%",setpoint:50,step:10,mode:"heatflow",min_limit:0,category:"equipment"},light_brightness:{name:"Light Brightness",unit:"%",setpoint:80,step:10,mode:"heatflow",min_limit:0,category:"equipment"},heat_pump_setpoint:{name:"Heat Pump Setpoint",unit:"°C",setpoint:28,step:1,mode:"centric",min_limit:10,category:"equipment"}};const namesAPreset=(e,s)=>{const o=e.slice(e.indexOf(".")+1);return`_${o}_`.includes(`_${s}_`)};const buildEntitySuggestion=(e,s,o,l)=>(p,u)=>{var h,m;if(typeof u!=="string")return null;const g=u.split(".")[0];if(g!=="sensor"&&g!=="number")return null;const _=(h=p===null||p===void 0?void 0:p.states)===null||h===void 0?void 0:h[u];const f=(m=_===null||_===void 0?void 0:_.attributes)===null||m===void 0?void 0:m.device_class;const v=f?o[f]:void 0;const b=v&&s[v]?v:l.find(e=>s[e]&&namesAPreset(u,e));if(!b)return null;return{config:{type:`custom:${e}`,sensors:{[b]:{entity:u}}}}};const Fe="2.16.1";const Ne="2026-08-16-14-25";const He=`${Fe} (${Ne})`;console.info(`%c POOL-MONITORING-CARD %c ${He} `,"color: white; background: green; font-weight: 700;","color: green; background: white; font-weight: 700;");window.customCards=window.customCards||[];window.customCards.push({type:"pool-monitor-card",name:"Pool Monitor Card",description:"Monitor your pool water parameters with 21 preset sensors",preview:true,documentationURL:"https://github.com/wilsto/pool-monitor-card",getEntitySuggestion:buildEntitySuggestion("pool-monitor-card",ze,{ph:"ph",conductivity:"ec"},["orp","free_chlorine","total_chlorine","cya","salinity","alkalinity","tds","bromine","phosphate","calcium","magnesium","chlorinator","filtration_time","pump_energy","pump_speed","flow_rate","specific_gravity"])});class PoolMonitorCard extends MonitorCardBase{static async getConfigElement(){await Promise.resolve().then(()=>Ve);return document.createElement("pool-monitor-card-editor")}static getStubConfig(){return{sensors:{temperature:{entity:""}}}}}PoolMonitorCard.CARD_INFO={cardType:"pool-monitor-card",cardName:"Pool Monitor Card",cardDescription:'The "Pool Monitor Card" is a home assistant plugin that provides information about the temperature, pH, and ORP levels of your swimming pool'};PoolMonitorCard.SENSORS=ze;PoolMonitorCard.IMAGE_BASE_URL="https://raw.githubusercontent.com/wilsto/pool-monitor-card/master/resources";defineCard("pool-monitor-card",PoolMonitorCard);function fireEvent(e,s,o){e.dispatchEvent(new CustomEvent(s,{bubbles:true,composed:true,detail:o}))}const Re=Object.entries(Oe).map(([e,s])=>({value:e,label:s.language||e}));const generalSchema=e=>[{name:"title",label:e("card_title"),selector:{text:{}}},{name:"status_entity",label:e("status_entity"),selector:{entity:{}}}];const displaySchema=e=>[{name:"compact",label:e("compact"),selector:{boolean:{}}},{name:"show_names",label:e("show_names"),selector:{boolean:{}}},{name:"show_labels",label:e("show_labels"),selector:{boolean:{}}},{name:"show_last_updated",label:e("show_last_updated"),selector:{boolean:{}}},{name:"show_icons",label:e("show_icons"),selector:{boolean:{}}},{name:"show_units",label:e("show_units"),selector:{boolean:{}}},{name:"gradient",label:e("gradient"),selector:{boolean:{}}},{name:"language",label:e("language"),selector:{select:{options:Re}}},{name:"name_font_size",label:e("name_font_size"),selector:{text:{}}},{name:"name_font_weight",label:e("name_font_weight"),selector:{select:{options:[{value:"",label:e("font_weight.default")},{value:"normal",label:e("font_weight.normal")},{value:"bold",label:e("font_weight.bold")},{value:"300",label:e("font_weight.light")},{value:"600",label:e("font_weight.semi_bold")}]}}}];const colorsSchema=e=>Object.keys(je).map(s=>({name:s,label:e(`color.${s}`),selector:{text:{}}}));const Be=i$3`
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

  /* Collapsible groups. Eighteen fields at the same visual weight made every
     one of them look like work waiting to be done, while only the entity is
     actually required. */
  .sensor-section {
    border-top: 1px solid var(--divider-color);
    margin-top: 4px;
  }

  .sensor-section:last-of-type {
    border-bottom: 1px solid var(--divider-color);
  }

  .sensor-section-head {
    display: flex;
    align-items: baseline;
    gap: 8px;
    padding: 10px 2px;
    cursor: pointer;
    list-style: none;
  }

  .sensor-section-head::-webkit-details-marker {
    display: none;
  }

  .sensor-section-head::before {
    content: '▸';
    color: var(--secondary-text-color);
    font-size: 0.8em;
    width: 12px;
    flex: none;
  }

  .sensor-section[open] > .sensor-section-head::before {
    content: '▾';
  }

  .sensor-section-head:hover .sensor-section-name {
    color: var(--primary-color);
  }

  .sensor-section-name {
    font-weight: 500;
  }

  .sensor-section-sub {
    margin-left: auto;
    text-align: right;
    color: var(--secondary-text-color);
    font-size: 0.85em;
  }

  .sensor-section-body {
    padding: 2px 0 12px 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  /* The one field that is genuinely required says so, and says it where the
     eye already is rather than in a panel to the side. */
  .sensor-required.missing {
    border-left: 3px solid var(--error-color, #db4437);
    padding-left: 8px;
    margin-left: -11px;
  }

  .sensor-error {
    color: var(--error-color, #db4437);
    font-size: 0.8em;
    margin: 4px 0 0;
  }

  .sensor-hint {
    color: var(--secondary-text-color);
    font-size: 0.8em;
    margin: 2px 0 6px;
    line-height: 1.4;
  }
`;const editorText=(e,s)=>getTranslation((e===null||e===void 0?void 0:e.language)||"en",`editor.${s}`);class MonitorEditorBase extends i{t(e){return editorText(this.hass,e)}setConfig(e){this._config=Object.assign(Object.assign({},e),{display:Object.assign(Object.assign({},Te),e.display),colors:Object.assign(Object.assign({},je),e.colors),sensors:e.sensors||{}})}render(){if(!this.hass||!this._config)return oe``;return oe`
      <div class="card-config">
        <div class="section">
          <ha-form
            .hass=${this.hass}
            .data=${{title:this._config.title||"",status_entity:this._config.status_entity||""}}
            .schema=${generalSchema(e=>this.t(e))}
            .computeLabel=${this._computeLabel}
            @value-changed=${this._generalChanged}
          ></ha-form>
        </div>

        <div class="section">
          <div class="section-header">Sensors</div>
          ${this.renderSensorSection()}
        </div>

        <ha-expansion-panel .header=${this.t("display_options")}>
          <ha-form
            .hass=${this.hass}
            .data=${this._config.display}
            .schema=${displaySchema(e=>this.t(e))}
            .computeLabel=${this._computeLabel}
            @value-changed=${this._displayChanged}
          ></ha-form>
        </ha-expansion-panel>

        <ha-expansion-panel .header=${this.t("colors")}>
          <ha-form
            .hass=${this.hass}
            .data=${this._config.colors}
            .schema=${colorsSchema(e=>this.t(e))}
            .computeLabel=${this._computeLabel}
            @value-changed=${this._colorsChanged}
          ></ha-form>
        </ha-expansion-panel>
      </div>
    `}_generalChanged(e){e.stopPropagation();const s=e.detail.value;this._config=Object.assign(Object.assign({},this._config),{title:s.title||void 0,status_entity:s.status_entity||void 0});this._fireConfigChanged()}_displayChanged(e){e.stopPropagation();this._config=Object.assign(Object.assign({},this._config),{display:Object.assign(Object.assign({},this._config.display),e.detail.value)});this._fireConfigChanged()}_colorsChanged(e){e.stopPropagation();this._config=Object.assign(Object.assign({},this._config),{colors:Object.assign(Object.assign({},this._config.colors),e.detail.value)});this._fireConfigChanged()}_sensorsChanged(e){e.stopPropagation();this._config=Object.assign(Object.assign({},this._config),{sensors:e.detail.sensors});this._fireConfigChanged()}_fireConfigChanged(){fireEvent(this,"config-changed",{config:this._config})}_computeLabel(e){if(e.label)return e.label;return e.name.replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase())}}MonitorEditorBase.styles=Be;__decorate([n({attribute:false})],MonitorEditorBase.prototype,"hass",void 0);__decorate([r()],MonitorEditorBase.prototype,"_config",void 0);const Ue=["input_number","number","sensor"];const De=["binary_sensor","switch","input_boolean"];class MonitorSensorEditor extends i{constructor(){super(...arguments);this.sensors={};this.registry={};this.freeform=false;this._expanded={};this._newSensorType=""}t(e){return editorText(this.hass,e)}render(){const e=Object.entries(this.sensors);return oe`
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
                >`:ne}
          </div>
          <div class="sensor-row-actions">
            <ha-icon-button
              class="delete-btn"
              .path=${"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"}
              @click=${s=>{s.stopPropagation();this._removeSensor(e,o)}}
            ></ha-icon-button>
          </div>
        </div>
        ${u?this._renderSensorFields(e,s,o):ne}
      </div>
    `}_section(e){return oe`
      <details class="sensor-section" ?open=${e.open}>
        <summary class="sensor-section-head">
          <span class="sensor-section-name">${e.label}</span>
          <span class="sensor-section-sub">${e.summary}</span>
        </summary>
        <div class="sensor-section-body">${e.body}</div>
      </details>
    `}_summary(e,s,o){const l=s.filter(s=>e[s]!==void 0).length;if(!l)return o;return this.t("values_changed").replace("{count}",String(l))}_numberField(e,s,o,l,p){const u=p[l];return this._textField({label:e,value:u!=null?String(u):"",numeric:true,onChange:e=>this._updateField(s,o,l,e===""?void 0:Number(e))})}_entityField(e,s,o,l,p,u){return oe`
      <ha-entity-picker
        .hass=${this.hass}
        .value=${p[l]||""}
        .label=${e}
        .includeDomains=${u}
        allow-custom-entity
        @value-changed=${e=>this._updateField(s,o,l,e.detail.value||void 0)}
      ></ha-entity-picker>
    `}_renderScale(e,s,o){const l=Array.isArray(s.limits)&&s.limits.length===4;const p=this.registry[e]||{};const u=p.setpoint!=null?`${this.t("setpoint")} ${p.setpoint} (${this.t("inherited")})`:this.t("scale_hint_setpoint");const setMode=s=>{if(s==="limits"){const s=p.limits&&p.limits.length===4?[...p.limits]:[0,0,0,0];this._updateField(e,o,"limits",s)}else{this._updateField(e,o,"limits",void 0);this._updateField(e,o,"direction",void 0)}};const limit=l=>{var p;return this._textField({label:this.t(`limit_${l+1}`),value:((p=s.limits)===null||p===void 0?void 0:p[l])!=null?String(s.limits[l]):"",numeric:true,onChange:p=>{var u;const h=[...(u=s.limits)!==null&&u!==void 0?u:[0,0,0,0]];h[l]=Number(p);this._updateField(e,o,"limits",h)}})};return this._section({label:this.t("sec_scale"),summary:l?this.t("scale_from_limits"):u,body:oe`
        <label class="text-field">
          <span class="text-field-label">${this.t("scale_mode")}</span>
          <select
            class="sensor-select"
            @change=${e=>setMode(e.target.value)}
          >
            <option value="setpoint" ?selected=${!l}>
              ${this.t("scale_from_setpoint")}
            </option>
            <option value="limits" ?selected=${l}>${this.t("scale_from_limits")}</option>
          </select>
        </label>
        <p class="sensor-hint">
          ${l?this.t("scale_hint_limits"):this.t("scale_hint_setpoint")}
        </p>
        ${l?oe`
              <div class="sensor-field-row">${limit(0)}${limit(1)}</div>
              <div class="sensor-field-row">${limit(2)}${limit(3)}</div>
              <label class="text-field">
                <span class="text-field-label">${this.t("direction")}</span>
                <select
                  class="sensor-select"
                  @change=${s=>this._updateField(e,o,"direction",s.target.value)}
                >
                  <option
                    value="lower_is_better"
                    ?selected=${s.direction!=="higher_is_better"}
                  >
                    ${this.t("lower_is_better")}
                  </option>
                  <option
                    value="higher_is_better"
                    ?selected=${s.direction==="higher_is_better"}
                  >
                    ${this.t("higher_is_better")}
                  </option>
                </select>
              </label>
            `:oe`
              <div class="sensor-field-row">
                ${this._numberField(this.t("setpoint"),e,o,"setpoint",s)}
                ${this._numberField(this.t("step"),e,o,"step",s)}
                ${this._numberField(this.t("min_limit"),e,o,"min_limit",s)}
              </div>
              <div class="sensor-field-row">
                ${this._numberField(this.t("step_low"),e,o,"step_low",s)}
                ${this._numberField(this.t("step_high"),e,o,"step_high",s)}
              </div>
              ${this.freeform||!this.registry[e]?oe`
                    <label class="text-field">
                      <span class="text-field-label">${this.t("mode")}</span>
                      <select
                        class="sensor-select"
                        @change=${s=>this._updateField(e,o,"mode",s.target.value)}
                      >
                        <option
                          value="centric"
                          ?selected=${(s.mode||"centric")==="centric"}
                        >
                          ${this.t("mode_centric")}
                        </option>
                        <option value="heatflow" ?selected=${s.mode==="heatflow"}>
                          ${this.t("mode_heatflow")}
                        </option>
                      </select>
                    </label>
                  `:ne}
            `}
      `})}_renderSensorFields(e,s,o){return oe`
      <div class="sensor-row-content">
        <div class=${s.entity?"sensor-required":"sensor-required missing"}>
          <ha-entity-picker
            .hass=${this.hass}
            .value=${s.entity||""}
            .label=${`${this.t("entity")} (${this.t("required")})`}
            allow-custom-entity
            @value-changed=${s=>this._updateField(e,o,"entity",s.detail.value)}
          ></ha-entity-picker>
          ${s.entity?"":oe`<p class="sensor-error">${this.t("entity_required")}</p>`}
        </div>

        ${this._textField({label:this.t("attribute"),value:s.attribute||"",onChange:s=>this._updateField(e,o,"attribute",s||void 0)})}
        <p class="sensor-hint">${this.t("attribute_hint")}</p>

        ${this._section({label:this.t("sec_content"),summary:this._summary(s,["name","unit"],this.t("inherited")),body:oe`
            <div class="sensor-field-row">
              ${this._textField({label:this.t("name_override"),value:s.name||"",onChange:s=>this._updateField(e,o,"name",s||void 0)})}
              ${this._textField({label:this.t("unit_override"),value:s.unit||"",onChange:s=>this._updateField(e,o,"unit",s||void 0)})}
            </div>
          `})}
        ${this._section({label:this.t("sec_appearance"),summary:this._summary(s,["icon","image_url"],this.t("sec_appearance_sub")),body:oe`
            <div class="sensor-field-row">
              ${this._textField({label:this.t("icon"),value:s.icon||"",onChange:s=>this._updateField(e,o,"icon",s||void 0)})}
              ${this._textField({label:this.t("image_url"),value:s.image_url||"",onChange:s=>this._updateField(e,o,"image_url",s||void 0)})}
            </div>
          `})}
        ${this._renderScale(e,s,o)}
        ${this._section({label:this.t("sec_linked"),summary:this._summary(s,["setpoint_entity","min_limit_entity","min","max","availability_entity","battery_entity"],this.t("sec_linked_sub")),body:oe`
            ${this._entityField(this.t("setpoint_entity"),e,o,"setpoint_entity",s,Ue)}
            ${this._entityField(this.t("min_limit_entity"),e,o,"min_limit_entity",s,Ue)}
            ${this._entityField(this.t("min_entity"),e,o,"min",s)}
            ${this._entityField(this.t("max_entity"),e,o,"max",s)}
            ${this._entityField(this.t("availability_entity"),e,o,"availability_entity",s,De)}
            ${this._entityField(this.t("battery_entity"),e,o,"battery_entity",s,["sensor"])}
          `})}
        ${this._section({label:this.t("sec_timestamp"),summary:this._summary(s,["last_updated_entity","last_updated_attribute"],this.t("sec_timestamp_sub")),body:oe`
            ${this._entityField(this.t("last_updated_entity"),e,o,"last_updated_entity",s)}
            ${this._textField({label:this.t("last_updated_attribute"),value:s.last_updated_attribute||"",onChange:s=>this._updateField(e,o,"last_updated_attribute",s||void 0)})}
          `})}
      </div>
    `}_renderAddSensor(){if(this.freeform)return oe`
        <div class="freeform-input">
          ${this._textField({label:this.t("sensor_type_key"),value:this._newSensorType,live:true,onChange:e=>{this._newSensorType=e}})}
          <ha-icon-button
            .path=${"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"}
            @click=${this._addFreeformSensor}
          ></ha-icon-button>
        </div>
      `;const e=Object.entries(this.registry).filter(([e])=>!this.sensors[e]).map(([e,s])=>({value:e,label:s.name,category:s.category||"other"}));if(e.length===0)return oe`<div class="empty-message">${this.t("all_configured")}</div>`;const s={water_chemistry:this.t("category.water_chemistry"),chemical_balance:this.t("category.chemical_balance"),treatment:this.t("category.treatment"),equipment:this.t("category.equipment"),other:this.t("category.other")};const o=e.reduce((e,s)=>{const o=s.category;if(!e[o])e[o]=[];e[o].push(s);return e},{});const l=["water_chemistry","chemical_balance","treatment","equipment","other"];return oe`
      <div class="add-sensor-row">
        <select
          class="sensor-select"
          @change=${e=>{const s=e.target;const o=s.value;if(o){this._addPresetSensor(o);s.value=""}}}
        >
          <option value="">Add sensor...</option>
          ${l.filter(e=>{var s;return((s=o[e])===null||s===void 0?void 0:s.length)>0}).map(e=>oe`
                <option disabled>, ${s[e]} ,</option>
                ${o[e].map(e=>oe`<option value=${e.value}>${e.label}</option>`)}
              `)}
        </select>
      </div>
    `}_toggleExpand(e){this._expanded=Object.assign(Object.assign({},this._expanded),{[e]:!this._expanded[e]})}_addPresetSensor(e){const s=Object.assign(Object.assign({},this.sensors),{[e]:{entity:""}});this._expanded=Object.assign(Object.assign({},this._expanded),{[e]:true});this._fireSensorsChanged(s)}_addFreeformSensor(){const e=this._newSensorType.trim().toLowerCase().replace(/\s+/g,"_").replace(/[^a-z0-9_]/g,"");if(!e)return;if(this.sensors[e]){const s=this.sensors[e];const o=Array.isArray(s)?[...s]:[s];o.push({entity:""});const l=Object.assign(Object.assign({},this.sensors),{[e]:o});const p=`${e}-${o.length-1}`;this._expanded=Object.assign(Object.assign({},this._expanded),{[p]:true});this._fireSensorsChanged(l)}else{const s=Object.assign(Object.assign({},this.sensors),{[e]:{entity:""}});this._expanded=Object.assign(Object.assign({},this._expanded),{[e]:true});this._fireSensorsChanged(s)}this._newSensorType=""}_removeSensor(e,s){const o=this.sensors[e];if(Array.isArray(o)){const l=o.filter((e,o)=>o!==s);if(l.length===0){const s=this.sensors,o=e;s[o];const l=__rest(s,[typeof o==="symbol"?o:o+""]);this._fireSensorsChanged(l)}else if(l.length===1)this._fireSensorsChanged(Object.assign(Object.assign({},this.sensors),{[e]:l[0]}));else this._fireSensorsChanged(Object.assign(Object.assign({},this.sensors),{[e]:l}))}else{const s=this.sensors,o=e;s[o];const l=__rest(s,[typeof o==="symbol"?o:o+""]);this._fireSensorsChanged(l)}}_updateField(e,s,o,l){const p=this.sensors[e];if(Array.isArray(p)){const u=[...p];u[s]=Object.assign(Object.assign({},u[s]),{[o]:l});if(l===void 0||l==="")delete u[s][o];this._fireSensorsChanged(Object.assign(Object.assign({},this.sensors),{[e]:u}))}else{const s=Object.assign(Object.assign({},p),{[o]:l});if(l===void 0||l==="")delete s[o];this._fireSensorsChanged(Object.assign(Object.assign({},this.sensors),{[e]:s}))}}_fireSensorsChanged(e){this.dispatchEvent(new CustomEvent("sensors-changed",{bubbles:true,composed:true,detail:{sensors:e}}))}}MonitorSensorEditor.styles=Be;__decorate([n({attribute:false})],MonitorSensorEditor.prototype,"hass",void 0);__decorate([n({attribute:false})],MonitorSensorEditor.prototype,"sensors",void 0);__decorate([n({attribute:false})],MonitorSensorEditor.prototype,"registry",void 0);__decorate([n({type:Boolean})],MonitorSensorEditor.prototype,"freeform",void 0);__decorate([r()],MonitorSensorEditor.prototype,"_expanded",void 0);__decorate([r()],MonitorSensorEditor.prototype,"_newSensorType",void 0);if(!customElements.get("monitor-sensor-editor"))customElements.define("monitor-sensor-editor",MonitorSensorEditor);let Le=class PoolMonitorCardEditor extends MonitorEditorBase{get sensorsRegistry(){return ze}get hasPresets(){return true}renderSensorSection(){return oe`
      <monitor-sensor-editor
        .hass=${this.hass}
        .sensors=${this._config.sensors||{}}
        .registry=${this.sensorsRegistry}
        @sensors-changed=${this._sensorsChanged}
      ></monitor-sensor-editor>
    `}};Le=__decorate([t("pool-monitor-card-editor")],Le);const Ve=Object.freeze(Object.defineProperty({__proto__:null,get PoolMonitorCardEditor(){return Le}},Symbol.toStringTag,{value:"Module"}));e.PoolMonitorCard=PoolMonitorCard;Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});return e}({});
//# sourceMappingURL=pool-monitor-card.js.map
