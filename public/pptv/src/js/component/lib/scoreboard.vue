<template>
    <div class="scoreboard">
        <!--积分榜-->
        <div class="integral" v-if="resultData">
            <div class="integral-title flex flex-align-center">
                <div class="integral-title-left">积分榜</div>
                <div class="integral-title-right flex-1">
                    <!-- <button class="btn btnActive">全部</button> -->
                    <!-- <button class="btn">主场</button>
                    <button class="btn">客场</button> -->
                </div>
            </div>
            <div class="integral-table">
                <div class="integral-table-thead">
                    <ul class="flex flex-align-center">
                        <li class="thead-item flex-1 ranking">排名</li>
                        <li class="thead-item flex-2">球队</li>
                        <li class="thead-item ac flex-1">胜</li>
                        <li class="thead-item ac flex-1">平</li>
                        <li class="thead-item ac flex-1">负</li>
                        <li class="thead-item ac flex-1">积分</li>
                    </ul>
                </div>
                <div class="integral-table-tbody" v-if="resultData.length != 0">
                    <div class="tbodyList" v-for="(item, index) in resultData" :key="index">
                        <ul class="tbodyListUl flex flex-align-center">
                            <li class="tbodyListUl-item flex-1 ranking" v-if="item.rank" v-text="item.rank"></li>
                            <li class="tbodyListUl-item flex-2" v-if="item.teamName" v-text="item.teamName"></li>
                            <li class="tbodyListUl-item ac flex-1 font-red" v-if="item.winNum" v-text="item.winNum"></li>
                            <li class="tbodyListUl-item ac flex-1" v-if="item.drawNum" v-text="item.drawNum"></li>
                            <li class="tbodyListUl-item ac flex-1 font-blue" v-if="item.loseNum" v-text="item.loseNum"></li>
                            <li class="tbodyListUl-item ac flex-1" v-if="item.score" v-text="item.score"></li>
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
export default {
    name: 'scoreboard',
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
            return this.data.ranks;
        }
    },
    mounted(){
        console.log(this.data);
    }
}
</script>

<style lang="less">
/*积分榜*/
.font-red{
    color: #E33F34!important;
}
.font-blue{
    color: #0AACFF!important;
}
.integral{
    .integral-title{
        padding: 0.35rem 0.20rem;
        .integral-title-left{
            font-size: 0.34rem;
            color: #323232;
            font-weight: bold;
        }
        .integral-title-right{
            text-align: right;
            .btn{
                border: none;
                background: #fff;
                font-size: 0.24rem;
                color: #666;
                width: 1rem;
                height: 0.5rem;
                border: 1px solid #EBEBEB;
                -webkit-border-radius: 0.05rem; 
                -moz-border-radius: 0.05rem; 
                border-radius: 0.05rem;
                margin-left: 0.15rem;
            }
            .btnActive{
                border: 1px solid #0AACFF;
                color: #0AACFF;
            }
        }
    }
    .integral-table{
        .integral-table-thead{
            background: #F0F8FF;
            -webkit-border-radius: 0.08rem; 
            -moz-border-radius: 0.08rem; 
            border-radius: 0.08rem;
            font-size: 0.24rem;
            color: #999;
            .thead-item{
                line-height: 0.52rem;
            }
            .ranking{
                padding-left: 0.16rem;
            }
        }
        .integral-table-tbody{
            padding: 0.2rem 0 0;
            //border-bottom: 1px solid #E6E6E6;
            .tbodyList{
                .tbodyListUl{
                    .tbodyListUl-item{
                        line-height: 0.80rem;
                        font-size: 0.28rem;
                        color: #2C2C2C;
                        text-overflow:ellipsis;
                        overflow:hidden; 
                        white-space:nowrap;
                    }
                }
                .ranking{
                    padding-left: 0.16rem;
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
