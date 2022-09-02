import { createApp } from 'vue'
// import './style.css'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import App from './App.vue'
import {createPinia} from 'pinia'
import router from './routes/recruiter-router'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {fab} from '@fortawesome/free-brands-svg-icons'
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";

library.add(fas,fab)

createApp(App).use(router).use(createPinia()).use(VueAwesomePaginate).component('fa', FontAwesomeIcon).mount('#app')
