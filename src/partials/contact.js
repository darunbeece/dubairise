define(["../../node_modules/lit-element/lit-element.js","../components/page-view-element.js","../styles/shared-styles.js","../../node_modules/@polymer/iron-autogrow-textarea/iron-autogrow-textarea.js"],function(_litElement,_pageViewElement,_sharedStyles,_ironAutogrowTextarea){"use strict";class MyContact extends _pageViewElement.PageViewElement{static get properties(){return{userCount:{type:Number}}}static get styles(){return[_sharedStyles.sharedStyles,_litElement.css`
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
      `]}constructor(){super()}updated(changedProps){if(changedProps.has("data")){}}load(){try{this.updateComplete.then(()=>{console.log("Loaded Contact")})}catch(error){console.log(error)}}render(){try{return _litElement.html`
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