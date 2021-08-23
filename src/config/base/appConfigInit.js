/**
 * 初始化appConfig
 */

import Vue from "vue";
let appConfig = require("./appConfig");
let pcMobileChange = require("../../createConfig/pcmobile.config.js");
let createAppConfig = require("../../createConfig/app.config.js");
let apiListAppConfig = require("../../createConfig/apilist.config.js");

appConfig.port = location.port;
appConfig.domainName = location.hostname;
appConfig.baseUrl = location.protocol + "//" + location.hostname + (location.port == "80" ? "" : ":" + location.port) + appConfig.routeBasePath;

if (process.env.NODE_ENV === "development") {
  appConfig.apiBaseUrl = appConfig.apiProtocol+ "://" + appConfig.devApi;
} else {
  appConfig.apiBaseUrl = protocol + '//' + apiHostName + (location.port == "80" || location.port == "8883" ? "" : ":" + location.port);
}

appConfig.upFileUrl = appConfig.apiBaseUrl + '/site/attach?file=all/';
appConfig.uploadUrl = appConfig.apiBaseUrl;
appConfig.staticUrl = appConfig.baseUrl + "static/";

appConfig.apis = {...appConfig.apis, ...apiListAppConfig};
appConfig.pcMobileChange = pcMobileChange;
createAppConfig.customConfig = {...appConfig.customConfig, ...createAppConfig.customConfig};
appConfig = {...appConfig, ...createAppConfig};

window.appConfig = Vue.appConfig = Vue.prototype.appConfig = appConfig;
