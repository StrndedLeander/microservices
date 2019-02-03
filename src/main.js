import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//Add necessary modules for Amplify
import Amplify from "aws-amplify";
import { Logger } from "@aws-amplify/core";
import { I18n } from "@aws-amplify/core";
import Auth from "@aws-amplify/auth";
import { AuthClass } from "@aws-amplify/auth";
import { AmplifyPlugin } from "aws-amplify-vue";
import aws_exports from "./aws-exports";
//Configure and make project use added files and modules
Amplify.configure(aws_exports);
Vue.use(AmplifyPlugin, { AuthClass, Auth, Logger, I18n });

require("./assets/sass/main.scss");

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
