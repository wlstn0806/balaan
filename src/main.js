import { createApp } from 'vue'
import App from './App.vue'
import { createVuestic } from "vuestic-ui";
import "vuestic-ui/css";
import 'material-design-icons-iconfont/dist/material-design-icons.css';


createApp(App).use(createVuestic()).mount('#app')
