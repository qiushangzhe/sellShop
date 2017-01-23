// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './router';
require('../index.html');
require('../static/js/zepto.js');
require('../static/js/sm.js');
require('../static/css/sm.css');
require('../static/css/common.css');
var app = {
  initialize: function() {
    this.bindEvents();
    this.setupVue();
  },
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  onDeviceReady: function() {
    app.receivedEvent('deviceready');
  },
  receivedEvent: function(id) {
    console.log('Received Event: ' + id);

  },
  setupVue: function() {
    Vue.use(VueRouter);
    var router = new VueRouter({
      base: __dirname,
      routes: routes
    });
    var vue = new Vue({
      el: '#qiuApp',
      router: router
    });
  }
};

app.initialize();
