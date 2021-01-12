define(["../components/my-app.js"],function(_myApp){"use strict";class MyLogin extends _myApp.PageViewElement{static get properties(){return{userCount:{type:Number}}}static get styles(){return[_myApp.sharedStyles,_myApp.css`
        :host {
          display: block;
        }
        a{
          color:rgb(61, 132, 196);
          text-decoration: underline;
        }
        .maindiv{
          padding:10px;
          margin:0 auto;
          max-width:80%;
        }
        .alignright{
          text-align: right;
        }
        
        .aligncenter{
          text-align: center;
        }
        paper-input{
          --paper-input-container-label:{
            color:#3d84c4;
          }
        }
        .login-bg{
          
          position: absolute;
          /* top: 100%;
          height: 70%; */
          right: 0;
          width: 50%;
        }
        .login-bg-bottom{
          background: left bottom / 75% no-repeat;
          position: absolute;
           bottom: -5%;
          left:-2%;
          height: 70%;
          width: 50%;
        }
        .login-sec{
          padding-top:60px;
        }
        .form-section{
          width:40%; margin:0 auto;
        } 
        /* Wide layout: when the viewport width is bigger than 460px, layout
        changes to a wide layout */
       
        @media screen and (min-width: 1200px) {
          .form-section{
            width:30%; margin:0 auto;
          } 
        }
        @media screen and (min-width: 1440px) {
          .form-section{
            width:30%; margin:0 auto;
          } 
        }
      
        @media screen and (max-width: 567px) {
          .form-section{
            width:90%; margin:0 auto;
          } 
          .login-left{
            display:none;
          }
          .login-bg{
            right: -8%;
             height: 95%;
             width: 85%;
           }
           .login-bg-bottom{
             top: 30%;
             left:-2%;
             height: 70%;
             width: 60%;
           }
        }
        
        @media screen and (max-width: 767px) {
          .form-section{
            width:60%; margin:0 auto;
          } 
          .login-left{
            display:none;
          }
          .login-bg{
           right: -8%;
            height: 95%;
            width: 85%;
          }
          .login-bg-bottom{
            bottom: -6%;
            left:-2%;
            height: 70%;
            width: 60%;
          }
        }
       
      `]}constructor(){super()}updated(changedProps){if(changedProps.has("data")){}}load(){try{this.updateComplete.then(()=>{console.log("Loaded Login")})}catch(error){console.log(error)}}render(){try{return _myApp.html`
      <div>
        <img src=${this.rootPath+"images/login-bg.svg"} class="login-bg">
      </div>
      <div class="layout login-sec">
      <div class="m-2  pb-4">
        <div class="col-xs-12">
          <div class="p-1 ">
            <div class="layout ">
              
              <h2>Welcome to Dubai Tamil Rise</h2>
              <div class="form-section">
                <div class="col-xs-12">
                  <paper-input label="User Name or Email" class="col-xs-12 pb-2" always-float-label></paper-input>
                </div>
                <div class="col-xs-12">
                  <paper-input label="Password" type="password" class="col-xs-12 pb-2" always-float-label></paper-input>
                </div>
                <div class="col-xs-12 alignright pb-2">Forgot password?</div>
                <div class="col-xs-12  pb-2 aligncenter">
                  <paper-button class="button col-xs-12" raised >Sign in</paper-button> 
                </div>
                <div class="col-xs-12 aligncenter pb-2">or</div>
                <div class="col-xs-12 pb-4 aligncenter">
                  <paper-button class="button col-xs-12 p-1" raised only-upper-case=[[false]><img src=${this.rootPath+"images/Signingoogle.jpg"} style="width:35px;height:35px;padding-right:10px;">Sign in with Google</paper-button> 
                </div>
                <div class="col-xs-12 pt-3 aligncenter">New DubaiTamilRise? <a href="/register"> Create Account </a> </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
      </div>
      <div>
        <img src=${this.rootPath+"images/login-bg-bottom.svg"} class="login-bg-bottom">
      </div>
      `}catch(error){console.log(error)}}stateChanged(state){}}window.customElements.define("my-login",MyLogin)});