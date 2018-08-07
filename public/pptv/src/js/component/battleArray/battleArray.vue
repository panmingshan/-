<template>
  <div id="app" class="battle-array">
    <div class="tip">
      <div class="left">
        <img :src="homeTeamIcon" alt=""><span class="tips">主裁判：
        <span v-if="officialName">{{officialName}}</span>
        <span v-else>暂无数据</span>
        </span>
      </div>
      <div class="right">
        <img :src="guestTeamIcon" alt=""><span class="tips">场地：
        <span>暂无数据</span></span>
      </div>
    </div>
    <div class="content" v-if="falseState">
      <div class="teams" :class="{teamsBottomLine: (teamLogo || teamName)}">
        <div class="tip">
          <img :src="homeTeam" alt="">
          <img :src="guestTeam" alt="">
        </div>
        <div class="logoVS" v-if="teamLogo || teamName">
          <div class="homeLogo">
            <img :src="teamLogo && teamLogo.teamA" alt="">
            <p v-html="teamName && teamName.teamA"></p>
          </div>
          <div class="vs">
            <img :src="vs" alt="">
          </div>
          <div class="guestLogo">
            <img :src="teamLogo && teamLogo.teamB" alt="">
            <p v-html="teamName && teamName.teamB"></p>
          </div>
        </div>
      </div>
      <m-title :title="title1"></m-title>
      <div class="play-lists" v-if="homeTeamList1.lenght != 0 && falseState">
        <play-list :realPlayList="{'home':homeTeamList1, 'guest': guestTeamList1}"></play-list>
        <m-title :title="title2"></m-title>
        <play-list :realPlayList="{'home':homeTeamList2, 'guest': guestTeamList2}"></play-list>
      </div>
    </div>
    <div class="default" v-else>
      <no-data></no-data>
    </div>
    <div class="baseline">终于让你发现了我的底线</div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import {H5CommonUtils} from "utils/H5CommonUtils"
import mTitle from 'component/battleArray/components/title'
import playList from 'component/battleArray/components/playList'
import noData from 'component/battleArray/components/noData'
export default {
  name: "battle-array",
  data() {
    return {
      homeTeam: require("@/assets/homeTeam.png"),
      homeTeamIcon: require("@/assets/homeTeamIcon.png"),
      guestTeam: require("@/assets/guestTeam.png"),
      guestTeamIcon: require("@/assets/guestTeamIcon.png"),
      vs: require("@/assets/VS.png"),
      title1: '首发阵容',
      title2: '替补阵容'
    }
  },
  components:{
    mTitle,
    noData,
    playList
  },
  computed: {
    ...mapState(["teamName", "teamLogo", "officialName", "teamId", "falseState"]),
    // 主队
    homeTeamList1() {
      return this.$store.getters.homeTeamList1;
    },
    homeTeamList2() {
      return this.$store.getters.homeTeamList2;
    },
    homeTeamList3() {
      return this.$store.getters.homeTeamList3;
    },
    guestTeamList1() {
      return this.$store.getters.guestTeamList1;
    },
    guestTeamList2() {
      return this.$store.getters.guestTeamList2;
    },
    guestTeamList3() {
      return this.$store.getters.guestTeamList3;
    }
  },
  mounted() {
    let matchId = H5CommonUtils.getQueryString('matchId')
    this.getBattleData(matchId)
    console.log(this.falseState)
  },
  methods: {
    ...mapActions(["getBattleData"]),
  }
};
</script>

<style lang='less' rel='stylesheet/less' scoped>
.battle-array {
  padding: 0 0.2rem;
  h3 {
    font-family: PingFangSC-Semibold;
    font-weight: 700;
    font-size: 0.34rem;
    color: #323232;
    letter-spacing: 0.04rem;
    margin: 0.32rem 0;
  }
  .tip {
    display: flex;
    justify-content: space-between;
    padding: 0.2rem 0;
    color: #999999;
    font-family: PingFangSC-Regular;
    border-bottom: 1px solid #E6E6E6;
    img {
      width: 0.3rem;
    }
    .tips {
      margin-left: 0.1rem;
    }
    .left {
      flex: 1;
    }
    .right {
      flex: 1;
      text-align: right;
    }
  }
  .teams {
    padding: 0 0 .2rem 0;
    .tip {
      border-bottom: none;
      img {
        width: 1.8rem;
        height: 0.6rem;
      }
    }
    .logoVS {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.1rem 0;
      text-align: center;
      img {
        width: 1rem;
      }
      .vs {
        margin: 0 0.7rem;
        img {
          width: 0.5rem;
        }
      }
    }
  }
  .play-lists{
    .playList{
      padding: 0 0 .1rem 0;
      border-bottom: 1px solid #E6E6E6;
    }
    .playList:last-child{
      border: none;
    }
  }
  .teamsBottomLine{
    border-bottom: 1px solid #E6E6E6;
  }
  .baseline{
    color: #999;
    text-align: center;
    padding: .3rem 0;
  }
}
</style>
