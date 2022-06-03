import { createApp } from 'vue'
import App from './App.vue'
import { VueCsvImportPlugin } from "vue-csv-import";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/src/jquery.js';
import 'bootstrap'; import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery-tabledit/jquery.tabledit.min.js';

createApp(App)
    .use(VueCsvImportPlugin)
    .mount("#app");

