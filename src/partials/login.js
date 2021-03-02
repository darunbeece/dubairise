define(["../components/my-app.js"],function(_myApp){"use strict";class MyLogin extends _myApp.PageViewElement{static get properties(){return{userCount:{type:Number},userLogin:{type:Object},errorMssage:{type:String}}}static get styles(){return[_myApp.sharedStyles,_myApp.css`
        :host {
          display: block;
          
        }
        a{
          color:var(--app-primary-color)
          
        }
        .maindiv{
          padding:10px;
          margin:0 auto;
          max-width:80%;  
        }
        .alignright{
          text-align: right;
        }
        
       paper-input{
        --paper-input-container-input-invalid:{
          font-size:11px; 
        };
       --paper-font-caption_-_font-size:16px;
        --paper-input-container-color:#474747;
        --paper-input-container-label-floating:{
           font-size:16px;
         };
         --paper-input-container-label:{
          font-size:16px;
         };
         
         --paper-input-container-input:{
          font-size:16px;
         };
        --paper-input-container-focus-color: var(--app-primary-color);
       }
        .errorlabel{
          color:red;
        }

        .login-bg{
           
          position: absolute;
          /* top: 100%; */
          right: 0;
          height: 80%;
          width: 60%;
        }
        .login-bg-bottom{
          
          position: absolute;
           bottom: -5%;
          left:-2%;
          height: 70%;
          width: 60%;
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
       
      `]}constructor(){super();this.errorMssage="";this.userLogin={user_registered_email:"",password:""}}updated(changedProps){if(changedProps.has("data")){}}load(){try{this.updateComplete.then(()=>{console.log("Loaded Login")})}catch(error){console.log(error)}}render(){try{return _myApp.html`
      <div class="m-2  pb-4">
      <div class="layout login-sec">
      
        <div class="col-xs-12">
          <div class="p-1 ">
            <div class="layout ">
              
              <h2>Welcome to Dubai Tamil Rise</h2>
              <div class="form-section">
                <div class="col-xs-12 errorlabel">${this.errorMssage}</div>
                <div class="col-xs-12">
                  <paper-input id="txtEmail" label="User Email" type="email" class="col-xs-12 pb-2" 
                        required always-float-label error-message="Enter an email"
                            .value=${this.userLogin.user_registered_email} 
                            @blur=${e=>{this.userLogin.user_registered_email=e.currentTarget.value;e.currentTarget.invalid=!1}} ></paper-input>
                </div>
                <div class="col-xs-12">
                  <paper-input id="txtPassword" label="Password" type="password" class="col-xs-12 pb-2" always-float-label
                  required  .value=${this.userLogin.password}   error-message="Enter a password"
                            @blur=${e=>{this.userLogin.password=e.currentTarget.value;e.currentTarget.invalid=!1}} ></paper-input>
                </div>
                <div class="col-xs-12 pt-3 pb-2 aligncenter">
                  <paper-button class="button col-xs-12" raised @click="${e=>{this.onLogin()}}">Sign in</paper-button> 
                </div>               
                <div class="col-xs-12 pt-3 mt-1 mb-1 aligncenter primary-text-color">Forgot password?</div> 
                <div class="col-xs-12 pt-3 aligncenter"> 
                  New Dubai Tamil Rise? <a @click="${e=>{this.dispatchEvent(new CustomEvent("gotopage",{bubbles:!0,composed:!0,detail:{hash:"register",data:{}}}))}}"> Create Account </a> </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
      </div>
     
      `}catch(error){console.log(error)}}onLogin(){var _this=this;return babelHelpers.asyncToGenerator(function*(){try{if(_this.requiredFieldValidate()){_this.dispatchEvent(new CustomEvent("loginsuccess",{bubbles:!0,composed:!0,detail:{data:_this.userLogin.user_registered_email.split("@")[0]}}));_this.clear();// fetch('http://localhost:3000/login', {        
//     method: 'POST',
//     mode: "cors",
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     },
//     responseType: "application/json",
//     body: JSON.stringify(this.userLogin)
// }).then((res) => res.text())
// .then((body) => {
//   var response=JSON.parse(body);
//   if(response.statuscode=="OK"){
//     //goto home page
//     this.clear();
//     this.dispatchEvent(
//       new CustomEvent("loginsuccess", {
//           bubbles: true,
//           composed: true,
//           detail: {
//               data: response.data,
//           },
//       })
//   );
// this.dispatchEvent(
//   new CustomEvent("gotopage", {
//     bubbles: true,
//     composed: true,
//     detail: {
//       hash: "home",
//       data: response,
//     },
//   })
// );
//   }
//   else{
//   this.errorMssage=response.statusdescription;
//   }
// });
}}catch(e){throw e}})()}requiredFieldValidate(){let valid=this.shadowRoot.getElementById("txtEmail").validate();valid=this.shadowRoot.getElementById("txtPassword").validate()&&valid;return valid}clear(){this.userLogin={user_registered_email:"",password:""};this.requestUpdate()}stateChanged(state){}}window.customElements.define("my-login",MyLogin)});