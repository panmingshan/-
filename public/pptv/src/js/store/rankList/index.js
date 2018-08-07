import actions from "./actions"
import mutations from "./mutations"
import Vue from "vue"
import vuex from "vuex"
import {playerTypeList,teamFlagList} from "../../pptv_common"

Vue.use(vuex)

export default new vuex.Store({
    state : {
        //积分榜
        scoreList : [],
        seasonId : "",
        competitionId : "",

        //球员榜
        playerTypeList,
        //每页展示几个
        playerTypeListPageView : 5,
        allPlayerTypeListIsComplete : false,

        //球队榜
        teamFlagList,
        //每页展示几个
        teamFlagListPageView : 5,
        allTeamFlagIsComplete : false,
    },
    mutations,
    actions,
})