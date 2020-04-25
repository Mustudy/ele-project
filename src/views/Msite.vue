<template>
    <div class="msiteWarp">
        <!--导航栏-->
        <header>
            <!--去往搜索美食页面-->
            <router-link to="search">
                <i class="el-icon-search"></i>
            </router-link>

            <!--当前搜索的地点-->
            <router-link to="/home">
                <span class="h_city ellipsis">{{cityInfo ? cityInfo.name : ""}}</span>
            </router-link>


            <!--个人中心-->
            <router-link to="/login" v-if="login">
                <!--<i class="el-icon-user"></i>-->
               <span>登录|注册</span>
            </router-link>

            <router-link to="/profile" v-if="name">
                <i class="el-icon-user" style="font-size: 1rem"></i>
                <!--<span>登录|注册</span>-->
            </router-link>

        </header>

        <!--轮播图-->
        <nav class="msite_nav">
            <div class="swiper-container">
                <div class="swiper-wrapper">

                    <div class="swiper-slide">
                        <div>
                            <div v-for="f in foodInfo1" :key="f.id" @click="gofood(f)">
                                <img :src=" 'https://fuss10.elemecdn.com/' + f.image_url">
                                <span>{{f.title}}</span>
                            </div>
                        </div>
                    </div>

                    <div class="swiper-slide">
                        <div>
                            <div v-for="f in foodInfo2" :key="f.id">
                                <img :src=" 'https://fuss10.elemecdn.com/' + f.image_url">
                                <span>{{f.title}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 如果需要分页器 -->
                <div class="swiper-pagination"></div>

            </div>

        </nav>

        <!--商家列表-->
        <div class="shop_list_container">

                <div class="shop_header">
                    <i class="el-icon-s-shop"></i>
                    <span class="shop_header_title">附近商家</span>
                </div>

                <div class="shop_list">
                    <ul>
                        <li class="shop_li" v-for="item in shopList" :key="item.id" @click="goshop(item)">
                            <section>
                                <img :src="'https://elm.cangdu.org/img/' + item.image_path" alt="" class="shop_img">
                            </section>

                            <div class="shop_right">
                                <!--右边头部-->
                                <div class="shop_detail_header">
                                    <h4 class="shop_title_premium">
                                        <span class="pingpai">品牌</span>
                                        <p>{{item.name}}</p>
                                    </h4>
                                    <!--保准票三个小字-->
                                    <ul class="shop_detail_ul">
                                        <li class="supports">{{item.supports[0].icon_name}}</li>
                                        <li class="supports">{{item.supports[1].icon_name}}</li>
                                        <li class="supports">票</li>
                                    </ul>
                                </div>
                                <!--右边中间部分-->
                                <div class="shop_right_center">

                                        <div class="shop_right_center_left">
                                            <el-rate
                                                    v-model='item.rating'
                                                    disabled
                                                    show-score
                                                    text-color="#ff9900"
                                                    score-template="{value}">
                                            </el-rate>
                                            <span>月售{{item.recent_order_num}}单</span>
                                        </div>

                                        <div class="shop_right_center_right">
                                            <span>{{item.delivery_mode.text}}</span>
                                            <span>{{item.supports[1].name}}</span>
                                        </div>
                                </div>
                                <!--右边下边部分-->
                                <div class="fee_distance">
                                    <p class="fee_left">
                                        ¥{{item.float_minimum_order_amount}}起送<span>/</span>配送费约¥{{item.float_delivery_fee}}
                                    </p>
                                    <p class="distance_time">
                                    <span>{{item.distance}}</span>
                                    <span>/</span>
                                    <span class="order_time">{{item.order_lead_time}}</span>
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

                <!--商店首页底部-->
            <div class="footer">
                <router-link to="">
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
                <router-link to="/profile">
                    <i class="el-icon-s-custom icon_style"></i>
                    <span>我的</span>
                </router-link>
            </div>

        </div>
    </div>
</template>

<script>
    import Swiper from 'swiper';
    export default {
        name: "Msite",
        data(){
            return{
                cityinfo:"",
                geohash: 0,
                latitude: 0,
                longitude: 0,
                cityInfo: null,
                foodInfo: null,
                foodInfo1: null,
                foodInfo2: null,
                shopList:[],
                value: "",
                //显示登录注册
                login: true,
                //显示用户的小人
                name: false,
            }
        },
        created(){
            // 获取params传递来的城市经纬度，根据经纬度发起来网络请求获取城市信息
            this.cityinfo = JSON.parse(localStorage.getItem("placeNameHistory"));
            // console.log(this.cityinfo);
            this.geohash = this.cityinfo.geohash;
            this.latitude = this.cityinfo.latitude;
            this.longitude = this.cityinfo.longitude;

            // this.geohash = this.$store.state.geohash;
            // this.latitude = this.$store.state.latitude;
            // this.longitude = this.$store.state.longitude;

            // console.log(this.geohash);
            // console.log(this.mName);
            this.axios.get("/v2/pois/"+this.latitude +','+this.longitude).then(res=>{
                // console.log(res);
                this.cityInfo = res;
            }).catch(err=>{});

            //进入该页面之前，先查看用户是否登录，如果有就展示用户的小人
            if (localStorage.getItem("userinfo")) {
                this.userinfo = JSON.parse(localStorage.getItem("userinfo"));
                //显示登录注册按钮
                this.login = false;
                //显示头像小人
                this.name = true;
            }

            //发送网络请求  请求到食品分类列表
            this.axios.get("/v2/index_entry").then(res=>{
                // console.log(res);
                this.foodInfo = res;

                this.foodInfo1 = res.slice(0,8);
                this.foodInfo2 = res.slice(8,16);
                // console.log(this.foodInfo1);
            }).catch(err=>{});

            //发送网络请求  请求到附近商家列表
            this.axios.get('/shopping/restaurants?latitude=' +
                this.latitude + '&longitude=' + this.longitude + '').then((res) => {
                this.shopList = res;
                // this.value = res.rating;
                // console.log(res)
            });

        },
        mounted(){
            new Swiper ('.swiper-container', {
                direction: 'horizontal',
                // loop: true,
                // 如果需要分页器
                pagination: {
                    el: '.swiper-pagination',
                },

            })
        },
        methods: {
            //轮播图的点击事件，去往分类页面
            gofood(f) {
                // console.log(f);
                this.$router.push({name:'f', params: {head:f.title,latitude: this.latitude,longitude: this.longitude}});
            },
            //店铺的点击事件，去往店铺首页shop
            goshop(item) {
                // console.log(item);
                this.$router.push({path:'/shop',query:{geohash:  this.geohash, id:item.id}});


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
        height: 1.95rem
    }
    header>a:nth-child(1) {
        left: .8rem;
        width: .9rem;
        height: .9rem;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        color: #fff;
    }
    header>a:nth-child(2) {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 50%;
        color: #fff;
        text-align: center;
        /*margin-left: -.5rem;*/
        text-decoration: none;
    }
    header>a:nth-child(2) > span {
        font-size: .8rem;
        color: #fff;
        text-align: center;
        display: block;

    }
    header>a:nth-child(3) {
        right: .55rem;
        font-size: .65rem;
        color: #fff;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        text-decoration: none;

    }
    header>a:nth-child(3) > span {
        color: #fff;
    }
    .msite_nav {
        padding-top: 2.1rem;
        background-color: #fff;
        border-bottom: .025rem solid #e4e4e4;
        width: 100%;
        height: 10.6rem;
        box-sizing: border-box;
    }
    .swiper-container {
        width: 100%;
        height: 90%;
        padding-bottom: .6rem;
    }
    .swiper-slide > div {
        width: 100%;
        height: 100%;
    }
    .swiper-slide > div > div{
        width: 25%;
        height: 50%;
        /*border: 1px solid black;*/
        /*box-sizing: border-box;*/
        float: left;
        padding: .3rem 0;
        /*display: flex;*/
        /*justify-content: center;*/
        /*align-content: space-around;*/
        /*flex-wrap: wrap;*/
        position: relative;
        box-sizing: border-box;
    }
    .swiper-slide > div > div > img {
        margin-bottom: .3rem;
        width: 1.8rem;
        height: 1.8rem;
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .swiper-slide > div > div > span {
        text-align: center;
        font-size: .5rem;
        color: #666;
        position: absolute;
        top: 80%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .shop_list_container{
        margin-top: .4rem;
        border-top: .025rem solid #e4e4e4;
        background-color: #fff;
    }
    .el-icon-s-shop {
        color: #999;
        margin-left: .6rem;
        vertical-align: middle;
        width: .6rem;
        height: .6rem;
    }
    .shop_header_title{
        margin-left: .6rem;
        color: #999;
        font: .55rem/1.6rem Microsoft YaHei;
    }
    .shop_list {
        background-color: #fff;
        margin-bottom: 2rem
    }
    ul > li {
        display: flex;
        border-bottom: .025rem solid #f1f1f1;
        padding: .7rem .4rem
    }
    .shop_img {
        width: 2.7rem;
        height: 2.7rem;
        display: block;
        margin-right: .4rem
    }
    .shop_right{
        /*display: flex;*/
        /*justify-content: space-between;*/
        /*align-items: center;*/
        flex: auto;
    }
    .shop_detail_header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        /*background-color: blue;*/
    }
    .shop_title_premium{
        width: 8.5rem;
        color: #333;
        padding-top: .01rem;
        font: .65rem/.65rem PingFangSC-Regular;
        font-weight: 700;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap
    }
    .pingpai{
        content: "\54C1\724C";
        font-size: .5rem;
        line-height: .6rem;
        color: #333;
        background-color: #ffd930;
        padding: 0 .1rem;
        border-radius: .1rem;
        margin-right: .2rem;
    }
     .shop_title_premium > p {
        font-size: .8rem;
        display: inline-block;
        font-weighteight: bold;
        padding: .1rem 0rem
    }
    .shop_detail_ul{
        display: flex;
        transform: scale(.8);
        margin-right: -.3rem;
    }
    .supports{
        font-size: .5rem;
        color: #999;
        border: .025rem solid #f1f1f1;
        padding: 0 .04rem;
        border-radius: .08rem;
        margin-left: .05rem;
    }
    .shop_right_center {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: .6rem;
        margin-top: .52rem;
    }
    .shop_right_center_left > div {
        display: flex;
        justify-content: flex-start;
        /*width: 2rem;*/
        /*height: .4rem;*/
        float: left;
    }
    .shop_right_center_left  > span {
        transform: scale(.8);
        /*margin-left: -.2rem;*/
        font-size: .4rem;
        color: #666;
        float: right;
        position: relative;
        top: .08em;
    }
     .shop_right_center_right{
        display: flex;
        align-items: center;
        transform: scale(.7);
        min-width: 5rem;
        justify-content: flex-end;
        margin-right: -.8rem;
         font-size: .6rem;
    }
    .shop_right_center_right > span:nth-child(1){
        color: #fff;
        background-color: #3190e8;
        border: .025rem solid #3190e8;
        padding: .04rem .08rem 0;
        border-radius: .08rem;
        margin-left: .08rem
    }
    .shop_right_center_right > span:nth-child(2){
        color: #3190e8;
        border: .025rem solid #3190e8;
        padding: .04rem .08rem 0;
        border-radius: .08rem;
        margin-left: .08rem
    }
    .fee_distance {
        width: 100%;
        margin-top: .52rem;
        display: flex;
        justify-content: space-between;
        font-size: .5rem;
        color: #333;
    }
    .fee_left {
        font-size: .5rem;
        color: #666;
    }
     .distance_time{
        color: #999;
         transform: scale(.9);
    }
    .order_time {
        color: #3190e8;
    }
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
    .footer > a:nth-child(1) > i {
        color: #3190e8;
     }
    /*.msiteWarp {*/
        /*overflow: hidden;*/
    /*}*/
</style>

<style>
    .el-rate__icon  {
        font-size: .5rem;
        margin-right: 0px;
    }
    .el-rate__text {
        font-size: .5rem;
    }
</style>