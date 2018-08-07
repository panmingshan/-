<template>
  <div class="playList">
    <div class="homeList">
        <ul>
          <li v-for="(item,index) in realPlayList.home" :key="index">
            <span class="index" v-html="item.playerNum">12</span>
            <span v-html="item.playerName"></span>
          </li>
        </ul>
      </div>
      <div class="guestList">
        <ul>
          <li v-for="(item,index) in realPlayList.guest" :key="index">
            <span v-html="item.playerName"></span>
            <span class="index" v-html="item.playerNum">12</span>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  props: {
    realPlayList() {
      type: Object;
    }
  },
  methods: {}
};
</script>

<style lang='less' rel='stylesheet/less' scoped>
.playList {
  display: flex;
  justify-content: space-between;
  color: #333333;
  .index {
    background: #ff857d;
    width: 0.5rem;
    display: inline-block;
    height: 0.5rem;
    line-height: 0.5rem;
    text-align: center;
    border-radius: 50%;
    color: #fff;
    margin: 0 auto;
  }
  li {
    line-height: 0.8rem;
  }
  .guestList {
    text-align: right;
    .index{
        background-color: #7DC2FF ;
    }
  }
}
</style>
