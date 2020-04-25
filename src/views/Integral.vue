<template>
    <div class="integralWarp">
        <header class="forget_top">
            <i class="el-icon-arrow-left" @click="$router.back(-1)"></i>
            <span class="my">积分商城</span>
        </header>

        <div class="db-content">
            <h3>请重新进入</h3>
            <p>请返回后重新进入积分商城~</p>
            <img src="../assets/retrylogin.png" alt="">
        </div>
    </div>
</template>

<script>
    export default {
        name: "Integral"
    }
</script>

<style scoped>
    .integralWarp {
        padding-top: 1.95rem;
    }
    header {
        background-color: #3190e8;
        position: fixed;
        z-index: 100;
        left: 0;
        top: 0;
        width: 100%;
        height: 1.95rem;
        /*border-bottom: .001rem solid silver;*/
    }
    header>i {
        color: #fff;
        font-size: .65rem;
        position: absolute;
        top: 50%;
        left: .4rem;
        transform: translateY(-50%);
    }
    .my {
        font-size: .8rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        color: #fff;
        text-align: center;
        font-weight: 700
    }
    .db-content {
        text-align: center;
        overflow: hidden;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    h3 {
        font-size: 26px;
        color: #0d7fd5;
        margin-bottom: 15px;
    }
    p {
        font-size: 14px;
        color: #666;
        margin-bottom: 19px;
    }
    img {
        width: 176px;
        height: 176px;
        border: 0;
        vertical-align: middle;
    }
</style>