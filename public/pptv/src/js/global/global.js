import {post,fetch,patch,put} from 'utils/axios'

export default {
    install(Vue){
        //定义全局变量
        
        Vue.prototype.$post=post;
        Vue.prototype.$fetch=fetch;
        Vue.prototype.$patch=patch;
        Vue.prototype.$put=put;
    }
}