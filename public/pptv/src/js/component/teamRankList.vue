<template>
    <div>
        <div class="rankListTitleWrap flex flex-align-center">
            <div class="rankListTitle swiper-container">
                <ul class="swiper-wrapper">
                    <li class="swiper-slide"
                        :class="{active : tab == item.id}"
                        v-for="(item,index) in TabList"
                        :key="index"
                        @click="tabChange(item.id)"
                    >
                        {{item.info}}
                    </li>
                </ul>
            </div>
        </div>

        <div class="rankListContent"  v-if="isRequest||(chooseList&&chooseList.length)">
            <div class="rankListTitle flex flex-align-center">
                <div class="num">
                    排名
                </div>
                <div class="team flex-1 player">
                    球队
                </div>
                <div class="total">
                    总计
                </div>
            </div>
            <ul class="rankListItemWrap">
                <li class="flex item flex-align-center"  v-for="(item, index) in chooseList" :key="index">
                    <div class="num">
                        {{item.rank}}
                    </div>
                    <div class="team flex-align-center flex-1 flex">
                        <img :src="item.teamLogo">
                        <span>
                            {{item.teamName}}
                        </span>
                    </div>
                    <div class="total">
                        {{item.statistic}}
                    </div>
                </li>
            </ul>
        </div>

        <data-empty v-else="">

        </data-empty>
    </div>
</template>

<script>
    import Swiper from "swiper";
    import "@/css/reset";
    import "swiper/dist/css/swiper.min.css"
    import {mapState,mapMutations,mapActions} from "vuex"
    import dataEmpty from "component/lib/dataEmpty";
    import $ from "zepto"
    export default {
        name: "a",
        data() {
            return {}
        },
        created() {
            this.syncInit()
            this.asyncInit();
            this.getTeamList();
        },
        components : {
            dataEmpty
        },
        methods: {
            ...mapMutations([
                "syncInit",
                "pushList",
            ]),
            ...mapActions([
                "asyncInit",
                "getTeamList"
            ]),
            tabChange(id) {
                $(window).scrollTop(0);
                this.$store.commit("setTab", id);
                this.$store.dispatch("getTeamList");
            },
            //            滚动事件
            initScroll() {
                var _this = this;
                $(window).on("scroll resize", () => {
                    if ($(document).height() - $(window).scrollTop() - $(window).height() <= 60) {
                        this.pushList();
                    }
                })
            }
        },
        computed: {
            ...mapState([
                "initialSlide",
                "chooseList",
                "tab",
                "TabList",
                "isRequest"
            ])
        },
        mounted() {
            this.tabSwiper = new Swiper('.swiper-container', {
                slidesPerView: "auto",
                spaceBetween: 20,
                initialSlide: this.initialSlide
            })

            this.initScroll();
        }
    }
</script>
<style scoped lang="less">
    @import "../../css/flex";
    body{
        color: #fff;
    }

    .rankListTitleWrap{
        position: fixed;
        width: 100%;
        background: #fff;
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
            padding: 0 .3rem;
            >ul{
                font-size: .3rem;
                color: #323232 ;
                >li{
                    width: auto;
                    &.active{
                        color: #D60419;
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
        padding: 1.2rem 0.15rem 0;
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
            .num{
                width: 1rem;
            }
            .team{
                text-align: left;
            }
            .total{
                width: 1.2rem;
            }
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
                .total{
                    width: 1.2rem;
                }
            }
        }
    }

</style>