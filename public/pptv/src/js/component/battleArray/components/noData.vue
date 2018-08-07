<template>
  <div class="noData">
    <img :src="defaultPic" alt="">
    <p>本场比赛暂无阵容信息</p>
  </div>
</template>

<script>
export default {
  name: "",

  data() {
    return {
        defaultPic: require("@/assets/defaultPic.png")
    };
  },

  methods: {}
};
</script>

<style lang='less' rel='stylesheet/less' scoped>
.noData{
    text-align: center;
    margin: 1.2rem 0;
    font-family: PingFangSC-Regular;
    font-size: 0.3rem;
    color: #999999;
    img {
      width: 4rem;
      margin-bottom: 0.4rem;
    }
}
</style>
