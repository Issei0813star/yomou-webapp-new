import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toast, {POSITION} from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import './assets/styles/tailwind.css';

createApp(App).use(store).use(router).use(Toast).mount('#app')
