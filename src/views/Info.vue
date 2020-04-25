<template>
    <div class="infoWarp">
        <header class="profile_top">
            <i class="el-icon-arrow-left" @click="$router.back(-1)"></i>
            <span class="my">账户信息</span>
        </header>

        <!--个人信息-->
        <section class="profile-info">
            <!--头像-->
            <section class="headportrait">
                <input type="file" class="profileinfopanel-upload">
                <h2>头像</h2>
                <div class="headportrait-div">
                    <!--<img :src="'//elm.cangdu.org/img/' + userImg" alt="">-->
                    <img src="../assets/yonghu2.png" alt="">
                    <i class="el-icon-arrow-right"></i>
                </div>
            </section>

            <!--用户名-->
            <router-link to="/setusername" class="info-router">
                <section class="headportrait headportraitwo">
                    <h2>用户名</h2>
                    <div  class="headportrait-div">
                        <p>{{usreinfo ? userinfo[0].username : ""}}</p>
                        <i class="el-icon-arrow-right headportrait-div-bottom"></i>
                    </div>
                </section>
            </router-link>

            <!--收货地址-->
            <router-link to="/address" class="info-router">
                <section class="headportrait headportraitwo headportraithree">
                    <h2>收货地址</h2>
                    <div  class="headportrait-div">
                        <i class="el-icon-arrow-right headportrait-div-bottom"></i>
                    </div>
                </section>
            </router-link>

            <!--账号绑定-->
            <section class="bind-phone">账号绑定</section>

            <!--手机-->
            <router-link to="" class="info-router">
                <section class="headportrait headportraitwo headportraithree"  @click="isPhone">
                    <h2><img src="../assets/bindphone.png" alt="" style="display: inline-block; margin-right: 0.4rem;">手机
                    </h2>
                    <div  class="headportrait-div">
                        <i class="el-icon-arrow-right headportrait-div-bottom"></i>
                    </div>
                </section>
            </router-link>

            <!--安全设置-->
            <section class="bind-phone">安全设置</section>

            <!--登录密码-->
            <router-link to="/forget" class="info-router">
                <section class="headportrait headportraitwo headportraithree">
                    <h2>登录密码</h2>
                    <div  class="headportrait-div">
                        <p>修改</p>
                        <i class="el-icon-arrow-right headportrait-div-bottom"></i>
                    </div>
                </section>
            </router-link>

            <!--退出登录-->
            <section class="exitlogin" @click="exit">退出登录</section>
        </section>


        <!--手机弹框-->
        <transition name="kf">
            <div class="alet_container" v-if="isPhoneShow">
                <section class="tip_text_container">
                    <div class="tip_icon">
                        <span></span>
                        <span></span>
                    </div>
                    <p class="tip_text">请在手机APP中设置</p>
                    <div class="confrim" @click="isPhone2">确认</div>
                </section>
            </div>
        </transition>

        <!--退出登录弹框-->
        <transition name="kf">
        <section class="coverpart" v-if="isExitShow">
            <section class="cover-background"></section>
            <section class="cover-content  cover-animate">
                <div class="sa-icon">
                    <p class="sa-body"></p>
                    <p class="sa-dot"></p>
                </div>
                <h2>是否退出登录</h2>
                <div class="sa-button">
                    <button class="waiting" @click="wait">再等等</button>
                    <div style="display: inline-block">
                        <button class="quitlogin" @click="quit">退出登录</button>
                    </div>
                </div>
            </section>
        </section>
        </transition>

    </div>
</template>

<script>
    export default {
        name: "Info",
        data(){
            return {
                usreinfo: [],
                userImg: "",
                userName: null,
                //控制手机弹窗的显隐
                isPhoneShow: false,
                //控制退出登录弹窗的显隐
                isExitShow: false,
            }
        },
        created() {
            this.axios.get("/v1/user").then((res)=>{
                this.userImg = res.avatar;
                this.userName = res.username;
                // console.log(this.userImg);
            }).catch(err=>{});

            if (localStorage.getItem("userinfo")) {
                this.userinfo = JSON.parse(localStorage.getItem("userinfo"));
                // console.log(this.userinfo)
            }
        },
        methods: {
            isPhone() {
                this.isPhoneShow = true;
            },
            isPhone2() {
                this.isPhoneShow = false;
            },
            exit() {
                this.isExitShow = true;
            },
            wait() {
                this.isExitShow = false;
            },
            quit() {
                localStorage.removeItem("userinfo");
                this.isExitShow = false;
                this.$router.push("/profile");
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
    .profile-info {
        width: 100%;
        height: 3.1rem;
    }
    .headportrait {
        margin-top: 2.4rem;
        padding: .5rem .4rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid #ddd;
        background: #fff;
    }
    .profileinfopanel-upload {
        display: block;
        position: absolute;
        opacity: 0;
        top: 2.35rem;
        left: 0;
        width: 100%;
        height: 3.1rem;
    }
    .headportrait > h2 {
        font-size: .6rem;
        color: #333;
        font-weight: 500;
        display: flex;
        align-items: center;
    }
    .headportrait-div {
        display: flex;
        justify-content: left;
    }
    .headportrait-div > img {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        vertical-align: middle;
    }
    .headportrait-div > p {
        text-align: left;
        line-height: 1.39rem;
        font-size: .7rem;
        color: #999;
        margin-right: .2rem;
        font-weight: 100;
        font-family: Arial;
    }
    .el-icon-arrow-right {
        width: .66667rem;
        height: 1.4rem;
        position: relative;
        top: .44rem;
        color: rgb(216, 216, 216);;
    }
    .info-router {
        display: block;
    }
    .headportraitwo {
        margin-top: 0;
        padding: .3rem .4rem;
    }
    .headportraithree {
        border-bottom: 1px solid #ddd;
    }
    .bind-phone {
        padding: .4rem;
        font-size: .5rem;
        color: #666;
    }
    .headportrait-div-bottom {
        /*width: .66667rem;*/
        /*height: 1.4rem;*/
        /*position: relative;*/
        top: 0.2rem;
    }
    .exitlogin {
        width: 96%;
        margin: 1.3rem auto 0;
        line-height: 1.5rem;
        border-radius: 5px;
        text-align: center;
        background: #d8584a;
        font-size: .6rem;
        color: #fff;
    }


    /*手机弹框*/
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

    /*退出登录弹框*/
    .coverpart {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
    }
    .cover-background {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        background: #000;
        z-index: 100;
        opacity: .2;
    }
    .cover-content {
        width: 94%;
        background: #fff;
        padding: 17px;
        position: absolute;
        top: 20%;
        left: 3%;
        z-index: 1000;
        border-radius: 5px;
        box-sizing: border-box;
    }
    .sa-icon {
        width: 90px;
        height: 90px;
        border: 4px solid #f8bb86;
        border-radius: 50%;
        margin: 20px auto;
        position: relative;
    }
    .sa-body {
        width: 5px;
        height: 47px;
        border-radius: 2px;
        background: #f8bb86;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 10px;
    }
    .sa-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #f8bb86;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 10px;
    }
    .cover-content > h2{
        width: 100%;
        text-align: center;
        font-size: 30px;
        color: #575757;
        font-weight: 500;
        margin: 25px 0;
    }
    .sa-button {
        width: 100%;
        text-align: center
    }
    /*.sa-button > button{*/
        /*display: inline-block;*/
        /*padding: .4rem 1rem;*/
        /*border-radius: 5px;*/
        /*font-size: .6rem;*/
        /*color: #fff;*/
        /*letter-spacing: 1px;*/
        /*margin-top: 26px;*/
    /*}*/
    .waiting {
        background: #c1c1c1;
        margin-right: .4rem;
        display: inline-block;
        padding: .4rem 1rem;
        border-radius: 5px;
        font-size: .6rem;
        color: #fff;
        letter-spacing: 1px;
        margin-top: 26px;
        border: none;
        outline: none;
    }
    .quitlogin {
        background: #dd6b55;
        display: inline-block;
        padding: .4rem 1rem;
        border-radius: 5px;
        font-size: .6rem;
        color: #fff;
        letter-spacing: 1px;
        margin-top: 26px;
        border: none;
        outline: none;
    }
</style>