import Vue from 'vue';
import '../../css/index.less'
import store from 'store/battleStore'
import battleArray from 'component/battleArray/battleArray'

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
            render: h => h(battleArray)
        })
    }
}

var indexView = new IndexView();
indexView.init({
    el: "#app"
});
