define(["../../node_modules/lit-element/lit-element.js","../components/page-view-element.js","../../node_modules/@polymer/iron-icon/iron-icon.js","../../node_modules/@polymer/iron-icons/av-icons.js","../../node_modules/@polymer/paper-button/paper-button.js","../../node_modules/@polymer/paper-tabs/paper-tabs.js","../../node_modules/@polymer/paper-tabs/paper-tab.js","../../node_modules/@polymer/paper-card/paper-card.js","../styles/shared-styles.js"],function(_litElement,_pageViewElement,_ironIcon,_avIcons,_paperButton,_paperTabs,_paperTab,_paperCard,_sharedStyles){"use strict";class MyEvent extends _pageViewElement.PageViewElement{static get properties(){return{userCount:{type:Number}}}static get styles(){return[_sharedStyles.sharedStyles,_litElement.css`
      :host {
        display: block;
      }
      a{
        color:rgb(61, 132, 196);
        text-decoration: underline;
        cursor:pointer;
      }
      .dtr-section{
        width:100%;
        padding:20px;
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
            .papertab {
                    width: 100%;
                    height: 100%;
            }
            .thumbnail {
                    width: 100%;
                    height: 100%;
                    background: transparent;
                    object-fit: cover;
                    object-position: top;
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                    display: block;
                }
      `]}constructor(){super()}updated(changedProps){if(changedProps.has("data")){}}load(){try{this.updateComplete.then(()=>{console.log("Loaded Event")})}catch(error){console.log(error)}}render(){try{return _litElement.html`
       <div class="layout col-xs-12">
                <div>
                  <paper-tabs selected="0" scrollable class="dtr-banner-img">
                    <paper-tab class="papertab">
                        <div class="thumbnail">
                            <h1>Pongal Submit</h1>
                            <h2>15-17</h2>
                            <h3>January, 2022</h3>
                            <h4>Sydney, Australia</h4>
                        </div>
                    </paper-tab>
                   <paper-tab class="papertab">
                        <div class="thumbnail">
                            <h1>North America Submit</h1>
                            <h2>22-24</h2>
                            <h3>March, 2022</h3>
                            <h4>Newyork, USA</h4>
                        </div>
                    </paper-tab>
                    <paper-tab class="papertab">
                        <div class="thumbnail">
                            <h1>The Rise Global Submit</h1>
                            <h2>01-04</h2>
                            <h3>April, 2022</h3>
                            <h4>Ajman, Dubai</h4>
                        </div>
                    </paper-tab>
                    <paper-tab class="papertab">
                        <div class="thumbnail">
                            <h1>Pongal Submit 2022</h1>
                            <h2>15-17</h2>
                            <h3>January, 2022</h3>
                            <h4>Sydney, Australia</h4>
                        </div>
                    </paper-tab>
                  </paper-tabs>

                </div>
                <div class="dtr-section">
                  <h1 style="border-bottom: 1px solid gray;">Past Events</h1>
                  <div class="center-justified col-xs-12">
                    <div class="col-xs-12">
                        <div class="col-xs-4" style="padding:20px">
                        <paper-card  heading="Dubai Events" image=${this.rootPath+"images/pongal.jpg"} alt="image">
                          <div class="card-content">
                            Dubai Events
                          </div>
                          <div class="card-actions">
                            <paper-button>Explore!</paper-button>
                          </div>
                        </paper-card>
                    </div>
                   <div class="col-xs-4" style="padding:20px">
                        <paper-card heading="Malaysia Events" image=${this.rootPath+"images/temple.png"} alt="image">
                          <div class="card-content">
                            Malaysia Events
                          </div>
                          <div class="card-actions">
                            <paper-button>Explore!</paper-button>
                          </div>
                        </paper-card>
                    </div>  
                    <div class="col-xs-4" style="padding:20px">
                        <paper-card heading="Singapore Events" image=${this.rootPath+"images/side_banner_2.png"} alt="image">
                          <div class="card-content">
                            Singapore Events
                          </div>
                          <div class="card-actions">
                            <paper-button>Explore!</paper-button>
                          </div>
                        </paper-card>
                    </div>
                                    
                  </div>
                </div>
                </div>
            `}catch(error){console.log(error)}}stateChanged(state){}}window.customElements.define("my-event",MyEvent)});