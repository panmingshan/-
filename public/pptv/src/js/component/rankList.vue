<template>
    <div>
        <div class="rankListTitleWrap flex flex-align-center">
            <div class="rankListTitle flex-1">
                <ul class="flex flex-align-center flex-pack-around">
                    <li :class="{active:tab == 1}" @click="tabChange(1)">
                        积分榜
                    </li>
                    <li :class="{active:tab == 2}" @click="tabChange(2)">
                        球员榜
                    </li>
                    <li :class="{active:tab == 3}" @click="tabChange(3)">
                        球队榜
                    </li>
                </ul>
            </div>
        </div>
        <!--积分榜-->
        <div class="rankListContent integralList" v-show="tab == 1">
            <div class="rankListTitle flex flex-align-center" v-if="scoreList&&scoreList.length">
                <div class="num">
                    排名
                </div>

                <div class="team flex-1">
                    球队
                </div>
                <div class="roundNum">
                    轮次
                </div>
                <div class="winLose">
                    胜/平/负
                </div>
                <div class="goalFumble">
                    进/失
                </div>
                <div class="score">
                    积分
                </div>
            </div>
            <ul class="rankListItemWrap" v-if="scoreList&&scoreList.length">
                <li class="flex item flex-align-center" v-if="scoreList.length" v-for="(item,index) in scoreList" :key="index">
                    <div :class="{round : index<5 || index>=(scoreList.length-2),color_1 : index<3,color_2 : index<5&&index>=3,
                    color_3 : index>=(scoreList.length-2)}"
                         class="num flex flex-pack-center flex-align-center">
                        <div>
                            {{item.rank}}
                        </div>
                    </div>

                    <div class="team flex-1 flex-align-center flex">
                        <img :src="item.teamLogo">
                        <span>
                            {{item.teamName}}
                        </span>
                    </div>
                    <div class="roundNum">
                        {{item.matchNum}}
                    </div>
                    <div class="winLose">
                        {{item.winNum}}/{{item.drawNum}}/{{item.loseNum}}
                    </div>
                    <div class="goalFumble">
                        {{item.goalsNum}}/{{item.loseGoalsNum}}
                    </div>
                    <div class="score">
                        {{item.score}}
                    </div>
                </li>
            </ul>
            <data-empty v-if="!scoreList || !scoreList.length"></data-empty>
        </div>
        <!--球员榜-->
        <div class="rankListContent" v-show="tab == 2">
            <div class="rankListItem palyerRankItem" v-if="item.hasRequest" v-for="item in playerTypeList">
                <div class="rankListItemTitle flex flex-align-center">
                    <div class="flex-1">
                        {{item.info}}
                    </div>
                    <div class="icon" @click="morePlayerList(item.id)">

                    </div>
                </div>
                <dl>
                    <dt class="itemTitle flex flex-align-center">
                        <div class="num">
                            排名
                        </div>
                        <div class="player">
                            球员
                        </div>
                        <div class="team flex-1">
                            球队
                        </div>
                        <div class="total">
                            总计
                        </div>
                    </dt>
                    <dd class="flex item flex-align-center" v-if="index<3" v-for="(items,index) in item.list" :key="index">
                        <div class="num">
                            {{items.rank}}
                        </div>
                        <div class="player flex-align-center flex">
                            <img :src="items.playerLogo">
                            <span>
                                {{items.playerName}}
                            </span>
                        </div>
                        <div class="team flex-1">
                            {{items.teamName}}
                        </div>
                        <div class="total">
                            {{items.rankData}}
                        </div>
                    </dd>
                </dl>

                <div class="more flex flex-align-center flex-pack-center" @click="morePlayerList(item.id)">
                    <span>
                        查看全部
                    </span>
                    <div class="icon">

                    </div>
                </div>

            </div>
        </div>
        <!--球队榜-->
        <div class="rankListContent" v-show="tab == 3">
            <div class="rankListItem teamRankItem" v-for="item in teamFlagList" v-if="item.hasRequest">
                <div class="rankListItemTitle flex flex-align-center">
                    <div class="flex-1">
                        {{item.info}}
                    </div>
                    <div class="icon"  @click="moreTeamList(item.id)">

                    </div>
                </div>
                <dl>
                    <dt class="itemTitle flex flex-align-center">
                        <div class="num">
                            排名
                        </div>
                        <div class="team flex-1">
                            球队
                        </div>
                        <div class="total">
                            总计
                        </div>
                    </dt>
                    <dd class="flex item flex-align-center"  v-if="index<3"  v-for="(items,index) in item.list" :key="index">
                        <div class="num">
                            {{items.rank}}
                        </div>
                        <div class="team flex-align-center flex flex-1">
                            <img :src="items.teamLogo">
                            <span>
                                {{items.teamName}}
                            </span>
                        </div>
                        <div class="total">
                            {{items.statistic}}
                        </div>
                    </dd>
                </dl>

                <div class="more flex flex-align-center flex-pack-center" @click="moreTeamList(item.id)">
                    <span>
                        查看全部
                    </span>
                    <div class="icon">

                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import Swiper from "swiper";
    import "@/css/reset";
    import "swiper/dist/css/swiper.min.css"
    import {mapState,mapActions,mapMutations} from "vuex"
    import $ from "zepto"
    import dataEmpty from "component/lib/dataEmpty";
    export default {
        name : "rankList",
        data (){
            return {
                tab : 1
            }
        },
        created (){
            this.syncInit();
            this.bodyColorInit();
        },
        components : {
            dataEmpty
        },
        methods : {
            ...mapActions(["getScoreList", "getPlayerList", "getTeamList"]),
            ...mapMutations(["syncInit"]),
            morePlayerList(id){
                this.$store.commit("morePlayerList",id);
            },
            moreTeamList(id){
                this.$store.commit("moreTeamList",id);
            },
            tabChange (tab){
                $(window).scrollTop(0)
                this.tab = tab;
                this.bodyColorInit();
            },
            bodyColorInit (){
                if(this.tab == 1){
                    $("body").css({
                        backgroundColor : "white!important"
                    });
                }
                else{
                    $("body").css({
                        backgroundColor : "#F8F8F8!important"
                    });
                }
            },
//            滚动事件
            initScroll (){
                var _this = this;
                $(window).on("scroll resize", ()=> {
                    if ($(document).height() - $(window).scrollTop() - $(window).height() <= 60 ) {
                        if(this.tab == 2){
                            this.getPlayerList();
                        }
                        else if(this.tab == 3){
                            this.getTeamList();
                        }
                    }
                })
            }
        },
        computed : {
            ...mapState(["scoreList", "playerTypeList", "teamFlagList"])
        },
        mounted(){
            var mySwiper = new Swiper('.swiper-container',{
                slidesPerView : "auto",
                spaceBetween : 20,
            })

            this.getScoreList();
            this.getPlayerList();
            this.getTeamList();
            this.initScroll()
        }
    }
</script>
<style lang="less">
    @import "../../css/flex";
    @import (reference) "../../css/icon";
    body{
        background: #F8F8F8!important;
    }

    .rankListTitleWrap{
        position: fixed;
        background: #fff;
        width: 100%;
        z-index: 333;
        height: 1rem;
        border-bottom: 1px  solid #e9e9e9;
        &:after,&:before{
            right: 0;
            top : 0;
            display: block;
            position: absolute;
            height:100%;
            width: 0.3rem;
            content: '';
            z-index: 33;
            background: -webkit-linear-gradient(right,rgba(255,255,255,1),rgba(255,255,255,0)); /* Opera 11.1-12.0 */
            background: -o-linear-gradient(to left,rgba(255,255,255,1),rgba(255,255,255,0)); /* Opera 11.1-12.0 */
            background: -moz-linear-gradient(to left,rgba(255,255,255,1),rgba(255,255,255,0)); /* Firefox 3.6-15 */
            background: linear-gradient(to left,rgba(255,255,255,1),rgba(255,255,255,0)); /* 标准语法 */
        }
        &:before
        {
            left: 0;
            background: -webkit-linear-gradient(left,rgba(255,255,255,1),rgba(255,255,255,0)); /* Opera 11.1-12.0 */
            background: -o-linear-gradient(to right,rgba(255,255,255,1),rgba(255,255,255,0)); /* Opera 11.1-12.0 */
            background: -moz-linear-gradient(to right,rgba(255,255,255,1),rgba(255,255,255,0)); /* Firefox 3.6-15 */
            background: linear-gradient(to right,rgba(255,255,255,1),rgba(255,255,255,0)); /* 标准语法 */
        }
        .rankListTitle{
            box-sizing: border-box;
            padding: 0 0.6rem;
            >ul{
                font-size: .3rem;
                color: #323232 ;
                >li{
                    width: auto;
                    &.active{
                        color: #D60419;
                        font-weight:bold;
                        transform:scale(1.2);
                        -ms-transform:scale(1.2); 	/* IE 9 */
                        -moz-transform:scale(1.2); 	/* Firefox */
                        -webkit-transform:scale(1.2); /* Safari 和 Chrome */
                        -o-transform:scale(1.2); 	/* Opera */
                    }
                }
            }
        }
    }
    .rankListContent{
        /*积分榜*/
        &.integralList{
            background: white;
        }
        padding: 1.2rem 0.15rem 0;
        .rankListItem{
            background: white;

            &:not(:first-child){
                margin-top: 0.2rem;
            }
            /*球员榜*/
            &.palyerRankItem{
                .player{
                    text-align: left!important;
                    width: 2.2rem!important;
                }
                .item{
                    .team{
                        color: #606060;
                    }
                }
            }
            /*球队榜*/
            &.teamRankItem{
                .team{
                    text-align: left!important;
                    width: 2.2rem!important;
                }
            }

            .itemTitle{
                height: 0.6rem;
                color: #606060;
                font-size: 0.2rem;
                text-align: center;
                >div:not(:first-child){
                    margin-left: 0.1rem;
                }
                .num{
                    width: 1rem;
                }

                .total{
                    width: 1.2rem;
                }
            }
            .rankListItemTitle{
                padding: 0.3rem;
                >:first-child{
                    font-size: 0.34rem;
                    color: #323232;
                    font-weight: bold;
                }
                .icon{
                    .arrow_right;
                    height : 0.32rem;
                    width : 0.32rem;
                }
            }
            .item{
                color: #202020;
                font-size: 0.24rem;
                text-align: center;
                padding: 0.2rem 0;
                &:last-child{
                    border-bottom: 1px solid #e8e8e8;
                }
                >div:not(:first-child){
                    margin-left: 0.1rem;
                }
                .num{
                    width: 1rem;
                }
                .team,.player{
                    img{
                        width: 0.44rem;
                        margin-right: 0.1rem;
                    }
                }
                .total{
                    width: 1.2rem;
                }
            }

            .more{
                padding: 0.3rem 0;
                text-align: center;
                color: #199CDF;
                font-size: 0.26rem;
                .icon{
                    .arrow_right();
                    width: 0.30rem;
                    height: 0.30rem;
                }
            }
        }
    }
    /*积分榜*/
    .rankListContent{
        .rankListTitle{
            -webkit-border-radius: 0.3rem;
            -moz-border-radius: 0.3rem;
            border-radius: 0.3rem;
            background: #f0f8ff;
            height: 0.6rem;
            color: #606060;
            font-size: 0.2rem;
            text-align: center;
            >div:not(:first-child){
                margin-left: 0.1rem;
            }
        }

        &.integralList .rankListItemWrap{
            .num.round{
                >div{
                    width: 0.4rem;
                    height: 0.4rem;
                    -webkit-border-radius: 50%;
                    -moz-border-radius: 50%;
                    border-radius: 50%;
                    color: white;
                    line-height: 0.4rem;
                }
                &.color_1{
                    >div{
                        background: #fdb12a;
                    }
                }
                &.color_2{
                    >div{
                        background: #199cdf;
                    }
                }
                &.color_3{
                    >div{
                        background: #909090;
                    }
                }
            }
        }
        .num{
            width: 1rem;
        }
        .team{
            text-align: left;
            img{
                width: 0.44rem;
                margin-right: 0.1rem;
            }
        }

        .roundNum,.winLose,.goalFumble{
            color: #606060;
        }
        .roundNum{
            width: 1rem;
        }
        .winLose{
            width: 1.2rem;
        }
        .goalFumble{
            width: 0.8rem;
        }

        .score{
            width: 1.2rem;
        }

        .rankListItemWrap{
            margin-top: 0.1rem;
            .item{
                color: #202020;
                font-size: 0.24rem;
                text-align: center;
                padding: 0.2rem 0;
                &:not(:first-child){
                    border-top: 1px solid #e8e8e8;
                }
                >div:not(:first-child){
                    margin-left: 0.1rem;
                }

                .team{
                    color: #606060;
                }
            }
        }
    }

</style>