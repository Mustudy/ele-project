<template>
    <div class="pointsWarp">
        <header class="profile_top">
            <i class="el-icon-arrow-left" @click="$router.back(-1)"></i>
            <span class="my">我的积分</span>
        </header>


        <!--内容-->
        <section class="content_container">
            <section class="content">
                <div class="content_header">
                    <span class="content_title_style">当前积分</span>
                    <section class="content_description" @click="goQuestion">
                        <img src="../assets/description.png" alt="">
                        <router-link to="">积分说明</router-link>
                    </section>
                </div>
                <p class="content_num">
                    <span>{{points ? points : 0}}</span>
                    <span>分</span>
                </p>
                <div class="promit_button" @click="warn">积分兑换商品</div>
            </section>

        </section>

        <!--交易明细-->
        <p class="deal_detail">最近30天积分记录</p>

        <!--暂无明细-->
        <div class="no_log">
            <img src="../assets/no-log.png" alt="">
            <p>最近30天无积分记录</p>
            <p>快去下单赚取大量积分吧</p>
        </div>


        <!--积分问题-->
        <div class="page" v-if="isQuestionShow">
            <header class="profile_top">
                <i class="el-icon-arrow-left" @click="returnMy"></i>
                <span class="my">积分问题</span>
            </header>

            <div class="markdown">
                <h3>Q1: 怎么获得积分？</h3>
                <p>在线支付的订单将获得订单积分奖励：</p>
                <ul>
                    <li>积分将在用户完成评价后获得。</li>
                    <li>可获得积分=订单金额×10（即1元=10点积分）。</li>
                    <li>订单金额指实际付款金额，不包含活动优惠金额。</li>
                    <li>每位用户每天最多可以获得2000积分，体验商家的订单和评价不会增加积分。</li>
                </ul>
                <h3>Q2: 积分用来做什么？</h3>
                <p>可以在积分商城兑换各种礼品。</p>
                <h3>Q3: 礼品兑换很多天了还没有收到，该怎么办？</h3>
                <p>礼品从兑换日起，3个工作日（周末不算）内处理发货，发货后，通常会在3个工作日左右送达。</p>
                <h3>Q4: 礼品兑换中的手机充值卡兑换，怎么样进行充值，充值之前会和我电话确认嘛？</h3>
                <p>不会，手机充值卡兑换，是直接充值到您填写的手机号上，充值之前不会和您电话确认，所以您在填写电话的时候，请确认电话是否正确。</p>
            </div>
        </div>

        <!--弹窗-->
        <transition name="kf">
            <div class="alet_container" v-if="showcom">
                <section class="tip_text_container">
                    <div class="tip_icon">
                        <span></span>
                        <span></span>
                    </div>
                    <p class="tip_text">快去下单赚取大量积分吧</p>
                    <div class="confrim" @click="get">确认</div>
                </section>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "Points",
        data(){
            return{
                userinfo:[],
                points: "",
                isQuestionShow: false,
                showcom: false,
            }
        },
        created(){
            if (localStorage.getItem("userinfo")) {
                this.userinfo = JSON.parse(localStorage.getItem("userinfo"));
                // console.log(this.userinfo)
                this.points = this.userinfo[0].point;
                // console.log(this.balance);
            }
        },
        methods: {
            goQuestion(){
                this.isQuestionShow = true;
            },
            returnMy(){
                this.isQuestionShow = false;
            },
            warn() {
                this.showcom = true;
            },
            get() {
                this.showcom = false;
            }
        }

    }
</script>

<style scoped>
    .pointsWarp {
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
        background-color: #fe6d47;
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
    .no_log > p:nth-of-type(1){
        margin-top: .5rem;
        font-size: .7rem;
        color: #666;
    }
    .no_log > p:nth-of-type(2){
        margin-top: .5rem;
        font-size: .5rem;
        color: #999;
    }

    /*积分问题*/
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
    .markdown > ul > li {
        font-size: .6rem;
        color: #666;
        line-height: 1rem;
    }


    /*弹窗*/
    .alet_container {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 200;
    }
    .tip_text_container {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -6rem;
        margin-left: -6rem;
        width: 12rem;
        animation: tipMove .4s;
        background-color: #fff;
        padding-top: .6rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border: 1px;
        border-radius: .25rem;
    }
    .tip_icon {
        width: 3rem;
        height: 3rem;
        border: .15rem solid #f8cb86;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .tip_icon > span:nth-of-type(1) {
        width: .12rem;
        height: 1.5rem;
        background-color: #f8cb86;
    }
    .tip_icon > span:nth-of-type(2) {
        width: .2rem;
        height: .2rem;
        border: 1px;
        border-radius: 50%;
        margin-top: .2rem;
        background-color: #f8cb86;
    }
    .tip_text {
        font-size: .7rem;
        color: #333;
        line-height: .9rem;
        text-align: center;
        margin-top: .8rem;
        padding: 0 .4rem;
    }
    .confrim {
        font-size: .8rem;
        color: #fff;
        font-weight: 700;
        margin-top: .8rem;
        background-color: #4cd964;
        width: 100%;
        text-align: center;
        line-height: 1.8rem;
        border: 1px;
        border-bottom-left-radius: .25rem;
        border-bottom-right-radius: .25rem;
    }



    @keyframes heartBounce {
        0% {
            opacity: 1;
            transform: scale(1,1);
        }
        25% {
            transform: scale(1.25,1.25);
        }
        50% {
            transform: scale(1,1);
        }
        75% {
            transform: scale(0.75,0.75);
        }
        100%{
            transform: scale(1,1);
            opacity: 0;
        }
    }
    .kf-leave-active {
        animation: heartBounce .5s;
    }
    .kf-enter-active {
        animation: heartBounce .5s reverse;
    }
</style>