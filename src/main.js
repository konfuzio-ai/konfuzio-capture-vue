import Vue from "vue";

import VueKonva from "vue-konva";
import store from "./store";
import App from "./App.vue";
import * as Sentry from "@sentry/vue";
import i18n from "./i18n";

Vue.use(VueKonva);

// Sentry config
if (process.env.NODE_ENV != "development") {
  Sentry.init({
    Vue,
    dsn: process.env.VUE_APP_SENTRY_DSN,
    integrations: [new Integrations.BrowserTracing()],
    environment: process.env.NODE_ENV,

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,

    // If false, errors won't show up in devtools
    logErrors: true,

    tracingOptions: {
      trackComponents: true
    }
  });
}

/**
 * Main entrypoint for the Document Dashboard.
 */
new Vue({
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
