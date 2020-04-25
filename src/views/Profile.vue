<template>
    <div class="profileWarp">
        <!--头部-->
        <header class="profile_top">
            <i class="el-icon-arrow-left" @click="$router.back(-1)"></i>
            <span class="my">我的</span>
        </header>

        
        <!--内容-->
        <div class="profile_center" >
            <!--头像姓名展示-->
            <section class="center_name" v-if="name">
                <router-link to="/info">
                    <img :src="imgSrc" alt="" v-if="login">
                    <img src="../assets/yonghu2.png" alt="" v-if="name">
                    <div class="user_info">
                        <p v-if="login">{{username}}</p>
                        <p v-if="name">{{userinfo[0].username}}</p>
                        <p>
                            <span class="phone_logo">
                                <i class="el-icon-mobile-phone"></i>
                            </span>
                            <span class=" phone_name">暂无绑定手机号</span>
                        </p>
                    </div>
                    <i class="el-icon-arrow-right"></i>
                </router-link>
            </section>

            <section class="center_name" v-if="login">
                <router-link to="/login">
                    <img :src="imgSrc" alt="" v-if="login">
                    <img src="../assets/yonghu2.png" alt="" v-if="name">
                    <div class="user_info">
                        <p v-if="login">{{username}}</p>
                        <p v-if="name">{{userinfo[0].username}}</p>
                        <p>
                            <span class="phone_logo">
                                <i class="el-icon-mobile-phone"></i>
                            </span>
                            <span class=" phone_name">暂无绑定手机号</span>
                        </p>
                    </div>
                    <i class="el-icon-arrow-right"></i>
                </router-link>
            </section>

            <!--我的余额，我的优惠，我的积分展示-->
            <section class="center_info">
                <ul>
                    <li @click="balance">
                        <span><b>{{balance1 ? balance1 : "0.00"}}</b>元</span>
                        <span>我的余额</span>
                    </li>
                    <li @click="goGift">
                        <span><b class="b2">{{gift ? gift : "0"}}</b>个</span>
                        <span>我的优惠</span>
                    </li>
                    <li @click="goPoint">
                        <span><b class="b3">{{points ? points : "0"}}</b>分</span>
                        <span>我的积分</span>
                    </li>
                </ul>
            </section>

            <!--我的订单，积分商城，会员卡-->
            <section class="center_message">
                <!--我的订单-->
                <router-link to="/order">
                    <img src="../assets/wodedingdan.png" alt="">
                    <div>
                        <span>我的订单</span>
                        <i class="el-icon-arrow-right"></i>
                    </div>
                </router-link>
                <!--积分商城-->
                <router-link to="/integral">
                    <img src="../assets/shangcheng.png" alt="">
                    <div>
                        <span>积分商城</span>
                        <i class="el-icon-arrow-right"></i>
                    </div>
                </router-link>
                <!--会员卡-->
                <router-link to="/vipcard">
                    <img src="../assets/huangguan.png" alt="">
                    <div>
                        <span>饿了么会员卡</span>
                        <i class="el-icon-arrow-right"></i>
                    </div>
                </router-link>
            </section>

            <!--服务中心，下载饿了么-->
            <section class="center_serve">
                <router-link to="/service">
                    <img :src="fuwu" alt="">
                    <div>
                        <span>服务中心</span>
                        <i class="el-icon-arrow-right"></i>
                    </div>
                </router-link>
                <!--下载-->
                <router-link to="/download">
                    <img :src="logo" alt="">
                    <div>
                        <span>下载饿了么APP</span>
                        <i class="el-icon-arrow-right"></i>
                    </div>
                </router-link>
            </section>
        </div>


        <!--底部-->
        <div class="footer">
            <router-link to="/msite">
                <i class="el-icon-eleme icon_style"></i>
                <span>外卖</span>
            </router-link>
            <router-link to="/search">
                <i class="el-icon-discover icon_style"></i>
                <span>搜索</span>
            </router-link>
            <router-link to="/order">
                <i class="el-icon-s-fold icon_style"></i>
                <span>订单</span>
            </router-link>
            <router-link to="">
                <i class="el-icon-s-custom icon_style"></i>
                <span>我的</span>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Profile",
        data() {
            return {
                imgSrc: require("../assets/yonghu.jpg"),
                fuwu: require("../assets/fuwu.png"),
                logo: require("../assets/elm.png"),
                userinfo: [],
                username:"登录/注册",
                balance1: null,
                gift: null,
                points: null,
                login: true,
                name: false,
            }

        },
        created() {
            this.axios.get("/v1/user").then((res)=>{
                // this.username = res.username;
            }).catch(err=>{});

            //进入该页面之前，先查看用户是否登录，如果有就展示用户的姓名
            if (localStorage.getItem("userinfo")) {
                this.userinfo = JSON.parse(localStorage.getItem("userinfo"));
                //我的余额
                this.balance1 = this.userinfo[0].balance.toFixed(2);
                this.gift = this.userinfo[0].gift_amount;
                this.points = this.userinfo[0].point;
                //显示登录注册按钮
                this.login = false;
                this.name = true;
            }
        },
        methods: {
            //去往我的余额页面
            balance() {
                this.$router.push("/balance");
            },
            //去往我的优惠页面
            goGift() {
                this.$router.push("/benefit");
            },
            //去往我的积分页面
            goPoint() {
                this.$router.push("/points");
            }
        }
    }
</script>

<style scoped>
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
    /*头像......*/
    .center_name {
        padding-top: 1.95rem;
    }
    .center_name > a {
        display: flex;
        align-items: center;
        background: #3190e8;
        padding: .666667rem .6rem;
        text-decoration: none;
    }
    .center_name > a > img {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        vertical-align: middle
    }
    .user_info {
        margin-left: .48rem;
        flex-grow: 1
    }
    .user_info > p:nth-child(1){
        font-weight: 700;
        font-size: .8rem;
        color: #fff;

    }

    .phone_logo > i {
        font-size: 0.8rem;
        color: white;
        position: relative;
        top: 0.1rem;
    }
    .phone_name {
        display: inline-block;
        font-size: .57333rem;
        color: #fff;
        margin-left: 0.2rem;
    }
    .center_name > a > i {
        color: white;
    }

    /*我的余额，我的优惠，我的积分*/
    .center_info {
        width: 100%;
        background: #fff;
        box-sizing: border-box;
        font-size: 0;
        margin-bottom: .4rem;
    }
    .center_info > ul > li {
        display: inline-block;
        width: 33.12%;
        text-align: center;
        background-color: white;
        /*font-size: 0.5733rem;*/
        font-weight: 400;
        color: #666666;
        border-right: 1px solid #f1f1f1;
        box-sizing: border-box;
    }
    .center_info > ul > li > span:nth-child(1){
        font-size: .55rem;
        color: #333;
        padding: .853333rem 0 .453333rem;
        display: block;
        width: 100%;
        text-align: center;
    }
    .center_info > ul > li > span:nth-child(2){
        font-size: .57333rem;
        color: #666;
        font-weight: 400;
        padding-bottom: .453333rem;
        display: block;
        width: 100%;
        text-align: center;

    }
    b {
        display: inline-block;
        font-size: 1.2rem;
        color: #f90;
        font-weight: 700;
        line-height: 1rem;
        font-family: Helvetica Neue,Tahoma;
    }
    .b2{
        color: #ff5f3e;
    }
    .b3 {
        color: #6ac20b;
    }

    /*我的订单，会员卡*/
    .center_message {
        margin-top: .4rem;
        background: #fff;
    }
    .center_message > a {
        padding-left: 1.6rem;
        display: flex;
        align-items: center;
    }
    .center_message img {
        width: .7rem;
        height: .7rem;
        margin-left: -.866667rem;
        margin-right: .266667rem;
        display: flex;
        align-items: center;
    }
    .center_message > a > div{
        width: 100%;
        border-bottom: 1px solid #f1f1f1;
        padding: .433333rem .266667rem .433333rem 0;
        font-size: .7rem;
        color: #333;
        display: flex;
        justify-content: space-between;
    }

    /*服务中心，下载饿了么*/
    .center_serve {
        margin-top: .4rem;
        background: #fff
    }
    .center_serve > a {
        padding-left: 1.6rem;
        display: flex;
        align-items: center;
    }
    .center_serve img {
        width: .7rem;
        height: .7rem;
        margin-left: -.866667rem;
        margin-right: .266667rem;
        display: flex;
        align-items: center;
    }
    .center_serve > a > div{
        width: 100%;
        border-bottom: 1px solid #f1f1f1;
        padding: .433333rem .266667rem .433333rem 0;
        font-size: .7rem;
        color: #333;
        display: flex;
        justify-content: space-between;
    }

    /*底部*/
    .footer{
        background-color: #fff;
        position: fixed;
        z-index: 200;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 1.95rem;
        display: flex;
        box-shadow: 0 -0.02667rem 0.05333rem rgba(0,0,0,.1);
    }
    .footer a{
        text-decoration: none;
        flex: 1;
        display: flex;
        text-align: center;
        flex-direction: column;
        align-items: center;
        color:#666 ;
    }
    .footer a span{
        padding-top:.3rem;
        font-size: .45rem;
        color: #666;
    }
    .icon_style{
        /*width: .8rem;*/
        height: .8rem;
        margin-top: .3rem;
        fill: #ccc;
    }
    .footer > a:nth-child(4) > i {
        color: #3190e8;
    }
</style>