define(["exports","../components/my-app.js"],function(_exports,_myApp){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.PaperMenuButton=_exports.NeonAnimationBehavior=_exports.$paperMenuButton=_exports.$neonAnimationBehavior=void 0;(0,_myApp.Polymer)({_template:_myApp.html$1`
    <style>
      :host {
        position: fixed;
      }

      #contentWrapper ::slotted(*) {
        overflow: auto;
      }

      #contentWrapper.animating ::slotted(*) {
        overflow: hidden;
        pointer-events: none;
      }
    </style>

    <div id="contentWrapper">
      <slot id="content" name="dropdown-content"></slot>
    </div>
`,is:"iron-dropdown",behaviors:[_myApp.IronControlState,_myApp.IronA11yKeysBehavior,_myApp.IronOverlayBehavior,_myApp.NeonAnimationRunnerBehavior],properties:{/**
     * The orientation against which to align the dropdown content
     * horizontally relative to the dropdown trigger.
     * Overridden from `Polymer.IronFitBehavior`.
     */horizontalAlign:{type:String,value:"left",reflectToAttribute:!0},/**
     * The orientation against which to align the dropdown content
     * vertically relative to the dropdown trigger.
     * Overridden from `Polymer.IronFitBehavior`.
     */verticalAlign:{type:String,value:"top",reflectToAttribute:!0},/**
     * An animation config. If provided, this will be used to animate the
     * opening of the dropdown. Pass an Array for multiple animations.
     * See `neon-animation` documentation for more animation configuration
     * details.
     */openAnimationConfig:{type:Object},/**
     * An animation config. If provided, this will be used to animate the
     * closing of the dropdown. Pass an Array for multiple animations.
     * See `neon-animation` documentation for more animation configuration
     * details.
     */closeAnimationConfig:{type:Object},/**
     * If provided, this will be the element that will be focused when
     * the dropdown opens.
     */focusTarget:{type:Object},/**
     * Set to true to disable animations when opening and closing the
     * dropdown.
     */noAnimations:{type:Boolean,value:!1},/**
     * By default, the dropdown will constrain scrolling on the page
     * to itself when opened.
     * Set to true in order to prevent scroll from being constrained
     * to the dropdown when it opens.
     * This property is a shortcut to set `scrollAction` to lock or refit.
     * Prefer directly setting the `scrollAction` property.
     */allowOutsideScroll:{type:Boolean,value:!1,observer:"_allowOutsideScrollChanged"}},listeners:{"neon-animation-finish":"_onNeonAnimationFinish"},observers:["_updateOverlayPosition(positionTarget, verticalAlign, horizontalAlign, verticalOffset, horizontalOffset)"],/**
   * The element that is contained by the dropdown, if any.
   */get containedElement(){// Polymer 2.x returns slot.assignedNodes which can contain text nodes.
for(var nodes=(0,_myApp.dom)(this.$.content).getDistributedNodes(),i=0,l=nodes.length;i<l;i++){if(nodes[i].nodeType===Node.ELEMENT_NODE){return nodes[i]}}},ready:function(){// Ensure scrollAction is set.
if(!this.scrollAction){this.scrollAction=this.allowOutsideScroll?"refit":"lock"}this._readied=!0},attached:function(){if(!this.sizingTarget||this.sizingTarget===this){this.sizingTarget=this.containedElement||this}},detached:function(){this.cancelAnimation()},/**
   * Called when the value of `opened` changes.
   * Overridden from `IronOverlayBehavior`
   */_openedChanged:function(){if(this.opened&&this.disabled){this.cancel()}else{this.cancelAnimation();this._updateAnimationConfig();_myApp.IronOverlayBehaviorImpl._openedChanged.apply(this,arguments)}},/**
   * Overridden from `IronOverlayBehavior`.
   */_renderOpened:function(){if(!this.noAnimations&&this.animationConfig.open){this.$.contentWrapper.classList.add("animating");this.playAnimation("open")}else{_myApp.IronOverlayBehaviorImpl._renderOpened.apply(this,arguments)}},/**
   * Overridden from `IronOverlayBehavior`.
   */_renderClosed:function(){if(!this.noAnimations&&this.animationConfig.close){this.$.contentWrapper.classList.add("animating");this.playAnimation("close")}else{_myApp.IronOverlayBehaviorImpl._renderClosed.apply(this,arguments)}},/**
   * Called when animation finishes on the dropdown (when opening or
   * closing). Responsible for "completing" the process of opening or
   * closing the dropdown by positioning it or setting its display to
   * none.
   */_onNeonAnimationFinish:function(){this.$.contentWrapper.classList.remove("animating");if(this.opened){this._finishRenderOpened()}else{this._finishRenderClosed()}},/**
   * Constructs the final animation config from different properties used
   * to configure specific parts of the opening and closing animations.
   */_updateAnimationConfig:function(){// Update the animation node to be the containedElement.
for(var animationNode=this.containedElement,animations=[].concat(this.openAnimationConfig||[]).concat(this.closeAnimationConfig||[]),i=0;i<animations.length;i++){animations[i].node=animationNode}this.animationConfig={open:this.openAnimationConfig,close:this.closeAnimationConfig}},/**
   * Updates the overlay position based on configured horizontal
   * and vertical alignment.
   */_updateOverlayPosition:function(){if(this.isAttached){// This triggers iron-resize, and iron-overlay-behavior will call refit if
// needed.
this.notifyResize()}},/**
   * Sets scrollAction according to the value of allowOutsideScroll.
   * Prefer setting directly scrollAction.
   */_allowOutsideScrollChanged:function(allowOutsideScroll){// Wait until initial values are all set.
if(!this._readied){return}if(!allowOutsideScroll){this.scrollAction="lock"}else if(!this.scrollAction||"lock"===this.scrollAction){this.scrollAction="refit"}},/**
   * Apply focus to focusTarget or containedElement
   */_applyFocus:function(){var focusTarget=this.focusTarget||this.containedElement;if(focusTarget&&this.opened&&!this.noAutoFocus){focusTarget.focus()}else{_myApp.IronOverlayBehaviorImpl._applyFocus.apply(this,arguments)}}});const NeonAnimationBehavior={properties:{/**
     * Defines the animation timing.
     */animationTiming:{type:Object,value:function(){return{duration:500,easing:"cubic-bezier(0.4, 0, 0.2, 1)",fill:"both"}}}},/**
   * Can be used to determine that elements implement this behavior.
   */isNeonAnimation:!0,/**
   * Do any animation configuration here.
   */ // configure: function(config) {
// },
created:function(){if(!document.body.animate){console.warn("No web animations detected. This element will not"+" function without a web animations polyfill.")}},/**
   * Returns the animation timing by mixing in properties from `config` to the
   * defaults defined by the animation.
   */timingFromConfig:function(config){if(config.timing){for(var property in config.timing){this.animationTiming[property]=config.timing[property]}}return this.animationTiming},/**
   * Sets `transform` and `transformOrigin` properties along with the prefixed
   * versions.
   */setPrefixedProperty:function(node,property,value){for(var map={transform:["webkitTransform"],transformOrigin:["mozTransformOrigin","webkitTransformOrigin"]},prefixes=map[property],prefix,index=0;prefix=prefixes[index];index++){node.style[prefix]=value}node.style[property]=value},/**
   * Called when the animation finishes.
   */complete:function(config){}};_exports.NeonAnimationBehavior=NeonAnimationBehavior;var neonAnimationBehavior={NeonAnimationBehavior:NeonAnimationBehavior};_exports.$neonAnimationBehavior=neonAnimationBehavior;(0,_myApp.Polymer)({is:"fade-in-animation",behaviors:[NeonAnimationBehavior],configure:function(config){var node=config.node;this._effect=new KeyframeEffect(node,[{opacity:"0"},{opacity:"1"}],this.timingFromConfig(config));return this._effect}});(0,_myApp.Polymer)({is:"fade-out-animation",behaviors:[NeonAnimationBehavior],configure:function(config){var node=config.node;this._effect=new KeyframeEffect(node,[{opacity:"1"},{opacity:"0"}],this.timingFromConfig(config));return this._effect}});const $_documentContainer=document.createElement("template");$_documentContainer.setAttribute("style","display: none;");$_documentContainer.innerHTML=`<iron-iconset-svg name="paper-dropdown-menu" size="24">
<svg><defs>
<g id="arrow-drop-down"><path d="M7 10l5 5 5-5z"></path></g>
</defs></svg>
</iron-iconset-svg>`;document.head.appendChild($_documentContainer.content);(0,_myApp.Polymer)({is:"paper-menu-grow-height-animation",behaviors:[NeonAnimationBehavior],configure:function(config){var node=config.node,rect=node.getBoundingClientRect(),height=rect.height;this._effect=new KeyframeEffect(node,[{height:height/2+"px"},{height:height+"px"}],this.timingFromConfig(config));return this._effect}});(0,_myApp.Polymer)({is:"paper-menu-grow-width-animation",behaviors:[NeonAnimationBehavior],configure:function(config){var node=config.node,rect=node.getBoundingClientRect(),width=rect.width;this._effect=new KeyframeEffect(node,[{width:width/2+"px"},{width:width+"px"}],this.timingFromConfig(config));return this._effect}});(0,_myApp.Polymer)({is:"paper-menu-shrink-width-animation",behaviors:[NeonAnimationBehavior],configure:function(config){var node=config.node,rect=node.getBoundingClientRect(),width=rect.width;this._effect=new KeyframeEffect(node,[{width:width+"px"},{width:width-width/20+"px"}],this.timingFromConfig(config));return this._effect}});(0,_myApp.Polymer)({is:"paper-menu-shrink-height-animation",behaviors:[NeonAnimationBehavior],configure:function(config){var node=config.node,rect=node.getBoundingClientRect(),height=rect.height;this.setPrefixedProperty(node,"transformOrigin","0 0");this._effect=new KeyframeEffect(node,[{height:height+"px",transform:"translateY(0)"},{height:height/2+"px",transform:"translateY(-20px)"}],this.timingFromConfig(config));return this._effect}});var config={ANIMATION_CUBIC_BEZIER:"cubic-bezier(.3,.95,.5,1)",MAX_ANIMATION_TIME_MS:400};/**
   Material design: [Dropdown
   buttons](https://www.google.com/design/spec/components/buttons.html#buttons-dropdown-buttons)
   
   `paper-menu-button` allows one to compose a designated "trigger" element with
   another element that represents "content", to create a dropdown menu that
   displays the "content" when the "trigger" is clicked.
   
   The child element assigned to the `dropdown-trigger` slot will be used as the
   "trigger" element. The child element assigned to the `dropdown-content` slot
   will be used as the "content" element.
   
   The `paper-menu-button` is sensitive to its content's `iron-select` events. If
   the "content" element triggers an `iron-select` event, the `paper-menu-button`
   will close automatically.
   
   Example:
   
       <paper-menu-button>
         <paper-icon-button icon="menu"
   slot="dropdown-trigger"></paper-icon-button> <paper-listbox
   slot="dropdown-content"> <paper-item>Share</paper-item>
           <paper-item>Settings</paper-item>
           <paper-item>Help</paper-item>
         </paper-listbox>
       </paper-menu-button>
   
   ### Styling
   
   The following custom properties and mixins are also available for styling:
   
   Custom property | Description | Default
   ----------------|-------------|----------
   `--paper-menu-button-dropdown-background` | Background color of the paper-menu-button dropdown | `--primary-background-color`
   `--paper-menu-button` | Mixin applied to the paper-menu-button | `{}`
   `--paper-menu-button-disabled` | Mixin applied to the paper-menu-button when disabled | `{}`
   `--paper-menu-button-dropdown` | Mixin applied to the paper-menu-button dropdown | `{}`
   `--paper-menu-button-content` | Mixin applied to the paper-menu-button content | `{}`
   
   @hero hero.svg
   @demo demo/index.html
   */const PaperMenuButton=(0,_myApp.Polymer)({_template:_myApp.html$1`
    <style>
      :host {
        display: inline-block;
        position: relative;
        padding: 8px;
        outline: none;

        @apply --paper-menu-button;
      }

      :host([disabled]) {
        cursor: auto;
        color: var(--disabled-text-color);

        @apply --paper-menu-button-disabled;
      }

      iron-dropdown {
        @apply --paper-menu-button-dropdown;
      }

      .dropdown-content {
        @apply --shadow-elevation-2dp;

        position: relative;
        border-radius: 2px;
        background-color: var(--paper-menu-button-dropdown-background, var(--primary-background-color));

        @apply --paper-menu-button-content;
      }

      :host([vertical-align="top"]) .dropdown-content {
        margin-bottom: 20px;
        margin-top: -10px;
        top: 10px;
      }

      :host([vertical-align="bottom"]) .dropdown-content {
        bottom: 10px;
        margin-bottom: -10px;
        margin-top: 20px;
      }

      #trigger {
        cursor: pointer;
      }
    </style>

    <div id="trigger" on-tap="toggle">
      <slot name="dropdown-trigger"></slot>
    </div>

    <iron-dropdown id="dropdown" opened="{{opened}}" horizontal-align="[[horizontalAlign]]" vertical-align="[[verticalAlign]]" dynamic-align="[[dynamicAlign]]" horizontal-offset="[[horizontalOffset]]" vertical-offset="[[verticalOffset]]" no-overlap="[[noOverlap]]" open-animation-config="[[openAnimationConfig]]" close-animation-config="[[closeAnimationConfig]]" no-animations="[[noAnimations]]" focus-target="[[_dropdownContent]]" allow-outside-scroll="[[allowOutsideScroll]]" restore-focus-on-close="[[restoreFocusOnClose]]" on-iron-overlay-canceled="__onIronOverlayCanceled">
      <div slot="dropdown-content" class="dropdown-content">
        <slot id="content" name="dropdown-content"></slot>
      </div>
    </iron-dropdown>
`,is:"paper-menu-button",/**
   * Fired when the dropdown opens.
   *
   * @event paper-dropdown-open
   */ /**
       * Fired when the dropdown closes.
       *
       * @event paper-dropdown-close
       */behaviors:[_myApp.IronA11yKeysBehavior,_myApp.IronControlState],properties:{/**
     * True if the content is currently displayed.
     */opened:{type:Boolean,value:!1,notify:!0,observer:"_openedChanged"},/**
     * The orientation against which to align the menu dropdown
     * horizontally relative to the dropdown trigger.
     */horizontalAlign:{type:String,value:"left",reflectToAttribute:!0},/**
     * The orientation against which to align the menu dropdown
     * vertically relative to the dropdown trigger.
     */verticalAlign:{type:String,value:"top",reflectToAttribute:!0},/**
     * If true, the `horizontalAlign` and `verticalAlign` properties will
     * be considered preferences instead of strict requirements when
     * positioning the dropdown and may be changed if doing so reduces
     * the area of the dropdown falling outside of `fitInto`.
     */dynamicAlign:{type:Boolean},/**
     * A pixel value that will be added to the position calculated for the
     * given `horizontalAlign`. Use a negative value to offset to the
     * left, or a positive value to offset to the right.
     */horizontalOffset:{type:Number,value:0,notify:!0},/**
     * A pixel value that will be added to the position calculated for the
     * given `verticalAlign`. Use a negative value to offset towards the
     * top, or a positive value to offset towards the bottom.
     */verticalOffset:{type:Number,value:0,notify:!0},/**
     * If true, the dropdown will be positioned so that it doesn't overlap
     * the button.
     */noOverlap:{type:Boolean},/**
     * Set to true to disable animations when opening and closing the
     * dropdown.
     */noAnimations:{type:Boolean,value:!1},/**
     * Set to true to disable automatically closing the dropdown after
     * a selection has been made.
     */ignoreSelect:{type:Boolean,value:!1},/**
     * Set to true to enable automatically closing the dropdown after an
     * item has been activated, even if the selection did not change.
     */closeOnActivate:{type:Boolean,value:!1},/**
     * An animation config. If provided, this will be used to animate the
     * opening of the dropdown.
     */openAnimationConfig:{type:Object,value:function(){return[{name:"fade-in-animation",timing:{delay:100,duration:200}},{name:"paper-menu-grow-width-animation",timing:{delay:100,duration:150,easing:config.ANIMATION_CUBIC_BEZIER}},{name:"paper-menu-grow-height-animation",timing:{delay:100,duration:275,easing:config.ANIMATION_CUBIC_BEZIER}}]}},/**
     * An animation config. If provided, this will be used to animate the
     * closing of the dropdown.
     */closeAnimationConfig:{type:Object,value:function(){return[{name:"fade-out-animation",timing:{duration:150}},{name:"paper-menu-shrink-width-animation",timing:{delay:100,duration:50,easing:config.ANIMATION_CUBIC_BEZIER}},{name:"paper-menu-shrink-height-animation",timing:{duration:200,easing:"ease-in"}}]}},/**
     * By default, the dropdown will constrain scrolling on the page
     * to itself when opened.
     * Set to true in order to prevent scroll from being constrained
     * to the dropdown when it opens.
     */allowOutsideScroll:{type:Boolean,value:!1},/**
     * Whether focus should be restored to the button when the menu closes.
     */restoreFocusOnClose:{type:Boolean,value:!0},/**
     * This is the element intended to be bound as the focus target
     * for the `iron-dropdown` contained by `paper-menu-button`.
     */_dropdownContent:{type:Object}},hostAttributes:{role:"group","aria-haspopup":"true"},listeners:{"iron-activate":"_onIronActivate","iron-select":"_onIronSelect"},/**
   * The content element that is contained by the menu button, if any.
   */get contentElement(){// Polymer 2.x returns slot.assignedNodes which can contain text nodes.
for(var nodes=(0,_myApp.dom)(this.$.content).getDistributedNodes(),i=0,l=nodes.length;i<l;i++){if(nodes[i].nodeType===Node.ELEMENT_NODE){return nodes[i]}}},/**
   * Toggles the dropdown content between opened and closed.
   */toggle:function(){if(this.opened){this.close()}else{this.open()}},/**
   * Make the dropdown content appear as an overlay positioned relative
   * to the dropdown trigger.
   */open:function(){if(this.disabled){return}this.$.dropdown.open()},/**
   * Hide the dropdown content.
   */close:function(){this.$.dropdown.close()},/**
   * When an `iron-select` event is received, the dropdown should
   * automatically close on the assumption that a value has been chosen.
   *
   * @param {CustomEvent} event A CustomEvent instance with type
   * set to `"iron-select"`.
   */_onIronSelect:function(event){if(!this.ignoreSelect){this.close()}},/**
   * Closes the dropdown when an `iron-activate` event is received if
   * `closeOnActivate` is true.
   *
   * @param {CustomEvent} event A CustomEvent of type 'iron-activate'.
   */_onIronActivate:function(event){if(this.closeOnActivate){this.close()}},/**
   * When the dropdown opens, the `paper-menu-button` fires `paper-open`.
   * When the dropdown closes, the `paper-menu-button` fires `paper-close`.
   *
   * @param {boolean} opened True if the dropdown is opened, otherwise false.
   * @param {boolean} oldOpened The previous value of `opened`.
   */_openedChanged:function(opened,oldOpened){if(opened){// TODO(cdata): Update this when we can measure changes in distributed
// children in an idiomatic way.
// We poke this property in case the element has changed. This will
// cause the focus target for the `iron-dropdown` to be updated as
// necessary:
this._dropdownContent=this.contentElement;this.fire("paper-dropdown-open")}else if(null!=oldOpened){this.fire("paper-dropdown-close")}},/**
   * If the dropdown is open when disabled becomes true, close the
   * dropdown.
   *
   * @param {boolean} disabled True if disabled, otherwise false.
   */_disabledChanged:function(disabled){_myApp.IronControlState._disabledChanged.apply(this,arguments);if(disabled&&this.opened){this.close()}},__onIronOverlayCanceled:function(event){var uiEvent=event.detail,trigger=this.$.trigger,path=(0,_myApp.dom)(uiEvent).path;if(-1<path.indexOf(trigger)){event.preventDefault()}}});_exports.PaperMenuButton=PaperMenuButton;Object.keys(config).forEach(function(key){PaperMenuButton[key]=config[key]});var paperMenuButton={PaperMenuButton:PaperMenuButton};_exports.$paperMenuButton=paperMenuButton;const $_documentContainer$1=document.createElement("template");$_documentContainer$1.setAttribute("style","display: none;");$_documentContainer$1.innerHTML=`<dom-module id="paper-dropdown-menu-shared-styles">
  <template>
    <style>
      :host {
        display: inline-block;
        position: relative;
        text-align: left;

        /* NOTE(cdata): Both values are needed, since some phones require the
         * value to be \`transparent\`.
         */
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        -webkit-tap-highlight-color: transparent;

        --paper-input-container-input: {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          max-width: 100%;
          box-sizing: border-box;
          cursor: pointer;
        };

        @apply --paper-dropdown-menu;
      }

      /* paper-dropdown-menu and paper-dropdown-menu-light both delegate focus
       * to other internal elements which manage focus styling. */
      :host(:focus) {
        outline: none;
      }

      :host(:dir(rtl)) {
        text-align: right;

        @apply(--paper-dropdown-menu);
      }

      :host([disabled]) {
        @apply --paper-dropdown-menu-disabled;
      }

      :host([noink]) paper-ripple {
        display: none;
      }

      :host([no-label-float]) paper-ripple {
        top: 8px;
      }

      paper-ripple {
        top: 12px;
        left: 0px;
        bottom: 8px;
        right: 0px;

        @apply --paper-dropdown-menu-ripple;
      }

      paper-menu-button {
        display: block;
        padding: 0;

        @apply --paper-dropdown-menu-button;
      }

      paper-input {
        @apply --paper-dropdown-menu-input;
      }

      iron-icon {
        color: var(--disabled-text-color);

        @apply --paper-dropdown-menu-icon;
      }
    </style>
  </template>
</dom-module>`;document.head.appendChild($_documentContainer$1.content);// with the `Polymer` function, so this is only a cache lookup.
// https://github.com/Polymer/polymer/blob/640bc80ac7177b761d46b2fa9c455c318f2b85c6/lib/legacy/class.js#L533-L534
const LegacyPolymerElementBase=(0,_myApp.LegacyElementMixin)(HTMLElement);/**
                                                                  Material design: [Dropdown
                                                                  menus](https://www.google.com/design/spec/components/buttons.html#buttons-dropdown-buttons)
                                                                  
                                                                  This is a faster, lighter version of `paper-dropdown-menu`, that does not
                                                                  use a `<paper-input>` internally. Use this element if you're concerned about
                                                                  the performance of this element, i.e., if you plan on using many dropdowns on
                                                                  the same page. Note that this element has a slightly different styling API
                                                                  than `paper-dropdown-menu`.
                                                                  
                                                                  `paper-dropdown-menu-light` is similar to a native browser select element.
                                                                  `paper-dropdown-menu-light` works with selectable content. The currently
                                                                  selected item is displayed in the control. If no item is selected, the `label`
                                                                  is displayed instead.
                                                                  
                                                                  Example:
                                                                  
                                                                      <paper-dropdown-menu-light label="Your favourite pastry">
                                                                        <paper-listbox slot="dropdown-content">
                                                                          <paper-item>Croissant</paper-item>
                                                                          <paper-item>Donut</paper-item>
                                                                          <paper-item>Financier</paper-item>
                                                                          <paper-item>Madeleine</paper-item>
                                                                        </paper-listbox>
                                                                      </paper-dropdown-menu-light>
                                                                  
                                                                  This example renders a dropdown menu with 4 options.
                                                                  
                                                                  The child element with the slot `dropdown-content` is used as the dropdown
                                                                  menu. This can be a [`paper-listbox`](paper-listbox), or any other or
                                                                  element that acts like an [`iron-selector`](iron-selector).
                                                                  
                                                                  Specifically, the menu child must fire an
                                                                  [`iron-select`](iron-selector#event-iron-select) event when one of its
                                                                  children is selected, and an
                                                                  [`iron-deselect`](iron-selector#event-iron-deselect) event when a child is
                                                                  deselected. The selected or deselected item must be passed as the event's
                                                                  `detail.item` property.
                                                                  
                                                                  Applications can listen for the `iron-select` and `iron-deselect` events
                                                                  to react when options are selected and deselected.
                                                                  
                                                                  ### Styling
                                                                  
                                                                  The following custom properties and mixins are also available for styling:
                                                                  
                                                                  Custom property | Description | Default
                                                                  ----------------|-------------|----------
                                                                  `--paper-dropdown-menu` | A mixin that is applied to the element host | `{}`
                                                                  `--paper-dropdown-menu-disabled` | A mixin that is applied to the element host when disabled | `{}`
                                                                  `--paper-dropdown-menu-ripple` | A mixin that is applied to the internal ripple | `{}`
                                                                  `--paper-dropdown-menu-button` | A mixin that is applied to the internal menu button | `{}`
                                                                  `--paper-dropdown-menu-icon` | A mixin that is applied to the internal icon | `{}`
                                                                  `--paper-dropdown-menu-disabled-opacity` | The opacity of the dropdown when disabled  | `0.33`
                                                                  `--paper-dropdown-menu-color` | The color of the input/label/underline when the dropdown is unfocused | `--primary-text-color`
                                                                  `--paper-dropdown-menu-focus-color` | The color of the label/underline when the dropdown is focused  | `--primary-color`
                                                                  `--paper-dropdown-error-color` | The color of the label/underline when the dropdown is invalid  | `--error-color`
                                                                  `--paper-dropdown-menu-label` | Mixin applied to the label | `{}`
                                                                  `--paper-dropdown-menu-input` | Mixin applied to the input | `{}`
                                                                  `--paper-dropdown-menu-underline-focus` | Mixin applied to the focus underline | `{}`
                                                                  
                                                                  Note that in this element, the underline is just the bottom border of the
                                                                  "input". To style it:
                                                                  
                                                                      <style is=custom-style>
                                                                        paper-dropdown-menu-light.custom {
                                                                          --paper-dropdown-menu-input: {
                                                                            border-bottom: 2px dashed lavender;
                                                                          };
                                                                      </style>
                                                                  
                                                                  @element paper-dropdown-menu-light
                                                                  @demo demo/index.html
                                                                  */(0,_myApp.Polymer)({/** @override */_template:_myApp.html$1`
    <style include="paper-dropdown-menu-shared-styles">
      :host {
        width: 200px;  /* Default size of an <input> */
      }

      /**
       * All of these styles below are for styling the fake-input display
       */
      [slot="dropdown-trigger"] {
        box-sizing: border-box;
        position: relative;
        width: 100%;
        padding: 16px 0 8px 0;
      }

      [slot="dropdown-trigger"]:focus {
        outline: none;
      }

      :host([disabled]) [slot="dropdown-trigger"] {
        pointer-events: none;
        opacity: var(--paper-dropdown-menu-disabled-opacity, 0.33);
      }

      :host([no-label-float]) [slot="dropdown-trigger"] {
        padding-top: 8px;   /* If there's no label, we need less space up top. */
      }

      #input {
        @apply --paper-font-subhead;
        @apply --paper-font-common-nowrap;
        line-height: 1.5;
        border-bottom: 1px solid var(--paper-dropdown-menu-color, var(--secondary-text-color));
        color: var(--paper-dropdown-menu-color, var(--primary-text-color));
        width: 100%;
        box-sizing: border-box;
        padding: 12px 20px 0 0;   /* Right padding so that text doesn't overlap the icon */
        outline: none;
        @apply --paper-dropdown-menu-input;
      }

      #input:dir(rtl) {
        padding-right: 0px;
        padding-left: 20px;
      }

      :host([disabled]) #input {
        border-bottom: 1px dashed var(--paper-dropdown-menu-color, var(--secondary-text-color));
      }

      :host([invalid]) #input {
        border-bottom: 2px solid var(--paper-dropdown-error-color, var(--error-color));
      }

      :host([no-label-float]) #input {
        padding-top: 0;   /* If there's no label, we need less space up top. */
      }

      label {
        @apply --paper-font-subhead;
        @apply --paper-font-common-nowrap;
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        /**
         * The container has a 16px top padding, and there's 12px of padding
         * between the input and the label (from the input's padding-top)
         */
        top: 28px;
        box-sizing: border-box;
        width: 100%;
        padding-right: 20px;    /* Right padding so that text doesn't overlap the icon */
        text-align: left;
        transition-duration: .2s;
        transition-timing-function: cubic-bezier(.4,0,.2,1);
        color: var(--paper-dropdown-menu-color, var(--secondary-text-color));
        @apply --paper-dropdown-menu-label;
      }

      label:dir(rtl) {
        padding-right: 0px;
        padding-left: 20px;
        text-align: right;
      }

      :host([no-label-float]) label {
        top: 8px;
        /* Since the label doesn't need to float, remove the animation duration
        which slows down visibility changes (i.e. when a selection is made) */
        transition-duration: 0s;
      }

      label.label-is-floating {
        font-size: 12px;
        top: 8px;
      }

      label.label-is-hidden {
        visibility: hidden;
      }

      :host([focused]) label.label-is-floating {
        color: var(--paper-dropdown-menu-focus-color, var(--primary-color));
      }

      :host([invalid]) label.label-is-floating {
        color: var(--paper-dropdown-error-color, var(--error-color));
      }

      /**
       * Sets up the focused underline. It's initially hidden, and becomes
       * visible when it's focused.
       */
      label:after {
        background-color: var(--paper-dropdown-menu-focus-color, var(--primary-color));
        bottom: 7px;    /* The container has an 8px bottom padding */
        content: '';
        height: 2px;
        left: 45%;
        position: absolute;
        transition-duration: .2s;
        transition-timing-function: cubic-bezier(.4,0,.2,1);
        visibility: hidden;
        width: 8px;
        z-index: 10;
        @apply --paper-dropdown-menu-underline-focus;
      }

      :host([invalid]) label:after {
        background-color: var(--paper-dropdown-error-color, var(--error-color));
      }

      :host([no-label-float]) label:after {
        bottom: 7px;    /* The container has a 8px bottom padding */
      }

      :host([focused]:not([disabled])) label:after {
        left: 0;
        visibility: visible;
        width: 100%;
      }

      iron-icon {
        position: absolute;
        right: 0px;
        bottom: 8px;    /* The container has an 8px bottom padding */
        @apply --paper-font-subhead;
        color: var(--disabled-text-color);
        @apply --paper-dropdown-menu-icon;
      }

      iron-icon:dir(rtl) {
        left: 0;
        right: auto;
      }

      :host([no-label-float]) iron-icon {
        margin-top: 0px;
      }

      .error {
        display: inline-block;
        visibility: hidden;
        color: var(--paper-dropdown-error-color, var(--error-color));
        @apply --paper-font-caption;
        position: absolute;
        left:0;
        right:0;
        bottom: -12px;
      }

      :host([invalid]) .error {
        visibility: visible;
      }
    </style>

    <paper-menu-button id="menuButton" vertical-align="[[verticalAlign]]" horizontal-align="[[horizontalAlign]]" vertical-offset="[[_computeMenuVerticalOffset(noLabelFloat, verticalOffset)]]" disabled="[[disabled]]" no-animations="[[noAnimations]]" on-iron-select="_onIronSelect" on-iron-deselect="_onIronDeselect" opened="{{opened}}" close-on-activate allow-outside-scroll="[[allowOutsideScroll]]">
      <!-- support hybrid mode: user might be using paper-menu-button 1.x which distributes via <content> -->
      <div id="dropdown-trigger" class="dropdown-trigger" slot="dropdown-trigger" role="button" tabindex="0" aria-haspopup="listbox">
        <label class$="[[_computeLabelClass(noLabelFloat,alwaysFloatLabel,hasContent)]]">
          [[label]]
        </label>
        <div id="input" tabindex="-1">&nbsp;</div>
        <iron-icon icon="paper-dropdown-menu:arrow-drop-down"></iron-icon>
        <span class="error">[[errorMessage]]</span>
      </div>
      <slot id="content" name="dropdown-content" slot="dropdown-content"></slot>
    </paper-menu-button>
`,is:"paper-dropdown-menu-light",behaviors:[_myApp.IronButtonState,_myApp.IronControlState,_myApp.PaperRippleBehavior,_myApp.IronFormElementBehavior,_myApp.IronValidatableBehavior],properties:{/**
     * The derived "label" of the currently selected item. This value
     * is the `label` property on the selected item if set, or else the
     * trimmed text content of the selected item.
     */selectedItemLabel:{type:String,notify:!0,readOnly:!0},/**
     * The last selected item. An item is selected if the dropdown menu has
     * a child with class `dropdown-content`, and that child triggers an
     * `iron-select` event with the selected `item` in the `detail`.
     *
     * @type {?Object}
     */selectedItem:{type:Object,notify:!0,readOnly:!0},/**
     * The value for this element that will be used when submitting in
     * a form. It reflects the value of `selectedItemLabel`. If set directly,
     * it will not update the `selectedItemLabel` value.
     */value:{type:String,notify:!0,observer:"_valueChanged"},/**
     * The label for the dropdown.
     */label:{type:String},/**
     * The placeholder for the dropdown.
     */placeholder:{type:String},/**
     * True if the dropdown is open. Otherwise, false.
     */opened:{type:Boolean,notify:!0,value:!1,observer:"_openedChanged"},/**
     * By default, the dropdown will constrain scrolling on the page
     * to itself when opened.
     * Set to true in order to prevent scroll from being constrained
     * to the dropdown when it opens.
     */allowOutsideScroll:{type:Boolean,value:!1},/**
     * Set to true to disable the floating label. Bind this to the
     * `<paper-input-container>`'s `noLabelFloat` property.
     */noLabelFloat:{type:Boolean,value:!1,reflectToAttribute:!0},/**
     * Set to true to always float the label. Bind this to the
     * `<paper-input-container>`'s `alwaysFloatLabel` property.
     */alwaysFloatLabel:{type:Boolean,value:!1},/**
     * Set to true to disable animations when opening and closing the
     * dropdown.
     */noAnimations:{type:Boolean,value:!1},/**
     * The orientation against which to align the menu dropdown
     * horizontally relative to the dropdown trigger.
     */horizontalAlign:{type:String,value:"right"},/**
     * The orientation against which to align the menu dropdown
     * vertically relative to the dropdown trigger.
     */verticalAlign:{type:String,value:"top"},/**
     * Overrides the vertical offset computed in
     * _computeMenuVerticalOffset.
     */verticalOffset:Number,hasContent:{type:Boolean,readOnly:!0}},listeners:{tap:"_onTap"},/**
   * @type {!Object}
   */keyBindings:{"up down":"open",esc:"close"},observers:["_selectedItemChanged(selectedItem)"],/**
   * Override `_attachDom` so that we can pass `delegatesFocus`. The overridden
   * implementation of `_attachDom` specifically skips the steps performed here
   * if the node already hosts a shadow root:
   * https://github.com/Polymer/polymer/blob/640bc80ac7177b761d46b2fa9c455c318f2b85c6/lib/mixins/element-mixin.js#L691-L694
   * @override
   */_attachDom(dom){const wrappedThis=(0,_myApp.wrap)(this);wrappedThis.attachShadow({mode:"open",delegatesFocus:!0,shadyUpgradeFragment:dom});wrappedThis.shadowRoot.appendChild(dom);return LegacyPolymerElementBase.prototype._attachDom.call(this,dom)},/** @override */focus(){// When using Shady DOM and in browsers that don't support
// `delegatesFocus`, attempting to focus this element with the browser's
// native `HTMLElement#focus` will cause focus to be lost because this
// element isn't focusable in those situations. To work around this, the
// element in the shadow root that this element intends to delegate focus
// to is manually focused instead.
this.$["dropdown-trigger"].focus()},/** @override */attached:function(){// NOTE(cdata): Due to timing, a preselected value in a `IronSelectable`
// child will cause an `iron-select` event to fire while the element is
// still in a `DocumentFragment`. This has the effect of causing
// handlers not to fire. So, we double check this value on attached:
var contentElement=this.contentElement;if(contentElement&&contentElement.selectedItem){this._setSelectedItem(contentElement.selectedItem)}},/**
   * The content element that is contained by the dropdown menu, if any.
   */get contentElement(){// Polymer 2.x returns slot.assignedNodes which can contain text nodes.
for(var nodes=(0,_myApp.dom)(this.$.content).getDistributedNodes(),i=0,l=nodes.length;i<l;i++){if(nodes[i].nodeType===Node.ELEMENT_NODE){return nodes[i]}}},/**
   * Show the dropdown content.
   */open:function(){this.$.menuButton.open()},/**
   * Hide the dropdown content.
   */close:function(){this.$.menuButton.close()},/**
   * A handler that is called when `iron-select` is fired.
   *
   * @param {CustomEvent} event An `iron-select` event.
   */_onIronSelect:function(event){this._setSelectedItem(event.detail.item)},/**
   * A handler that is called when `iron-deselect` is fired.
   *
   * @param {CustomEvent} event An `iron-deselect` event.
   */_onIronDeselect:function(event){this._setSelectedItem(null)},/**
   * A handler that is called when the dropdown is tapped.
   *
   * @param {CustomEvent} event A tap event.
   */_onTap:function(event){if((0,_myApp.findOriginalTarget)(event)===this){this.open()}},/**
   * Compute the label for the dropdown given a selected item.
   *
   * @param {Element} selectedItem A selected Element item, with an
   * optional `label` property.
   */_selectedItemChanged:function(selectedItem){var value="";if(!selectedItem){value=""}else{value=selectedItem.label||selectedItem.getAttribute("label")||selectedItem.textContent.trim()}this.value=value;this._setSelectedItemLabel(value)},/**
   * Compute the vertical offset of the menu based on the value of
   * `noLabelFloat`.
   *
   * @param {boolean} noLabelFloat True if the label should not float
   * @param {number=} opt_verticalOffset Optional offset from the user
   * above the input, otherwise false.
   */_computeMenuVerticalOffset:function(noLabelFloat,opt_verticalOffset){// Override offset if it's passed from the user.
if(opt_verticalOffset){return opt_verticalOffset}// NOTE(cdata): These numbers are somewhat magical because they are
// derived from the metrics of elements internal to `paper-input`'s
// template. The metrics will change depending on whether or not the
// input has a floating label.
return noLabelFloat?-4:8},/**
   * Returns false if the element is required and does not have a selection,
   * and true otherwise.
   * @param {*=} _value Ignored.
   * @return {boolean} true if `required` is false, or if `required` is true
   * and the element has a valid selection.
   */_getValidity:function(_value){return this.disabled||!this.required||this.required&&!!this.value},_openedChanged:function(){var openState=this.opened?"true":"false",e=this.contentElement;if(e){e.setAttribute("aria-expanded",openState)}},_computeLabelClass:function(noLabelFloat,alwaysFloatLabel,hasContent){var cls="";if(!0===noLabelFloat){return hasContent?"label-is-hidden":""}if(hasContent||!0===alwaysFloatLabel){cls+=" label-is-floating"}return cls},_valueChanged:function(){// Only update if it's actually different.
if(this.$.input&&this.$.input.textContent!==this.value){this.$.input.textContent=this.value}this._setHasContent(!!this.value)}});class MyRegister extends _myApp.PageViewElement{static get properties(){return{userCount:{type:Number},opened:{type:Boolean,value:!1},userRegistration:{type:Object,value:{}}}}static get styles(){return[_myApp.sharedStyles,_myApp.css`
        :host {
          display: block;
        }
        .maindiv{
          padding:10px;
          margin:0 auto;
          max-width:80%;
        }
        
       
        label{
          color:var(--app-primary-color);
        }
        .form-section{
          width:70%; margin:0 auto;
        } 
        .row{
          position:relative; width:33.33%
        }
        .login-bg{          
          position: absolute;
          /* top: 100%;
          height: 70%; */
          right: 0;
          width: 50%;
        }
        paper-checkbox{
          padding-bottom:10px;
         word-wrap: break-word;
         position:relative;
         
         --paper-checkbox-vertical-align:top;
            --paper-checkbox-size:20px;
           
        }

        .required{
            color:red;            
        }

        /* Wide layout: when the viewport width is bigger than 460px, layout
        changes to a wide layout */
        @media screen and (min-width: 1025px) {
          .form-section{
            width:60%; margin:0 auto;
          } 
        }

        @media screen and (min-width: 769px) {
        
          .form-section{
            width:90%; margin:0 auto;
          } 
        }
        @media screen and (max-width: 1023px) {
        
          .row{
            width:49%; 
          } 
        }
        @media screen and (max-width: 767px) {
        
          .form-section{
            width:90%; margin:0 auto;
          } 
          .row{
            width:99%; 
          } 
        }
       
      `]}constructor(){super();this.userRegistration={}}updated(changedProps){if(changedProps.has("data")){}}load(){try{this.clear();this.updateComplete.then(()=>{console.log("Loaded Register")})}catch(error){console.log(error)}}render(){try{return _myApp.html`
      <!--<div>
          <img src=${this.rootPath+"images/login-bg.svg"} class="login-bg">
      </div>-->
    <div class="m-2 pb-4">
      <div class="col-xs-12">
        <div class="p-1">
          <div class="layout">
            <div class="form-section">
                <h1>The RISE : Registration of Interest - Customer Details Form</h1>
                <div>எழுமின் உலகுதழுவியதோர்  தமிழ்த் தோழமை. எல்லோரும் வளரவேண்டும், வெற்றிபெறவேண்டும் என ஆசைப்படும் நட்புக் குடும்பம் இந்த நட்பு நிலத்திற்கும் உங்களை வரவேற்கிறோம்.</div>
                <div class="col-xs-10 pt-2 pb-2"><span class="required">* Required</span></div>
                <div class="col-xs-12 pb-1">
                  <label class="col-xs-12 pb-2">Email Address <span class="required">*</span></label>
                  <paper-input label="Your email" class="col-xs-12 col-md-5 pb-2" no-label-float required error-message="This is a required question"
                    type="email" .value=${this.userRegistration.user_registered_email}
                    @blur=${e=>{this.userRegistration.user_registered_email=e.currentTarget.value;e.currentTarget.invalid=!1}} >
                  </paper-input>
                </div>
                <div class="col-xs-12 pb-1">
                  <label class="col-xs-12 pb-2">Password <span class="required">*</span></label>
                  <paper-input  id="txtPassword" label="Your Password" class="col-xs-12 col-md-5 pb-2" no-label-float required error-message="This is a required question"
                  type="password" .value=${this.userRegistration.user_password}
                  @blur=${e=>{this.userRegistration.user_password=e.currentTarget.value;e.currentTarget.invalid=!1}} ></paper-input>
                </div>
                <div class="col-xs-12 pb-1">
                  <label class="col-xs-12 pb-2">Confirm Password <span class="required">*</span></label>
                  <paper-input id="txtConfirmPassword" label="Confirm Password" class="col-xs-12 col-md-5 pb-2" no-label-float required error-message="Password and confirm password should be match"
                  type="password" .value=${this.userRegistration.confirm_user_password}
                  @blur=${e=>{this.userRegistration.confirm_user_password=e.currentTarget.value;e.currentTarget.invalid=!1}} ></paper-input>
                </div>
                <div class="col-xs-12 pb-1">
                  <label class="col-xs-12 pb-2">Full Name ( as in Passport or Emirates ID) <span class="required">*</span></label>
                  <paper-input label="Your Name" class="col-xs-12 col-md-5 pb-2" no-label-float required error-message="This is a required question"
                              .value=${this.userRegistration.user_fullname}
                              @blur=${e=>{this.userRegistration.user_fullname=e.currentTarget.value;e.currentTarget.invalid=!1}} ></paper-input>
                </div>
                <div class="col-xs-12 pb-1">
                  <label class="col-xs-12 pb-2">Residence of Emirate in UAE <span class="required">*</span></label>
                  <div>
                      <paper-dropdown-menu-light label="Choose" class="pb-2" no-label-float vertical-offset="40" >
                        <paper-listbox slot="dropdown-content" class="dropdown-content" .selected=${this.userRegistration.residenceofemiratesinuae} 
                        @selected-changed=${e=>{this.userRegistration.residenceofemiratesinuae=e.detail.value;e.currentTarget.invalid=!1}} >
                          <paper-item>Abu Dhabi</paper-item>
                          <paper-item>Dubai</paper-item>
                          <paper-item>Sharjah</paper-item>
                          <paper-item>Umm Al Quwain</paper-item>
                          <paper-item>Ras Al Khaimah</paper-item>
                          <paper-item>Ajman</paper-item>
                          <paper-item>Fujairah</paper-item>
                        </paper-listbox>
                      </paper-dropdown-menu-light>
                  </div>
                </div>
                <div class="col-xs-12 pb-1">
                  <label class="col-xs-12 pb-2">Nationality <span class="required">*</span></label>
                  <paper-input label="Your answer" class="col-xs-12 col-md-5 pb-2" no-label-float required error-message="This is a required question"
                              .value=${this.userRegistration.nationality}
                              @blur=${e=>{this.userRegistration.nationality=e.currentTarget.value;e.currentTarget.invalid=!1}} ></paper-input>
                </div>
                <div class="col-xs-12 pb-1">
                  <label class="col-xs-12 pb-2">Blood group</label>
                  <paper-input label="Your answer" class="col-xs-12 col-md-5 pb-2" no-label-float 
                  .value=${this.userRegistration.user_bloodgroup}
                  @blur=${e=>{this.userRegistration.user_bloodgroup=e.currentTarget.value;e.currentTarget.invalid=!1}} ></paper-input>
                </div>
                <div class="col-xs-12 pb-1">
                  <label class="col-xs-12 pb-2">UAE Contact Number - Mobile <span class="required">*</span></label>
                  <paper-input label="Your answer" class="col-xs-12 col-md-5 pb-2" no-label-float required error-message="This is a required question"
                              .value=${this.userRegistration.mobilenumber}
                              @blur=${e=>{this.userRegistration.mobilenumber=e.currentTarget.value;e.currentTarget.invalid=!1}} ></paper-input>
                </div>
                <div class="col-xs-12 pb-1">
                  <label class="col-xs-12 pb-2">UAE Contact Number - Office (if any)</label>
                  <paper-input label="Your answer" class="col-xs-12 col-md-5 pb-2" no-label-float
                              .value=${this.userRegistration.office_contactnumber}
                              @blur=${e=>{this.userRegistration.office_contactnumber=e.currentTarget.value;e.currentTarget.invalid=!1}} ></paper-input>
                </div>
                <div class="col-xs-12 pb-1">
                  <label class="col-xs-12 pb-2">Whatsapp Number (if different from Contact Mobile #)</label>
                  <paper-input label="Your answer" class="col-xs-12 col-md-5 pb-2" no-label-float
                              .value=${this.userRegistration.whatsappnumber}
                              @blur=${e=>{this.userRegistration.whatsappnumber=e.currentTarget.value;e.currentTarget.invalid=!1}} ></paper-input>
                </div>
                <div class="col-xs-12 pb-1">
                  <label class="col-xs-12 pb-2">Business/Organization/Institution Name <span class="required">*</span></label>
                  <paper-input label="Your answer" class="col-xs-12 col-md-5 pb-2" no-label-float required error-message="This is a required question"
                              .value=${this.userRegistration.businessname}
                              @blur=${e=>{this.userRegistration.businessname=e.currentTarget.value;e.currentTarget.invalid=!1}} ></paper-input>
                </div>
                <div class="col-xs-12 pb-1">
                  <label class="col-xs-11 pb-3">Your interest/expectation from The RISE Events, Dubai ? <span class="required">*</span></label>
                  <div class="col-xs-12 layout horizontal wrap">
                    <div class="row">
                      <paper-checkbox class="col-xs-12 pb-2" .checked=${this.userRegistration.cb_networking}
                      @change=${e=>{this.userRegistration.cb_networking=e.currentTarget.checked;e.currentTarget.invalid=!1}} >Networking</paper-checkbox>
                    </div>
                    <div class="row">
                      <paper-checkbox class="col-xs-12 pb-2" .checked=${this.userRegistration.cb_businesspromdev}
                      @change=${e=>{this.userRegistration.cb_businesspromdev=e.currentTarget.checked;e.currentTarget.invalid=!1}} >Business Promotion / Development</paper-checkbox>
                    </div>
                    <div class="row">
                      <paper-checkbox class="col-xs-12 pb-2" .checked=${this.userRegistration.cb_investopportunities}
                      @change=${e=>{this.userRegistration.cb_investopportunities=e.currentTarget.checked;e.currentTarget.invalid=!1}} >Investment Opportunities</paper-checkbox>
                    </div>
                    <div class="row">
                      <paper-checkbox class="col-xs-12 pb-2" .checked=${this.userRegistration.cb_knowlsharingdev}
                      @change=${e=>{this.userRegistration.cb_knowlsharingdev=e.currentTarget.checked;e.currentTarget.invalid=!1}} >Knowledge Sharing/development</paper-checkbox>
                    </div>
                    <div class="row">
                      <paper-checkbox class="col-xs-12 pb-2" .checked=${this.userRegistration.cb_mentorship}
                      @change=${e=>{this.userRegistration.cb_mentorship=e.currentTarget.checked;e.currentTarget.invalid=!1}} >Mentorship</paper-checkbox>
                    </div>
                    <div class="row">
                      <paper-checkbox class="col-xs-12 pb-2" .checked=${this.userRegistration.cb_communityservice}
                      @change=${e=>{this.userRegistration.cb_communityservice=e.currentTarget.checked;e.currentTarget.invalid=!1}} >Community Service</paper-checkbox>
                    </div>
                    <div class="row">
                      <div class="col-xs-12 hori-flex">
                          <paper-checkbox class="col-xs-3 pb-2" style="width:90px;"
                                          .checked=${this.userRegistration.cb_others_theriseevents}
                                          @change=${e=>{this.userRegistration.cb_others_theriseevents=e.currentTarget.checked;e.currentTarget.invalid=!1}} >Other:</paper-checkbox>
                          <paper-input class="col-xs-8 col-md-4 col-lg-3 pb-2" no-label-float
                                  .value=${this.userRegistration.others_theriseevents}
                                  @blur=${e=>{this.userRegistration.others_theriseevents=e.currentTarget.value;e.currentTarget.invalid=!1}} ></paper-input>
                      </div>
                    </div>
                 </div>
                  
                </div>
              <div class="col-xs-12 pb-1">
                <label class="col-xs-11 pb-3">Your interested Business Verticals <span class="required">*</span></label>
                <div class="col-xs-12 layout horizontal wrap">
                    <div class="row">
                      <paper-checkbox class="col-xs-12 pb-3" .checked=${this.userRegistration.cb_itandites}
                      @change=${e=>{this.userRegistration.cb_itandites=e.currentTarget.checked}}>IT & ITES</paper-checkbox>
                    </div>
                    <div class="row">
                        <paper-checkbox class="col-xs-12 pb-2" .checked=${this.userRegistration.cb_tradingretail}
                        @change=${e=>{this.userRegistration.cb_tradingretail=e.currentTarget.checked}}>Trading & Retail</paper-checkbox>
                    </div>
                    <div class="row"> 
                      <paper-checkbox class="col-xs-12 pb-2" .checked=${this.userRegistration.cb_constgeneralcontracting}
                      @change=${e=>{this.userRegistration.cb_constgeneralcontracting=e.currentTarget.checked}}>Construction & General Contracting</paper-checkbox>
                    </div>
                    <div class="row"> 
                        <paper-checkbox class="col-xs-12 pb-2" .checked=${this.userRegistration.cb_reestpropdev_management}
                        @change=${e=>{this.userRegistration.cb_reestpropdev_management=e.currentTarget.checked}}>Real Estate / Property Development & Management</paper-checkbox>
                    </div>
                    <div class="row">  
                        <paper-checkbox class="col-xs-12 pb-2" .checked=${this.userRegistration.cb_ownersass_management}
                        @change=${e=>{this.userRegistration.cb_ownersass_management=e.currentTarget.checked}}>Owners Association Management</paper-checkbox>
                    </div>
                    <div class="row">  
                        <paper-checkbox class="col-xs-12 pb-2" .checked=${this.userRegistration.cb_facilitiesmanagement}
                        @change=${e=>{this.userRegistration.cb_facilitiesmanagement=e.currentTarget.checked}}>Facilities Management</paper-checkbox>
                    </div>
                    <div class="row">  
                        <paper-checkbox class="col-xs-12  pb-2" .checked=${this.userRegistration.cb_realestatebrokerage}
                        @change=${e=>{this.userRegistration.cb_realestatebrokerage=e.currentTarget.checked}}>Real Estate Brokerage<br/> (Selling/Buying/Leasing)</paper-checkbox>
                    </div>
                    <div class="row">  
                    <paper-checkbox class="col-xs-12 pb-2" .checked=${this.userRegistration.cb_mediaadvert_eventmanagement}
                    @change=${e=>{this.userRegistration.cb_mediaadvert_eventmanagement=e.currentTarget.checked}}>Media Advertisement / Event Management</paper-checkbox>
                    </div>
                    <div class="row">  
                        <paper-checkbox class="col-xs-12 pb-2" .checked=${this.userRegistration.cb_healthcarepharma}
                        @change=${e=>{this.userRegistration.cb_healthcarepharma=e.currentTarget.checked}}>Healthcare & Pharma</paper-checkbox>
                    </div>
                    <div class="row">  
                          <paper-checkbox class="col-xs-12 pb-2" .checked=${this.userRegistration.cb_supplychainandlogistics}
                          @change=${e=>{this.userRegistration.cb_supplychainandlogistics=e.currentTarget.checked}}>Supply Chain and Logistics</paper-checkbox>
                    </div>
                    <div class="row">  
                        <paper-checkbox class="col-xs-12 pb-2" .checked=${this.userRegistration.cb_manufacturing}
                        @change=${e=>{this.userRegistration.cb_manufacturing=e.currentTarget.checked}}>Manufacturing</paper-checkbox>
                    </div>
                    <div class="row">  
                        <paper-checkbox class="col-xs-12 pb-2" .checked=${this.userRegistration.cb_energy_oil_gas_renewables}
                        @change=${e=>{this.userRegistration.cb_energy_oil_gas_renewables=e.currentTarget.checked}}>Energy (Oil & Gas, Renewables)</paper-checkbox>
                    </div>
                    <div class="row">  
                        <paper-checkbox class="col-xs-12 col-md-4 pb-2" .checked=${this.userRegistration.cb_mining}
                        @change=${e=>{this.userRegistration.cb_mining=e.currentTarget.checked}}>Mining</paper-checkbox>
                    </div>
                    <div class="row">  
                          <paper-checkbox class="col-xs-12 pb-2" .checked=${this.userRegistration.cb_legalauditingtaxation}
                      @change=${e=>{this.userRegistration.cb_legalauditingtaxation=e.currentTarget.checked}}>Legal / Auditing / Taxation</paper-checkbox>
                    </div>
                    <div class="row">  
                          <paper-checkbox class="col-xs-12 pb-2" .checked=${this.userRegistration.cb_financialservices}
                      @change=${e=>{this.userRegistration.cb_financialservices=e.currentTarget.checked}}>Financial services</paper-checkbox>
                    </div>
                    <div class="row">  
                        <paper-checkbox class="col-xs-12 pb-2" .checked=${this.userRegistration.cb_educationtrainings}
                    @change=${e=>{this.userRegistration.cb_educationtrainings=e.currentTarget.checked}}>Education / Trainings</paper-checkbox>
                    </div>
                    <div class="row">  
                        <paper-checkbox class="col-xs-12 pb-2" .checked=${this.userRegistration.cb_hrmanpowerservices}
                        @change=${e=>{this.userRegistration.cb_hrmanpowerservices=e.currentTarget.checked}}>HR / Manpower services</paper-checkbox>
                    </div>
                    <div class="row">  
                        <paper-checkbox class="col-xs-12 pb-2" .checked=${this.userRegistration.cb_designenggservices}
                          @change=${e=>{this.userRegistration.cb_designenggservices=e.currentTarget.checked}}>Design / Engineering Services</paper-checkbox>
                    </div>
                    <div class="row">  
                      <paper-checkbox class="col-xs-12 pb-2" .checked=${this.userRegistration.cb_hospitality}
                        @change=${e=>{this.userRegistration.cb_hospitality=e.currentTarget.checked}}>Hospitality</paper-checkbox>
                    </div>
                    <div class="row">  
                      <paper-checkbox class="col-xs-12 pb-2" .checked=${this.userRegistration.cb_foodandberverages}
                        @change=${e=>{this.userRegistration.cb_foodandberverages=e.currentTarget.checked}}>Food and Berverages</paper-checkbox>
                    </div>
                     
                      <div class="col-xs-12">
                          <paper-checkbox class="col-xs-3 pb-2" .checked=${this.userRegistration.cb_other_businessverticals} 
                          @change=${e=>{this.userRegistration.cb_other_businessverticals=e.currentTarget.checked}} style="width:90px;">Other:</paper-checkbox>
                          <paper-input class="col-xs-8 col-md-4 col-lg-3 pb-2" no-label-float .value=${this.userRegistration.other_businessverticals}
                          @blur=${e=>{this.userRegistration.other_businessverticals=e.currentTarget.value;e.currentTarget.invalid=!1}} ></paper-input>
                      </div>
                     
                   
                </div>
                
                
              </div>
              <div class="col-xs-12">
                <label class="col-xs-11 pb-1">Choose the one whichever best suites you <span class="required">*</span></label>
                <paper-radio-group required error-message="This is a required question" 
                .selected=${this.userRegistration.rb_bestsuites}
                @selected-changed=${e=>{this.userRegistration.rb_bestsuites=e.detail.value}}>
                    <paper-radio-button name="1" class="col-xs-12 pb-2" >I am an Entrepreneur / Businessperson</paper-radio-button>
                    <paper-radio-button name="2" class="col-xs-12 pb-2" >I am a Professional. I aspire to become an Entrepreneur / Businessperson</paper-radio-button>
                    <paper-radio-button name="3" class="col-xs-12 pb-2" >I am a Professional in business development. I'm looking to promote business for my company</paper-radio-button>
                    <paper-radio-button name="4" class="col-xs-12 pb-2" >I am a Professional. I can provide business leads to others</paper-radio-button>
                    <paper-radio-button name="5" class="col-xs-12 pb-2" >I am a Student</paper-radio-button>
                    <paper-radio-button name="6" class="col-xs-12 pb-2" >I am a retired person. I would like to be a mentor</paper-radio-button>
                    <paper-radio-button name="7" class="col-xs-3 pb-2" style="width:90px;">Other:</paper-radio-button>
                    <paper-input class="col-xs-8 col-md-4 col-lg-3 pb-2" no-label-float .value=${this.userRegistration.other_bestsuites}
                    @blur=${e=>{this.userRegistration.other_bestsuites=e.currentTarget.value;e.currentTarget.invalid=!1}} ></paper-input>
                </paper-radio-group>
              </div>
              <div class="col-xs-12">
                <label class="col-xs-11 pb-3">I am interested to participate in The Rise events programs/activities</label>
                <div class="col-xs-12 layout horizontal wrap">
                <div class="row">  
                <paper-checkbox class="col-xs-12 pb-2" .checked=${this.userRegistration.cb_yearlongevents}
                @change=${e=>{this.userRegistration.cb_yearlongevents=e.currentTarget.checked}} >Year long events / activities</paper-checkbox>
                </div>
                <div class="row">  
                <paper-checkbox class="col-xs-12 pb-2" .checked=${this.userRegistration.cb_toadvertisepromote}
                @change=${e=>{this.userRegistration.cb_toadvertisepromote=e.currentTarget.checked}} >To advertise/promote my products/services</paper-checkbox>
                </div>
                <div class="row">  
                <paper-checkbox class="col-xs-11 pb-2" .checked=${this.userRegistration.cb_businessevents}
                @change=${e=>{this.userRegistration.cb_businessevents=e.currentTarget.checked}} >Business events</paper-checkbox>
                </div>
                <div class="row">  
                <paper-checkbox class="col-xs-11 pb-2" .checked=${this.userRegistration.cb_educationalevents}
                @change=${e=>{this.userRegistration.cb_educationalevents=e.currentTarget.checked}} >Educational events</paper-checkbox>
                </div>
                <div class="row">  
                <paper-checkbox class="col-xs-11 pb-2" .checked=${this.userRegistration.cb_socialevents}
                @change=${e=>{this.userRegistration.cb_socialevents=e.currentTarget.checked}} >Social events</paper-checkbox>
                </div>
                <div class="row">  
                <paper-checkbox class="col-xs-11 pb-2" .checked=${this.userRegistration.cb_charityevents}
                @change=${e=>{this.userRegistration.cb_charityevents=e.currentTarget.checked}} >Charity events</paper-checkbox>
                </div>
                <div class="row">  
                
                </div>

                </div>
 
                
                <div class="col-xs-12">
                    <paper-checkbox class="col-xs-3 pb-2" .checked=${this.userRegistration.cb_other_programactivities} 
                    @change=${e=>{this.userRegistration.cb_other_programactivities=e.currentTarget.checked}} style="width:90px;">Other:</paper-checkbox>
                    <paper-input class="col-xs-8 col-md-4 col-lg-3 pb-2" no-label-float .value=${this.userRegistration.other_programactivities}
                    @blur=${e=>{this.userRegistration.other_programactivities=e.currentTarget.value;e.currentTarget.invalid=!1}} ></paper-input>
                </div>
              </div>
              <div class="col-xs-12">
                <h4 class="mb-2 mt-2">Note for your kind attention:</h4>
                <div>Upon receiving this Form, our representatives will contact you soon to understand more about your interests and also answer any queries that you might have, so that we can try to offer the best possible services meeting your expectations. Further steps to participate in the events and activities will also be explained.</div>
              </div>
              <div class="col-xs-12 pb-4 pt-4" >
                <paper-button class="button" raised @click="${e=>{this.register()}}">Submit</paper-button> 
              </div>
            </div>            
          </div>
        </div>
      </div>
    </div>
    ${this.opened?this.openMessage():null}`}catch(error){console.log(error)}}register(){if(this.requiredFieldValidate()){if(this.userRegistration.user_password==this.userRegistration.confirm_user_password){this.openMessage();// fetch('http://localhost:3000/user-registration', {        
//     method: 'POST',
//     mode: "cors",
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     },
//     responseType: "application/json",
//     body: JSON.stringify(this.userRegistration)
// }).then((res) => res.text())
// .then((body) => {
//   var data=JSON.parse(body);
//   if(data.statuscode=="OK"){
//     this.openMessage();
//   }
//   else{
//   alert(data.statusdescription);
//   }
// });
}else{alert("Password and confirm password should be match");var elm=this.shadowRoot.getElementById("txtConfirmPassword");if(elm){elm.invalid=!0;elm.focus()}}}}openMessage(){this.clear();this.opened=!0;return _myApp.html`<paper-dialog id="dialog" opened="${this.opened}">
            <div class="title">Registration</div>
            <p>Registration completed Successfully</p>
            <div style="text-align:right;">
            <paper-button class="button" @click="${e=>{this.opened=!1;this.gotoLoginPage()}}">OK</paper-button>
            </div>
          </paper-dialog>`}requiredFieldValidate(){let valid=!0,reqelements=[],arr=this.shadowRoot.querySelectorAll("paper-input:is([required]):not([readonly]):not([disabled])");reqelements=Array.prototype.filter.call(arr,t=>t.validate&&!0==t.required);Array.prototype.forEach.call(reqelements,t=>{let value="";switch(t.localName){case"paper-input":value=t.value;break;}if(!value)valid=t.validate()&&valid});if(!valid)alert("All required fields must be entered.");else{let invalidelements=Array.prototype.filter.call(arr,t=>!0==t.invalid);if(0<invalidelements.length){alert("Please enter valid value(s)");valid=!1}}return valid}clear(){this.userRegistration={user_registered_email:"",user_password:"",confirm_user_password:"",user_fullname:"",residenceofemiratesinuae:"",nationality:"",user_bloodgroup:"",mobilenumber_countrycode:"",mobilenumber:"",officecontact_countrycode:"",office_contactnumber:"",whatsappnumber:"",businessname:"",cb_networking:!1,cb_businesspromdev:!1,cb_investopportunities:!1,cb_knowlsharingdev:!1,cb_mentorship:!1,cb_communityservice:!1,cb_others_theriseevents:!1,others_theriseevents:"",cb_itandites:!1,cb_tradingretail:!1,cb_constgeneralcontracting:!1,cb_reestpropdev_management:!1,cb_ownersass_management:!1,cb_facilitiesmanagement:!1,cb_realstatebrokerage:!1,cb_mediaadvert_eventmanagement:!1,cb_healthcarepharma:!1,cb_supplychainandlogistics:!1,cb_manufacturing:!1,cb_energy_oil_gas_renewables:!1,cb_mining:!1,cb_legalauditingtaxation:!1,cb_financialservices:!1,cb_educationtrainings:!1,cb_hrmanpowerservice:!1,cb_designenggservice:!1,cb_hospitality:!1,cb_foodandberverages:!1,cb_other_businessverticals:!1,other_businessverticals:"",rb_bestsuites:0,other_bestsuites:"",cb_yearlongevents:!1,cb_toadvertisepromote:!1,cb_businessevents:!1,cb_educationalevents:!1,cb_socialevents:!1,cb_charityevents:!1,cb_other_programactivities:!1,other_programactivities:""};this.requestUpdate()}gotoLoginPage(){this.dispatchEvent(new CustomEvent("gotopage",{bubbles:!0,composed:!0,detail:{hash:"login",data:{}}}))}stateChanged(state){}}window.customElements.define("my-register",MyRegister)});