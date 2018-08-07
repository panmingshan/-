import api from "../../api";
import $ from "zepto";
import {fetch} from "../../utils/axios";
export default {
    //获取球员榜
    getTeamList (context){
        var tabId = this.state.tab;

        var seasonId = context.state.seasonId;
        var competitionId = context.state.competitionId;

        fetch(api.GET_TEAM_RANK_LIST + tabId + `/${seasonId}/${competitionId}`).then(function (data) {

            context.commit("setList",data.body.list)
            context.commit("resetChooseList");
            context.commit("pushList");
        })
    },
    asyncInit (context){

    }
}