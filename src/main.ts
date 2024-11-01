import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'

//Pagination
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";

//Pinia
const pinia = createPinia()


createApp(App).use(pinia).use(VueAwesomePaginate).mount('#app')
