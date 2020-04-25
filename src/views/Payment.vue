<template>
    <div class="payment">
        <!--头部-->
        <header class="payment_top">
            <i class="el-icon-arrow-left" @click="$router.back(-1)"></i>
            <span class="my">在线支付</span>
        </header>
        <section class="show_time_amount">
            <section>
                <div class="time_last">支付剩余时间</div>
                <p class="time">00 : {{minute}} : {{second}}</p>
            </section>
        </section>
        <div class="pay_way">选择支付方式</div>
        <section class="pay_way_list">
            <section class="pay_item" @click="z">
                <div class="pay_icon_contaienr ">
                    <img src="../assets/zhifubao.png" alt="" class="zhifubao">
                    <span>支付宝</span>

                </div>
                <img src="../assets/选中.png" alt="" class="choose_icon" v-if="isShow">
                <img src="../assets/未选中.png" alt=""  class="choose_icon" v-if="isNo">
            </section>

            <section class="pay_item" @click="w">
                <div class="pay_icon_contaienr ">
                    <img src="../assets/weixin.png" alt="" class="zhifubao">
                    <span>微信</span>

                </div>
                <img src="../assets/选中.png" alt="" class="choose_icon" v-if="isShow2">
                <img src="../assets/未选中.png" alt=""  class="choose_icon" v-if="isNo2">
            </section>
        </section>

        <div class="determine" @click="sure">确认支付</div>


        <!--弹框-->
        <transition name="kf">
            <div class="alet_container" v-if="showcom">
                <section class="tip_text_container">
                    <div class="tip_icon">
                        <span></span>
                        <span></span>
                    </div>
                    <p class="tip_text">{{content}}</p>
                    <div class="confrim" @click="get">确认</div>
                </section>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "Payment",
        data(){
            return{
                auth_time:900,
                minute:15,
                second:"00",
                showcom:true,
                isShow:true,
                isNo:false,
                isShow2:false,
                isNo2:true,
                content:"暂不开放支付功能"
            }
        },
        created() {
            let auth_timetimer = setInterval(() => {
                this.auth_time -= 1;
                if (this.auth_time <= 0) {
                    // this.isShow2 = true;
                    clearInterval(auth_timetimer);
                }
                this.minute = Math.floor(this.auth_time / 60);
                this.second = this.auth_time % 60;
                if (this.second < 10){
                    this.second = "0"+this.second;
                }
                if (this.minute < 10){
                    this.minute = "0"+this.minute;
                }
            }, 1000);
        },
        methods: {
            get(){
                if (this.content === "暂不开放支付功能"){
                    this.showcom = false;
                } else {
                    this.$router.push("/profile")
                }

            },
            z() {
                this.isShow = true;
                this.isNo = false;
                this.isShow2 = false;
                this.isNo2 = true;
            },
            w() {
                this.isShow = false;
                this.isNo = true;
                this.isShow2 = true;
                this.isNo2 = false;
            },
            sure() {
                this.content = "当前环境无法支付，请使用官方正版APP进行支付"
                this.showcom = true;
            }
        }
    }
</script>

<style scoped>
    .payment {
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
    .show_time_amount {
        background-color: #fff;
        padding: .7rem;
        text-align: center;
    }
    .time_last {
        font-size: .6rem;
        color: #666;
        margin-top: 1rem;
    }
    .time {
        font-size: 1.5rem;
        color: #333;
        margin: .3rem 0 1rem;
    }
    .pay_way {
        background-color: #f1f1f1;
        padding: 0 .7rem;
        font-size: .7rem;
        color: #666;
        line-height: 1.8rem;
    }
    .pay_way_list {
        background-color: #fff;
    }
    .pay_item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: .4rem .7rem;
        line-height: 2.6rem;
        border-bottom: .025rem solid #f5f5f5;
    }
    .pay_icon_contaienr {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .zhifubao {
        width: 2rem;
        height: 2rem;
        margin-right: .2rem;
    }
    .pay_icon_contaienr > span{
        font-size: .7rem;
        color: #666;
    }
    .choose_icon {
        width: 1rem;
        height: 1rem;
    }
    .determine {
        background-color: #4cd964;
        font-size: .7rem;
        color: #fff;
        text-align: center;
        margin: 0 .7rem;
        line-height: 1.8rem;
        border-radius: .2rem;
        margin-top: .5rem;
        font-weight: 700;
    }
















    /*弹框*/
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