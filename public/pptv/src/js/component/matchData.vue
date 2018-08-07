<template>
    <div>
        <div v-if="scoreboard" class="group">
            <ScoreBoard :data='scoreboard'></ScoreBoard>
        </div>
        <div class="group">
            <Season :data='marksman'></Season>
        </div>
        <div class="group" style="padding-bottom: 0;">
            <BothSidesClash :data='matchdatas'></BothSidesClash>
        </div>
        <div class="group" style="padding-bottom: 0;">
            <SelfSidesClash :data='matchlatelydatas'></SelfSidesClash>
        </div>
        <div class="group">
            <div class="footer">终于让你发现了我的底线</div>
        </div>    
    </div>
</template>

<script>
//引入接口文件
import { API } from '@/js/api/api.js';
//引用工具函数
import { H5CommonUtils } from '@/js/utils/H5CommonUtils.js';
//引入积分榜组件
import ScoreBoard from 'component/lib/scoreboard.vue';
//引入赛季数据组件
import Season from 'component/lib/season.vue';
//引入双方交锋数据组件
import BothSidesClash from 'component/lib/bothSidesClash.vue';
//引入各自战绩组件
import SelfSidesClash from 'component/lib/selfSidesClash.vue';

export default {
    data(){
        return {
            //比赛Id
            mgdbId: '',
            //存积分榜数据
            scoreboard: {}, 
            //存双方交锋数据
            matchdatas: {},
            //存双方近五场战绩
            matchlatelydatas: [],
            //存神射手数据
            marksman: {}
        }
    },
    components: {
        ScoreBoard,
        Season,
        BothSidesClash,
        SelfSidesClash
    },
    mounted(){
        //130000062411  130000062238
        this.mgdbId = H5CommonUtils.getQueryString('mgdbId') || '';
        //交锋数据积分榜
        this.getScoreboardData();
        //获取双方交锋数据
        this.getMatchdatas();
        //双方近五场战绩
        this.getMatchlatelydatas();
        //神射手
        this.getMarksman();
    },
    methods: {
        //交锋数据积分榜
        getScoreboardData(){
            var _this = this;
            var url = API.scoreboard + this.mgdbId;
            
            this.$fetch(url).then(data => {
                console.log(data);
                if(data.code == 200){
                    if(data.body && data.body.stages && data.body.stages.length != 0 && data.body.stages[0].data){
                        _this.scoreboard = data.body.stages[0].data;
                    }
                }else{
                    console.log("code:"+data.code+";message:"+data.message);
                }
            })
        },
        //获取双方交锋数据
        getMatchdatas(){
            var _this = this;
            var url = API.matchdatas + this.mgdbId;

            this.$fetch(url).then(data => {
                console.log(data);
                if(data.code == 200){
                    if(data.body){
                        _this.matchdatas = data.body; 
                    }
                }else{
                    console.log("code:"+data.code+";message:"+data.message);
                }
            })
        },
        //双方近五场战绩
        getMatchlatelydatas(){
            var _this = this;
            var url = API.matchlatelydatas + this.mgdbId;

            this.$fetch(url).then(data => {
                console.log(data);
                if(data.code == 200){
                    if(data.body){
                       _this.matchlatelydatas = data.body; 
                    }
                }else{
                    console.log("code:"+data.code+";message:"+data.message);
                }
            })
        },
        //神射手
        getMarksman(){
            var _this = this;
            var url = API.marksman + this.mgdbId;

            this.$fetch(url).then(data => {
                 console.log(data);
                 if(data.code == 200){
                     if(data.body){
                        _this.marksman = data.body;
                     }
                 }else{
                     console.log("code:"+data.code+";message:"+data.message);
                 }
             })
        }
    }
}
</script>

<style lang="less">
@import '../../css/index.less';
.group{
    padding-bottom: 0.25rem;
    margin: 0 0.12rem;
    border-bottom: 0.01rem solid #E6E6E6;
}
.footer{
    color: #999;
    font-size: 0.28rem;
    text-align: center;
    line-height: 0.80rem;
    margin-top: 0.3rem;
}
</style>

