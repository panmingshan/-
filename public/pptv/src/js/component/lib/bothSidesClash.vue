<template>
    <div>
        <!--双方交锋数据-->
        <div class="bothSidesClash" v-if="resultData">
            <div class="bothSidesClash-title">
                双方交锋数据
            </div>
            <div class="match-bothSides flex flex-pack-center flex-align-center" v-if="matchTeamPkVo">
                <div class="match-bothSides-team match-bothSides-left flex-1">
                    <img class="teamIcon" v-if="matchTeamPkVo.teamAImg"  :src="matchTeamPkVo.teamAImg" alt="">
                    <span class="teamName" v-if="matchTeamPkVo.teamAName" v-text="matchTeamPkVo.teamAName"></span>
                </div>
                <div class="match-bothSides-center flex-1">
                    <span class="vs-name" v-if="matchTeamPkVo.title" v-text="matchTeamPkVo.title"></span>
                    <span class="vs-score">{{matchTeamPkVo.teamAScore}}胜{{matchTeamPkVo.peace}}平{{matchTeamPkVo.teamBScore}}负</span>
                </div>
                <div class="match-bothSides-team match-bothSides-right flex-1">
                    <img class="teamIcon" v-if="matchTeamPkVo.teamBImg"  :src="matchTeamPkVo.teamBImg" alt="">
                    <span class="teamName" v-if="matchTeamPkVo.teamBName" v-text="matchTeamPkVo.teamBName"></span>
                </div>
            </div>
            <div class="bothSidesClash-table" v-if="matchTeamDataVoList">
                <div class="bothSidesClash-table-thead">
                    <ul class="flex flex-align-center">
                        <li class="thead-item flex-2 thead-item-time">时间</li>
                        <li class="thead-item ac flex-1">赛事</li>
                        <li class="thead-item ac flex-2">主队</li>
                        <li class="thead-item ac flex-1">比分</li>
                        <li class="thead-item ar flex-2 thead-item-visitingTeam">客队</li>
                    </ul>
                </div>
                <div class="bothSidesClash-table-tbody" v-if="matchTeamDataVoList && matchTeamDataVoList.length != 0">
                    <div class="tbodyList" v-for="(item, index) in matchTeamDataVoList" :key="index">
                        <ul class="tbodyListUl flex">
                            <li class="tbodyListUl-item flex-2" v-if="item.startTime" v-text="item.startTime"></li>
                            <li class="tbodyListUl-item ac flex-1" v-if="item.competitionName" v-text="item.competitionName"></li>
                            <li class="tbodyListUl-item ac flex-2" v-if="item.masterTeam" v-text="item.masterTeam"></li>
                            <li class="tbodyListUl-item ac flex-1" v-if="item.score" v-text="item.score"></li>
                            <li class="tbodyListUl-item ar flex-2" v-if="item.visitingTeam" v-text="item.visitingTeam"></li>
                        </ul>
                    </div>
                </div>
                <div v-else class="noContent">
                      暂无数据
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { H5CommonUtils } from '@/js/utils/H5CommonUtils';

export default {
    name: 'bothSidesClash',
    data(){
        return {

        }
    },
    props:{
        data: {
           type: Object,
           default: () => {}
        }
    },
    computed: {
        resultData(){
            return this.data;
        },
        matchTeamPkVo(){
            if(this.resultData){
                return this.resultData.matchTeamPkVo;
            }
        },
        matchTeamDataVoList(){
            if(this.resultData){
                if(this.resultData.matchTeamDataVoList){
                    this.resultData.matchTeamDataVoList.forEach((item, index, array) => {
                         let startTime = H5CommonUtils.timestampToTime(item.pk_start_time);
                         startTime = startTime.split(' ')[0];
                         this.$set(item, 'startTime', startTime);
                    });
                }
                return this.resultData.matchTeamDataVoList;
            }
        }
    },
    mounted () {
        console.log(this.data);
    }
}
</script>

<style lang="less">
/*双方交锋数据*/
.bothSidesClash{
    .bothSidesClash-title{
        padding: 0.35rem 0.20rem;
        font-size: 0.34rem;
        color: #323232;
        font-weight: bold;
    }
    .match-bothSides{
        padding: 0.2rem 0.20rem 0.45rem;
        .match-bothSides-team{
            .teamIcon{
                width: 0.75rem;
                display: block;
                margin: 0 auto;
            }
            .teamName{
                font-size: 0.24rem;
                color: #333;
                text-align: center;
                display: block;
                line-height: 0.48rem;
                text-overflow:ellipsis;
                overflow:hidden; 
                white-space:nowrap;
            }
        }
        .match-bothSides-center{
            color: #999;
            text-align: center;
            .vs-name{
                font-size: 0.2rem;
                display: block;
            }
            .vs-score{
                font-size: 0.24rem;
                display: block;  
                font-weight: bold;     
                margin-top: 0.1rem;      
            }
        }
    }
    .bothSidesClash-table{
        .bothSidesClash-table-thead{
            background: #F0F8FF;
            -webkit-border-radius: 0.08rem; 
            -moz-border-radius: 0.08rem; 
            border-radius: 0.08rem;
            font-size: 0.24rem;
            color: #999;
            .thead-item{
                line-height: 0.52rem;
            }
            .thead-item-time{
                padding-left: 0.16rem;
            }
            .thead-item-visitingTeam{
                padding-right: 0.16rem;
            }
        }
        .bothSidesClash-table-tbody{
            padding: 0.2rem 0.16rem;
            .tbodyList{
                padding: 0.25rem 0;
                .tbodyListUl{
                    .tbodyListUl-item{
                        font-size: 0.28rem;
                        color: #2C2C2C;
                        /* text-overflow:ellipsis;
                        overflow:hidden; 
                        white-space:nowrap; */
                        line-height: 0.40rem;
                        vertical-align: top;
                    }
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


