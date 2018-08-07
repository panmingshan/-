import Vue from "vue"
import {H5CommonUtils} from "../../utils/H5CommonUtils"

export default {
    setTab(state,id){
        state.tab = id;
    },
    setActiveIndex (state){

        var index = 0;

        for(var i = 0 ; i < state.TabList.length; i ++){
            if(state.TabList[i].id == state.tab){
                index = i;
                break
            }
        }

        state.initialSlide = index;
    },

    //球员榜
    setList (state,list){
        state.list = list;
    },

    resetChooseList(state){
        state.chooseList = [];
    },
    
    pushList (state){
        if(state.chooseList < state.list){
            state.chooseList = state.list.slice(0,(state.chooseList.length + state.pageSize));
        }
    },

    syncInit(state){
        var tabId = H5CommonUtils.getQueryString("id");
        state.tab = tabId || state.TabList[0].id;
        state.seasonId = H5CommonUtils.getQueryString("seasonId") || 1215;
        state.competitionId = H5CommonUtils.getQueryString("competitionId") || 1;

        this.commit("setActiveIndex")
    },
}