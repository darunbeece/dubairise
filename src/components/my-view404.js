define(["../../node_modules/lit-element/lit-element.js","./page-view-element.js","../styles/shared-styles.js"],function(_litElement,_pageViewElement,_sharedStyles){"use strict";/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/ // These are the shared styles needed by this element.
class MyView404 extends _pageViewElement.PageViewElement{static get styles(){return[_sharedStyles.SharedStyles]}render(){return _litElement.html`
      <section>
        <h2>Oops! You hit a 404</h2>
        <p>
          The page you're looking for doesn't seem to exist. Head back
          <a href="/home">home</a> and try again?
        </p>
      </section>
    `}}window.customElements.define("my-view404",MyView404)});