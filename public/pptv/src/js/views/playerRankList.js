import Vue from 'vue';
import playerRankList from 'component/playerRankList.vue'
import glob from "../global/global"
import store from "../store/playerRankList"

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
            render: h => h(playerRankList)
        })
    }
}

var indexView = new IndexView();
indexView.init({ el: "#app" });
