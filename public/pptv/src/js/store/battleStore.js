import Vue from 'vue'
import Vuex from 'vuex'
import {fetch} from 'utils/axios'

Vue.use(Vuex)

const state = {
    teamId: [],
    officialName: '',
    teamLogo: {},
    teamName: {},
    playList: [],
    falseState: true
}
const getters = {
    homeTeamList(state){
        let res = state.playList.filter(item => item.teamId === state.teamId[0])
        return res
    },
    homeTeamList1(state,getters){
        let res =  getters.homeTeamList.filter(item => item['playerType'] === 1)
        return res
    },
    homeTeamList2(state, getters) {
        let res = getters.homeTeamList.filter(item => item['playerType'] === 2)
        return res
    },
    homeTeamList3(state, getters) {
        let res = getters.homeTeamList.filter(item => item['playerType'] === 3)
        return res
    },
    guestTeamList(state){
        return state.playList.filter(item => item.teamId === state.teamId[1])
    },
    guestTeamList1(state, getters) {
        let res = getters.guestTeamList.filter(item => item['playerType'] === 1)
        return res
    },
    guestTeamList2(state, getters) {
        let res = getters.guestTeamList.filter(item => item['playerType'] === 2)
        return res
    },
    guestTeamList3(state, getters) {
        let res = getters.guestTeamList.filter(item => item['playerType'] === 3)
        return res
    }
}

const mutations = {
    // 获得teamId
    getTeamId(state,data){
        state.teamId = data
    },
    lists(state, allData){
        state.playList = allData
    },
    teamName(state, teamNameData){
        state.teamName = teamNameData
    },
    teamLogo(state, teamLogoData){
        state.teamLogo = teamLogoData
    },
    officialName(state, officialNameDate) {
        state.officialName = officialNameDate || '暂无数据'
    },
    capture(state, data){
        console.log(data)
        state.falseState = data
    }
}

const actions = {
    async getBattleData({commit}, matchId) {
        try {
            const aa = await fetch('/vms-worldcup/competition-information/team-players/' + matchId)
            let {body:{playList}} = aa
            let {body:{teamLogo}} = aa
            let {body:{teamName}} = aa
            let {body:{officialName}} = aa
            if (playList.length == 0) {
                commit('capture', false)
                return
            }
            const teamId = [...new Set(playList.map(item => item.teamId))]
            console.log(teamId)
            commit('getTeamId', teamId)
            commit('lists', playList)
            commit('teamName', teamName)
            commit('teamLogo', teamLogo)
            commit('officialName', officialName)
        } catch (err) {
            console.log(err)
            commit('capture', false)
        }
    }  
}


export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})