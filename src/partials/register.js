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
</iron-iconset-svg>`;document.head.appendChild($_documentContainer.content);const $_documentContainer$1=document.createElement("template");$_documentContainer$1.setAttribute("style","display: none;");$_documentContainer$1.innerHTML=`<dom-module id="paper-dropdown-menu-shared-styles">
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
</dom-module>`;document.head.appendChild($_documentContainer$1.content);(0,_myApp.Polymer)({is:"paper-menu-grow-height-animation",behaviors:[NeonAnimationBehavior],configure:function(config){var node=config.node,rect=node.getBoundingClientRect(),height=rect.height;this._effect=new KeyframeEffect(node,[{height:height/2+"px"},{height:height+"px"}],this.timingFromConfig(config));return this._effect}});(0,_myApp.Polymer)({is:"paper-menu-grow-width-animation",behaviors:[NeonAnimationBehavior],configure:function(config){var node=config.node,rect=node.getBoundingClientRect(),width=rect.width;this._effect=new KeyframeEffect(node,[{width:width/2+"px"},{width:width+"px"}],this.timingFromConfig(config));return this._effect}});(0,_myApp.Polymer)({is:"paper-menu-shrink-width-animation",behaviors:[NeonAnimationBehavior],configure:function(config){var node=config.node,rect=node.getBoundingClientRect(),width=rect.width;this._effect=new KeyframeEffect(node,[{width:width+"px"},{width:width-width/20+"px"}],this.timingFromConfig(config));return this._effect}});(0,_myApp.Polymer)({is:"paper-menu-shrink-height-animation",behaviors:[NeonAnimationBehavior],configure:function(config){var node=config.node,rect=node.getBoundingClientRect(),height=rect.height;this.setPrefixedProperty(node,"transformOrigin","0 0");this._effect=new KeyframeEffect(node,[{height:height+"px",transform:"translateY(0)"},{height:height/2+"px",transform:"translateY(-20px)"}],this.timingFromConfig(config));return this._effect}});var config={ANIMATION_CUBIC_BEZIER:"cubic-bezier(.3,.95,.5,1)",MAX_ANIMATION_TIME_MS:400};/**
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
   */_disabledChanged:function(disabled){_myApp.IronControlState._disabledChanged.apply(this,arguments);if(disabled&&this.opened){this.close()}},__onIronOverlayCanceled:function(event){var uiEvent=event.detail,trigger=this.$.trigger,path=(0,_myApp.dom)(uiEvent).path;if(-1<path.indexOf(trigger)){event.preventDefault()}}});_exports.PaperMenuButton=PaperMenuButton;Object.keys(config).forEach(function(key){PaperMenuButton[key]=config[key]});var paperMenuButton={PaperMenuButton:PaperMenuButton};// with the `Polymer` function, so this is only a cache lookup.
// https://github.com/Polymer/polymer/blob/640bc80ac7177b761d46b2fa9c455c318f2b85c6/lib/legacy/class.js#L533-L534
_exports.$paperMenuButton=paperMenuButton;const LegacyPolymerElementBase=(0,_myApp.LegacyElementMixin)(HTMLElement);/**
                                                                  Material design: [Dropdown
                                                                  menus](https://www.google.com/design/spec/components/buttons.html#buttons-dropdown-buttons)
                                                                  
                                                                  `paper-dropdown-menu` is similar to a native browser select element.
                                                                  `paper-dropdown-menu` works with selectable content. The currently selected
                                                                  item is displayed in the control. If no item is selected, the `label` is
                                                                  displayed instead.
                                                                  
                                                                  Example:
                                                                  
                                                                      <paper-dropdown-menu label="Your favourite pastry">
                                                                        <paper-listbox slot="dropdown-content">
                                                                          <paper-item>Croissant</paper-item>
                                                                          <paper-item>Donut</paper-item>
                                                                          <paper-item>Financier</paper-item>
                                                                          <paper-item>Madeleine</paper-item>
                                                                        </paper-listbox>
                                                                      </paper-dropdown-menu>
                                                                  
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
                                                                  `--paper-dropdown-menu-input` | A mixin that is applied to the internal paper input | `{}`
                                                                  `--paper-dropdown-menu-icon` | A mixin that is applied to the internal icon | `{}`
                                                                  
                                                                  You can also use any of the `paper-input-container` and `paper-menu-button`
                                                                  style mixins and custom properties to style the internal input and menu button
                                                                  respectively.
                                                                  
                                                                  @element paper-dropdown-menu
                                                                  @demo demo/index.html
                                                                  */(0,_myApp.Polymer)({/** @override */_template:_myApp.html$1`
    <style include="paper-dropdown-menu-shared-styles"></style>

    <paper-menu-button id="menuButton" vertical-align="[[verticalAlign]]" horizontal-align="[[horizontalAlign]]" dynamic-align="[[dynamicAlign]]" vertical-offset="[[_computeMenuVerticalOffset(noLabelFloat, verticalOffset)]]" disabled="[[disabled]]" no-animations="[[noAnimations]]" on-iron-select="_onIronSelect" on-iron-deselect="_onIronDeselect" opened="{{opened}}" close-on-activate allow-outside-scroll="[[allowOutsideScroll]]" restore-focus-on-close="[[restoreFocusOnClose]]">
      <!-- support hybrid mode: user might be using paper-menu-button 1.x which distributes via <content> -->
      <div class="dropdown-trigger" slot="dropdown-trigger">
        <paper-ripple></paper-ripple>
        <!-- paper-input has type="text" for a11y, do not remove -->
        <paper-input id="input" type="text" invalid="[[invalid]]" readonly disabled="[[disabled]]" value="[[value]]" placeholder="[[placeholder]]" error-message="[[errorMessage]]" always-float-label="[[alwaysFloatLabel]]" no-label-float="[[noLabelFloat]]" label="[[label]]" input-role="button" input-aria-haspopup="listbox" autocomplete="off">
          <!-- support hybrid mode: user might be using paper-input 1.x which distributes via <content> -->
          <iron-icon icon="paper-dropdown-menu:arrow-drop-down" suffix slot="suffix"></iron-icon>
        </paper-input>
      </div>
      <slot id="content" name="dropdown-content" slot="dropdown-content"></slot>
    </paper-menu-button>
`,is:"paper-dropdown-menu",behaviors:[_myApp.IronButtonState,_myApp.IronControlState,_myApp.IronFormElementBehavior,_myApp.IronValidatableBehavior],properties:{/**
     * The derived "label" of the currently selected item. This value
     * is the `label` property on the selected item if set, or else the
     * trimmed text content of the selected item.
     */selectedItemLabel:{type:String,notify:!0,readOnly:!0},/**
     * The last selected item. An item is selected if the dropdown menu has
     * a child with slot `dropdown-content`, and that child triggers an
     * `iron-select` event with the selected `item` in the `detail`.
     *
     * @type {?Object}
     */selectedItem:{type:Object,notify:!0,readOnly:!0},/**
     * The value for this element that will be used when submitting in
     * a form. It reflects the value of `selectedItemLabel`. If set directly,
     * it will not update the `selectedItemLabel` value.
     */value:{type:String,notify:!0},/**
     * The label for the dropdown.
     */label:{type:String},/**
     * The placeholder for the dropdown.
     */placeholder:{type:String},/**
     * The error message to display when invalid.
     */errorMessage:{type:String},/**
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
     */verticalOffset:Number,/**
     * If true, the `horizontalAlign` and `verticalAlign` properties will
     * be considered preferences instead of strict requirements when
     * positioning the dropdown and may be changed if doing so reduces
     * the area of the dropdown falling outside of `fitInto`.
     */dynamicAlign:{type:Boolean},/**
     * Whether focus should be restored to the dropdown when the menu closes.
     */restoreFocusOnClose:{type:Boolean,value:!0}},listeners:{tap:"_onTap"},/**
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
this.$.input._focusableElement.focus()},/** @override */attached:function(){// NOTE(cdata): Due to timing, a preselected value in a `IronSelectable`
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
   */_getValidity:function(_value){return this.disabled||!this.required||this.required&&!!this.value},_openedChanged:function(){var openState=this.opened?"true":"false",e=this.contentElement;if(e){e.setAttribute("aria-expanded",openState)}}});class MyRegister extends _myApp.PageViewElement{static get properties(){return{userCount:{type:Number},opened:{type:Boolean,value:!1}}}static get styles(){return[_myApp.sharedStyles,_myApp.css`
        :host {
          display: block;
        }
        .maindiv{
          padding:10px;
          margin:0 auto;
          max-width:80%;
        }
        .width{
          width:90%;
        }
        paper-input{
          --paper-input-container-label:{
            color:#3d84c4;
          }
        }
        .form-section{
          width:50%; margin:0 auto;
        } 

        .login-bg{          
          position: absolute;
          /* top: 100%;
          height: 70%; */
          right: 0;
          width: 50%;
        }

        /* Wide layout: when the viewport width is bigger than 460px, layout
        changes to a wide layout */
       
        @media screen and (min-width: 768px) {
          .width{
            width:40%;
          }
          .form-section{
            width:50%; margin:0 auto;
          } 
        }
        @media screen and (max-width: 767px) {
          .width{
            width:40%;
          }
          .form-section{
            width:90%; margin:0 auto;
          } 
        }
       
      `]}constructor(){super()}updated(changedProps){if(changedProps.has("data")){}}load(){try{this.updateComplete.then(()=>{console.log("Loaded Register")})}catch(error){console.log(error)}}render(){try{return _myApp.html`
      <div>
        <img src=${this.rootPath+"images/login-bg.svg"} class="login-bg">
      </div>
    <div class="m-2 pb-4">
      <div class="col-xs-12">
        <div class="p-1">
          <div class="layout">
            <h2>Registration</h2>
            <div class="form-section">
              <div class="col-xs-12">
                <paper-input label="Name" class="col-xs-11 pb-2" always-float-label></paper-input>
              </div>
              <div class="col-xs-12">
                <paper-input label="Phone Number" class="col-xs-11 pb-2" always-float-label></paper-input>
              </div>
              <div class="col-xs-12">
                <paper-input label="Alternate Phone Number" class="col-xs-11 pb-2" always-float-label></paper-input>
              </div>
              <div class="col-xs-12">
                <paper-input label="Email ID" class="col-xs-11 pb-2" always-float-label></paper-input>
              </div>
              <div class="col-xs-12">
                <paper-input label="Business Name" class="col-xs-11 pb-2" always-float-label></paper-input>
              </div>
              <div class="col-xs-12">
                <paper-input label="Business Address" class="col-xs-11 pb-2" always-float-label></paper-input>
              </div>
              <div class="col-xs-12">
                <paper-input label="Business City" class="col-xs-11 pb-2" always-float-label></paper-input>
              </div>
              <div class="col-xs-12">
                <paper-input label="Business Country" class="col-xs-11 pb-2" always-float-label></paper-input>
              </div>
              <div class="col-xs-12">
                <label id="label1">Are You Buyer or Seller:</label>
              </div>
              <div class="col-xs-12 pb-2">
                <paper-radio-group>
                  <paper-radio-button name="Buyer">Buyer</paper-radio-button>
                  <paper-radio-button name="Seller">Seller</paper-radio-button>
                </paper-radio-group>
              </div>           
              <div class="col-xs-12">
                <paper-dropdown-menu label="Business Category" class="pb-2" always-float-label vertical-offset="60">
                  <paper-listbox slot="dropdown-content" class="dropdown-content" >
                    <paper-item>Textiles</paper-item>
                    <paper-item>Industrial</paper-item>
                    <paper-item>Mining Industry</paper-item>
                    <paper-item>Others</paper-item>
                  </paper-listbox>
                </paper-dropdown-menu>
              </div>            
              <div class="col-xs-12">
                <paper-dropdown-menu label="Type of Membership" class="pb-2" always-float-label vertical-offset="60">
                  <paper-listbox slot="dropdown-content" class="dropdown-content" selected="1">
                    <paper-item>Free</paper-item>
                    <paper-item>Silver</paper-item>
                    <paper-item>Gold</paper-item>
                  </paper-listbox>
                </paper-dropdown-menu>
              </div>
              <div class="col-xs-12">
                <paper-input label="Registration Amount" class="col-xs-11 pb-2" always-float-label disabled value="500"></paper-input>  
              </div>
              <div class="col-xs-12 pb-4">
                <paper-button class="button" class="col-xs-11" raised @click="${e=>{this.openMessage()}}">Pay Now</paper-button> 
              </div>
            </div>            
          </div>
        </div>
      </div>
    </div>   
${this.opened?this.openMessage():null}
            `}catch(error){console.log(error)}}openMessage(){this.opened=!0;return _myApp.html`<paper-dialog id="dialog" opened="${this.opened}">
      <div class="title">Registration</div>
      <p>Registration completed Successfully</p>
      <div style="text-align:right;">
      <a href="/login"> <paper-button class="button" @click="${e=>{this.opened=!1}}">OK</paper-button></a>
      </div>
    </paper-dialog>`}stateChanged(state){}}window.customElements.define("my-register",MyRegister)});