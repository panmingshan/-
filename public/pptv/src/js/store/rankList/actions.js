import api from "../../api";
import $ from "zepto";
import {fetch} from "../../utils/axios";
import Vue from "vue"
export default {
    //获取积分榜
    getScoreList({commit, state}){
        var seasonId = state.seasonId;
        var competitionId = state.competitionId;
        fetch(api.GET_TEAM_SCORE_RANK_LIST + `${competitionId}/${seasonId}`).then(function (data) {
            commit("setScoreList",data.body.stages[0].data.ranks)
        }).catch(function (err) {
            console.log(err)
        })
        // context.commit("")
    },
    //获取球员榜
    getPlayerList (context){

        if (context.allPlayerTypeListIsComplete)return;
        var allIsCompleteNum = 0;
        var seasonId = context.state.seasonId;
        var competitionId = context.state.competitionId;
        var pageViewGroup = context.state.playerTypeListPageView;
        var requestNum = 0;
        for (var i = 0 ; i < context.state.playerTypeList.length; i ++){
            var item = context.state.playerTypeList[i];
            let _i = i;
            if(!item.hasRequest){
                if(requestNum < pageViewGroup){
                    fetch(api.GET_PLAYER_RANK_LIST + item.id + "/" + seasonId +"/"+ competitionId +"/1/3").then(function (data) {
                        context.commit("changePlayerTypeList",{
                            value : data.body.list,
                            key : "list",
                            index : _i,
                        })
                    })
                    
                    context.commit("changePlayerTypeList",{
                        value : true,
                        key : "hasRequest",
                        index : _i,
                    })

                    allIsCompleteNum ++;
                    requestNum ++ ;
                }
                else{
                    break;
                }

            }
            else{
                allIsCompleteNum ++;
            }
        }

        if(context.state.playerTypeList.length == allIsCompleteNum){
            context.commit("changeAllPlayerTypeListIsComplete")
        }
    },
    //获取球队榜
    getTeamList (context){

        if (context.allTeamFlagIsComplete)return;
        var allIsCompleteNum = 0;
        var pageViewGroup = context.state.teamFlagListPageView;
        var requestNum = 0;

        var seasonId = context.state.seasonId;
        var competitionId = context.state.competitionId;

        for (var i = 0 ; i < context.state.teamFlagList.length; i ++){
            var item = context.state.teamFlagList[i];
            let _i = i;
            if(!item.hasRequest){

                if(requestNum < pageViewGroup){
                    fetch(api.GET_TEAM_RANK_LIST + item.id + `/${seasonId}/${competitionId}`).then(function (data) {
                        context.commit("changeTeamFlagList",{
                            value : data.body.list,
                            key : "list",
                            index : _i,
                        })
                    })

                    context.commit("changeTeamFlagList",{
                        value : true,
                        key : "hasRequest",
                        index : _i,
                    })

                    allIsCompleteNum ++;
                    requestNum ++ ;
                }
                else{
                    break;
                }

            }
            else{
                allIsCompleteNum ++;
            }
        }

        if(context.state.teamFlagList.length == allIsCompleteNum){
            context.commit("changeAllTeamFlagIsComplete")
        }
    },
}