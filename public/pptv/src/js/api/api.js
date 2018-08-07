const prefix = "/api";

const API = {
    //交锋数据积分榜
    scoreboard: prefix + '/vms-worldcup/competition-detail/scoreboard/',
    //获取双方交锋数据
    matchdatas: prefix + '/vms-worldcup/competition-detail/match-datas/',
    //双方近五场战绩
    matchlatelydatas: prefix + '/vms-worldcup/competition-detail/match-lately-datas/',
    //神射手
    marksman: prefix + '/vms-worldcup/competition-detail/marksman/'
}

export {
    API,
    API as
    default
}