var proxyPrefix = "/api"

export default {
    //获取球队积分榜  参数为 赛事id（competitionId）1为中超/ 赛季id（seasonId）
    // http://183.192.162.101:8084
    GET_TEAM_SCORE_RANK_LIST : proxyPrefix + "/vms-worldcup/competition-rank/team-scoreboard/",
    //获取球队积分榜 {rankingType}/{seasonId}/{competitionId}、
    // 参数为 赛事id（competitionId）1为中超/赛季id（seasonId）
    GET_PLAYER_RANK_LIST : proxyPrefix +  "/vms-worldcup/competition-rank/player-season-rank/",

    //获取球队榜单  {flag}/{seasonId}/{competitionId}
    //flag
    //	（flag：1、控球率 2、进球次数 3、助攻次数 4、封堵次数 5、黄牌次数 6、红牌次数 、射门次数 8、射正次数 9、传球次数
    // 10、关键传球次数 11、传球成功数 12、越位次数 13、拦截次数 14、抢断次数 15、解围次数 16、犯规次数
    // 17、被犯规次数 18、扑救次数 19、获得点球数 20、获得任意球数 21、角球数 22、被判点球数
    // 23、被判任意球数 24、传中成功率（25/24计算） 25、击中门框次数 26、传球成功率榜（11/9计算）
    // 赛季id赛事id（competitionId）1为中超/（seasonId））
    //{flag}/{seasonId}/{competitionId}
    GET_TEAM_RANK_LIST : proxyPrefix + "/vms-worldcup/competition-rank/team-season-rank/"
}