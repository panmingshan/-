import Vue from 'vue';
import MatchDataVue from 'component/matchData';
import Global from '../global/global';

Vue.use(Global);

export default class matchDataView {

    constructor() {
        this.options = {
            el: '',
            v_version: ''
        };
    }

    init(data) { //初始化Render
        this.options = data || this.options;
        var vindex = new Vue({
            el: this.options.el,
            render: h => h(MatchDataVue)
        })
    }
}

var indexView = new matchDataView();
indexView.init({
    el: "#app"
});
