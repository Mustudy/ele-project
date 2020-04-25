<template>
    <div class="searchWarp">
        <header class="download_top">
            <i class="el-icon-arrow-left" @click="$router.back(-1)"></i>
            <span class="my">搜索</span>
        </header>

        <div class="search_form">
            <input type="text" placeholder="请输入商家或美食名称" v-model="shopName" @keyup="getvalue">
            <button @click="submitsearch">提交</button>
            <i class="el-icon-close" @click="deleteName" v-if="chahao"></i>
        </div>

        <!--搜索商家的内容-->
        <section  v-if="isShop">
            <h4 class="title_restaurant">商家</h4>
            <ul class="list_container">
                <li class="list_li" v-for="item in infoArr" :key="item.id" @click="goshop(item)">
                    <section class="item_left">
                        <img :src="'https://elm.cangdu.org/img/' + item.image_path" alt="" class="shop_img">
                    </section>

                    <section class="item_right">
                        <div class="item_right_text">
                            <p>{{item.name}}
                                <span class="s1">支付</span>
                            </p>
                            <p>月售 {{item.recent_order_num}} 单</p>
                            <p>{{item.float_minimum_order_amount}} 元起送 / 距离 {{item.distance}}</p>
                        </div>
                    </section>
                </li>
            </ul>
        </section>


        <!--搜索历史的内容-->
        <section  v-if="isHistory">
            <h4 class="title_restaurant">搜索历史</h4>
            <ul class="history_container">
                <li class="history_list" v-for="(pro, index) in hisArr" :key="pro">
                    <span class="history_text ellipsis" @click="SearchShop(pro)">{{pro}}</span>
                    <i class="el-icon-close" @click="deleteHis(index)"></i>
                </li>
            </ul>
            <footer class="clear_history" @click="clear">清空历史记录</footer>
        </section>




        <!--底部-->
        <div class="footer">
            <router-link to="/msite">
                <i class="el-icon-eleme icon_style"></i>
                <span>外卖</span>
            </router-link>
            <router-link to="">
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
</template>

<script>
    export default {
        name: "Search",
        data(){
            return{
                cityinfo:"",
                geohash:"",
                shopName:"",
                infoArr:[],
                //商家的显隐
                isShop: false,
                // 历史记录的显隐
                isHistory: false,
                // 历史记录
                hisArr:[],
                chahao:false,
            }
        },

        created(){
            this.cityinfo = JSON.parse(localStorage.getItem("placeNameHistory"));
            // console.log(this.cityinfo);
            this.geohash = this.cityinfo.geohash;
            // console.log(this.geohash);


            //进入该页面之前，先查看是否有历史记录，如果有，展示
            if (localStorage.getItem("searchHistory")) {
                this.hisArr = JSON.parse(localStorage.getItem("searchHistory"));
                //显示历史按钮
                this.isHistory = true;
            }
        },
        methods: {
            submitsearch() {
                this.axios.get("/v4/restaurants?geohash="+this.geohash+"&keyword=" + this.shopName).then(res=>{
                    // console.log(res);
                    this.infoArr = res;
                    // console.log(this.infoArr);
                    this.isShop = true;
                    this.isHistory = false;



                    if (!localStorage.getItem("searchHistory")) {
                        //第一次存
                        let hisArr = [];
                        hisArr.push(this.shopName);
                        localStorage.setItem("searchHistory", JSON.stringify(hisArr));


                    } else {
                        //之后存
                        let hisArr = JSON.parse(localStorage.getItem("searchHistory"));
                        // console.log(hisArr);

                        hisArr.push(this.shopName);

                        //去重逻辑
                        let arr = [];
                        for (let i = 0; i < hisArr.length; i++){
                            arr.push(hisArr[i]);
                        }
                        const set = new Set(arr);
                        hisArr = [...set];


                        localStorage.setItem("searchHistory", JSON.stringify(hisArr));

                    }
                }).catch(err=>{});
            },
            getvalue(){
              if (this.shopName.length >= 1){
                  this.chahao = true;
              } else {
                  this.chahao = false;
              }
            },
            //清空输入框的内容
            deleteName() {
                this.shopName = "";
                this.isShop = false;
                this.isHistory = true;
            },
            //删除某一个历史记录
            deleteHis(p) {
                console.log(p);
                let list = JSON.parse(localStorage.getItem("searchHistory"));
                list.splice(p, 1);
                localStorage.setItem("searchHistory", JSON.stringify(list));

                this.hisArr.splice(p, 1);

                if (this.hisArr.length == 0) {
                    this.isHistory = false;
                    localStorage.removeItem("searchHistory");
                }
            },
            // 清空历史记录
            clear() {
                localStorage.removeItem("searchHistory");
                this.isHistory = false;
            },
            // 历史记录点击事件
            SearchShop(p) {
                this.axios.get("/v4/restaurants?geohash="+this.geohash+"&keyword=" + p).then(res=> {
                    // console.log(res);
                    this.infoArr = res;
                    // console.log(this.infoArr);
                    this.isShop = true;
                    this.isHistory = false;
                }).catch(err=>{});
            },
            // 去往店铺首页
            goshop(item) {
                console.log(item);
                this.$router.push({path:'/shop',query:{geohash:  this.geohash, id:item.id}});
            }
        }
    }
</script>

<style scoped>
    .searchWarp {
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
    .search_form {
        background-color: #fff;
        padding: .5rem;
        display: flex;
    }
    .search_form > i {
        position: absolute;
        top: 10%;
        left: 68%;
        color: blue;
        font-size: 1rem;
    }
    input {
        height: 1.5rem;
        flex: 4;
        border: .025rem solid #e4e4e4;
        font-size: .65rem;
        color: #333;
        border-radius: .125rem;
        background-color: #f2f2f2;
        font-weight: 700;
        padding: 0 .25rem;
        outline: none;
    }
    button {
        flex: 1;
        border: .025rem solid #3190e8;
        margin-left: .2rem;
        font-size: .65rem;
        color: #fff;
        border-radius: .125rem;
        background-color: #3190e8;
        font-weight: 700;
        padding: 0 .25rem;
        outline: none;
    }

    .title_restaurant {
        font-size: .6rem;
        line-height: 2rem;
        text-indent: .5rem;
        font-weight: 700;
        color: #666;
    }
    .list_container {
        background-color: #fff;
        padding-bottom: 1.95rem;
    }
    .list_li {
        display: flex;
        /*justify-content: "center";*/
        padding: .5rem;
        border-bottom: .025rem solid #e4e4e4;
    }
    .item_left {
        margin-right: .3rem;
    }
    .item_left > img {
        width: 1.7rem;
        height: 1.7rem;
    }
    .item_right {
        font-size: .55rem;
        flex: 1;
    }
    .item_right_text {
        padding-bottom: .25rem;
        border-bottom: .025rem solid #e4e4e4;
    }
    .item_right_text > p {
        line-height: .9rem;
    }
    .s1 {
        color: rgb(255, 96, 0);
        font-weight: bold;
        font-size: .4rem;
        border: .02rem solid  rgb(255, 96, 0);
    }

    /*搜索历史*/
    .history_container {
        background-color: #fff;
    }
    .history_list {
        background-color: #fff;
        border-bottom: .025rem solid #e4e4e4;
        font: .7rem/2rem Microsoft YaHei;
        padding: 0 .3rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .history_text {
        display: inline-block;
        width: 80%;
    }
    .history_list > i {
        width: 1rem;
        height: 1rem;
        color: rgb(153, 153, 153);
        font-weight: 900;
        position: relative;
        top: .3rem;
    }
    .clear_history {
        background-color: #fff;
        color: #3190e8;
        font: .7rem/2rem Microsoft YaHei;
        font-weight: 700;
        text-align: center;
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
    .footer > a:nth-child(2) > i {
        color: #3190e8;
    }
</style>