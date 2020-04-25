<template>
    <div class="exchangeWarp">
        <!--头部-->
        <header class="exchange_top">
            <i class="el-icon-arrow-left" @click="$router.back(-1)"></i>
            <span class="my">兑换红包</span>
        </header>

        <div class="exchange_code">
            <input type="text" placeholder="请输入兑换码" class="exchange_input" v-model="name" @keyup="getValue">
            <section class="input_container captcha_code_container">
                <input type="text" placeholder="请输入验证码" maxlength="4" v-model="capCode" @keyup="getValue">
                <!--验证码-->
                <section class="input_c">
                        <img :src="capUrl" alt="">
                        <div @click="changeCap">
                            <p>看不清</p>
                            <p>换一张</p>
                        </div>
                </section>
            </section>
        </div>

        <div class="determine" v-if="s1">兑换</div>
        <div class="determine" v-if="s2" @click="change" :style="{'background-color' : s2 ? '#4cd964' : '#ccc'}">兑换</div>


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
        name: "Exchange",
        data() {
            return {
                name:"",
                capCode:"",
                capUrl:"",
                userid: "",
                s1:true,
                s2:false,
                code:"",
                content: "",
                showcom: false,
            }
        },
        created(){
            //网页进入请求验证码
            this.requestCode();

            if (localStorage.getItem("userinfo")) {
                this.userinfo = JSON.parse(localStorage.getItem("userinfo"));
                // console.log(this.userinfo)
                this.userid = this.userinfo[0].user_id;
                // console.log(this.userid);

            }


        },
        methods:{
            //请求验证码的方法
            requestCode(){
                this.axios.post("v1/captchas").then(res=>{
                    // console.log(res);
                    this.capUrl = res.code;
                }).catch(err=>{});
            },

            changeCap(){
                //请求验证码
                this.requestCode();
            },

            getValue() {
                if (this.name.length >= 1 && this.capCode.length == 4){
                    this.s2 = true;
                    this.s1 = false;
                }else {
                    this.s2 = false;
                    this.s1 = true;
                }
            },

            //兑换验证码
            change(){
                this.axios.post("/v1/users/"+this.userid+"/hongbao/exchange", {
                    user_id:this.userid,
                    exchange_code:this.name,
                    captcha_code:this.capCode,
                }).then(res=>{
                    this.code = res;
                    this.content = res.message;
                    console.log(this.content);
                    this.showcom = true;
                }).catch(err=>{});

            },

            get() {
                this.showcom = false;
                this.name = "";
                this.capCode = "";
            }
        }
    }
</script>

<style scoped>
    .exchangeWarp {
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

    .exchange_code {
        margin-top: .7rem;
        padding: 0 .5rem;
    }
    .exchange_input {
        width: 100%;
        font-size: .7rem;
        color: #666;
        padding: .6rem .4rem;
        border-radius: .15rem;
        border: none;
        box-sizing: border-box;
        outline: none;
    }
    .captcha_code_container {
        height: 2.2rem;
        display: flex;
        margin-top: .7rem;
    }
    .captcha_code_container input {
        font-size: .7rem;
        color: #666;
        padding: .4rem;
        border-radius: .15rem;
        flex: 3;
        border: none;
        box-sizing: border-box;
        outline: none;
    }

    .input_c {
        display: flex;
        align-items: center;
        flex: 2;
        margin-left: .3rem;
        background-color: #fff;
        padding-left: .2rem;
        border-radius: .15rem;
    }
    .input_c>div {
        display: flex;
        /*flex-direction: "column";*/
        flex-wrap: wrap;
        width: 2rem;
        justify-content: center;
    }
    .input_c>div p {
        font-size: .55rem;
        color: #666
    }
    .input_c>div p+p {
        color: #3b95e9;
        margin-top: .2rem;
    }
    .input_c > img {
        width: 3.5rem;
        height: 1.5rem;
        margin-right: .2rem;
    }

    .determine {
        background-color: #ccc;
        font-size: .7rem;
        color: #fff;
        text-align: center;
        margin: 0 .7rem;
        line-height: 1.8rem;
        border-radius: .2rem;
        margin-top: .7rem;
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