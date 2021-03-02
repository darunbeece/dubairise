define(["../components/my-app.js"],function(_myApp){"use strict";class MyAbout extends _myApp.PageViewElement{static get properties(){return{userCount:{type:Number}}}static get styles(){return[_myApp.sharedStyles,_myApp.css`
      :host {
        display: block;
      }
      h1{
        font-size:40px;
      }
        li{
            display: list-item;
            text-align: -webkit-match-parent;
            position: relative;
            border-top: 1px solid #eeeeee;
            padding: 10px;
            color: #848484;
            font-size: 17px;
        }
        p{color: #848484;font-size: 17px;}
      a{
        color:rgb(61, 132, 196);
        text-decoration: underline;
        cursor:pointer;
      }
      .dtr-section{
        width:80%;
        margin:0 auto;
        text-align: justify;
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
        object-position: -3px 15%;
        position:absolute;
   
      } 
      .abt-banner-sec{
        position:relative; height:500px;
      }
.main-banner-content{
  position: absolute;
    left: 6%;
    width: 45%;
    padding-top: 5%;
}
@media only screen and (min-width: 769px) and (max-width: 1192px){
  h1{
    font-size:32px;
  }
  h1 span{
    font-size:28px;
  }
  .abt-banner-sec{
    position: relative;
    height: 380px;
  }
  .dtr-banner-img{
    object-fit: contain;
  }
}
@media only screen and (max-width: 768px){
  h1{
    font-size:24px;
  }
  h1 span{
    font-size:18px;
  }
  .abt-banner-sec{
    position: relative;
    height: 330px;
  }
  .dtr-banner-img{
    object-fit: contain;
  }
}

@media only screen and (max-width: 767px){
  .dtr-banner-img{
    display:none;
  }
  .main-banner-content{
    position: relative;
      left: 6%;
      width: 85%;
      padding-top: 4%;
  }
  .abt-banner-sec{
    position:relative; height:auto;
  }
}
      
      `]}constructor(){super()}updated(changedProps){if(changedProps.has("data")){}}load(){try{this.updateComplete.then(()=>{console.log("Loaded About")})}catch(error){console.log(error)}}render(){try{return _myApp.html`
        <div class="layout col-xs-12">
            <div class="abt-banner-sec">
              <img src=${this.rootPath+"images/about-banner.jpg"} class="dtr-banner-img" />
              <div class="main-banner-content">
                <h1>
                  அறம். பொருள். தமிழ்.<br> 
                  <span style="padding-left: 0px;padding-right: 20px;">Global Summit Jan 15-Feb 08, 2021</span>
                </h1>
                <p>Thai Pongal Summit takes up as a Special Mission to support efforts to establish a Tamil Chair at the University of Toronto. Toronto will be the future global city of Tamils.</p>
                <div class="pl-2">
                    <paper-button raised class="button custom-button"
                    @click="${e=>{window.open("https://www.youtube.com/watch?v=YeTFV2va9uc")}}">
                      <iron-icon icon="av:play-circle-outline" class="pr-1"></iron-icon>
                      Watch Video</paper-button>    
                </div>
            </div>
          </div>
        <div class="dtr-section">
      
      
      <h3>1. Entity</h3>      
      <p>The Rise is a global organisation of Tamil entrepreneurs, professionals and enthusiasts who work in partnership with all people of the world towards equitable economy, innovative and collaborative entrepreneurship, environmental stewardship, shared prosperity, and peace on earth.</p>


      <h3>2. Perspective</h3>
      <p>The Rise’s perspective derives from ARAM expressed through intentions, actions and outcomes. Given below are the nuances of this ARAM perspective, which the The Rise shall use as guideposts.</p>
        <ul>
        <li>United we shall change the way the world sees us (The Tamils) and the way we see the world. A trust based engagement for building safety, sharing risk, innovating ideas, and co-creating experiences.</li>
        <li>Adopting a dictum of not one trustworthy person shall fall into despair implying cultivating, nurturing and sustaining ARAM as the basis for interactions.</li>
        <li>Ensuring universal access to wellbeing for every being through systematic provision of food, cloths, dwellings, education, health, recreation, entertainment and so on.</li>
        <li>By building endurance as a committed cohesive collective groups across the globe adopting an ARAM based culture code.</li>
        <li>Ensuring accomplishment of the goals, purpose, vision, and mission through cooperative actions through seamless hyper connections based on trust.</li>
        <li>Ensuring the working of a collective perspective anticipating challenges, leveraging opportunities, energising collaboration and optimising outcomes.</li>
        <li>Creating enduring asset classes with built in resilience for continuity, sustainability and perpetuity.</li>
        <li>A determination to accomplish impossible outcomes in shortest span of time by leveraging all these through passion, diligence and precision.</li>
        </ul>

      
      <h3>3. Goal and Purpose</h3>      
      <p>Goal: An economic identity for Global Tamils through pre-eminence positions in finance, business, innovation, technology and value addition</p>
      <p>Purpose: An ARAM based economic revolution / transformation for the wellbeing of every being.</p>

      <h3>4. Vision and Mission</h3>      
      <p>Vision: That everyone on earth will have life, a life in all its fullness.</p>
      <p>Mission: To enable a platform for Tamils to collaborate, cooperate, co-create and co-exist for effectively contributing to above vision, goal and purpose. The immediate focus shall be:</p>
        <ul>
            <li>To co-create capital, aggregate knowledge, competencies and experience to support enterprising, innovations and transformation.</li>
            <li>To enable, support and scale businesses, innovations, co-working spaces, co-operative Social enterprises, futuristic education and skilling, distributed development, and a culture of coexistence and peace.</li>
            <li>To facilitate entreprenuers, innovators, investors, professionals and others to find each other, collaborate and co-create sustainable ventures at varying scale</li>
            <li>To form and establish The Rise Chapters in all the countries where Tamils live supporting collaboration, co-creation and transformation</li>
            <li>To set up offices (the chapters) that facilitate trade and multi layered transactions between Tamils all over the world, and enrol a 100000 members by 2025.</li>
            <li>To set up special regional hubs (centres) in Asia Pacific, GCC, Europe, Africa, South America and North America regions to enable The Rise Chapters in the respective regions.</li>
            <li>To interact with influencers, decision makers, investors and others in a region (through regional centres), country specific and regional forums at the highest level.</li>
            <li>To establish financial institutions of purpose and repute and introduce financial products, services and technologies all over the world.</li>
            <li>To go to countries of the world that can benefit from the knowledge strength of Tamils, particularly our expertise in engineering and Information Technologies, and engage with those economies and communities as Tamils from an enabling paradigm, keeping equity, participation, sustainability and shared prosperity as the prime value propositions.</li>
            <li>To establish Good Food Alliance that will work on the UN Sustainable Development Goals of Food Security.</li>
            <li>To develop, sustain and popularise Organic agricultural farms that will be known as Thai Nilam.</li>
            <li>To set up, strengthen and scale organic value chains across the world.</li>
            <li>To establish a global supply chain as a service for sourcing, selling, exporting, importing, warehousing, transporting and delivering.</li>
            <li>To establish a state of the art Tamil Cultural Theme Parks in Tamil Nadu, Canada and Malaysia that showcase rich civilizational diversity of Tamils over the years</li>
            <li>To create a ‘Tamil Pilgrimage’, a theme based cultural experience connecting various places in Tamil Nadu. An experience to rediscover “Thainilam” for Tamils and for the world at large to learn about 10000 year old civilisation that quietly existed, flourished and contributed.</li>
            <li>To design a yearlong programme, which shall be repeated every year, to attract tourists around the year, the citizens of the world who would want to have an experience of Tamil culture in its rich and diverse myriads.</li>
            <li>To create ARAM zones, across the world, for production, processing, manufacturing, and servicing, innovations, R&amp;D and learning.</li>
            <li>To design and promote integrated ARAM communities in cities and elsewhere across the world, with an emphasis on affordability</li>
            <li>To establish a Virtual University of Excellence and spread it to all countries of the world.</li>
            <li>To organise women as a transforming collective for poverty reduction, environmental stewardship, food security and peace.</li>
            <li>To initiate sustained intellectual and activist engagement to promote peace and harmony in the world.</li>
            <li>To be the 21st century Cooperative movement. To create expansive public assets specifically in the domains of health, integrated medicine, education and culture.</li>
                                   
        </ul>
      </div>
                </div>
            `}catch(error){console.log(error)}}stateChanged(state){}}window.customElements.define("my-about",MyAbout)});