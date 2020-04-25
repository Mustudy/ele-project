<template>
    <div class="setusernameWarp">
        <header class="profile_top">
            <i class="el-icon-arrow-left" @click="$router.back(-1)"></i>
            <span class="my">修改用户名</span>
        </header>


        <!--修改-->
        <section class="setname">
            <section class="setname-top">
                <input type="text" placeholder="输入用户名" v-model="setusername" maxlength="24" @keyup="getvalue">
                <div>
                    <p v-if="isP1" class="p1">用户名只能修改一次（5-24字符之间）</p>
                    <p v-if="isP2" class="p2">用户名只能修改一次（5-24字符之间）</p>
                </div>
            </section>

            <section class="reset">
                <button disabled v-if="isBtnShow">确认修改</button>
                <button @click="sure" v-if="isBtn" style="opacity: 1">确认修改</button>
            </section>
        </section>

    </div>
</template>

<script>
    export default {
        name: "Setusername",
        data(){
            return{
                setusername: "",
                userinfo: [],
                isBtnShow: true,
                isBtn: false,
                isP1: true,
                isP2: false,

            }
        },
        methods: {
            sure(){
                    this.userinfo = JSON.parse(localStorage.getItem("userinfo"));
                    this.userinfo[0].username = this.setusername;
                    localStorage.setItem("userinfo", JSON.stringify(this.userinfo));
                    this.$router.back(-1);
                },
            getvalue() {
                // console.log(111);
                if (this.setusername.length >= 5 ){
                    this.isBtn = true;
                    this.isBtnShow = false;
                    this.isP1 = true;
                    this.isP2 = false;
                } else {
                    this.isBtn = false;
                    this.isBtnShow = true;
                    this.isP2 = true;
                    this.isP1 = false;
                }
            }
        },


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
    .setname {
        width: 15.2rem;
        margin: 1.95rem auto;
    }
    .setname-top {
        padding-top: .4rem;
    }
    input {
        background: none;
        width: 15.2rem;
        border: 1px solid #ddd;
        border-radius: 2px;
        padding: .2rem .1rem;
        line-height: 1.2rem;
        font-size: .7rem;
        display: block;
    }
    .p1 {
        width: 100%;
        font-size: .4rem;
        color: #666;
        padding: .4rem 0 1rem;
    }
    .p2 {
        width: 100%;
        font-size: .58rem;
        color: #ea3106;
        /*padding-top: .1rem;*/
        padding: .4rem 0 1rem;
    }
    .reset {
        width: 100%;
        background: #3199e8;
    }
    button {
        display: block;
        width: 100%;
        background: none;
        line-height: 2rem;
        font-size: .7rem;
        color: #fff;
        opacity: .6;
        transition: all 1s;
        outline: none;
        border: none;
    }
</style>