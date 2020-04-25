<template>
    <div class="commendWarp">
        <!--头部-->
        <header class="commend_top">
            <i class="el-icon-arrow-left" @click="$router.back(-1)"></i>
            <span class="my">推荐有奖</span>
        </header>

        <!--<el-collapse-transition>-->
            <section class="activity_banner">
                <img src="../assets/activity.png" alt="">
            </section>
        <!--</el-collapse-transition>-->

        <section class="invite_firend">
            <div class="invite_firend_style" @click="please">
                <img src="../assets/weixin.png" alt="">
                <p>邀请微信好友</p>
            </div>
            <div class="invite_firend_style"  @click="please">
                <img src="../assets/qq.png" alt="">
                <p>邀请QQ好友</p>
            </div>
            <div class="invite_firend_style">
                <img src="../assets/fenxiang.png" alt=""  @click="please">
                <p>面对面邀请</p>
            </div>
        </section>

        <section class="invite_num">
            <div class="invite_num_style">
                <p>累计收益</p>
                <p>
                    <span>0</span>元
                </p>
            </div>
            <div class="invite_num_style invite_people">
                <p>成功邀请</p>
                <p>
                    <span>0</span>人
                </p>
            </div>
        </section>

        <p class="income_detail">-收益明细-</p>

        <section class="incom_tips">
            <img src="../assets/qianbao.png" alt="">
            <p>还不赶紧去邀请好友</p>
        </section>

        <!--弹框-->
        <transition name="kf">
            <div class="alet_container" v-if="showcom">
                <section class="tip_text_container">
                    <div class="tip_icon">
                        <span></span>
                        <span></span>
                    </div>
                    <p class="tip_text">请在饿了么APP中打开</p>
                    <div class="confrim" @click="get">确认</div>
                </section>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "Commend",
        data(){
            return{
                showcom: false,
            }
        },
        methods: {
            please() {
              this.showcom = true;
            },
            get() {
                this.showcom = false;
            }
        }
    }
</script>

<style scoped>
    .commendWarp {
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
        border-bottom: .001rem solid silver;
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

    .activity_banner > img {
        width: 100%;
        height: 10rem
    }
    .invite_firend {
        display: flex;
        padding: 1rem 0;
        background-color: #fff;
        /*flex: 1;*/
        /*text-align: center;*/
    }
    .invite_firend_style {
        flex: 1;
        text-align: center;
    }
    .invite_firend_style > img {
        width: 2.5rem;
        height: 2.5rem;
    }
    .invite_firend_style > p {
        font-size: .5rem;
        color: #333;
        margin-top: .2rem;
    }

    .invite_num {
        display: flex;
        margin-top: 1rem;
        font-size: .5rem;
        color: #666;
    }
    .invite_num_style {
        flex: 1;
        text-align: center;
    }
    .invite_num_style p {
        color: #666;
    }
    .invite_num_style > p > span {
        font-size: .8rem;
        color: #ff5633;
        font-weight: 700;
    }
    .invite_people {
        border-left: .025rem solid #ddd;
    }

    .income_detail {
        text-align: center;
        margin-top: 1rem;
        font-size: .5rem;
        color: #666;
    }

    .incom_tips {
        text-align: center;
        margin-top: 1rem;
    }
    .incom_tips > img {
        width: 1.3rem;
        height: 1.6rem;
    }
    .incom_tips > p {
        font-size: .5rem;
        color: #999;
        margin-top: .2rem;
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