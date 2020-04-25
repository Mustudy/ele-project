<template>
    <div class="balanceWarp">
        <!--头部-->
        <header class="profile_top">
            <i class="el-icon-arrow-left" @click="$router.back(-1)"></i>
            <span class="my">我的余额</span>
        </header>


        <!--内容-->
        <section class="content_container">
            <section class="content">
                <div class="content_header">
                    <span class="content_title_style">当前余额</span>
                    <section class="content_description" @click="goQuestion">
                        <img src="../assets/description.png" alt="">
                        <router-link to="">余额说明</router-link>
                    </section>
                </div>
                <p class="content_num">
                    <span>{{balance ? balance : 0}}</span>
                    <span>元</span>
                </p>
                <div class="promit_button">提现</div>
            </section>

        </section>

        <!--交易明细-->
        <p class="deal_detail">交易明细</p>

        <!--暂无明细-->
        <div class="no_log">
            <img src="../assets/no-log.png" alt="">
            <p>暂无明细记录</p>
        </div>


        <!--余额问题-->
        <div class="page" v-if="isQuestionShow">
            <header class="profile_top">
                <i class="el-icon-arrow-left" @click="returnMy"></i>
                <span class="my">余额问题</span>
            </header>

            <div class="markdown">
                <h3>Q1: 使用余额的条件</h3>
                <p>为了保护账户安全，使用余额前必须先绑定手机号。</p>
                <h3>Q2: 余额可以怎么用？</h3>
                <p>余额可以在饿了么平台上提现，当余额大于等于待支付金额时可以在支持在线支付的商家中进行消费。提现功能将于2016年12月25日00:00全面开放。</p>
                <h3>Q3:我要如何提现？</h3>
                <p>为了保护账户和资金安全，您在提现前需要输入真实姓名和用该姓名开通的银行卡号、选择开户行，并验证已绑定饿了么账号的手机号。每日只能提现1次，每次限额50元。若提现金额超过50元，点击【提现】时系统会提示您已超额，请您修改提现金额。</p>
                <h3>Q4:为什么会提现失败？</h3>
                <p>可能原因有：您的姓名、开户行、银行卡号等信息不匹配；您当日的提现次数和金额超过限制；您的账户存在异常，被风控拦截。</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Balance",
        data(){
            return{
                userinfo:[],
                balance: "",
                isQuestionShow: false,
            }
        },
        created(){
            if (localStorage.getItem("userinfo")) {
                this.userinfo = JSON.parse(localStorage.getItem("userinfo"));
                // console.log(this.userinfo)
                this.balance = this.userinfo[0].balance.toFixed(2);
                // console.log(this.balance);
            }
        },
        methods: {
            goQuestion(){
                this.isQuestionShow = true;
            },
            returnMy(){
                this.isQuestionShow = false;
            }
        }
    }
</script>

<style scoped>
    .balanceWarp {
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
    .content_container {
        padding: .3rem;
        background-color: #3190e8;
    }
    .content {
        padding: .4rem;
        background-color: #fff;
        border-radius: .15rem;
    }
    .content_header {
        display: flex;
        justify-content: space-between;
        font-size: .55rem
    }
    .content_title_style {
        color: #666;
        font-family: Helvetica Neue,Tahoma,Arial;
    }
    .content_description {
        display: flex;
        align-items: center;
    }
    .content_description > img {
        width: .6rem;
        height: .6rem;
        margin-right: .2rem;
    }
    .content_description > a{
        color: #3190e8;
    }
    .content_num {
        margin-top: .3rem;
    }
    .content_num > span:nth-of-type(1){
        font-size: 1.8rem;
        color: #333
    }
    .content_num > span:nth-of-type(2){
        font-size: .7rem;
        color: #333;
        margin-left: .2rem;
    }
    .promit_button {
        width: 100%;
        height: 2rem;
        font-size: .8rem;
        color: #fff;
        border-radius: .15rem;
        line-height: 2rem;
        margin-top: 1rem;
        text-align: center;
        background-color: #ccc;
    }
    .deal_detail {
        font-size: .6rem;
        color: #999;
        line-height: 2rem;
        padding-left: .5rem
    }
    .no_log {
        text-align: center;
        margin-top: 1rem;
    }
    .no_log > img{
        text-align: center;
        width: 8rem;
        height: 5rem;
    }
    .no_log > p{
        margin-top: .5rem;
        font-size: .7rem;
        color: #666;
    }

    /*余额问题*/
    .page {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding-top: 1.95rem;
        z-index: 203;
        background-color: #fff;
    }
    .markdown {
        font-size: .6rem;
        color: #666;
        padding: 0 .5rem .5rem;
    }
    .markdown > h3 {
        line-height: 2rem;
        font-size: .7rem;
        font-weight: 600;
    }
    .markdown>p{
        font-size: .6rem;
        color: #666;
        line-height: 1rem;
    }
</style>