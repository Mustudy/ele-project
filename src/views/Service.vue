<template>
    <div class="serviceWarp">
        <header class="profile_top">
            <i class="el-icon-arrow-left" @click="$router.back(-1)"></i>
            <span class="my">服务中心</span>
        </header>
        <section class="service_connect">
            <a href="###" class="service_left">
                <img src="../assets/客服.png" alt="">
                <span>在线客服</span>
            </a>
            <a href="###" class="service_right">
                <img src="../assets/电话.png" alt="">
                <span>电话客服</span>
            </a>
        </section>

        <section class="hot_questions">
            <h4 class="qustion_header">热门问题</h4>
            <ul @click="goquesion">
                <li class="question_title">
                    {{serve.supervipCaption}}
                    <i class="el-icon-arrow-right"></i>
                </li>
                <li class="question_title">
                    {{serve.signCaption}}
                    <i class="el-icon-arrow-right"></i>
                </li>
                <li class="question_title">
                    {{serve.rankCaption}}
                    <i class="el-icon-arrow-right"></i>
                </li>
                <li class="question_title">
                    {{serve.pointtextCaption}}
                    <i class="el-icon-arrow-right"></i>
                </li>
                <li class="question_title">
                    {{serve.phototutorialCaption}}
                    <i class="el-icon-arrow-right"></i>
                </li>
                <li class="question_title">
                    {{serve.paymentCaption}}
                    <i class="el-icon-arrow-right"></i>
                </li>
                <li class="question_title">
                    {{serve.otherCaption}}
                    <i class="el-icon-arrow-right"></i>
                </li>
                <li class="question_title">
                    {{serve.ontimeCaption}}
                    <i class="el-icon-arrow-right"></i>
                </li>
                <li class="question_title">
                    {{serve.memberTimesCaption}}
                    <i class="el-icon-arrow-right"></i>
                </li>
                <li class="question_title">
                    {{serve.memberPartCutCaption}}
                    <i class="el-icon-arrow-right"></i>
                </li>
                <li class="question_title">
                    {{serve.hongbaoCaption}}
                    <i class="el-icon-arrow-right"></i>
                </li>
                <li class="question_title">
                    {{serve.forgotCaption}}
                    <i class="el-icon-arrow-right"></i>
                </li>
            </ul>
        </section>

        <!--商家代金券说明-->
        <div class="page" v-if="isShow">
            <header class="profile_top">
                <i class="el-icon-arrow-left" @click="returnMy"></i>
                <span class="my">问题说明</span>
            </header>

            <div class="markdown">
                <h3>Q1: 什么是商家代金券？</h3>
                <p>商家代金券是指由商家自己发放代金券，只限在指定的商家使用，可根据条件抵扣相应金额。</p>
                <h3>Q2: 怎么获得商家代金券？</h3>
                <p>可以抵扣在线支付时的实际支付金额。</p>
                <h3>Q3: 红包的门槛金额按照什么金额计算？</h3>
                <p>进入有「进店领券」或「下单返券」标示的商家即有机会获得代金券。 <br>「下单返券」需要在指定商家完成满足返券金额要求的订单后才会返还，代金券可在下次下单时使用。</p>
                <h3>Q3: 商家代金券使用条件</h3>
                <p>商家代金券仅限在指定商家使用 <br>商家代金券仅限在线支付使用 <br>每个订单只能使用一张商家代金券，不可与其他代金券叠加使用</p>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Service",
        data(){
            return{
                serve: "",
                isShow: false

            }
        },
        created() {
            this.axios.get("/v3/profile/explain").then(res=>{
                // console.log(res);
                this.serve = res;
            }).catch(err=>{

            });
        },
        methods: {
            goquesion() {
                this.isShow = true;
            },
            returnMy() {
                this.isShow = false;
            }
        }
    }
</script>

<style scoped>
    .serviceWarp {
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

    .service_connect {
        display: flex;
        justify-content: space-between;
        background-color: #fff;
    }
    .service_connect > a {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 4rem;
        border-bottom: 1px solid #f5f5f5;
    }
    .service_connect img {
        width: 1rem;
        height: 1rem
    }
    .service_connect span {
        margin-top: .4rem;
        font-size: .6rem;
        color: #666;
    }
    .service_left {
        border-right: 1px solid #f5f5f5;
    }
    .hot_questions {
        background-color: white;
    }
    .qustion_header {
        font-size: .75rem;
        color: #333;
        line-height: 3rem;
        border-bottom: 1px solid #f5f5f5;
        padding-left: .7rem;
    }
    .question_title {
        padding: 0 .7rem;
        line-height: 2rem;
        border-bottom: 1px solid #f5f5f5;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: .65rem;
        color: #666;
    }

    /*问题说明*/
    .page {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding-top: 1.95rem;
        z-index: 203;
        background-color: #fff;
        overflow: scroll;
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