function t(t,e,i,s){var r,n=arguments.length,o=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(o=(n<3?r(o):n>3?r(e,i,o):r(e,i))||o);return n>3&&o&&Object.defineProperty(e,i,o),o}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),r=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(i,t,s)},a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,m=g.trustedTypes,f=m?m.emptyScript:"",v=g.reactiveElementPolyfillSupport,y=(t,e)=>t,_={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},$=(t,e)=>!c(t,e),b={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const n=s?.call(this);r?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),r=e.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:_).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:_;this._$Em=s;const n=r.fromAttribute(e,t.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(void 0!==t){const n=this.constructor;if(!1===s&&(r=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??$)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==r||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[y("elementProperties")]=new Map,x[y("finalized")]=new Map,v?.({ReactiveElement:x}),(g.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,A=t=>t,k=w.trustedTypes,C=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+S,M=`<${P}>`,D=document,z=()=>D.createComment(""),U=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,N="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,R=/>/g,j=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),B=/'/g,L=/"/g,W=/^(?:script|style|textarea|title)$/i,I=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),F=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),q=new WeakMap,J=D.createTreeWalker(D,129);function K(t,e){if(!O(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(e):e}const Y=(t,e)=>{const i=t.length-1,s=[];let r,n=2===e?"<svg>":3===e?"<math>":"",o=T;for(let e=0;e<i;e++){const i=t[e];let a,c,l=-1,h=0;for(;h<i.length&&(o.lastIndex=h,c=o.exec(i),null!==c);)h=o.lastIndex,o===T?"!--"===c[1]?o=H:void 0!==c[1]?o=R:void 0!==c[2]?(W.test(c[2])&&(r=RegExp("</"+c[2],"g")),o=j):void 0!==c[3]&&(o=j):o===j?">"===c[0]?(o=r??T,l=-1):void 0===c[1]?l=-2:(l=o.lastIndex-c[2].length,a=c[1],o=void 0===c[3]?j:'"'===c[3]?L:B):o===L||o===B?o=j:o===H||o===R?o=T:(o=j,r=void 0);const d=o===j&&t[e+1].startsWith("/>")?" ":"";n+=o===T?i+M:l>=0?(s.push(a),i.slice(0,l)+E+i.slice(l)+S+d):i+S+(-2===l?e:d)}return[K(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Z{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,n=0;const o=t.length-1,a=this.parts,[c,l]=Y(t,e);if(this.el=Z.createElement(c,i),J.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=J.nextNode())&&a.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(E)){const e=l[n++],i=s.getAttribute(t).split(S),o=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:o[2],strings:i,ctor:"."===o[1]?et:"?"===o[1]?it:"@"===o[1]?st:tt}),s.removeAttribute(t)}else t.startsWith(S)&&(a.push({type:6,index:r}),s.removeAttribute(t));if(W.test(s.tagName)){const t=s.textContent.split(S),e=t.length-1;if(e>0){s.textContent=k?k.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],z()),J.nextNode(),a.push({type:2,index:++r});s.append(t[e],z())}}}else if(8===s.nodeType)if(s.data===P)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(S,t+1));)a.push({type:7,index:r}),t+=S.length-1}r++}}static createElement(t,e){const i=D.createElement("template");return i.innerHTML=t,i}}function G(t,e,i=t,s){if(e===F)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const n=U(e)?void 0:e._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),void 0===n?r=void 0:(r=new n(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=G(t,r._$AS(t,e.values),r,s)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??D).importNode(e,!0);J.currentNode=s;let r=J.nextNode(),n=0,o=0,a=i[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new Q(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new rt(r,this,t)),this._$AV.push(e),a=i[++o]}n!==a?.index&&(r=J.nextNode(),n++)}return J.currentNode=D,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),U(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>O(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(D.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new X(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new Z(t)),e}k(t){O(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new Q(this.O(z()),this.O(z()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,s){const r=this.strings;let n=!1;if(void 0===r)t=G(this,t,e,0),n=!U(t)||t!==this._$AH&&t!==F,n&&(this._$AH=t);else{const s=t;let o,a;for(t=r[0],o=0;o<r.length-1;o++)a=G(this,s[i+o],e,o),a===F&&(a=this._$AH[o]),n||=!U(a)||a!==this._$AH[o],a===V?t=V:t!==V&&(t+=(a??"")+r[o+1]),this._$AH[o]=a}n&&!s&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class st extends tt{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??V)===F)return;const i=this._$AH,s=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==V&&(i===V||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}}const nt=w.litHtmlPolyfillSupport;nt?.(Z,Q),(w.litHtmlVersions??=[]).push("3.3.2");const ot=globalThis;class at extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new Q(e.insertBefore(z(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}}at._$litElement$=!0,at.finalized=!0,ot.litElementHydrateSupport?.({LitElement:at});const ct=ot.litElementPolyfillSupport;ct?.({LitElement:at}),(ot.litElementVersions??=[]).push("4.2.2");const lt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ht={attribute:!0,type:String,converter:_,reflect:!1,hasChanged:$},dt=(t=ht,e,i)=>{const{kind:s,metadata:r}=i;let n=globalThis.litPropertyMetadata.get(r);if(void 0===n&&globalThis.litPropertyMetadata.set(r,n=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,r,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const r=this[s];e.call(this,i),this.requestUpdate(s,r,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function pt(t){return(e,i)=>"object"==typeof i?dt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ut(t){return pt({...t,state:!0,attribute:!1})}const gt="etekcity_fitness_scale_ble",mt=`${gt}/card_config`,ft=[{key:"body_mass_index",label:"BMI",icon:"mdi:human-male-height-variant",unit:"",precision:1},{key:"body_fat_percentage",label:"Body Fat",icon:"mdi:human-handsdown",unit:"%",precision:1},{key:"fat_free_weight",label:"Fat Free Weight",icon:"mdi:run",unit:"",precision:1},{key:"subcutaneous_fat_percentage",label:"Subcut. Fat",icon:"mdi:human-handsdown",unit:"%",precision:1},{key:"visceral_fat_value",label:"Visceral Fat",icon:"mdi:human-handsdown",unit:"",precision:0},{key:"body_water_percentage",label:"Body Water",icon:"mdi:water-percent",unit:"%",precision:1},{key:"basal_metabolic_rate",label:"BMR",icon:"mdi:fire",unit:" cal",precision:0},{key:"skeletal_muscle_percentage",label:"Skeletal Muscle",icon:"mdi:weight-lifter",unit:"%",precision:1},{key:"muscle_mass",label:"Muscle Mass",icon:"mdi:weight-lifter",unit:"",precision:1},{key:"bone_mass",label:"Bone Mass",icon:"mdi:bone",unit:"",precision:1},{key:"protein_percentage",label:"Protein",icon:"mdi:egg-fried",unit:"%",precision:1},{key:"metabolic_age",label:"Metabolic Age",icon:"mdi:human-walker",unit:" yr",precision:0}],vt=["body_mass_index","body_fat_percentage","muscle_mass"],yt=new Map;function _t(t,e=1){if(null==t||""===t||"unknown"===t||"unavailable"===t)return"--";const i="number"==typeof t?t:parseFloat(t);return isNaN(i)?"--":i.toFixed(e)}function $t(t){try{return new Date(t).toLocaleDateString(void 0,{month:"short",day:"numeric"})}catch{return t}}let bt=class extends at{_getPendingMeasurements(){const t=this.scaleConfig.diagnostics?.pending_measurements;if(!t)return[];const e=this.hass.states[t];if(!e)return[];return e.attributes.pending??[]}async _assignMeasurement(t,e){const i=this.scaleConfig.device_id;try{await this.hass.callService(gt,"assign_measurement",{device_id:i,timestamp:t,user_id:e})}catch(t){console.error("Failed to assign measurement:",t)}}render(){const t=this._getPendingMeasurements();return 0===t.length?V:I`
      <div class="banner">
        <div class="banner-title">
          <ha-icon icon="mdi:scale-balance"></ha-icon>
          ${1===t.length?"1 Pending Measurement":`${t.length} Pending Measurements`}
        </div>
        ${t.map(t=>{const e=void 0!==t["Weight (lbs)"]?`${_t(t["Weight (lbs)"],1)} lbs`:void 0!==t["Weight (kg)"]?`${_t(t["Weight (kg)"],1)} kg`:"--",i=t.Timestamp,s=(()=>{try{return new Date(i).toLocaleString(void 0,{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"})}catch{return i}})();return I`
            <div class="pending-item">
              <div class="pending-weight">${e}</div>
              <div class="pending-time">${s}</div>
              <div class="assign-buttons">
                ${this.scaleConfig.users.map(t=>I`
                    <button
                      class="assign-btn"
                      @click=${()=>this._assignMeasurement(i,t.user_id)}
                    >
                      ${t.name}
                    </button>
                  `)}
              </div>
            </div>
          `})}
      </div>
    `}};function xt(t){if(0===t.length)return{points:[],min:0,max:0};const e=t.map(t=>t.value);let i=Math.min(...e),s=Math.max(...e);const r=s-i||1;i-=.05*r,s+=.05*r;const n=t.map(t=>new Date(t.timestamp).getTime()),o=Math.min(...n),a=Math.max(...n)-o||1,c=t.map((t,e)=>({x:(n[e]-o)/a,y:(t.value-i)/(s-i),label:t.timestamp,value:t.value}));return{points:c,min:i,max:s}}bt.styles=o`
    .banner {
      background: var(--warning-color, #ff9800);
      color: var(--text-primary-color, #fff);
      border-radius: 12px;
      padding: 12px 16px;
      margin-bottom: 16px;
    }
    .banner-title {
      font-weight: 500;
      font-size: 14px;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .banner-title ha-icon {
      --mdc-icon-size: 20px;
    }
    .pending-item {
      background: rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      padding: 10px 12px;
      margin-bottom: 8px;
    }
    .pending-item:last-child {
      margin-bottom: 0;
    }
    .pending-weight {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 6px;
    }
    .pending-time {
      font-size: 12px;
      opacity: 0.85;
      margin-bottom: 8px;
    }
    .assign-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .assign-btn {
      background: rgba(255, 255, 255, 0.25);
      border: 1px solid rgba(255, 255, 255, 0.4);
      border-radius: 16px;
      padding: 4px 12px;
      font-size: 13px;
      color: inherit;
      cursor: pointer;
      transition: background 0.15s;
    }
    .assign-btn:hover {
      background: rgba(255, 255, 255, 0.4);
    }
  `,t([pt({attribute:!1})],bt.prototype,"hass",void 0),t([pt({attribute:!1})],bt.prototype,"scaleConfig",void 0),bt=t([lt("scale-pending-banner")],bt);let wt=class extends at{constructor(){super(...arguments),this.data=[],this.width=120,this.height=40}render(){if(!this.data||0===this.data.length)return I`<span style="color: var(--secondary-text-color, #888); font-size: 12px;">No data yet</span>`;const{points:t}=xt(this.data),e=function(t,e,i,s=0){if(0===t.length)return"";const r=e-2*s,n=i-2*s;return t.map(t=>`${s+t.x*r},${s+(1-t.y)*n}`).join(" ")}(t,this.width,this.height,4),i=t[t.length-1],s=4+i.x*(this.width-8),r=4+(1-i.y)*(this.height-8);return I`
      <svg
        width="${this.width}"
        height="${this.height}"
        viewBox="0 0 ${this.width} ${this.height}"
      >
        <polyline class="line" points="${e}" />
        <circle class="dot" cx="${s}" cy="${r}" r="2.5" />
      </svg>
    `}};wt.styles=o`
    :host {
      display: inline-block;
    }
    svg {
      display: block;
    }
    .line {
      fill: none;
      stroke: var(--primary-color, #03a9f4);
      stroke-width: 1.5;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .dot {
      fill: var(--primary-color, #03a9f4);
    }
  `,t([pt({type:Array})],wt.prototype,"data",void 0),t([pt({type:Number})],wt.prototype,"width",void 0),t([pt({type:Number})],wt.prototype,"height",void 0),wt=t([lt("scale-sparkline")],wt);let At=class extends at{constructor(){super(...arguments),this.chartDays=7,this.showCharts=!0}_getEntityPicture(){if(!this.user.person_entity)return null;const t=this.hass.states[this.user.person_entity];return t?t.attributes.entity_picture??null:null}_getWeight(){const t=this.user.entities.weight;if(!t)return{value:"--",unit:"",available:!1};const e=this.hass.states[t];if(!e)return{value:"--",unit:"",available:!1};const i="unavailable"!==e.state&&"unknown"!==e.state,s=e.attributes.unit_of_measurement??"";return{value:_t(e.state,1),unit:s,available:i}}_getSummaryLine(){const t=[];for(const e of vt){const i=this.user.entities[e];if(!i)continue;const s=this.hass.states[i];if(!s||"unavailable"===s.state||"unknown"===s.state)continue;const r=ft.find(t=>t.key===e);if(!r)continue;const n=_t(s.state,r.precision);if("--"===n)continue;const o=s.attributes.unit_of_measurement??r.unit;t.push(`${r.label} ${n}${o}`)}return t.join("  ·  ")}_getSparklineData(){const t=this.user.entities.weight;if(!t)return[];const e=this.hass.states[t];if(!e)return[];const i=e.attributes.weight_history;if(!i||!Array.isArray(i))return[];const s=Date.now()-24*this.chartDays*60*60*1e3;return i.filter(t=>{try{return new Date(t.timestamp).getTime()>=s}catch{return!1}}).map(t=>({timestamp:t.timestamp,value:t.weight}))}render(){const t=this._getEntityPicture(),e=this._getWeight(),i=this._getSummaryLine(),s=this.showCharts?this._getSparklineData():[],r=this.user.name?this.user.name[0].toUpperCase():"?";return I`
      <div class="user-card" @click=${this._onClick}>
        <div class="user-header">
          <div class="avatar">
            ${t?I`<img src="${t}" alt="${this.user.name}" />`:r}
          </div>
          <div class="user-info">
            <div class="user-name">${this.user.name}</div>
          </div>
        </div>
        <div class="user-weight">
          ${e.value}${"--"!==e.value?I` <span style="font-size: 14px; font-weight: 400;">${e.unit}</span>`:V}
        </div>
        ${i?I`<div class="user-summary">${i}</div>`:V}
        <div class="user-bottom">
          ${e.available||"--"===e.value?I`<span></span>`:I`<span class="unavailable-indicator">Last known</span>`}
          ${this.showCharts&&s.length>0?I`<scale-sparkline .data=${s}></scale-sparkline>`:V}
        </div>
      </div>
    `}_onClick(){this.dispatchEvent(new CustomEvent("user-select",{detail:{userId:this.user.user_id},bubbles:!0,composed:!0}))}};At.styles=o`
    :host {
      display: block;
    }
    .user-card {
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 12px;
      padding: 16px;
      cursor: pointer;
      transition: box-shadow 0.15s, border-color 0.15s;
    }
    .user-card:hover {
      border-color: var(--primary-color, #03a9f4);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    .user-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 8px;
    }
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: 500;
      overflow: hidden;
      flex-shrink: 0;
    }
    .avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .user-info {
      flex: 1;
      min-width: 0;
    }
    .user-name {
      font-size: 16px;
      font-weight: 500;
      color: var(--primary-text-color, #212121);
    }
    .user-weight {
      font-size: 24px;
      font-weight: 600;
      color: var(--primary-text-color, #212121);
    }
    .user-summary {
      font-size: 12px;
      color: var(--secondary-text-color, #757575);
      margin-top: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .user-bottom {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-top: 8px;
    }
    .unavailable-indicator {
      font-size: 11px;
      color: var(--secondary-text-color, #888);
      font-style: italic;
    }
  `,t([pt({attribute:!1})],At.prototype,"hass",void 0),t([pt({attribute:!1})],At.prototype,"user",void 0),t([pt({type:Number})],At.prototype,"chartDays",void 0),t([pt({type:Boolean})],At.prototype,"showCharts",void 0),At=t([lt("scale-user-overview")],At);let kt=class extends at{render(){if(!this.user.has_body_metrics)return I`
        <div class="grid">
          <div class="no-metrics">
            Body metrics not enabled for this user.
            <br />
            Enable in integration settings.
          </div>
        </div>
      `;const t=[{key:"weight",label:"Weight",icon:"mdi:human-handsdown",unit:"",precision:1},{key:"impedance",label:"Impedance",icon:"mdi:omega",unit:"",precision:0},...ft];return I`
      <div class="grid">
        ${t.map(t=>{const e=this.user.entities[t.key];if(!e)return V;const i=this.hass.states[e];if(!i)return I`
              <div class="metric-card">
                <div class="metric-label">
                  <ha-icon icon="${t.icon}"></ha-icon>
                  ${t.label}
                </div>
                <div class="metric-value">--</div>
              </div>
            `;const s=_t(i.state,t.precision),r=i.attributes.unit_of_measurement??t.unit;return I`
            <div class="metric-card">
              <div class="metric-label">
                <ha-icon icon="${t.icon}"></ha-icon>
                ${t.label}
              </div>
              <div class="metric-value">
                ${s}<span class="metric-unit">${r?` ${r}`:""}</span>
              </div>
            </div>
          `})}
      </div>
    `}};kt.styles=o`
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    .metric-card {
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      padding: 10px 12px;
    }
    .metric-label {
      font-size: 12px;
      color: var(--secondary-text-color, #757575);
      display: flex;
      align-items: center;
      gap: 4px;
      margin-bottom: 4px;
    }
    .metric-label ha-icon {
      --mdc-icon-size: 14px;
    }
    .metric-value {
      font-size: 20px;
      font-weight: 500;
      color: var(--primary-text-color, #212121);
    }
    .metric-unit {
      font-size: 12px;
      font-weight: 400;
      color: var(--secondary-text-color, #757575);
    }
    .no-metrics {
      text-align: center;
      padding: 16px;
      color: var(--secondary-text-color, #888);
      font-size: 14px;
      grid-column: 1 / -1;
    }
  `,t([pt({attribute:!1})],kt.prototype,"hass",void 0),t([pt({attribute:!1})],kt.prototype,"user",void 0),kt=t([lt("scale-metrics-grid")],kt);let Ct=class extends at{constructor(){super(...arguments),this._confirmDelete=null}_getHistory(){const t=this.user.entities.weight;if(!t)return[];const e=this.hass.states[t];if(!e)return[];const i=e.attributes.weight_history;return i&&Array.isArray(i)?[...i].sort((t,e)=>new Date(e.timestamp).getTime()-new Date(t.timestamp).getTime()):[]}_onDeleteClick(t){this._confirmDelete=t}_onCancelDelete(){this._confirmDelete=null}async _onConfirmDelete(t){this._confirmDelete=null;try{await this.hass.callService(gt,"remove_measurement",{device_id:this.scaleConfig.device_id,user_id:this.user.user_id,timestamp:t})}catch(t){console.error("Failed to remove measurement:",t)}}render(){const t=this._getHistory();return 0===t.length?I`<div class="no-history">No measurement history</div>`:I`
      <div>
        <div class="history-header">Recent Measurements</div>
        <div class="history-list">
          ${t.map(t=>this._confirmDelete===t.timestamp?I`
                <div class="confirm-row">
                  <span>Delete this measurement?</span>
                  <button
                    class="confirm-btn"
                    @click=${()=>this._onConfirmDelete(t.timestamp)}
                  >
                    Delete
                  </button>
                  <button class="cancel-btn" @click=${this._onCancelDelete}>
                    Cancel
                  </button>
                </div>
              `:I`
              <div class="history-item">
                <div class="history-left">
                  <span class="history-weight">
                    ${t.weight} ${t.unit}
                  </span>
                  <span class="history-time">
                    ${function(t){try{return new Date(t).toLocaleString(void 0,{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"})}catch{return t}}(t.timestamp)}
                    ${void 0!==t.impedance?I` &middot; <span class="history-impedance">${t.impedance} \u03A9</span>`:V}
                  </span>
                </div>
                <button
                  class="delete-btn"
                  @click=${()=>this._onDeleteClick(t.timestamp)}
                  title="Delete measurement"
                >
                  <ha-icon icon="mdi:trash-can-outline" style="--mdc-icon-size: 18px;"></ha-icon>
                </button>
              </div>
            `)}
        </div>
      </div>
    `}};Ct.styles=o`
    .history-header {
      font-size: 14px;
      font-weight: 500;
      color: var(--primary-text-color, #212121);
      margin-bottom: 8px;
    }
    .history-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .history-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 12px;
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      font-size: 14px;
    }
    .history-left {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .history-weight {
      font-weight: 500;
      color: var(--primary-text-color, #212121);
    }
    .history-time {
      font-size: 12px;
      color: var(--secondary-text-color, #757575);
    }
    .history-impedance {
      font-size: 12px;
      color: var(--secondary-text-color, #757575);
    }
    .delete-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      color: var(--secondary-text-color, #757575);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.15s, background 0.15s;
    }
    .delete-btn:hover {
      color: var(--error-color, #f44336);
      background: rgba(244, 67, 54, 0.1);
    }
    .confirm-row {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      background: var(--error-color, #f44336);
      color: #fff;
      border-radius: 8px;
      font-size: 13px;
    }
    .confirm-row span {
      flex: 1;
    }
    .confirm-btn {
      background: rgba(255, 255, 255, 0.25);
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-radius: 4px;
      padding: 4px 10px;
      cursor: pointer;
      color: inherit;
      font-size: 12px;
    }
    .confirm-btn:hover {
      background: rgba(255, 255, 255, 0.4);
    }
    .cancel-btn {
      background: none;
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-radius: 4px;
      padding: 4px 10px;
      cursor: pointer;
      color: inherit;
      font-size: 12px;
    }
    .no-history {
      text-align: center;
      padding: 16px;
      color: var(--secondary-text-color, #888);
      font-size: 14px;
    }
  `,t([pt({attribute:!1})],Ct.prototype,"hass",void 0),t([pt({attribute:!1})],Ct.prototype,"user",void 0),t([pt({attribute:!1})],Ct.prototype,"scaleConfig",void 0),t([ut()],Ct.prototype,"_confirmDelete",void 0),Ct=t([lt("scale-history-list")],Ct);let Et=class extends at{constructor(){super(...arguments),this.data=[],this.unit=""}render(){if(!this.data||0===this.data.length)return I`<div class="no-data">No weight data yet</div>`;const t=50,e=16,{points:i,min:s,max:r}=xt(this.data),n=334,o=156,a=i.map(i=>`${t+i.x*n},${e+(1-i.y)*o}`).join(" "),c=i[0],l=i[i.length-1],h=a+` ${t+l.x*n},172`+` ${t+c.x*n},172`,d=r-s,p=[];for(let t=0;t<=4;t++){const i=s+d*t/4,r=e+(1-t/4)*o;p.push({value:i,y:r})}const u=Math.min(i.length,5),g=[];if(i.length>1)for(let e=0;e<u;e++){const s=i[Math.round(e*(i.length-1)/(u-1))];g.push({label:$t(s.label),x:t+s.x*n})}else g.push({label:$t(i[0].label),x:t+i[0].x*n});return I`
      <div class="chart-container">
        <svg viewBox="0 0 ${400} ${200}" preserveAspectRatio="xMidYMid meet">
          <!-- Grid lines -->
          ${p.map(e=>I`
              <line
                class="grid-line"
                x1="${t}"
                y1="${e.y}"
                x2="${384}"
                y2="${e.y}"
              />
            `)}

          <!-- Area fill -->
          <polygon class="area" points="${h}" />

          <!-- Data line -->
          <polyline class="line" points="${a}" />

          <!-- Data points -->
          ${i.map(i=>{const s=t+i.x*n,r=e+(1-i.y)*o;return I`<circle class="dot" cx="${s}" cy="${r}" r="3" />`})}

          <!-- Y-axis labels -->
          ${p.map(t=>I`
              <text
                class="axis-label"
                x="${44}"
                y="${t.y+3}"
                text-anchor="end"
              >
                ${t.value.toFixed(1)}
              </text>
            `)}

          <!-- X-axis labels -->
          ${g.map(t=>I`
              <text
                class="axis-label"
                x="${t.x}"
                y="${196}"
                text-anchor="middle"
              >
                ${t.label}
              </text>
            `)}
        </svg>
      </div>
    `}};Et.styles=o`
    :host {
      display: block;
    }
    .chart-container {
      position: relative;
      width: 100%;
    }
    svg {
      display: block;
      width: 100%;
      height: auto;
    }
    .line {
      fill: none;
      stroke: var(--primary-color, #03a9f4);
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .area {
      fill: var(--primary-color, #03a9f4);
      opacity: 0.1;
    }
    .dot {
      fill: var(--primary-color, #03a9f4);
    }
    .axis-label {
      font-size: 10px;
      fill: var(--secondary-text-color, #888);
    }
    .grid-line {
      stroke: var(--divider-color, #e0e0e0);
      stroke-width: 0.5;
      stroke-dasharray: 4 2;
    }
    .no-data {
      text-align: center;
      padding: 24px;
      color: var(--secondary-text-color, #888);
      font-size: 14px;
    }
  `,t([pt({type:Array})],Et.prototype,"data",void 0),t([pt({type:String})],Et.prototype,"unit",void 0),Et=t([lt("scale-weight-chart")],Et);let St=class extends at{_getEntityPicture(){if(!this.user.person_entity)return null;const t=this.hass.states[this.user.person_entity];return t?t.attributes.entity_picture??null:null}_getWeight(){const t=this.user.entities.weight;if(!t)return{value:"--",unit:""};const e=this.hass.states[t];if(!e)return{value:"--",unit:""};const i=e.attributes.unit_of_measurement??"";return{value:_t(e.state,1),unit:i}}_getChartData(){const t=this.user.entities.weight;if(!t)return[];const e=this.hass.states[t];if(!e)return[];const i=e.attributes.weight_history;return i&&Array.isArray(i)?i.map(t=>({timestamp:t.timestamp,value:t.weight})):[]}render(){const t=this._getEntityPicture(),e=this._getWeight(),i=this._getChartData(),s=this.user.name?this.user.name[0].toUpperCase():"?";return I`
      <button class="back-btn" @click=${this._onBack}>
        <ha-icon icon="mdi:arrow-left"></ha-icon>
        Back
      </button>

      <div class="user-header">
        <div class="avatar">
          ${t?I`<img src="${t}" alt="${this.user.name}" />`:s}
        </div>
        <div class="user-info">
          <div class="user-name">${this.user.name}</div>
          <div class="user-weight">${e.value} ${e.unit}</div>
        </div>
      </div>

      <div class="section-title">Body Composition</div>
      <scale-metrics-grid
        .hass=${this.hass}
        .user=${this.user}
      ></scale-metrics-grid>

      ${i.length>0?I`
            <div class="chart-section">
              <div class="section-title">Weight History</div>
              <scale-weight-chart
                .data=${i}
                .unit=${e.unit}
              ></scale-weight-chart>
            </div>
          `:V}

      <div style="margin-top: 16px;">
        <scale-history-list
          .hass=${this.hass}
          .user=${this.user}
          .scaleConfig=${this.scaleConfig}
        ></scale-history-list>
      </div>
    `}_onBack(){this.dispatchEvent(new CustomEvent("back-to-overview",{bubbles:!0,composed:!0}))}};St.styles=o`
    :host {
      display: block;
    }
    .back-btn {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: none;
      border: none;
      cursor: pointer;
      color: var(--primary-color, #03a9f4);
      font-size: 14px;
      padding: 4px 0;
      margin-bottom: 12px;
    }
    .back-btn:hover {
      text-decoration: underline;
    }
    .back-btn ha-icon {
      --mdc-icon-size: 18px;
    }
    .user-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
    }
    .avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      font-weight: 500;
      overflow: hidden;
      flex-shrink: 0;
    }
    .avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .user-info {
      flex: 1;
    }
    .user-name {
      font-size: 20px;
      font-weight: 600;
      color: var(--primary-text-color, #212121);
    }
    .user-weight {
      font-size: 14px;
      color: var(--secondary-text-color, #757575);
    }
    .section-title {
      font-size: 14px;
      font-weight: 500;
      color: var(--primary-text-color, #212121);
      margin: 16px 0 8px;
    }
    .chart-section {
      margin: 16px 0;
    }
  `,t([pt({attribute:!1})],St.prototype,"hass",void 0),t([pt({attribute:!1})],St.prototype,"user",void 0),t([pt({attribute:!1})],St.prototype,"scaleConfig",void 0),St=t([lt("scale-user-detail")],St);let Pt=class extends at{constructor(){super(...arguments),this._activeView={type:"overview"},this._loading=!0,this._configFetched=!1}setConfig(t){this._config={show_pending:!0,show_charts:!0,chart_days:7,...t}}set hass(t){const e=this._hass;this._hass=t,!this._configFetched&&t&&(this._configFetched=!0,this._fetchConfig(t)),this.requestUpdate("hass",e)}get hass(){return this._hass}async _fetchConfig(t){this._loading=!0;try{const e=await async function(t,e){const i=Date.now(),s=e??"__single__",r=yt.get(s);if(r&&i-r.ts<6e4)return r.data;try{const s=await t.connection.sendMessagePromise({type:mt});if(!s||!s.scales||0===s.scales.length)return;for(const t of s.scales)yt.set(t.device_id,{data:t,ts:i});if(e){const t=s.scales.find(t=>t.device_id===e);return t||void 0}return 1===s.scales.length?(yt.set("__single__",{data:s.scales[0],ts:i}),s.scales[0]):void 0}catch(t){return void console.error("etekcity-scale-card: Failed to fetch card config:",t)}}(t,this._config?.device_id);if(e)this._scaleConfig=e,this._error=void 0;else{const e=await t.connection.sendMessagePromise({type:`${gt}/card_config`});if(e.scales&&e.scales.length>1){const t=e.scales.map(t=>`  device_id: "${t.device_id}" # ${t.device_name}`).join("\n");this._error=`Multiple scales found. Please specify device_id in card config:\n${t}`}else e.scales&&0===e.scales.length?this._error="No scales configured. Set up the Etekcity Scale integration first.":this._error="Could not load scale configuration."}}catch(t){this._error=`Failed to load: ${t.message||t}`}this._loading=!1}_handleUserSelect(t){this._activeView={type:"detail",userId:t.detail.userId}}_handleBackToOverview(){this._activeView={type:"overview"}}render(){if(!this._hass||!this._config)return I`<ha-card><div class="loading">Loading...</div></ha-card>`;if(this._loading)return I`<ha-card><div class="loading">Loading scale data...</div></ha-card>`;if(this._error)return I`
        <ha-card>
          <div class="error-msg">
            <ha-icon icon="mdi:alert-circle-outline" style="--mdc-icon-size: 36px; display: block; margin: 0 auto 8px;"></ha-icon>
            <pre style="white-space: pre-wrap; font-family: inherit; margin: 0;">${this._error}</pre>
          </div>
        </ha-card>
      `;if(!this._scaleConfig)return I`<ha-card><div class="loading">No data</div></ha-card>`;const t=this._config.title??this._scaleConfig.device_name;if("detail"===this._activeView.type){const e=this._activeView.userId,i=this._scaleConfig.users.find(t=>t.user_id===e);return i?I`
        <ha-card>
          <scale-user-detail
            .hass=${this._hass}
            .user=${i}
            .scaleConfig=${this._scaleConfig}
            @back-to-overview=${this._handleBackToOverview}
          ></scale-user-detail>
        </ha-card>
      `:(this._activeView={type:"overview"},this._renderOverview(t))}return this._renderOverview(t)}_renderOverview(t){return I`
      <ha-card>
        <div class="card-header">
          <div class="card-title">${t}</div>
        </div>

        ${this._config.show_pending?I`
              <scale-pending-banner
                .hass=${this._hass}
                .scaleConfig=${this._scaleConfig}
              ></scale-pending-banner>
            `:V}

        ${0===this._scaleConfig.users.length?I`
              <div class="no-users">
                No users configured.
                <br />
                Add users in the
                <a href="/config/integrations/integration/${gt}"
                  >integration settings</a
                >.
              </div>
            `:I`
              <div class="users-grid">
                ${this._scaleConfig.users.map(t=>I`
                    <scale-user-overview
                      .hass=${this._hass}
                      .user=${t}
                      .chartDays=${this._config.chart_days??7}
                      .showCharts=${this._config.show_charts??!0}
                      @user-select=${this._handleUserSelect}
                    ></scale-user-overview>
                  `)}
              </div>
            `}
      </ha-card>
    `}getCardSize(){return this._scaleConfig?Math.max(2,2*this._scaleConfig.users.length+1):3}static getConfigElement(){}static getStubConfig(){return{type:"custom:etekcity-scale-card"}}};Pt.styles=o`
    :host {
      display: block;
    }
    ha-card {
      padding: 16px;
      overflow: hidden;
    }
    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
    }
    .card-title {
      font-size: 18px;
      font-weight: 500;
      color: var(--primary-text-color, #212121);
    }
    .users-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 12px;
    }
    .error-msg {
      color: var(--error-color, #f44336);
      padding: 16px;
      text-align: center;
    }
    .loading {
      text-align: center;
      padding: 32px;
      color: var(--secondary-text-color, #888);
    }
    .no-users {
      text-align: center;
      padding: 24px;
      color: var(--secondary-text-color, #888);
    }
    .no-users a {
      color: var(--primary-color, #03a9f4);
      text-decoration: none;
    }
    .no-users a:hover {
      text-decoration: underline;
    }
  `,t([ut()],Pt.prototype,"_config",void 0),t([ut()],Pt.prototype,"_scaleConfig",void 0),t([ut()],Pt.prototype,"_activeView",void 0),t([ut()],Pt.prototype,"_error",void 0),t([ut()],Pt.prototype,"_loading",void 0),Pt=t([lt("etekcity-scale-card")],Pt),window.customCards=window.customCards||[],window.customCards.push({type:"etekcity-scale-card",name:"Etekcity Fitness Scale",description:"Body composition dashboard for Etekcity BLE scales",preview:!0,documentationURL:"https://github.com/ronnnnnnnnnnnnn/etekcity_fitness_scale_ble"});export{Pt as EtekcityScaleCard};
