<template>
    <div class="loginWarp">
        <!--头部-->
        <header>
            <router-link to="">
                <i class="el-icon-arrow-left" @click="$router.back(-1)"></i>
            </router-link>
            <div>密码登录</div>
        </header>

        <!--登录信息-->
        <div class="form">
            <!--账号-->
            <section class="input_c">
                <input type="text" placeholder="账号" v-model="username">
            </section>
            <!--密码-->
            <section class="input_c">
                <input :type="value ? 'text' : 'password'" placeholder="密码" v-model="password">
                <el-switch
                        v-model="value"
                        active-color="#13ce66"
                        inactive-color="#909399">
                </el-switch>
            </section>
            <!--验证码-->
            <section class="input_c">
                <input type="text" placeholder="验证码" v-model="capCode">
                <div>
                    <img :src="capUrl" alt="">
                    <div @click="changeCap">
                        <p>看不清</p>
                        <p>换一张</p>
                    </div>
                </div>
            </section>
        </div>
        <p class="tips">
            温馨提示：未注册过的账号，登录时将自动注册
        </p>
        <p class="tips">
            注册过的用户可凭账号密码登录
        </p>
        <div class="loginBtn" @click="loginAction">登陆</div>
        <router-link to="">重置密码</router-link>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                value: false,
                username:"",
                password:"",
                capCode:"",
                capUrl:""
            }
        },
        created(){
            //网页进入请求验证码
          this.requestCode();
        },
        methods: {
            loginAction(){
                // console.log(this.username,this.password,this.capCode);
                this.axios.post("v2/login", {
                    username: this.username,
                    password: this.password,
                    captcha_code: this.capCode
                }).then(res=>{
                    console.log(res);
                    if (this.username === "" || this.password === "" || this.capCode === ""){
                        alert("请输入正确的信息")
                        this.requestCode();
                    } else {
                        if (res.message === "验证码不正确" || res.message === "验证码参数错误" || res.message === "密码错误") {
                            alert("请输入正确的验证码")
                            this.requestCode();
                        } else {
                            if (!localStorage.getItem("userinfo")) {
                                // 第一次存
                                let user = [];
                                user.push(res);
                                localStorage.setItem("userinfo", JSON.stringify(user));
                                this.$router.push({path:'profile'});

                            } else {
                                // 之后存
                                localStorage.removeItem("userinfo");
                                let user = [];
                                user.push(res);
                                localStorage.setItem("userinfo", JSON.stringify(user));
                                this.$router.push({path:'profile'});
                            }
                        }
                    }
                }).catch(err=>{});

            },

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
            }
        },

    }
</script>

<style scoped>
    .loginWarp {
        padding-top: 1.95rem;
    }
    header {
        background-color: #3190e8;
        position: fixed;
        z-index: 100;
        left: 0;
        top: 0;
        width: 100%;
        height: 1.95rem
    }
    header>div {
        width: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        color: #fff;
        text-align: center;
        font-size: .8rem;
        font-weight: 700;
    }
    header>a {
        position: absolute;
        top: 50%;
        left: .4rem;
        transform: translateY(-50%);
        color: #fff;
    }
    .form {
        background-color: #fff;
        margin-top: .6rem;
    }
    .input_c {
        display: flex;
        justify-content: space-between;
        padding: .6rem .8rem;
        border-bottom: 1px solid #f1f1f1
    }
    .input_c input {
        font-size: .7rem;
        color: #666;
        border: none;
        outline: none;
    }
    .input_c>div {
        display: flex;
        align-items: center;
    }
    .input_c>div p {
        font-size: .55rem;
        color: #666
    }
    .input_c>div p+p {
        color: #3b95e9;
        margin-top: .2rem;
    }
    .input_c>div img {
        width: 3.5rem;
        height: 1.5rem;
        margin-right: .2rem;
    }
    .tips {
        font-size: .5rem;
        color: red;
        padding: .4rem .6rem;
        line-height: .5rem
    }
    .loginBtn {
        margin: 0 .5rem 1rem;
        font-size: .7rem;
        color: #fff;
        background-color: #4cd964;
        padding: .5rem 0;
        border: 1px;
        border-radius: .15rem;
        text-align: center
    }
    /*.loginWarp>*:last-child*/
    .loginWarp>a {
        float: right;
        font-size: .6rem;
        color: #3b95e9;
        margin-right: .3rem;
        text-decoration: none;
    }
</style>