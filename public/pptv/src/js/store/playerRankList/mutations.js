import Vue from "vue"
import {H5CommonUtils} from "../../utils/H5CommonUtils"

export default {
    setTab(state,id){
        state.tab = id;
    },

    setIsRequest(state,bool){
        state.isRequest = bool;
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
    pushList (state,list){
        for(var i = 0 ; i < list.length; i ++){
            state.list.push(list[i]);
        }
    },

    setTotalPage (state,num){
        state.totalPage = num;
    },
    //
    pageIndexAdd (state,cb){
        if(state.isRequest || state.pageIndex >= state.totalPage){
            return;
        }

        state.pageIndex += 1;

        cb&&cb(state.pageIndex);
    },

    resetParam (state){
        this.commit("setIsRequest",false)
        this.commit("setTotalPage",0)
        state.list.length = 0;
        state.pageIndex = 1;
    },

    syncInit(state){
        var tabId = H5CommonUtils.getQueryString("id");
        state.seasonId = H5CommonUtils.getQueryString("seasonId") || 1215;
        state.competitionId = H5CommonUtils.getQueryString("competitionId") || 1;
        state.tab = tabId || state.TabList[0].id;

        this.commit("setActiveIndex")
    },
}