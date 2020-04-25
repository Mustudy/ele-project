<template>
    <div class="addaddressWarp">
        <header class="forget_top">
            <i class="el-icon-arrow-left" @click="$router.back(-1)"></i>
            <span class="my">新增地址</span>
        </header>

        <section class="adddetail">
            <section class="ui-padding-block">
                <div class="input-new">
                    <input type="text" placeholder="请填写你的姓名" v-model="name">
                </div>
                <div class="input-new" @click="gosearch">
                    <input type="text" placeholder="小区/写字楼/学校等" v-model="address">
                </div>
                <div class="input-new">
                    <input type="text" placeholder="请填写详细送餐地址" v-model="gofood" @keyup="getvalue">
                    <p class="p1" v-if="isP1">送餐地址太短了，不能辨识</p>
                </div>
                <div class="input-new">
                    <input type="text" placeholder="请填写能够联系到您的手机号" v-model="phone" @keyup="getvalue2" maxlength="11">
                    <p class="p1" v-if="isP2">请输入正确的手机号</p>
                </div>
                <div class="input-new">
                    <input type="text" placeholder="备用联系电话（选填）" v-model="shouji" @keyup="getvalue3" maxlength="11">
                    <p class="p1" v-if="isP3">请输入正确的手机号</p>
                </div>
            </section>

            <section class="addbutton" @click="sure">
                <button>新增地址</button>
            </section>
        </section>



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


        <!--搜索地址-->
        <div class="rating_page" v-if="isShow2">
            <header class="forget_top">
                <i class="el-icon-arrow-left" @click="return2"></i>
                <span class="my">搜索地址</span>
            </header>

            <section>
                <div class="add-detail">
                    <input type="text" placeholder="请输入小区/写字楼/学校等" v-model="search">
                    <button @click="searchsure">确认</button>
                </div>
                <div class="warnpart">为了满足商家的送餐要求，建议您从列表中选择地址</div>

                <div class="point" v-if="isShow3">
                    <p>找不到地址？</p>
                    <p>请尝试输入小区、写字楼或学校名</p>
                    <p>详细地址（如门牌号）可稍后输入哦。</p>
                </div>
            </section>

            <!--搜索内容-->
            <section class="poisearch-container">
                <ul>
                    <li v-for="pro in addressArr" :key="pro.geohashgeohash" @click="choose(pro)">
                        <p>{{pro.name}}</p>
                        <p>{{pro.address}}</p>
                    </li>
                </ul>
            </section>
        </div>
    </div>
</template>

<script>
    export default {
        name: "addAddress",
        data() {
            return{
                userid:0,
                name:"",
                address:"",
                gofood:"",
                phone:null,
                shouji:null,
                isP1:false,
                isP2:false,
                isP3:false,
                showcom:false,
                content:"地址信息错误",
                //中间的提示内容
                isShow3:true,
                //搜索地址
                isShow2:false,
                search:"",
                addressArr:[],
            }
        },
        created() {
            if (localStorage.getItem("userinfo")) {
                this.userinfo = JSON.parse(localStorage.getItem("userinfo"));
                this.userid = this.userinfo[0].user_id;
                // console.log(this.userid);

            }
        },
        methods: {
            getvalue(){
                if (this.gofood.length >= 1 && this.gofood.length <= 6){
                    this.isP1 = true;
                }else {
                    this.isP1 = false;
                }
            },
            getvalue2() {
                if (this.phone.length >= 1 && this.phone.length <= 10){
                    this.isP2 = true;
                }else {
                    this.isP2 = false;
                }
            },
            getvalue3() {
                if (this.shouji.length >= 1 && this.shouji.length <= 10){
                    this.isP3 = true;
                }else {
                    this.isP3 = false;
                }
            },
            gosearch() {
              this.isShow2 = true;
            },
            return2() {
                this.isShow2 = false;
            },
            //搜索确认的点击事件
            searchsure(){
                this.axios.get("v1/pois", {
                    params: {
                        city_id:this.search,
                        keyword:this.search,
                        type:"search"
                    }
                }).then(res=>{
                    // console.log(res);
                    this.addressArr = res;
                    this.isShow3 = false;
                }).catch(err=>{
                    console.log(err)
                })
            },
            //选择具体的地址
            choose(i) {
                this.isShow2 = false;
                this.address = i.name;
            },
            //增加按钮的点击事件
            sure() {
                if (this.name.length === 0) {
                    //弹出提示框
                    this.content = '请输入你的大名';
                    this.showcom = true;
                } else if (this.address.length === 0) {
                    //弹出提示框
                    this.content = '请输入地址';
                    this.showcom = true;
                } else if (this.gofood.length === 0) {
                    //弹出提示框
                    this.content = '请输入具体地址';
                    this.showcom = true;
                } else if (this.phone.length === 0) {
                    //弹出提示框
                    this.content = '请输入手机号';
                    this.showcom = true;
                }  else {
                    this.axios.post("/v1/users/"+this.userid+"/addresses", {
                        user_id: this.userid,
                        address: this.address,
                        address_detail: this.gofood,
                        geohash:"0",
                        name: this.name,
                        phone: this.phone,
                        tag:'公司',
                        sex:'1',
                        poi_type:0,
                        phone_bk: this.shouji,
                        tag_type:'4',
                    }).then(res => {
                        // console.log(res);
                        this.$router.push("/address");
                    }).catch(err => {
                        console.log(err);
                    })
                }

            },
            get() {
                this.showcom = false;
            }

        }
    }
</script>

<style scoped>
    .addaddressWarp {
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

    .adddetail {
        margin-top: .4rem;
    }
    .ui-padding-block {
        background: #fff;
        padding-top: .4rem;
    }
    .input-new {
        padding-bottom: .4rem;
    }
    .input-new > input {
        display: block;
        width: 14.5rem;
        font-size: .6rem;
        margin: .2rem auto;
        padding: .3rem;
        background: #f2f2f2;
        border: 1px solid #ddd;
        border-radius: 3px;
        outline: none;
    }
    .p1 {
        font-size: .4rem;
        color: #ea3106;
        padding-left: .5rem;
        margin-top: .2rem;
    }

    .addbutton {
        margin: .6rem auto;
        width: 15rem;
        background: #4cd964;
        border-radius: 3px;
    }
    .addbutton > button {
        width: 100%;
        font-size: .6rem;
        color: #fff;
        line-height: 1.6rem;
        background: none;
        font-weight: 700;
        /*opacity: .6;*/
        border: none;
    }



    /*搜索地址*/
    .rating_page {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f2f2f2;
        z-index: 205;
        padding-top: 1.95rem;
    }
    .add-detail {
        display: flex;
        justify-content: space-between;
        background: #fff;
        padding: .5rem;
    }
    .add-detail > input {
        display: block;
        width: 11.8rem;
        padding: .4rem;
        background: #f2f2f2;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: .6rem;
        outline: none;
    }
    .add-detail > button {
        display: block;
        width: 3rem;
        background: #3199e8;
        font-size: .7rem;
        color: #fff;
        border-radius: 5px;
        border: none;
        margin-left: .2rem;
    }
    .warnpart {
        background: #fff6e4;
        font-size: .62rem;
        color: #ff883f;
        text-align: center;
        padding: .2rem 0;
    }
    .point {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 100%;
    }
    .point > p {
        width: 100%;
        text-align: center;
        font-size: .7rem;
        color: #969696;
        margin-bottom: .6rem;
    }
    /*搜索内容*/
    .poisearch-container {
        background: #f2f2f2;
        z-index: 300;
    }
    .poisearch-container > ul > li {
        border-bottom: 1px solid #ccc;
        padding: .4rem;
    }
    .poisearch-container > ul > li > p:nth-of-type(1){
        margin-bottom: .4rem;
        font-size: .65rem;
        color: #969696;
    }
    .poisearch-container > ul > li > p:nth-of-type(2){
        /*margin-bottom: .2rem;*/
        font-size: .65rem;
        color: #969696;
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