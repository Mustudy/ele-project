<template>
    <div class="vipcardWarp">
        <header class="vipcard_top">
            <i class="el-icon-arrow-left" @click="$router.back(-1)"></i>
            <span class="my">会员中心</span>
        </header>

        <section>
            <p class="buy_for">为账户 <span style="font-weight: 900"> {{name}} </span> 购买会员</p>

            <section class="vip_prerogative">
                <div class="header_style" @click="goVip">
                        <span class="header_left">会员特权</span>
                        <section class="header_right" >
                            <span>会员说明</span>
                            <i class="el-icon-arrow-right"></i>
                        </section>
                </div>

                <section class="vip_detail">
                    <div class="vip_detail_left">
                        <img src="../assets/sheng.jpeg" alt="">
                    </div>
                    <div class="vip_detail_right">
                        <h4>减免配送费</h4>
                        <p>每月减免30单，每日可减免3单，每单最高减4元</p>
                        <p>蜂鸟专送专享</p>
                    </div>
                </section>

                <section class="vip_detail">
                    <div class="vip_detail_left">
                        <img src="../assets/sheng.jpeg" alt="">
                    </div>
                    <div class="vip_detail_right">
                        <h4>减免配送费</h4>
                        <p>每月减免30单，每日可减免3单，每单最高减4元</p>
                        <p>蜂鸟专送专享</p>
                    </div>
                </section>
            </section>


            <section class="apply_vip">
                <div class="header_style">
                    <span class="header_left">开通会员</span>
                </div>
                <section class="apply_vip_buy">
                    <div class="apply_vip_buy_left">
                        <span>1个月</span>
                        <span style="color: #f60; font-weight: 700">￥20</span>
                    </div>
                    <div class="apply_vip_buy_right" @click="goPayment">购买</div>
                </section>
            </section>

            <router-link to="/usecartid" class="header_style common_style">
                <span class="header_left">兑换会员</span>
                <section class="header_right">
                    <span>使用卡号卡密</span>
                    <i class="el-icon-arrow-right"></i>
                </section>
            </router-link>

            <div to="" class="header_style common_style" @click="gocord">
                <span class="header_left">购买记录</span>
                <section class="header_right">
                    <span>开发票</span>
                    <i class="el-icon-arrow-right"></i>
                </section>
            </div>
        </section>



        <!--会员说明-->
        <div class="page" v-if="vipShow">
            <header class="profile_top">
                <i class="el-icon-arrow-left" @click="returnVip"></i>
                <span class="my">我的优惠</span>
            </header>

            <div class="markdown">
                <p>尊敬的用户，随着会员体系逐渐完善，自2016年10月10日起，饿了么会员权益将做如下优化：
                    购卡后31天内，累积享有30单减免配送费服务（每日最多3单，每单最高减免4元）。
                    注：已购买的会员服务不受影响，当前会员服务失效前无法购买新卡。</p>
                <h3>Q1: 特权介绍</h3>
                <p>身份标识：饿了么会员服务有效期内，享有专属皇冠标识。<br>减免配送费： 饿了么会员卡自绑定账户之日起31天内，在「蜂鸟专送」标识商家下单，享有30次减免配送费特权，每日最多减免3单，每单最高可减4元。<br>更多特权，敬请期待！</p>
                <h3>Q2: 资费介绍</h3>
                <p>饿了么会员卡：20元。</p>
                <h3>Q3: 使用说明</h3>
                <p>当用户满足以下任一条件，会员服务自动失效：</p>
                <p>自绑定之日起超过31天；<br>在31天内累计使用减免配送费的蜂鸟订单数量达到30单；</p>
                <h3>Q4: 购卡说明</h3>
                <p>在线购买：饿了么App>我的>饿了么会员卡</p>
                <h3>Q5: 温馨提示</h3>
                <p>用户在当前会员服务失效前，无法购买新卡。<br>请认准饿了么官方渠道，任何从其他第三方途径获得的会员卡，饿了么不保证其可用性。</p>
            </div>
        </div>

        <!--购买记录-->
        <div class="page" v-if="isRecord ">
            <header class="profile_top">
                <i class="el-icon-arrow-left" @click="returnVip"></i>
                <span class="my">购买记录</span>
            </header>

            <div class="record">
                <img src="../assets/xiaoren.png" alt="">
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Vipcard",
        data() {
            return {
                userinfo: [],
                name: "",
                vipShow: false,
                isRecord: false,
            }
        },
        created() {
            if (localStorage.getItem("userinfo")) {
                this.userinfo = JSON.parse(localStorage.getItem("userinfo"));
                // console.log(this.userinfo)
                this.name = this.userinfo[0].username;

            }
        },
        methods: {
            //会员说明的点击事件
            goVip() {
                this.vipShow =  true;
            },
            returnVip() {
                this.vipShow = false;
                this.isRecord = false;
            },

            //购买记录的点击事件
            gocord() {
                this.isRecord = true;
            },
            // 开通会员的点击事件
            goPayment() {
                this.$router.push("/payment");
            }
        }
    }
</script>

<style scoped>
    .vipcardWarp {
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

    .buy_for {
        font-size: .6rem;
        color: #666;
        line-height: 2rem;
        padding-left: .7rem;
    }
    .vip_prerogative {
        background-color: #fff;
        padding-left: .7rem;
        margin-bottom: .5rem;
    }
    .header_style {
        display: flex;
        justify-content: space-between;
        background-color: #fff;
        line-height: 2rem;
        border-bottom: 1px solid #f5f5f5;
        padding-right: .7rem;
    }
    .header_left {
        font-size: .7rem;
        color: #333;
    }
    .header_right {
        display: flex;
        align-items: center;
    }
    .header_right > span {
        font-size: .6rem;
        color: #999;
        margin-right: .2rem;
    }
    .header_right > i {
        font-size: .8rem;
        color: rgb(204, 204, 204);
        position: relative;
        /*top: .1rem;*/
    }
    .vip_detail {
        display: flex;
        border-bottom: 1px solid #f5f5f5;
        padding: .8rem 0;
    }
    .vip_detail_left {
        margin-right: .6rem;
    }
    .vip_detail_left > img {
        width: 1.6rem;
        height: 1.8rem;
    }
    .vip_detail_right > h4{
        font-size: .7rem;
        color: #333;
        font-weight: 400;
        margin-bottom: .2rem;
    }
    .vip_detail_right > p {
        font-size: .5rem;
        color: #999;
        margin-bottom: .2rem;
    }
    .apply_vip {
        background-color: #fff;
        padding-left: .7rem;
        margin-bottom: .5rem;
    }
    .header_style {
        display: flex;
        justify-content: space-between;
        background-color: #fff;
        line-height: 2rem;
        border-bottom: 1px solid #f5f5f5;
        padding-right: .7rem;
    }
    .header_left {
        font-size: .7rem;
        color: #333;
    }
    .apply_vip_buy {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: .7rem;
        font-size: .7rem;
        line-height: 2.6rem;
    }
    .apply_vip_buy_right {
        border: .025rem solid #f60;
        border-radius: .2rem;
        line-height: 1.2rem;
        height: 1.2rem;
        width: 2.6rem;
        text-align: center;
        font-size: .6rem;
        color: #f60;
    }
    .common_style {
        padding: 0 .7rem;
        margin-bottom: .5rem;
    }
    /*会员说明*/
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

    .record > img {
        width: 8rem;
        height: 5rem;
        margin: 6rem 4.5rem;
        /*text-align: center;*/
    }
</style>