import actions from "./actions"
import mutations from "./mutations"
import Vue from "vue"
import vuex from "vuex"
import {teamFlagList} from "../../pptv_common"

Vue.use(vuex)

export default new vuex.Store({
    state : {
        tab : "",
        initialSlide : 0,
        list : [],
        chooseList : [],
        TabList : teamFlagList,

        seasonId : "",
        competitionId : "",

        //每页展示几个
        pageSize : 20,
    },
    mutations,
    actions,
})