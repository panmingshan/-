import Vue from 'vue';
import rankList from 'component/rankList.vue'
import glob from "../global/global"
import store from "../store/rankList"
var vConsole = require("vconsole");
var a  = new vConsole();

Vue.use(glob);

export default class IndexView {

    onstructor() {
        this.options = {
            el: '',
            v_version: ''
        };
    }

    init(data) { //初始化Render
        this.options = data || this.options;
        var vindex = new Vue({
            el: this.options.el,
            store,
            render: h => h(rankList)
        })
    }
}

var indexView = new IndexView();
indexView.init({ el: "#app" });