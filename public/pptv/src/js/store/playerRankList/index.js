import actions from "./actions"
import mutations from "./mutations"
import Vue from "vue"
import vuex from "vuex"
import {playerTypeList} from "../../pptv_common"

Vue.use(vuex)

export default new vuex.Store({
    state : {

        tab : "",
        TabList : playerTypeList,
        initialSlide : 0,
        //展示的列表
        list : [],
        seasonId : "",
        competitionId : "",

        //每页展示几个
        pageSize : 20,
        pageIndex : 1,
        isRequest : false,
        totalPage : "",
    },
    mutations,
    actions,
})