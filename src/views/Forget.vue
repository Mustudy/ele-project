<template>
    <div class="forget">
        <header class="forget_top">
            <i class="el-icon-arrow-left" @click="$router.back(-1)"></i>
            <span class="my">重置密码</span>
        </header>

        <div class="restDiv">
            <section class="phone_number">
                <input type="text" placeholder="账号" maxlength="11" v-model="name">
            </section>
            <section class="input_container">
                <input type="password" placeholder="旧密码"v-model="oldPassword">
            </section>
            <section class="input_container">
                <input type="password" placeholder="请输入新密码"  v-model="newPassword">
            </section>
            <section class="input_container">
                <input type="password" placeholder="请确认密码"  v-model="confirmPassword">
            </section>
            <section class="input_container captcha_code_container">
                <input type="text" placeholder="验证码"  v-model="mobileCode">
                <div class="img_change_img">
                    <img :src="capUrl" alt="">
                    <div class="change_img" @click="changeCode">
                        <p>看不清</p>
                        <p>换一张</p>
                    </div>
                </div>
            </section>
        </div>

        <!--确认修改-->
        <div class="login_container" @click="sure">
            确认修改
        </div>



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
        name: "Forget",
        data() {
            return {
                name:"",
                oldPassword:"",
                newPassword:"",
                confirmPassword:"",
                mobileCode:"",
                capUrl:"",
                //提示框显示隐藏
                showcom:false,
                //提示框内容
                content:"",
            }
        },
        created() {
          this.requestCode();
        },
        methods: {
            requestCode(){
                this.axios.post("/v1/captchas").then(res=>{
                    // console.log(res);
                    this.capUrl = res.code;
                }).catch(err=>{});
            },

            changeCode(){
                //请求验证码
                this.requestCode();
            },

            sure() {
                if (this.name.length === 0) {
                    //弹出提示框
                    this.content = '请输入正确的账号';
                    this.showcom = true;

                } else if (this.oldPassword.length === 0) {
                    //弹出提示框
                    this.content = '请输入旧密码';
                    this.showcom = true;
                } else if (this.newPassword.length === 0) {
                    //弹出提示框
                    this.content = '请输入新密码';
                    this.showcom = true;
                } else if (this.confirmPassword.length === 0) {
                    //弹出提示框
                    this.content = '请确认密码';
                    this.showcom = true;
                } else if (this.newPassword !== this.confirmPassword) {
                    //弹出提示框
                    this.content = '两次密码的密码不一致';
                    this.showcom = true;
                } else if (this.mobileCode.length === 0) {
                    //弹出提示框
                    this.content = '请输入验证码';
                    this.showcom = true;
                } else {
                    this.axios.post("/v2/changepassword", {
                        // params: {
                            username: this.name,
                            oldpassWord : this.oldPassword,
                            newpassword: this.newPassword,
                            confirmpassword: this.confirmPassword,
                            captcha_code: this.mobileCode,
                        // }
                    }).then(res => {
                        console.log(res);
                        if(res.message==="未找到当前用户"){
                            //弹出提示框
                            this.content='您输入的用户名不正确';
                            this.showcom=true;
                        }else if(res.message==="验证码不正确"){
                            //弹出提示框
                            this.content='验证码输入错误';
                            this.showcom=true;
                        }else if(res.message==="密码不正确"){
                            //弹出提示框
                            this.content='密码不正确';
                            this.showcom=true;
                        }else if(res.success==="密码修改成功"){
                            //弹出提示框
                            this.content='密码修改成功';
                            this.showcom=true;
                        }else {
                            //弹出提示框
                            this.content='系统错误请稍后重试';
                            this.showcom=true;
                        }
                    }).catch(err => {
                        console.log(err);
                    })
                }
            },
            get() {
                this.showcom = false;
                location. reload();
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
    .restDiv {
        background-color: #fff;
        margin-top: 2.5rem;
    }
    .phone_number {
        padding: .3rem .8rem;
        display: flex;
        justify-content: space-between;
        padding: .6rem .8rem;
        border-bottom: 1px solid #f1f1f1;
    }
    .input_container {
        display: flex;
        justify-content: space-between;
        padding: .6rem .8rem;
        border-bottom: 1px solid #f1f1f1;
    }
    .captcha_code_container {
        height: 2.2rem;
        box-sizing: border-box;
    }
    input {
        font-size: .7rem;
        color: #666;
        border: none;
        outline: none;
    }
    .img_change_img {
        display: flex;
        align-items: center;
    }
    img {
        width: 3.5rem;
        height: 1.5rem;
        margin-right: .2rem;
    }
    .change_img {
        display: flex;
        /*flex-direction: "column";*/
        flex-wrap: wrap;
        width: 2rem;
        justify-content: center;
    }
    .change_img > p:nth-of-type(1) {
        font-size: .55rem;
        color: #666;
    }
    .change_img > p:nth-of-type(2) {
        color: #3b95e9;
        font-size: .55rem;
        margin-top: .2rem
    }
    .login_container {
        margin: 1rem .5rem;
        font-size: .7rem;
        color: #fff;
        background-color: #4cd964;
        padding: .5rem 0;
        border: 1px;
        border-radius: .15rem;
        text-align: center
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