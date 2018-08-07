<template>
    <div>
        <!--赛季数据-->
        <div class="season" v-if="resultData">
            <div class="season-title">
                赛季数据
            </div>
            <div class="vsTeam flex flex-pack-center">
                <div class="vsTeamOne flex-1 ac">
                    <img class="teamIcon" v-if="resultData.teamAMarksman && resultData.teamAMarksman.teamLogo" :src="resultData.teamAMarksman.teamLogo" alt="">
                    <span class="teamName" v-if="resultData.teamAMarksman && resultData.teamAMarksman.teamName" v-text="resultData.teamAMarksman.teamName"></span>
                </div>
                <div class="vsTeamTwo flex-1 ac">
                    <img class="teamIcon" v-if="resultData.teamBMarksman && resultData.teamBMarksman.teamLogo" :src="resultData.teamBMarksman.teamLogo" alt="">
                    <span class="teamName" v-if="resultData.teamAMarksman && resultData.teamBMarksman.teamName" v-text="resultData.teamBMarksman.teamName"></span>
                </div>
            </div>
            <div class="seasonRankList">
                <div class="seasonRankList-head">
                    神射手
                </div>
                <div class="vsPlayer flex flex-align-center">
                    <div class="vsPlayerEach vsPlayerOne flex-2">
                        <img class="vsPlayer-photo" v-if="resultData.teamAMarksman && resultData.teamAMarksman.playerLogo" :src="resultData.teamAMarksman.playerLogo" alt="">
                        <span class="vsPlayer-name" v-if="resultData.teamAMarksman && resultData.teamAMarksman.playerName" v-text="resultData.teamAMarksman.playerName"></span>
                    </div>
                    <div class="vsPlayervs flex-1 ac">vs</div>
                    <div class="vsPlayerEach vsPlayerTwo flex-2 ar">
                        <span class="vsPlayer-name" v-if="resultData.teamAMarksman && resultData.teamBMarksman.playerName" v-text="resultData.teamBMarksman.playerName"></span>
                        <img class="vsPlayer-photo" v-if="resultData.teamBMarksman && resultData.teamBMarksman.playerLogo" :src="resultData.teamBMarksman.playerLogo" alt="">
                    </div>
                </div>
                <div class="seasonData" v-if="resultData.data && resultData.data.length != 0">
                    <ul>
                        <li class="seasonDataList flex flex-align-center" v-for="(item, index) in resultData.data" :key="index">
                            <div class="seasonDataListEach seasonDataListOne flex-2">
                                <div class="num" v-if="item.teamA" v-text="item.teamA"></div>
                                <div class="progress">
                                    <div class="totalProgress"></div>
                                    <div v-if="item.isActiveA == 1" class="homeProgress homeActiveProgress" :style="{width: item.teamAPercent}"></div>
                                    <div v-else class="homeProgress" :style="{width: item.teamAPercent}"></div>
                                </div>
                            </div>
                            <div class="seasonDataListitem flex-1 ac" v-if="item.name" v-text="item.name"></div>
                            <div class="seasonDataListEach seasonDataListTwo flex-2 ar">
                                <div class="progress">
                                    <div class="totalProgress"></div>
                                    <div v-if="item.isActiveB == 1" class="visitProgress visitActiveProgress" :style="{width: item.teamBPercent}"></div>
                                    <div v-else class="visitProgress" :style="{width: item.teamBPercent}"></div>
                                </div>
                                <div class="num al" v-if="item.teamB" v-text="item.teamB"></div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div v-else class="noContent">
                      暂无数据
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'season',
    data(){
        return {
            
        }
    },
    props: {
        data: {
           type: Object,
           default: () => {}
        }
    },
    computed: {
        resultData(){
            if(this.data){
                console.log(this.data);
                this.data.data && this.data.data.forEach((item, index, array) => {
                    this.calculatPercent(item);
                });
            }
            return this.data; 
        }
    },
    mounted() {
        console.log(this.data);
    },
    methods: {
        calculatPercent(obj){
            if(obj.teamA && obj.teamB){
                //计算百分比
                var teamAPercent = this.toPercent(parseFloat(obj.teamA)/(parseFloat(obj.teamA) + parseFloat(obj.teamB)));
                var teamBPercent = this.toPercent(parseFloat(obj.teamB)/(parseFloat(obj.teamA) + parseFloat(obj.teamB)));
                this.$set(obj, 'teamAPercent', teamAPercent);
                this.$set(obj, 'teamBPercent', teamBPercent);

                //判断进度条是否应高亮
                if(parseFloat(obj.teamA) >= parseFloat(obj.teamB)){
                    this.$set(obj, 'isActiveA', 1);
                    this.$set(obj, 'isActiveB', 0);
                }else{
                    this.$set(obj, 'isActiveA', 0);
                    this.$set(obj, 'isActiveB', 1);
                }
            }
            return obj;
        },
        // 转换百分数保留两位小数
        toPercent(point){
            var str=Number(point*100).toFixed(2);
            str+="%";
            return str;
        }
    }
}
</script>

<style lang="less">
/*赛季数据*/
.season{
    .season-title{
        padding: 0.35rem 0.20rem;
        font-size: 0.34rem;
        color: #323232;
        font-weight: bold;
    }
    .vsTeam{
        .vsTeamOne{
            background: rgba(255, 133, 125, .1);
            padding: 0.1rem 0;
        }
        .vsTeamTwo{
            background: rgba(125, 194, 255, .1);
            padding: 0.1rem 0;
        }
        .teamIcon{
            width: 0.75rem;
            display: block;
            margin: 0 auto;
        }
        .teamName{
            font-size: 0.24rem;
            color: #333333;
            line-height: 0.48rem;
        }
    }
    .seasonRankList{
        .seasonRankList-head{
            font-size: 0.28rem;
            color: #333;
            padding: 0.35rem 0.2rem;
        }
        .vsPlayer{
            padding: 0 0.2rem 0.25rem;
            .vsPlayerEach{
                .vsPlayer-photo{
                    width: 0.4rem;
                    margin: -0.07rem 0.2rem 0;
                }
                .vsPlayer-name{
                    font-size: 0.24rem;
                    color: #333;
                }
            }
            .vsPlayervs{
                font-size: 0.24rem;
                color: #999;
            }
        }
        .seasonData{
            padding: 0 0.2rem;
            .seasonDataList{
                line-height: 0.80rem;
                .seasonDataListEach{
                    .num{
                        width: 25%;
                        display: inline-block;
                        margin-right: 1%;
                        text-align: right;
                    }
                    .progress{
                        width: 70%;
                        display: inline-block;
                        position: relative;
                        .totalProgress{
                            width: 100%;
                            height: 0.14rem;
                            -webkit-border-radius: 0.86rem; 
                            -moz-border-radius: 0.86rem; 
                            border-radius: 0.86rem;
                            background: #EBEEF3;
                            //background: #ccc;
                        }
                        .homeProgress{
                            width: 50%;
                            height: 0.14rem;
                            -webkit-border-radius: 0.86rem; 
                            -moz-border-radius: 0.86rem; 
                            border-radius: 0.86rem;
                            position: absolute;
                            right: 0;
                            top: 50%;
                            margin-top: -0.07rem;
                            background: #CACACA;
                        }
                        .homeActiveProgress{
                            background: #FF857D;
                        }
                        .visitProgress{
                            width: 50%;
                            height: 0.14rem;
                            -webkit-border-radius: 0.86rem; 
                            -moz-border-radius: 0.86rem; 
                            border-radius: 0.86rem;
                            position: absolute;
                            left: 0;
                            top: 50%;
                            margin-top: -0.07rem;
                            background: #CACACA;
                        }
                        .visitActiveProgress{   
                            background: #7DC2FF;
                        }
                    }
                }
                .seasonDataListitem{
                    font-size: 0.24rem;
                    color: #333;
                    line-height: 0.4rem;
                }
            }
        }
    }
}
.noContent{
    font-size: 0.24rem;
    text-align: center;
    padding-top: 0.35rem;
}
</style>


