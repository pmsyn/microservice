import Vue from "vue";
import ElementUI, {Alert, Message} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.prototype.$message = Message
Vue.prototype.$alert = Alert