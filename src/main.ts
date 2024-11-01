import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'

// import the package

import VueAwesomePaginate from "vue-awesome-paginate";

// import the necessary css file

import "vue-awesome-paginate/dist/style.css";

const pinia = createPinia()

createApp(App).use(pinia).use(VueAwesomePaginate).mount('#app')
