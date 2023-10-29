import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

// Vuetify
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.min.css';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Firebase
import { VueFire, VueFireAuth } from 'vuefire';
import { firebaseApp } from './config/firebase';

const app = createApp(App);
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
});

// Firebase
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
});

app.use(createPinia());
app.use(router);
app.use(vuetify);

app.mount('#app');
