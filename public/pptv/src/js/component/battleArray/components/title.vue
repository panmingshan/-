<template>
  <div class="title">
    <h3>{{title}}</h3>
  </div>
</template>

<script>
export default {
  name: "",

  data() {
    return {};
  },
  props: ['title'],
  methods: {}
};
</script>

<style lang='less' rel='stylesheet/less' scoped>
.title{
    h3 {
        font-family: PingFangSC-Semibold;
        font-weight: 700;
        font-size: 0.34rem;
        color: #323232;
        letter-spacing: 0.04rem;
        margin: 0.32rem 0;
    }
}
</style>
