<template>
    <div class="orderWarp">
        <header class="forget_top">
            <i class="el-icon-arrow-left" @click="$router.back(-1)"></i>
            <span class="my">订单列表</span>
        </header>


        <ul class="order_list_ul">
            <li class="order_list_li" v-for="(item,i) in order" :key="item.restaurant_id">
                <img :src="'https://elm.cangdu.org/img/' + item.restaurant_image_url" alt="" class="restaurant_image">
                <section class="order_item_right">
                    <!--右上-->
                    <section>
                        <div class="order_item_right_header" @click="orderForm(item)">
                            <section class="order_header">
                                <h4>
                                    <span class="ellipsis">{{item.restaurant_name}}</span>
                                    <i class="el-icon-arrow-right"></i>
                                </h4>
                                <p class="order_time">{{item.formatted_created_at}}</p>
                            </section>
                            <p class="order_status">{{item.status_bar.title}}</p>
                        </div>
                        <section class="order_basket">
                            <p class="order_name ellipsis">{{item.basket.group[0][0].name}}</p>
                            <p class="order_amount">￥{{item.total_amount}}</p>
                        </section>
                    </section>
                    <!--再来一单-->
                    <div class="order_again">
                        <span class="buy_again" @click="recur(item)">再来一单</span>
                    </div>
                </section>
            </li>
        </ul>

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
            <router-link to="">
                <i class="el-icon-s-fold icon_style"></i>
                <span>订单</span>
            </router-link>
            <router-link to="/profile">
                <i class="el-icon-s-custom icon_style"></i>
                <span>我的</span>
            </router-link>
        </div>


        <!--订单详情-->
        <div class="order_detail_page" v-if="isDetail">
            <header class="forget_top">
                <i class="el-icon-arrow-left" @click="goOrder"></i>
                <span class="my">订单详情</span>
            </header>

            <section class="scroll_section">
                <section class="order_titel">
                    <img :src="'https://elm.cangdu.org/img/' + orderDetail.restaurant_image_url" alt="">
                    <p>{{orderDetail.status_bar.title}}</p>
                    <p></p>
                    <div @click="recur2">再来一单</div>
                </section>

                <section class="food_list">
                    <div @click="recur2">
                        <div class="shop_name">
                            <img :src="'https://elm.cangdu.org/img/' + orderDetail.restaurant_image_url" alt="">
                            <span>{{orderDetail.restaurant_name}}</span>
                        </div>
                        <i class="el-icon-arrow-right"></i>
                    </div>
                    <ul class="food_list_ul">
                        <li v-for="(pro, index) in orderDetail.basket.group[0]" :key="index">
                            <p class="food_name ellipsis">{{pro.name}}</p>
                            <div class="quantity_price">
                                <span>✖{{pro.quantity}}</span>
                                <span>￥{{pro.price}}</span>
                            </div>
                        </li>

                    </ul>
                    <div class="deliver_fee">
                        <span>{{orderDetail.basket.deliver_fee.name}}</span>
                        <span>{{orderDetail.basket.deliver_fee.price}}</span>
                    </div>
                    <div class="pay_ment">实付{{orderDetail.total_amount}}.00</div>
                </section>
            </section>

            <section class="order_detail_style">
                <div class="">配送消息</div>
                <section class="item_style">
                    <p class="item_left">送达时间：</p>
                    <div class="item_right">
                        <p></p>
                    </div>
                </section>
                <section class="item_style">
                    <p class="item_left">送货地址：</p>
                    <div class="item_right">
                        <p></p>
                    </div>
                </section>
                <section class="item_style">
                    <p class="item_left">配送方式：蜂鸟专送</p>
                    <div class="item_right">
                        <p></p>
                    </div>
                </section>
            </section>


            <section class="order_detail_style">
                <div class="">订单消息</div>
                <section class="item_style">
                    <p class="item_left">订单号：{{orderDetail.unique_id}}</p>
                    <div class="item_right">
                        <p></p>
                    </div>
                </section>
                <section class="item_style">
                    <p class="item_left">支付方式：在线支付</p>
                    <div class="item_right">
                        <p></p>
                    </div>
                </section>
                <section class="item_style">
                    <p class="item_left">下单时间：{{orderDetail.formatted_created_at}}</p>
                    <div class="item_right">
                        <p></p>
                    </div>
                </section>
            </section>
        </div>
    </div>

</template>

<script>
    export default {
        name: "Order",
        data() {
            return{
                userinfo:[],
                userid: 0,
                order: "",
                // 订单详情
                isDetail: false,
                orderDetail:"",
                geohash:""
            }
        },
        created() {
            if (localStorage.getItem("userinfo")) {
                this.userinfo = JSON.parse(localStorage.getItem("userinfo"));
                // console.log(this.userinfo)
                // this.gift = this.userinfo[0].gift_amount;
                this.userid = this.userinfo[0].user_id;
                // console.log(this.userid);
                this.axios.get("/bos/v2/users/"+this.userid+"/orders?limit=" + 10 + "&offset=" + 0).then(res=>{
                    // console.log(res);
                    this.order = res;
                    console.log(this.order);
                }).catch(err=>{});
            }
        },
        methods: {
            orderForm(item) {
                console.log(item);
                this.isDetail = true;
                this.orderDetail = item;
            },
            goOrder() {
                this.isDetail = false;
            },
            // 再来一单
            recur(i) {
                // console.log(i);
                this.geohash = this.$store.state.geohash;
                // console.log(this.geohash);
                this.$router.push({path:'/shop',query:{geohash:  this.geohash, id:i.restaurant_id}});
            },
            recur2() {
                // console.log(222);
                this.$router.push({path:'/shop',query:{geohash:  this.geohash, id:this.orderDetail.restaurant_id}});
            }
        }


    }
</script>

<style scoped>
    .orderWarp {
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
    .order_list_li {
        background-color: #fff;
        display: flex;
        margin-bottom: .5rem;
        padding: .6rem .6rem 0;
    }
    .restaurant_image {
        width: 2rem;
        height: 2rem;
        margin-right: .4rem;
    }
    .order_item_right {
        flex: 5;
    }
    .order_item_right_header {
        border-bottom: .025rem solid #f5f5f5;
        padding-bottom: .3rem;
        display: flex;
        justify-content: space-between;
    }
    .order_basket {
        display: flex;
        justify-content: space-between;
        line-height: 2rem;
        border-bottom: .025rem solid #f5f5f5;
    }
    .order_time {
        font-size: .55rem;
        color: #999;
        line-height: .8rem;
    }
    .order_status {
        font-size: .6rem;
        color: #333;
    }
   h4 {
       display: flex;
       align-items: center;
       justify-content: flex-start;
       font-size: .75rem;
       color: #333;
       line-height: 1rem;
       width: 9rem;
   }
    .order_name {
        font-size: .6rem;
        color: #666;
        width: 10rem;
    }
    .order_amount {
        font-size: .6rem;
        color: #f60;
        font-weight: 700;
    }
    .order_again {
        text-align: right;
        line-height: 1.6rem;
    }
    .buy_again {
        font-size: .55rem;
        color: #3190e8;
        border: .025rem solid #3190e8;
        padding: .1rem .2rem;
        border-radius: .15rem;
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
    .footer > a:nth-child(3) > i {
        color: #3190e8;
    }

    /*订单详情*/
    .order_detail_page {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f1f1f1;
        z-index: 202;
        padding-top: 1.95rem;
        overflow: scroll;
    }
    .order_titel {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: .7rem;
        background-color: #fff;
        margin-bottom: .5rem;
    }
    .order_titel > img {
        border: .05rem solid #3190e8;
        border-radius: 50%;
        width: 3rem;
        height: 3rem;
    }
    .order_titel > p {
        font-size: .9rem;
        color: #333;
        font-weight: 700;
        margin-top: .4rem;
    }
    .order_titel > div {
        font-size: .6rem;
        color: #3190e8;
        margin-top: .5rem;
        border: .025rem solid #3190e8;
        padding: .15rem .4rem;
        border-radius: .1rem
    }
    .food_list {
        background-color: #fff;
    }
    .food_list > div:nth-of-type(1) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: .2rem .5rem;
        border-bottom: 1px solid #f5f5f5;
    }
    .shop_name > img {
        width: 1.2rem;
        height: 1.2rem;
        vertical-align: middle;
        margin-right: .4rem;
    }
    .shop_name > span {
        font-size: .75rem;
        color: #333;
        font-weight: 700;
    }
    .food_list_ul > li{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 .5rem;
        line-height: 2rem;
    }
    .food_name {
        font-size: .6rem;
        color: #666;
        flex: 4
    }
    .quantity_price {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .quantity_price > span:nth-of-type(1) {
        font-size: .6rem;
        color: #ccc;
    }
    .quantity_price > span:nth-of-type(2) {
        font-size: .6rem;
        color: #666;
    }
    .deliver_fee {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 .5rem;
        line-height: 2rem;
        border-top: 1px solid #f5f5f5;
    }
    .deliver_fee > span {
        font-size: .6rem;
        color: #666;
    }
    .pay_ment {
        font-size: .6rem;
        color: #fb6b23;
        border-top: 1px solid #f5f5f5;
        font-weight: 700;
        line-height: 2rem;
        text-align: right;
        padding-right: .5rem;
    }

    .order_detail_style {
        background-color: #fff;
        margin-top: .5rem;
    }
    .order_detail_style > div:nth-of-type(1) {
        font-size: .75rem;
        color: #333;
        padding: .5rem;
        border-bottom: 1px solid #f5f5f5;
    }
    .item_style {
        display: flex;
        padding: .5rem;
    }
    .item_left {
        font-size: .65rem;
        color: #666;
        line-height: 1rem;
    }
    .item_right > p {
        font-size: .65rem;
        color: #666;
        line-height: 1rem;
    }
</style>