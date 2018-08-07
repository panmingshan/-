import Vue from "vue"
import {H5CommonUtils} from "../../utils/H5CommonUtils"

export default {
    setScoreList (state,list){
        state.scoreList = list
        console.log(list)
    },

    //球员榜
    changeAllPlayerTypeListIsComplete (state){
        state.allPlayerTypeListIsComplete = true;
    },
    changePlayerTypeList (state,change){
        var list = state.playerTypeList
        var item = list[change.index];

        Vue.set(item,change.key,change.value)
    },
    morePlayerList (state,id){
        location.href = "playerRankList.html?id=" + id
            + "&seasonId=" + state.seasonId + "&competitionId=" + state.competitionId;
    },

    //球队榜
    changeAllTeamFlagIsComplete (state){
        state.allTeamFlagIsComplete = true;
    },
    changeTeamFlagList (state,change){
        var list = state.teamFlagList
        var item = list[change.index];

        Vue.set(item,change.key,change.value)
    },
    moreTeamList (state,id){
        location.href = "teamRankList.html?id=" + id
            + "&seasonId=" + state.seasonId + "&competitionId=" + state.competitionId;
    },
    syncInit(state){
        state.seasonId = H5CommonUtils.getQueryString("seasonId") || 1215;
        state.competitionId = H5CommonUtils.getQueryString("competitionId") || 1;
    }
}