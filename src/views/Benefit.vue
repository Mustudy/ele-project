<template>
    <div class="benefitWarp">
        <!--头部-->
        <header class="benefit_top">
            <i class="el-icon-arrow-left" @click="$router.back(-1)"></i>
            <span class="my">我的优惠</span>
        </header>

        <section>
            <section class="category_title">
                <span class="choosed" @click="gored" :style="{'color' : isRed ? '#3190e8' : '#333', 'border-bottom-color' : isRed ? '#3190e8' : '#fff'}">红包</span>
                <span class="choose" @click="goshop" :style="{'color' : isShop ? '#3190e8' : '#333', 'border-bottom-color' : isShop ? '#3190e8' : '#fff'}">商家代金券</span>
            </section>

            <!--红包-->
            <section v-if="isRed">
                <section class="hongbao_container">
                    <div class="hongbao_title">
                        <section class="total_number">有 <span style="color: red">{{gift ? gift : 0}}</span> 个红包即将到期</section>
                        <section class="hongbao_description" @click="isHong">
                            <img src="../assets/description.png" alt="">
                            <span style="color: #3190e8">红包说明</span>
                        </section>
                    </div>
                    <ul class="hongbao_list_ul">
                        <li class="hongbao_list_li" v-for="item in hongArr">
                            <section class="list_item">
                                <div class="list_item_left">
                                    <span>￥</span>
                                    <span>{{item.amount}}</span>
                                    <!--<span>1</span>-->
                                    <!--<span></span>-->
                                    <!--<span></span>-->
                                    <p>{{item.description_map.sum_condition}}</p>
                                </div>
                                <div class="list_item_right">
                                    <h4>{{item.name}}</h4>
                                    <p>{{item.description_map.validity_periods}}</p>
                                    <p>{{item.description_map.phone}}</p>
                                </div>
                                <div class="time_left">{{item.description_map.validity_delta}}</div>
                            </section>
                            <footer class="list_item_footer">
                                <p>{{item.limit_map ? item.limit_map.restaurant_flavor_ids : ""}}</p>
                            </footer>
                        </li>
                    </ul>
                </section>

                <div class="history_hongbao" @click="gohistory">
                    <span class="check_history">查看历史红包</span>
                    <i class="el-icon-arrow-right"></i>
                </div>

                <footer class="hongbao_footer">
                    <router-link to="/exchange" style="border-right: 1px solid rgb(245, 245, 245);">兑换红包</router-link>
                    <router-link to="/commend">推荐有奖</router-link>
                </footer>
            </section>

            <!--商家优惠券-->
            <section class="voucher_container" v-if="isShop">
                <section class="hongbao_description voucher_header" @click="isHong2">
                    <img src="../assets/description.png" alt="">
                    <span style="color: #3190e8">商家代金券说明</span>
                </section>
                <section class="unable_use">
                    <img src="../assets/voucher.png" alt="">
                    <p>无法使用代金券</p>
                    <p>非客户端或客户端版本过低</p>
                    <router-link to="/download">
                        下载或升级客户端
                    </router-link>
                </section>
            </section>
        </section>




        <!--红包说明-->
        <div class="page" v-if="ishongShow">
            <header class="profile_top">
                <i class="el-icon-arrow-left" @click="returnMy"></i>
                <span class="my">红包说明</span>
            </header>

            <div class="markdown">
                <h3>Q1: 怎么获得红包？</h3>
                <p>通过邀请好友获得 <br>在下单返红包的商家下单获得 <br>抢微信朋友分享的红包获得</p>
                <h3>Q2: 红包可以做什么？</h3>
                <p>可以抵扣在线支付时的实际支付金额。</p>
                <h3>Q3: 红包的门槛金额按照什么金额计算？</h3>
                <p>红包的的门槛金额按照（选购菜品折后价＋餐盒费）的金额作为计算门槛，即购物车显示的金额（7.3以上版本）。假设红包满30可用，只要选购的菜品现价（折后价）＋餐盒费超过30，就可以使用红包。</p>
                <h3>Q4: 一个红包能拆开多次使用吗？</h3>
                <p>不能，一个红包只能一次性使用，不能分开使用。</p>
                <h3>Q5: 下单的时候使用了红包，但是后来订单取消了，红包还会返还吗？</h3>
                <p>会的，订单无效后红包会自动返还到您的账户里。</p>
                <h3>Q6: 红包兑换码怎样兑换成红包，怎样查看红包？</h3>
                <p>在个人中心 > 我的红包 > 兑换红包，输入兑换码进行兑换。</p>
            </div>
        </div>


        <!--商家代金券说明-->
        <div class="page" v-if="ishongShow2">
            <header class="profile_top">
                <i class="el-icon-arrow-left" @click="returnMy"></i>
                <span class="my">代金券说明</span>
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
        name: "Benefit",
        data(){
            return{
                userinfo:[],
                userid: 0,
                gift: "",
                hongArr: [],
                //红包说明的显隐
                ishongShow: false,
                //商家优惠券的显隐
                isShop: false,
                isRed: true,
                //商家代金券说明的显隐
                ishongShow2: false,
            }
        },
        created(){
            if (localStorage.getItem("userinfo")) {
                this.userinfo = JSON.parse(localStorage.getItem("userinfo"));
                // console.log(this.userinfo)
                this.gift = this.userinfo[0].gift_amount;
                this.userid = this.userinfo[0].user_id;
                // console.log(this.userid);


                this.axios.get("/promotion/v2/users/"+this.userid+"/hongbaos?limit=" + 20 + "&offset=" + 0).then(res=>{
                    // console.log(res);
                    this.hongArr = res;
                    console.log(this.hongArr);
                }).catch(err=>{});

            }


        },
        methods: {
            isHong() {
                this.ishongShow = true;
            },
            returnMy() {
                this.ishongShow = false;
                this.ishongShow2 = false;
            },
            goshop() {
                this.isShop = true;
                this.isRed = false;
            },
            gored() {
                this.isRed = true;
                this.isShop = false;
            },
            isHong2() {
                this.ishongShow2 = true;
            },
            gohistory() {
                this.$router.push("/hbhistory");
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
    .benefitWarp {
        padding-top: 1.95rem;
    }
    .category_title {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 2rem;
        background-color: #fff;
    }
    .choosed {
        text-align: center;
        font-size: .65rem;
        padding-bottom: .2rem;
        border-bottom: .1rem solid #3190e8;
        /*border-bottom-color: #3190e8;*/
        color: #3190e8;
    }
    .choose {
        text-align: center;
        font-size: .65rem;
        color: #333;
        padding-bottom: .2rem;
        border-bottom: .1rem solid #fff;
    }
    .hongbao_container {
        padding: 0 .7rem;
    }
    .hongbao_title {
        display: flex;
        justify-content: space-between;
        font-size: .5rem;
        line-height: 2rem;
    }
    .total_number {
        color: #666
    }
    .hongbao_description {
        display: flex;
        align-items: center;
    }
    .hongbao_description > img {
        width: .6rem;
        height: .6rem;
        margin-right: .2rem;
    }
    .hongbao_list_li {
        background: #fff url("../assets/hongbao.png") repeat-x;
        background-size: .5rem .2rem;
        margin-bottom: .5rem;
        border-radius: .25rem;
    }
    .list_item {
        display: flex;
        justify-content: space-between;
        padding: 1rem .5rem .8rem;
    }
    .list_item_left {
        /*font-size: 0;*/
        border-right: .025rem dotted #ccc;
        flex: 1;
    }
    .list_item_left > span:nth-of-type(1) {
        font-size: .75rem;
        color: #ff5340;
        font-weight: 700;
    }
    .list_item_left > span:nth-of-type(2) {
        font-size: 1.5rem;
        color: #ff5340;
        /*font-weight: 700;*/
    }
    .list_item_left > p {
        font-size: .4rem;
        color: #999;
        margin-top: .2rem;
    }
    .list_item_right {
        flex: 2;
        margin-left: 1.5rem;
    }
    .list_item_right > h4 {
        font-size: .7rem;
        color: #666;
        margin-left: -.7rem;
    }
    .list_item_right > p {
        list-style-type: disc;
        margin-left: -.7rem;
        font-size: .4rem;
        color: #999;
        margin-top: .2rem;
    }
    .time_left {
        font-size: .75rem;
        color: #ff5340;
    }
    .list_item_footer {
        background-color: #f9f9f9;
        padding: .4rem;
        border-bottom-left-radius: .25rem;
        border-bottom-right-radius: .25rem;
    }
    .list_item_footer > p{
        list-style-type: disc;
        font-size: .4rem;
        color: #999;
        margin-left: .4rem;
    }
    .history_hongbao {
        padding: .5rem 0 2.8rem;
        display: flex;
        align-items: center;
        justify-content: center
    }
    .check_history {
        font-size: .5rem;
        color: #999;
        margin-right: .2rem;
    }
    .history_hongbao > i {
       font-size: .6rem;
        color: #aaa;
    }
    .hongbao_footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        background-color: #fff;
        display: flex;
    }
    .hongbao_footer > a {
        flex: 1;
        line-height: 2rem;
        text-align: center;
        font-size: .7rem;
        color: #555;
    }


    /*红包说明*/
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

    /*商家优惠券*/
    .voucher_header {
        font-size: .5rem;
        justify-content: flex-end;
        line-height: 2rem;
        margin-right: .5rem;
    }
    .unable_use {
        text-align: center;
        margin-top: 4rem;
    }
    .unable_use > img {
        width: 6rem;
        height: 3.4rem;
    }
    .unable_use > p:nth-of-type(1) {
        font-size: .7rem;
        color: #666;
        margin-top: .4rem;
    }
    .unable_use > p:nth-of-type(2) {
        font-size: .5rem;
        color: #999;
        margin-top: .3rem;
        margin-bottom: .3rem;
    }
    .unable_use > a {
        /*width: 50%;*/
        background-color: #56d176;
        font-size: .65rem;
        color: #fff;
        padding: .3rem;
        border-radius: .15rem;
    }
</style>