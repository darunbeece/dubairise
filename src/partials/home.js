define(["../components/my-app.js"],function(_myApp){"use strict";class MyHome extends _myApp.PageViewElement{static get properties(){return{userCount:{type:Number}}}static get styles(){return[_myApp.sharedStyles,_myApp.css`
        :host {
          display: block;
        }
        .section-main{
          z-index:0;
          position:relative;
          padding:0;
          width:100%;
          height:auto;
        }
        
        .home-banner-img{
          position:absolute;
          right:0;
        }
        .sec-main-content{
          min-height:480px;
          padding:84px;
          
          max-width:424px;
        } 
        .sec-container{
          display:flex;
          flex-flow:row;
        }
        .sec-content{
          min-height: 450px;
          max-width: 424px;
          padding-left: 62px;
          padding-top: 114px;
        }
        .dtr-media-image{transition: all .3s ease-out;}
        .dtr-media-image::after{transition-timing-function: ease-out;}
        .dtr-img-preview{
          transform: translate3d(0,0,0);
              transition: filter .3s;
              will-change: filter;
              perspective-origin: left;
          }
        .sec-main-content h1{
          font-size:42px;
        }
        .sec-content h1{
          line-height:36px;
        }
        .sec-content h3{
          font-size:18px;
          line-height:18px;
          font-weight:400;
        }
        p{
          color: #848484;font-size: 17px;
        }
        @media only screen and (max-width: 767px){
          .sec-main-content{
            padding:32px;
            padding-top:84px;
            max-width:75%;
            min-height:350px;
          }
          .sec-content{
            min-height: 350px;
            max-width: 424px;
            padding-left: 32px;
            padding-top: 16px;
          }
          .sec-container{
            display:flex;
            flex-flow:column;
          }
          .dtr-media-image{
            margin:0 auto;
            text-align:center;
          }
        }
       
        @media only screen and (min-width: 768px){
          .sec-main-content{
            padding:32px;
            max-width:414px;
            padding-top:64px;
            min-height:380px;
          }
          .sec-container{
            display:flex;
            flex-flow:row;
          }
        }
        @media only screen and (min-width: 1024px){
          .sec-main-content{
            padding:64px;
            max-width:414px;
            padding-top:64px;
            min-height:480px;
          }
        }
       
       
       
        `]}constructor(){super()}updated(changedProps){if(changedProps.has("data")){}}load(){try{this.updateComplete.then(()=>{console.log("Loaded")})}catch(error){console.log(error)}}render(){try{return _myApp.html`
         <div class="layout vertical">      
        <div class="col-xs-12">
          <div class="section-main layout horizontal ">
          
            <div class="layout start start-justified">
                <div class="sec-main-content">
                  <h1>WORK SMART </br>    WIN PROJECTS</h1>
                  <p> Identify new construction developments and track their progress to identify potential customers.</p>
                  <div >
                  <div class="button oval">Get Started</div>
                  </div>
                </div>
              
                
            </div>
            <div class="home-banner-img layout end">
              <picture>
                <source media="(min-width:1025px)" srcset=${this.rootPath+"images/home-banner-img-1.png"}>
                <source media="(min-width:768px)" srcset=${this.rootPath+"images/home-banner-img-1-424.png"}>
                <img src=${this.rootPath+"images/home-banner-img-1-224.png "}>
              </picture>
            </div>
          </div>
          </div>
          <div class="col-xs-12">
      <div class="layout sec-container">
        <div class="layout dtr-media-image">
          <picture >
            <source media="(min-width:1025px)" srcset=${this.rootPath+"images/home-banner-img-2.png"}>
            <source media="(min-width:768px)" srcset=${this.rootPath+"images/home-banner-img-2-424.png"}>
            <img src=${this.rootPath+"images/home-banner-img-2-424.png"} loading="lazy" class="dtr-img-preview">
          </picture>
        </div>
        <div class="layout">
            <div class="sec-content">
            <h3 class="mb-1">ABOUT THE RISE</h3>
              <h1 class="mt-1">
              Empowering Tamil
              Entrepreneurship</h1>
              <p> The Rise is a global organisation of Tamil entrepreneurs, professionals and enthusiasts who work in partnership with all people of the world towards equitable economy, innovative and collaborative entrepreneurship, environmental stewardship, shared prosperity, and peace on earth.</p>

              <p>  Empower Tamils from job seeking community to a job generating community through a culture of collaboration, and by providing critical enablers like, knowledge, competencies, and funding.</p>
            
            </div>
          
            
        </div>
     
    </div>
 
</div>
</div>
               <!-- <a href="/login"> <paper-button class="button">Login</paper-button></a>
                <a href="/register"><paper-button  class="button">Register Now</paper-button></a>
                <a href="/register"><button  class="button" @click="${e=>this._gotoPage("register",{})}">Register Now</button></a>-->
            `}catch(error){console.log(error)}}_gotoPage(page,data){this.dispatchEvent(new CustomEvent("gotopage",{bubbles:!0,composed:!0,detail:{hash:page,data:data}}))}stateChanged(state){}}window.customElements.define("my-home",MyHome)});