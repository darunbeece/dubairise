define(["../components/my-app.js"],function(_myApp){"use strict";class MyAbout extends _myApp.PageViewElement{static get properties(){return{userCount:{type:Number}}}static get styles(){return[_myApp.sharedStyles,_myApp.css`
      :host {
        display: block;
      }
      a{
        color:rgb(61, 132, 196);
        text-decoration: underline;
        cursor:pointer;
      }
      .dtr-section{
        width:60%;
        margin:0 auto;
      }
      .dtr-content{
       
        columns: 1;
    -webkit-columns: 1;
    -moz-columns: 1;
    -moz-column-gap: 55px;
    column-gap: 55px;
    text-align: justify;
      }
      .dtr-banner-img{
        width:100%;
        height:500px;
        object-fit: cover;
        object-position: 5px 15%;
   
      }
      `]}constructor(){super()}updated(changedProps){if(changedProps.has("data")){}}load(){try{this.updateComplete.then(()=>{console.log("Loaded About")})}catch(error){console.log(error)}}render(){try{return _myApp.html`
                <div class="layout col-xs-12">
                <div>
                  <img src=${this.rootPath+"images/dtr-abt.jpg"} class="dtr-banner-img">
                </div>
                <div class="dtr-section">
                  <h1>About the Rise</h1>
                  <div class="center-justified">
                    <div class="dtr-content">
                      <p>Dubai Tamil Rise is a privately held company, formed as a start-up in 2020 with the goal of creating digital networks that use technology to connect businesses within specific industries in creative new ways that increase transparency and efficiency.</p>
                      <p>For over a decade, the company has focused on the construction industry through its flagship initiative the Building & Construction Network.</p>                      
                      <div class="col-xs-12 pb-4">
                          <div class="col-xs-12"><a  href="/home">Global rise</a></div>
                          <div class="col-xs-12"><a  href="/home">Executive committee</a></div>
                          <div class="col-xs-12"><a  href="/home">Board members</a></div>            
                      </div>
                    </div>
                  </div>
                </div>
                </div>
            `}catch(error){console.log(error)}}stateChanged(state){}}window.customElements.define("my-about",MyAbout)});