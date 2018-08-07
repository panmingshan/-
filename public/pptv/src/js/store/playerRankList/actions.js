import api from "../../api";
import $ from "zepto";
import {fetch} from "../../utils/axios";
import Vue from "vue";
export default {
    //获取球员榜
    getPlayerList (context){

        if(this.state.isRequest){
            return;
        }

        var tabId = this.state.tab;
        var pageIndex = this.state.pageIndex;
        var pageSize = this.state.pageSize;

        var seasonId = context.state.seasonId;
        var competitionId = context.state.competitionId;

        context.commit("setIsRequest",true);
        
        fetch(api.GET_PLAYER_RANK_LIST + tabId + `/${seasonId}/${competitionId}/` + pageIndex + "/" + pageSize).then(function (data) {
            context.commit("pushList",data.body.list);
            context.commit("setTotalPage",data.body.totalPage)
            context.commit("setIsRequest",false);
        })
    },

    asyncInit (context){

    }
}