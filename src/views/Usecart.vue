<template>
    <div class="usecart">
        <header class="usecart_top">
            <i class="el-icon-arrow-left" @click="$router.back(-1)"></i>
            <span class="my">兑换会员</span>
        </header>

        <p class="buy_for">
            成功兑换后将关联到当前帐号：<span style="font-weight: 700">{{name}}</span>
        </p>

        <div class="form_style">
            <input type="text" placeholder="请输入10位卡号" maxlength="10" v-model="id" @keyup="getvalue">
            <input type="text" placeholder="请输入6位卡密" maxlength="6" v-model="password" @keyup="getvalue">
        </div>

        <p class="determine" v-if="isTrue">兑换</p>
        <p class="determine" style="background-color: #4cd964" v-if="isShow" @click="warn">兑换</p>


        <footer class="Binding">
            <h3>——温馨提示——</h3>
            <p>新兑换的会员服务，权益以「会员说明」为准。</p>
            <p>月卡：30次减免配送费。</p>
            <p>季卡：90次减免配送费。</p>
            <p>年卡：360次减免配送费。</p>
            <p>＊仅限蜂鸟专送订单，每日最多减免3单，每单最高减免4元（一个月按31天计算）</p>
        </footer>


        <!--弹框-->
        <transition name="kf">
            <div class="alet_container" v-if="showcom">
                <section class="tip_text_container">
                    <div class="tip_icon">
                        <span></span>
                        <span></span>
                    </div>
                    <p class="tip_text">无效的卡号</p>
                    <div class="confrim" @click="get">确认</div>
                </section>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "Usecart",
        data() {
            return {
                userinfo: [],
                name: "",
                id:"",
                password:"",
                isTrue: true,
                isShow: false,
                showcom: false,
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
            getvalue(){
                if (this.id.length == 10 && this.password.length == 6){
                    this.isShow = true;
                    this.isTrue = false;
                }else {
                    this.isShow = false;
                    this.isTrue = true;
                }

            },
            warn() {
                this.showcom = true;
            },
            get() {
                this.showcom = false;
                this.id = "";
                this.password = "";
            }

        }
    }
</script>

<style scoped>
    .usecart {
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
    .form_style {
        display: flex;
        flex-direction: column
    }
    input {
        border-bottom: 1px solid #f5f5f5;
        height: 2rem;
        font-size: .65rem;
        color: #999;
        padding-left: .7rem;
        border: none;
        outline: none;
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
        font-weight: 700;
    }
    .Binding {
        margin-top: 1rem;
    }
    .Binding > h3 {
        text-align: center;
        font-weight: 400;
        font-size: .65rem;
        color: #aaa;
        margin-bottom: .6rem
    }
    .Binding > p {
        padding-left: 2rem;
        font-size: .5rem;
        color: #aaa;
        line-height: .8rem;
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