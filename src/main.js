import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//Add necessary modules for Amplify
import Amplify, * as AmplifyModules from "aws-amplify";
import { AmplifyPlugin } from "aws-amplify-vue";
import aws_exports from "./aws-exports";
//Configure and make project use added files and modules
Amplify.configure(aws_exports);
Vue.use(AmplifyModules, AmplifyPlugin);

require("./assets/sass/main.scss");

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
