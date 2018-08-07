<template>
    <div class="dataEmpty">
        <img src="../../../assets/img/dataEmpty.png">
        <p>
            暂无数据
        </p>
    </div>
</template>
<script>
    export default {
        name : "dataEmpty"
    }
</script>
<style scoped lang="less">
    .dataEmpty{
        width: 100%;
        padding-top: 4rem;
        >img{
            width: 33%;
            display: block;
            margin: 0 auto;
        }
        >p{
            text-align: center;
            font-size: 0.3rem;
            margin-top: 0.3rem;
            color: #999;
        }
    }

</style>