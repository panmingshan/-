<template>
    <div>
        <!--各自战绩-->
        <div class="selfSidesClash" v-if="resultData">
            <div class="selfSidesClash-title">各自战绩</div>
            <div class="selfSidesClash-content"  v-for="(item, index) in resultData" :key="index">
                <div class="selfSidesClash-totalResult flex flex-align-center">
                <img class="totalResult-icon" v-if="item.matchTeamVo && item.matchTeamVo.img" :src="item.matchTeamVo.img" alt="">
                <span class="totalResult-teamName" v-if="item.matchTeamVo && item.matchTeamVo.name" v-text="item.matchTeamVo.name"></span>
                <span class="totalResult-score">{{item.bigScore}}胜{{item.peace}}平{{item.failure}}负</span>
            </div>
            <div class="selfSidesClash-table">
                <div class="selfSidesClash-table-thead">
                    <ul class="flex flex-align-center">
                        <li class="thead-item flex-2 thead-item-time">时间</li>
                        <li class="thead-item ac flex-1">赛事</li>
                        <li class="thead-item ac flex-2">主队</li>
                        <li class="thead-item ac flex-1">比分</li>
                        <li class="thead-item ar flex-2 thead-item-visitingTeam">客队</li>
                    </ul>
                </div>
                <div class="selfSidesClash-table-tbody">
                    <div class="tbodyList" v-if="item.matchTeamDataList && item.matchTeamDataList.length != 0" v-for="(itemChild, indexChild) in item.matchTeamDataList" :key="indexChild">
                        <ul class="tbodyListUl flex">
                            <li class="tbodyListUl-item flex-2" v-if="itemChild.startTime" v-text="itemChild.startTime"></li>
                            <li class="tbodyListUl-item ac flex-1" v-if="itemChild.competitionName" v-text="itemChild.competitionName"></li>
                            <li class="tbodyListUl-item ac flex-2" v-if="itemChild.masterTeam" v-text="itemChild.masterTeam"></li>
                            <li class="tbodyListUl-item ac flex-1" v-if="itemChild.score" v-text="itemChild.score"></li>
                            <li class="tbodyListUl-item ar flex-2" v-if="itemChild.visitingTeam" v-text="itemChild.visitingTeam"></li>
                        </ul>
                    </div>
                    <div v-else class="noContent">
                      暂无数据
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import { H5CommonUtils } from '@/js/utils/H5CommonUtils';

export default {
    name: 'selfSidesClash',
    data(){
        return {

        }
    },
    props: {
        data: {
            type: Array,
            default: () => []
        }
    },
    mounted() {
        console.log(this.data);
    },
    computed: {
        originData(){
            return this.data;
        },
        resultData(){
            if(this.originData){
                if(this.originData && this.originData.length != 0){
                        this.data.forEach((item, index, array) => {
                            if(item.matchTeamDataList && item.matchTeamDataList.length != 0){
                                item.matchTeamDataList.forEach((itemChild, indexChild, arrayChild) => {
                                    if(itemChild.pk_start_time){
                                            let startTime = H5CommonUtils.timestampToTime(itemChild.pk_start_time);
                                            startTime = startTime.split(' ')[0];
                                            this.$set(itemChild, 'startTime', startTime);
                                    }
                                })
                            }
                        });
                }
            }
            return this.originData;
        }
    }
}
</script>

<style lang="less">
/*各自战绩*/
.selfSidesClash{
    .selfSidesClash-title{
        padding: 0.35rem 0.20rem;
        font-size: 0.34rem;
        color: #323232;
        font-weight: bold;
    }
    .selfSidesClash-content{
        margin-bottom: 0.25rem;
        border-bottom: 0.01rem solid #E6E6E6;
    }
    .selfSidesClash-content:last-child{
        margin-bottom: 0;
        border-bottom: none;
    }
    .selfSidesClash-totalResult{
        font-size: 0.28rem;
        line-height: 0.28rem;
        padding: 0.10rem 0.24rem 0.35rem;
        font-weight: bold;
        .totalResult-icon{
            width: 0.6rem;
            display: inline-block;
        }
        .totalResult-teamName{
            color: #333;
            margin-left: 0.24rem;
        }
        .totalResult-score{
            color: #999;
            margin-left: 0.15rem;
        }
    }
    .selfSidesClash-table{
        .selfSidesClash-table-thead{
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
        .selfSidesClash-table-tbody{
            padding: 0.2rem 0.16rem;
            .tbodyList{
                padding: 0.25rem 0;
                .tbodyListUl{
                    .tbodyListUl-item{
                        line-height: 0.40rem;
                        font-size: 0.28rem;
                        color: #2C2C2C;
                        /* text-overflow:ellipsis;
                        overflow:hidden; 
                        white-space:nowrap; */
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


