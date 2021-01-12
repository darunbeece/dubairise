define(["../components/my-app.js"],function(_myApp){"use strict";(0,_myApp.Polymer)({/** @override */_template:_myApp.html$1`
    <style>
      :host {
        display: inline-block;
        position: relative;
        width: 400px;
        border: 1px solid;
        padding: 2px;
        -moz-appearance: textarea;
        -webkit-appearance: textarea;
        overflow: hidden;
      }

      .mirror-text {
        visibility: hidden;
        word-wrap: break-word;
        @apply --iron-autogrow-textarea;
      }

      .fit {
        @apply --layout-fit;
      }

      textarea {
        position: relative;
        outline: none;
        border: none;
        resize: none;
        background: inherit;
        color: inherit;
        /* see comments in template */
        width: 100%;
        height: 100%;
        font-size: inherit;
        font-family: inherit;
        line-height: inherit;
        text-align: inherit;
        @apply --iron-autogrow-textarea;
      }

      textarea::-webkit-input-placeholder {
        @apply --iron-autogrow-textarea-placeholder;
      }

      textarea:-moz-placeholder {
        @apply --iron-autogrow-textarea-placeholder;
      }

      textarea::-moz-placeholder {
        @apply --iron-autogrow-textarea-placeholder;
      }

      textarea:-ms-input-placeholder {
        @apply --iron-autogrow-textarea-placeholder;
      }
    </style>

    <!-- the mirror sizes the input/textarea so it grows with typing -->
    <!-- use &#160; instead &nbsp; of to allow this element to be used in XHTML -->
    <div id="mirror" class="mirror-text" aria-hidden="true">&nbsp;</div>

    <!-- size the input/textarea with a div, because the textarea has intrinsic size in ff -->
    <div class="textarea-container fit">
      <textarea id="textarea" name$="[[name]]" aria-label$="[[label]]" autocomplete$="[[autocomplete]]" autofocus$="[[autofocus]]" autocapitalize$="[[autocapitalize]]" inputmode$="[[inputmode]]" placeholder$="[[placeholder]]" readonly$="[[readonly]]" required$="[[required]]" disabled$="[[disabled]]" rows$="[[rows]]" minlength$="[[minlength]]" maxlength$="[[maxlength]]"></textarea>
    </div>
`,is:"iron-autogrow-textarea",behaviors:[_myApp.IronValidatableBehavior,_myApp.IronControlState],properties:{/**
     * Use this property instead of `bind-value` for two-way data binding.
     * @type {string|number}
     */value:{observer:"_valueChanged",type:String,notify:!0},/**
     * This property is deprecated, and just mirrors `value`. Use `value`
     * instead.
     * @type {string|number}
     */bindValue:{observer:"_bindValueChanged",type:String,notify:!0},/**
     * The initial number of rows.
     *
     * @attribute rows
     * @type number
     * @default 1
     */rows:{type:Number,value:1,observer:"_updateCached"},/**
     * The maximum number of rows this element can grow to until it
     * scrolls. 0 means no maximum.
     *
     * @attribute maxRows
     * @type number
     * @default 0
     */maxRows:{type:Number,value:0,observer:"_updateCached"},/**
     * Bound to the textarea's `autocomplete` attribute.
     */autocomplete:{type:String,value:"off"},/**
     * Bound to the textarea's `autofocus` attribute.
     *
     * @type {!boolean}
     */autofocus:{type:Boolean,value:!1},/**
     * Bound to the textarea's `autocapitalize` attribute.
     */autocapitalize:{type:String,value:"none"},/**
     * Bound to the textarea's `inputmode` attribute.
     */inputmode:{type:String},/**
     * Bound to the textarea's `placeholder` attribute.
     */placeholder:{type:String},/**
     * Bound to the textarea's `readonly` attribute.
     */readonly:{type:String},/**
     * Set to true to mark the textarea as required.
     */required:{type:Boolean},/**
     * The minimum length of the input value.
     */minlength:{type:Number},/**
     * The maximum length of the input value.
     */maxlength:{type:Number},/**
     * Bound to the textarea's `aria-label` attribute.
     */label:{type:String}},listeners:{input:"_onInput"},/**
   * Returns the underlying textarea.
   * @return {!HTMLTextAreaElement}
   */get textarea(){return(/** @type {!HTMLTextAreaElement} */this.$.textarea)},/**
   * Returns textarea's selection start.
   * @return {number}
   */get selectionStart(){return this.$.textarea.selectionStart},/**
   * Returns textarea's selection end.
   * @return {number}
   */get selectionEnd(){return this.$.textarea.selectionEnd},/**
   * Sets the textarea's selection start.
   */set selectionStart(value){this.$.textarea.selectionStart=value},/**
   * Sets the textarea's selection end.
   */set selectionEnd(value){this.$.textarea.selectionEnd=value},/** @override */attached:function(){/* iOS has an arbitrary left margin of 3px that isn't present
     * in any other browser, and means that the paper-textarea's cursor
     * overlaps the label.
     * See https://github.com/PolymerElements/paper-input/issues/468.
     */var IS_IOS=navigator.userAgent.match(/iP(?:[oa]d|hone)/)&&!navigator.userAgent.match(/OS 1[3456789]/);if(IS_IOS){this.$.textarea.style.marginLeft="-3px"}},/**
   * Returns true if `value` is valid. The validator provided in `validator`
   * will be used first, if it exists; otherwise, the `textarea`'s validity
   * is used.
   * @return {boolean} True if the value is valid.
   */validate:function(){// Use the nested input's native validity.
var valid=this.$.textarea.validity.valid;// Only do extra checking if the browser thought this was valid.
if(valid){// Empty, required input is invalid
if(this.required&&""===this.value){valid=!1}else if(this.hasValidator()){valid=_myApp.IronValidatableBehavior.validate.call(this,this.value)}}this.invalid=!valid;this.fire("iron-input-validate");return valid},_bindValueChanged:function(bindValue){this.value=bindValue},_valueChanged:function(value){var textarea=this.textarea;if(!textarea){return}// If the bindValue changed manually, then we need to also update
// the underlying textarea's value. Otherwise this change was probably
// generated from the _onInput handler, and the two values are already
// the same.
if(textarea.value!==value){textarea.value=!(value||0===value)?"":value}this.bindValue=value;this.$.mirror.innerHTML=this._valueForMirror();// Manually notify because we don't want to notify until after setting
// value.
this.fire("bind-value-changed",{value:this.bindValue})},_onInput:function(event){var eventPath=(0,_myApp.dom)(event).path;this.value=eventPath?eventPath[0].value:event.target.value},_constrain:function(tokens){var _tokens;tokens=tokens||[""];// Enforce the min and max heights for a multiline input to avoid
// measurement
if(0<this.maxRows&&tokens.length>this.maxRows){_tokens=tokens.slice(0,this.maxRows)}else{_tokens=tokens.slice(0)}while(0<this.rows&&_tokens.length<this.rows){_tokens.push("")}// Use &#160; instead &nbsp; of to allow this element to be used in XHTML.
return _tokens.join("<br/>")+"&#160;"},_valueForMirror:function(){var input=this.textarea;if(!input){return}this.tokens=input&&input.value?input.value.replace(/&/gm,"&amp;").replace(/"/gm,"&quot;").replace(/'/gm,"&#39;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").split("\n"):[""];return this._constrain(this.tokens)},_updateCached:function(){this.$.mirror.innerHTML=this._constrain(this.tokens)}});class MyContact extends _myApp.PageViewElement{static get properties(){return{userCount:{type:Number}}}static get styles(){return[_myApp.sharedStyles,_myApp.css`
      :host {
        display: block;
       
      }
      iron-autogrow-textarea {
        border: 1px solid #c3c3c3;
    }
      .dtr-section{
        width: 50%;
        position: relative;
        top: -100px;
        min-height: 350px;
         
      }
      .dtr-content{
        padding:10px;
        display:block;
        width:400px;
        height:auto;
        background:#fff;
         border-radius:10px;
          border:1px solid dodgerblue; 
         left:35%;
         
      }
      .dtr-banner-img{
        width:100%;
        height:500px;
        object-fit: cover;
        object-position: 5px 15%;
   
      }
      .form-section{
        padding:10px;
        display:block;
      } 
      .address{
        padding-top:10px;
        text-align:left;
      }
      h3{
        text-align:left;
      }
      @media screen and (max-width: 667px){
        .dtr-section{
          width: 100%;
          position: relative;
          top: -100px;
          min-height: 400px;
           
        }
        .dtr-content{
          left:3%;
          width:80%;
        }
        .address{
          top: -85px;
    position: relative;
        }
      }
      @media screen and (min-width: 767px) {
        .dtr-section{
          width: 40%;
          position: relative;
          top: -100px;
          min-height: 400px;
           
        }
        .dtr-content{
          left:45%;
        }
       
      }
      @media screen and (min-width: 768px) and (max-width:1023px){
        .dtr-section{
          width: 50%;
          position: relative;
          top: -100px;
          min-height: 400px;
           
        }
        .dtr-content{
          left:10%;
          width:320px;
        }
      }
      @media screen and (min-width: 1024px) and (max-width:1280px){
        .dtr-section{
          width: 46%;
          position: relative;
          top: -100px;
          min-height: 400px;
           
        }
        .dtr-content{
          left:25%;
        }
      }
      `]}constructor(){super()}updated(changedProps){if(changedProps.has("data")){}}load(){try{this.updateComplete.then(()=>{console.log("Loaded Contact")})}catch(error){console.log(error)}}render(){try{return _myApp.html`
      <div class="layout col-xs-12">
      <div>
        <img src=${this.rootPath+"images/dtr-abt.jpg"} class="dtr-banner-img">
      </div>
      <div class="dtr-section col-xs-12 col-md-6">
        
        <div class="col-xs-12 col-md-6">
          <div class="col-xs-12 dtr-content">
          <h1>Contact</h1>
          <div class="form-section">
          <div class="col-xs-12">
            <paper-input label="Your Name" class="col-xs-11 pb-2" always-float-label></paper-input>
          </div>
          
          <div class="col-xs-12">
            <paper-input label="Your Email" class="col-xs-11 pb-2" always-float-label></paper-input>
          </div>
          <div class="col-xs-12">
            <paper-input label="Subject" class="col-xs-11 pb-2" always-float-label></paper-input>
          </div>
          <div class="col-xs-12">
                <label id="label1">Your Message</label>
              </div>
          <div class="col-xs-12 pb-2">
              <iron-autogrow-textarea rows="4" class="col-xs-11 pb-2" style="border:1px solid rgb(33,33,33);"></iron-autogrow-textarea>
          </div>
          <div class="col-xs-12 pb-4">
                <paper-button class="button" class="col-xs-11" raised >Submit</paper-button> 
              </div>
          </div>
          </div>
         
        </div>
       
      </div>
      <div class="col-xs-12 col-sm-6 p-0">
      <div class="address pl-5">
        <h3 class="pt-0">Address</h3>
        <div>
        No.68, St. Thomas Building,</br>
        1st Floor, Luz Church Rd,</br>
        Kattukoil Garden, Mylapore,</br>
        Chennai,Tamil Nadu - 600004
        </div>
        <div class="pt-2">
        <iron-icon icon="icons:mail" class="pr-1"></iron-icon>info@tamilrise.org</br>
        <iron-icon icon="icons:mail" class="pr-1"></iron-icon>support@tamilrise.org</br>
        <iron-icon icon="communication:phone" class="pr-1"></iron-icon>+91 73959 22365
        </div>
      </div>
    </div>
      </div>
            `}catch(error){console.log(error)}}stateChanged(state){}}window.customElements.define("my-contact",MyContact)});