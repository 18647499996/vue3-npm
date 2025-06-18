import { createApp } from 'vue'
import App from '../src/App.vue'
import Router from '../src/router/index.js'
import Antd from './plugin/ant.js'
import Vuetify from './plugin/vuetify.js'
import Ionic from './plugin/ionic.js'
import custom from './plugin/custom.js'


const app = createApp(App).use(Antd).use(Vuetify).use(Ionic).use(Router).use(custom.VueJsonPretty).use(custom.VueDraggable)
Router.isReady().then(() => {
    app.mount('#app')
})

