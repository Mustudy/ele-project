<template>
    <div class="foodWarp">
        <!--头部-->
        <header class="profile_top">
            <i class="el-icon-arrow-left" @click="$router.back(-1)"></i>
            <!--当前食品种类-->
            <span class="kind">{{head}}</span>
        </header>

        <!--美食、排序、筛选-->
        <section class="sort_container">
            <!--美食-->
            <div class="sort_item">
                <div class="sort_item_container">
                    <div class="sort_item_border" @click="changeClass">
                        <span :style="{'color': isClassShow ? '#3190e8' : '#444' }">{{head}}</span>
                        <i :class="!isClassShow ? 'el-icon-caret-bottom' : 'el-icon-caret-top'"></i>
                    </div>
                    <!--下拉框-->
                    <el-collapse-transition>

                    <section class="category_container" v-if="isClassShow">
                        <!--左边部分，食品具体的分类-->
                        <section class="category_left">
                            <ul>
                                <li class="category_left_li color" v-for="(item,i) in allShopClassArr"  :key="i"   @click="selfKind(item.sub_categories, item.name)" :style="{'background-color': className == item.name ? '#fff' : '#f5f5f5'}">

                                    <section>
                                        <img :src="imgArr[i]" alt="" class="category_icon">
                                        <span>{{item.name}}</span>
                                    </section>

                                    <section>
                                        <span class="category_count">{{item.count}}</span>
                                        <i class="el-icon-arrow-right"></i>
                                    </section>
                                </li>
                            </ul>
                        </section>
                        <!--右边部分，具体的食物-->
                        <section class="category_right">
                            <ul>
                                <li class="category_right_li" v-for="item in selfKindArr" @click="foodClass(item.name,item.id)">
                                    <span>{{item.name}}</span>
                                    <span>{{item.count}}</span>
                                </li>
                            </ul>
                        </section>

                    </section>
                    </el-collapse-transition>
                </div>
            </div>






            <!--排序-->
            <div class="sort_item">
                <div class="sort_item_container">
                    <div class="sort_item_border" @click="changeSort">
                        <span :style="{'color': isSortShow ? '#3190e8' : '#444' }">排序</span>
                        <i :class="!isSortShow ? 'el-icon-caret-bottom' : 'el-icon-caret-top'"></i>
                    </div>
                    <!--下拉框-->
                    <el-collapse-transition>
                    <section class="sort_detail_type" v-if="isSortShow">
                        <ul class="sort_list_container">
                            <li class="sort_list_li" @click="order_by4">
                                <img src="../assets/updown.png" alt="">
                                <p class="sort_select">
                                    <span :style="{'color': isS1 ? '#3190e8' : '#444'}">智能排序</span>
                                    <img src="../assets/check.png" alt="" v-if="isS1">
                                </p>
                            </li>
                            <li class="sort_list_li" @click="order_by5">
                                <img src="../assets/定位.png" alt="">
                                <p class="sort_select">
                                    <span :style="{'color': isS2 ? '#3190e8' : '#444'}">距离最近</span>
                                    <img src="../assets/check.png" alt="" v-if="isS2">
                                </p>
                            </li>
                            <li class="sort_list_li" @click="order_by6">
                                <img src="../assets/热度.png" alt="">
                                <p class="sort_select">
                                    <span :style="{'color': isS3 ? '#3190e8' : '#444'}">销量最高</span>
                                    <img src="../assets/check.png" alt="" v-if="isS3">
                                </p>
                            </li>
                            <li class="sort_list_li" @click="order_by1">
                                <img src="../assets/emi价格.png" alt="">
                                <p class="sort_select">
                                    <span :style="{'color': isS4 ? '#3190e8' : '#444'}">起送价最低</span>
                                    <img src="../assets/check.png" alt="" v-if="isS4">
                                </p>
                            </li>
                            <li class="sort_list_li" @click="order_by2">
                                <img src="../assets/时间.png" alt="">
                                <p class="sort_select">
                                    <span :style="{'color': isS5 ? '#3190e8' : '#444'}">配送速度最快</span>
                                    <img src="../assets/check.png" alt="" v-if="isS5">
                                </p>
                            </li>
                            <li class="sort_list_li" @click="order_by3">
                                <img src="../assets/评价.png" alt="">
                                <p class="sort_select">
                                    <span :style="{'color': isS6 ? '#3190e8' : '#444'}">评价最高</span>
                                    <img src="../assets/check.png" alt="" v-if="isS6">
                                </p>
                            </li>
                        </ul>
                    </section>
                        </el-collapse-transition>
                </div>
            </div>






            <!--筛选-->
            <div class="sort_item">
                <div class="sort_item_container">
                    <div class="sort_item_border" @click="changeScreen">
                        <span :style="{'color': isScreenShow ? '#3190e8' : '#444' }">筛选</span>
                        <i :class="!isScreenShow ? 'el-icon-caret-bottom' : 'el-icon-caret-top'"></i>
                    </div>

                    <!--下拉框-->


                    <section class="sort_detail_type filter_container" v-if="isScreenShow">
                        <!--配送方式-->
                        <section style="width: 100%">
                            <div class="filter_header_style">配送方式</div>
                            <ul class="filter_ul">
                                <li class="filter_li" @click="attribute">
                                    <img src="../assets/mongo.png" alt="" v-if="isbird2">
                                    <img src="../assets/check.png" alt="" v-if="isbird">
                                    <span :style="{'color': isbird ? '#3190e8' : '#333' }">蜂鸟专送</span>
                                </li>
                            </ul>
                        </section>
                        <!--商家属性-->
                        <section style="width: 100%">
                            <div class="filter_header_style">商家属性（可以多选）</div>
                            <ul class="filter_ul">
                                <li class="filter_li" @click="attribute1">
                                    <img src="../assets/check.png" alt="" v-if="isduihao1">
                                    <span class="filter_icon"
                                          style="color: rgb(63, 189, 230); border-color: rgb(63, 189, 230);"
                                          v-if="isduihao11">品</span>
                                    <span :style="{'color': isduihao1 ? '#3190e8' : '#333' }">品牌商家</span>
                                </li>
                                <li class="filter_li" @click="attribute2">
                                    <img src="../assets/check.png" alt="" v-if="isduihao2">
                                    <span class="filter_icon"
                                          style="color: rgb(153, 153, 153); border-color: rgb(153, 153, 153);" v-if="isduihao22">品</span>
                                    <span :style="{'color': isduihao2 ? '#3190e8' : '#333' }">外卖保</span>
                                </li>
                                <li class="filter_li" @click="attribute3">
                                    <img src="../assets/check.png" alt="" v-if="isduihao3">
                                    <span class="filter_icon"
                                          style="color: rgb(63, 189, 230); border-color: rgb(63, 189, 230);"
                                          v-if="isduihao33">准</span>
                                    <span :style="{'color': isduihao3 ? '#3190e8' : '#333' }">准时达</span>
                                </li>
                                <li class="filter_li" @click="attribute4">
                                    <img src="../assets/check.png" alt="" v-if="isduihao4">
                                    <span class="filter_icon"
                                          style="color: rgb(232, 132, 45); border-color: rgb(232, 132, 45);"
                                          v-if="isduihao44">新</span>
                                    <span :style="{'color': isduihao4 ? '#3190e8' : '#333' }">新店</span>
                                </li>
                                <li class="filter_li" @click="attribute5">
                                    <img src="../assets/check.png" alt="" v-if="isduihao5">
                                    <span class="filter_icon" style="color: rgb(255, 78, 0); border-color: rgb(255, 78, 0);"
                                          v-if="isduihao55">付</span>
                                    <span :style="{'color': isduihao5 ? '#3190e8' : '#333' }">在线支付</span>
                                </li>
                                <li class="filter_li" @click="attribute6">
                                    <img src="../assets/check.png" alt="" v-if="isduihao6">
                                    <span class="filter_icon"
                                          style="color: rgb(153, 153, 153); border-color: rgb(153, 153, 153);" v-if="isduihao66">票</span>
                                    <span :style="{'color': isduihao6 ? '#3190e8' : '#333' }">开发票</span>
                                </li>
                            </ul>
                        </section>
                        <!--清空确定-->
                        <footer class="confirm_filter">
                            <div class="clear_all filter_button_style" @click="clearAll">
                                清空
                            </div>
                            <div class="confirm_select filter_button_style" @click="sureShaixuan">
                                确定 <span v-if="isnumber">({{number}})</span>
                            </div>
                        </footer>
                    </section>


                </div>
            </div>
        </section>


        <!--阴影-->
        <!--<div class="back_cover" v-if="isback"></div>-->
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
                                    <!--<li class="supports">{{item.supports[0].icon_name}}</li>-->
                                    <!--<li class="supports">{{item.supports[1].icon_name}}</li>-->
                                    <li class="supports">保</li>
                                    <li class="supports">准</li>
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
                                    <!--<span>{{item.delivery_mode.text}}</span>-->
                                    <span>蜂鸟专送</span>
                                    <!--<span>{{item.supports[1].name}}</span>-->
                                    <span>准时达</span>
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
    </div>

    </div>
</template>

<script>
    export default {
        name: "Food",
        data(){
            return{
                head: null,
                latitude: 0,
                longitude: 0,
                id: 0,
                //具体的食品分类总数组
                allShopClassArr: [],
                //具体的食品
                selfKindArr:[],
                selfKindArr1:[],
                //食品分类前面的图片
                imgArr: [],
                //食品分类点击时的名字
                className: "",
                //控制分类下拉框的显隐
                isClassShow: false,
                //控制排序下拉框的显隐
                isSortShow: false,
                //控制筛选下拉框的显隐
                isScreenShow: false,

                isS1: false,
                isS2: false,
                isS3: false,
                isS4: false,
                isS5: false,
                isS6: false,
                //控制筛选下拉菜单里对号的显隐
                isbird: false,
                isduihao1: false,
                isduihao2: false,
                isduihao3: false,
                isduihao4: false,
                isduihao5: false,
                isduihao6: false,

                isbird2: true,
                isduihao11: true,
                isduihao22: true,
                isduihao33: true,
                isduihao44: true,
                isduihao55: true,
                isduihao66: true,
                //所有商家的信息
                shopList:[],

                // 阴影的显隐
                // isback:false,

                //筛选的个数
                isnumber: false,
                number:0,
                numberArr:[],
                checkCount:1,



            }
        },
        created() {
            //获取params传递来的食品的分类
            this.head = this.$route.params.head;
            this.latitude = this.$route.params.latitude;
            this.longitude = this.$route.params.longitude;

            //获取所有商铺分类列表
            this.axios.get('/shopping/v2/restaurant/category').then((res) => {
                // console.log(res)
                this.allShopClassArr = res;
                this.selfKindArr = res[0].sub_categories;
                this.selfKindArr1 = this.selfKindArr.splice(0,1);
                // console.log(this.selfKindArr);

                // 处理分类前面图片的格式
                for (let s of this.allShopClassArr) {
                    let len = s.image_url.length;
                    if (s.image_url.slice(len - 4) === 'jpeg') {
                        this.srcS = 'https://fuss10.elemecdn.com/' + s.image_url.slice(0, 1) + '/' + s.image_url.slice(1, 3) + '/' + s.image_url.slice(3) + '.jpeg';
                    } else if (s.image_url.slice(len - 3) === 'png') {
                        this.srcS = 'https://fuss10.elemecdn.com/' + s.image_url.slice(0, 1) + '/' + s.image_url.slice(1, 3) + '/' + s.image_url.slice(3) + '.png';
                    } else {
                        this.srcS = 'https://elm.cangdu.org/img/default.jpg'
                    }
                    this.imgArr.push(this.srcS);
                }
                // console.log(this.imgArr);
            });
            this.axios.get("/shopping/restaurants", {
                params: {
                    latitude: this.latitude,
                    longitude: this.longitude,
                }
            }).then(res=>{
                this.shopList = res;
                // this.value = res.rating;
                // console.log(res)
            }).catch(err=>{})



        },
        methods: {
            //食品分类下拉框的点击显隐事件
            changeClass(){
              this.isClassShow = !this.isClassShow;
              this.isSortShow = false;
              this.isScreenShow = false;
              // this.isback = !this.isback;
            },
            //排序下拉框的点击显隐事件
            changeSort(){
                this.isSortShow = !this.isSortShow;
                this.isClassShow = false;
                this.isScreenShow = false;
                // this.isback = !this.isback;
            },
            //筛选下拉框的点击显隐事件
            changeScreen(){
              this.isScreenShow = !this.isScreenShow;
              this.isClassShow = false;
              this.isSortShow = false;
                // this.isback = !this.isback;
            },
            //食品分类左边的点击事件
            selfKind(kind,name){
                this.selfKindArr = kind;
                this.className = name;
                // console.log(this.className);
            },
            //食品分类里右边的点击事件
            foodClass(name,id) {
                console.log(name,id);
                this.id = id;
                console.log(this.id);
               this.axios.get("/shopping/restaurants?latitude="+this.latitude+"&longitude="+this.longitude+"&restaurant_category_id[]="+ this.id
                   // params: {
                   //     latitude: this.latitude,
                   //     longitude: this.longitude,
                   //     restaurant_category_id: id,
                   // }
               ).then(res=>{
                   console.log(res);
                   this.shopList = res;
                   this.isClassShow = false;
                   this.head = name;

               }).catch(err=>{})
            },

            // 排序下拉框里的点击事件
            order_by4(){
                this.axios.get("/shopping/restaurants", {
                    params: {
                        latitude: this.latitude,
                        longitude: this.longitude,
                        order_by: 4
                    }
                }).then(res=>{
                    // console.log(res);
                    this.shopList = res;
                    this.isSortShow = false;
                    this.isS1 = !this.isS1;
                    this.isS2 = false;
                    this.isS3 = false;
                    this.isS4 = false;
                    this.isS5 = false;
                    this.isS6 = false;
                }).catch(err=>{})
            },
            order_by5(){
                this.axios.get("/shopping/restaurants", {
                    params: {
                        latitude: this.latitude,
                        longitude: this.longitude,
                        order_by: 5
                    }
                }).then(res=>{
                    // console.log(res);
                    this.shopList = res;
                    this.isSortShow = false;
                    this.isS2 = !this.isS2;
                    this.isS1 = false;
                    this.isS3 = false;
                    this.isS4 = false;
                    this.isS5 = false;
                    this.isS6 = false;
                }).catch(err=>{})
            },
            order_by6(){
                this.axios.get("/shopping/restaurants", {
                    params: {
                        latitude: this.latitude,
                        longitude: this.longitude,
                        order_by: 6
                    }
                }).then(res=>{
                    // console.log(res);
                    this.shopList = res;
                    this.isSortShow = false;
                    this.isS3 = !this.isS3;
                    this.isS1 = false;
                    this.isS2 = false;
                    this.isS4 = false;
                    this.isS5 = false;
                    this.isS6 = false;

                }).catch(err=>{})
            },
            order_by1(){
                this.axios.get("/shopping/restaurants", {
                    params: {
                        latitude: this.latitude,
                        longitude: this.longitude,
                        order_by: 1
                    }
                }).then(res=>{
                    // console.log(res);
                    this.shopList = res;
                    this.isSortShow = false;
                    this.isS4 = !this.isS4;
                    this.isS1 = false;
                    this.isS3 = false;
                    this.isS2 = false;
                    this.isS5 = false;
                    this.isS6 = false;
                }).catch(err=>{})
            },
            order_by2(){
                this.axios.get("/shopping/restaurants", {
                    params: {
                        latitude: this.latitude,
                        longitude: this.longitude,
                        order_by: 2
                    }
                }).then(res=>{
                    // console.log(res);
                    this.shopList = res;
                    this.isSortShow = false;
                    this.isS5 = !this.isS5;
                    this.isS1 = false;
                    this.isS3 = false;
                    this.isS4 = false;
                    this.isS2 = false;
                    this.isS6 = false;
                }).catch(err=>{})
            },
            order_by3(){
                this.axios.get("/shopping/restaurants", {
                    params: {
                        latitude: this.latitude,
                        longitude: this.longitude,
                        order_by: 3
                    }
                }).then(res=>{
                    // console.log(res);
                    this.shopList = res;
                    this.isSortShow = false;
                    this.isS6 = !this.isS6;
                    this.isS1 = false;
                    this.isS3 = false;
                    this.isS4 = false;
                    this.isS5 = false;
                    this.isS2 = false;

                }).catch(err=>{})
            },

            //筛选下拉框的点击事件
            attribute(checkCount){
                this.isbird = !this.isbird;
                this.isbird2 = !this.isbird2;
                // console.log(checkCount);

                this.checkCount++;
                if (checkCount%2 == 0) {
                    this.number--;
                }else{
                    this.number++;
                }
                if (this.number == 0) {
                    this.isnumber = false;
                }else{
                    this.isnumber = true;
                }
            },
            attribute1(){
                this.isduihao1 = !this.isduihao1;
                this.isduihao11 = !this.isduihao11;
                if (this.isduihao1) {
                    this.numberArr.push(8)
                    this.number++
                } else {
                    if (this.numberArr.length === 0) {
                    } else {
                        this.numberArr.splice(this.numberArr.indexOf(8), 1)
                        this.number--
                    }
                }
                if (this.number == 0) {
                    this.isnumber = false;
                }else{
                    this.isnumber = true;
                }
                console.log(this.numberArr);
            },
            attribute2(){
                this.isduihao2 = !this.isduihao2;
                this.isduihao22 = !this.isduihao22;
                if (this.isduihao2) {
                    this.numberArr.push(7)
                    this.number++
                } else {
                    if (this.numberArr.length === 0) {
                    } else {
                        this.numberArr.splice(this.numberArr.indexOf(7), 1)
                        this.number--
                    }
                }
                if (this.number == 0) {
                    this.isnumber = false;
                }else{
                    this.isnumber = true;
                }
                console.log(this.numberArr);
            },
            attribute3(){
                this.isduihao3 = !this.isduihao3;
                this.isduihao33 = !this.isduihao33;
                if (this.isduihao2) {
                    this.numberArr.push(9)
                    this.number++
                } else {
                    if (this.numberArr.length === 0) {
                    } else {
                        this.numberArr.splice(this.numberArr.indexOf(9), 1)
                        this.number--
                    }
                }
                if (this.number == 0) {
                    this.isnumber = false;
                }else{
                    this.isnumber = true;
                }
                console.log(this.numberArr);
            },
            attribute4(){
                this.isduihao4 = !this.isduihao4;
                this.isduihao44 = !this.isduihao44;
                if (this.isduihao2) {
                    this.numberArr.push(5)
                    this.number++
                } else {
                    if (this.numberArr.length === 0) {
                    } else {
                        this.numberArr.splice(this.numberArr.indexOf(5), 1)
                        this.number--
                    }
                }
                if (this.number == 0) {
                    this.isnumber = false;
                }else{
                    this.isnumber = true;
                }
                console.log(this.numberArr);
            },
            attribute5(){
                this.isduihao5 = !this.isduihao5;
                this.isduihao55 = !this.isduihao55;
                if (this.isduihao2) {
                    this.numberArr.push(3)
                    this.number++
                } else {
                    if (this.numberArr.length === 0) {
                    } else {
                        this.numberArr.splice(this.numberArr.indexOf(3), 1)
                        this.number--
                    }
                }
                if (this.number == 0) {
                    this.isnumber = false;
                }else{
                    this.isnumber = true;
                }
                console.log(this.numberArr);
            },
            attribute6(){
                this.isduihao6 = !this.isduihao6;
                this.isduihao66 = !this.isduihao66;
                if (this.isduihao2) {
                    this.numberArr.push(4)
                    this.number++
                } else {
                    if (this.numberArr.length === 0) {
                    } else {
                        this.numberArr.splice(this.numberArr.indexOf(4), 1)
                        this.number--
                    }
                }
                if (this.number == 0) {
                    this.isnumber = false;
                }else{
                    this.isnumber = true;
                }
                console.log(this.numberArr);
            },
            clearAll() {
                this.isbird = false;
                this.isduihao1 = false;
                this.isduihao2 = false;
                this.isduihao3 = false;
                this.isduihao4 = false;
                this.isduihao5 = false;
                this.isduihao6 = false;

                this.isbird2 = true;
                this.isduihao11 = true;
                this.isduihao22 = true;
                this.isduihao33 = true;
                this.isduihao44 = true;
                this.isduihao55 = true
                this.isduihao66 = true;

                this.number = 0;
                this.isnumber = false;
                this.numberArr = [];
            },
            sureShaixuan(){
                this.isScreenShow = !this.isScreenShow;
                this.axios.get("shopping/restaurants?latitude="+this.latitude+'&longitude='+this.longitude+'&support_ids[]='+this.numberArr)
                    .then(res=>{
                        console.log(res)
                        this.shopList = res;
                    }).catch(err=>{});
            },
            //店铺的点击事件，去往店铺首页shop
            goshop(item) {
                // console.log(item);
                this.$router.push({path:'/shop',query:{geohash:  this.geohash, id:item.id}});


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
    .kind {
        font-size: .8rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        color: #fff;
        text-align: center;
        font-weight: 700
    }
    .sort_container {
        background-color: #fff;
        border-bottom: .025rem solid #f1f1f1;
        position: fixed;
        top: 1.95rem;
        right: 0;
        width: 100%;
        display: flex;
        z-index: 13;
        box-sizing: border-box;
    }
    .sort_item {
        font-size: .55rem;
        color: #444;
        width: 33.3%;
        height: 1.6rem;
        text-align: center;
        line-height: 1rem;
    }
    .sort_item_container {
        width: 100%;
        height: 100%;
        /*position: relative;*/
        z-index: 14;
        background-color: #fff;
        box-sizing: border-box;
        padding-top: .3rem;
    }
    .sort_item_border {
        height: 1rem;
        border-right: .025rem solid #e4e4e4;
    }
    .el-icon-caret-top {
        color: #3190e8;
        /*transform: rotate(180deg)*/
    }
    .category_container {
        width: 100%;
        position: absolute;
        display: flex;
        top: 1.6rem;
        left: 0;
        border-top: .025rem solid #e4e4e4;
        background-color: #fff;
    }
    .category_left {
        width: 50%;
        flex: 1;
        background-color: #f1f1f1;
        height: 16rem;
        overflow-y: auto;
    }
    .category_left_li {
        /*display: inline-block;*/
        display: flex;
        justify-content: space-between;
        padding: 0 .5rem;
    }
    .category_left_li > section:nth-of-type(1) > span {
        font-size: .5rem;
        color: #666;
        line-height: 1.8rem;
    }
    /*分类前面的图片*/
    .category_icon{
        width: .8rem;
        height: .8rem;
        vertical-align: middle;
        margin-right: .2rem;
    }
    .category_count {
        background-color: #ccc;
        font-size: .4rem;
        color: #fff;
        padding: 0 .1rem;
        border: .025rem solid #ccc;
        border-radius: .8rem;
        vertical-align: middle;
        margin-right: .25rem;
        line-height: 1.8rem;
    }
    /*美食下拉下单的右边*/
    .category_right {
        flex: 1;
        background-color: #fff;
        padding-left: .5rem;
        height: 16rem;
        overflow-y: auto;
    }
    .category_right_li {
        display: flex;
        justify-content: space-between;
        height: 1.8rem;
        line-height: 1.8rem;
        padding-right: .5rem;
        border-bottom: .025rem solid #e4e4e4;
        color: #666;
    }
    /*排序下拉内容*/
    .sort_detail_type {
        width: 100%;
        position: absolute;
        display: flex;
        top: 1.6rem;
        left: 0;
        border-top: .025rem solid #e4e4e4;
        background-color: #fff;
    }
    .sort_list_container {
        width: 100%;
    }
    .sort_list_li {
        height: 2.5rem;
        display: flex;
        align-items: center;
    }
    .sort_list_li img {
        width: .7rem;
        height: .7rem;
        margin: 0 .3rem 0 .8rem;
    }
    .sort_select {
        line-height: 2.5rem;
        flex: auto;
        text-align: left;
        text-indent: .25rem;
        border-bottom: .025rem solid #e4e4e4;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    /*筛选下拉内容*/
    .filter_container {
        flex-direction: column;
        align-items: flex-start;
        min-height: 10.6rem;
        background-color: #f1f1f1;
    }
    .filter_header_style {
        font-size: .4rem;
        color: #333;
        line-height: 1.5rem;
        height: 1.5rem;
        text-align: left;
        padding-left: .5rem;
        background-color: #fff;
    }
    .filter_ul {
        display: flex;
        flex-wrap: wrap;
        padding: 0 .5rem;
        background-color: #fff;
    }
    .filter_li {
        display: flex;
        align-items: center;
        border: .025rem solid #eee;
        width: 4.7rem;
        height: 1.4rem;
        margin-right: .25rem;
        border-radius: .125rem;
        padding: 0 .25rem;
        margin-bottom: .25rem;
        box-sizing: border-box;
    }
    .filter_li img {
        width: .8rem;
        height: .8rem;
        margin-right: .125rem;
    }
    .filter_li span {
        font-size: .4rem;
        color: #333;
    }
    .filter_icon {
        width: .8rem;
        height: .8rem;
        font-size: .5rem;
        border: .025rem solid #e4e4e4;
        border-radius: .15rem;
        margin-right: .25rem;
        line-height: .8rem;
        text-align: center;
    }
    .confirm_filter {
        display: flex;
        background-color: #f1f1f1;
        width: 100%;
        padding: .3rem .2rem;
        box-sizing: border-box;
    }
    .clear_all  {
        background-color: #fff;
        margin-right: .5rem;
        border: .025rem solid #fff;
    }
    .confirm_select {
        background-color: #56d176;
        color: #fff;
        border: .025rem solid #56d176;
    }
    .filter_button_style {
        width: 50%;
        height: 1.8rem;
        font-size: .8rem;
        line-height: 1.8rem;
        border-radius: .2rem;
    }



    /*商家列表*/
    .shop_list_container{
        margin-top: 2.1rem;
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
    .shop_list > ul > li {
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
        flex: auto;
    }
    .shop_detail_header {
        display: flex;
        justify-content: space-between;
        align-items: center;
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
        /*height: .4rem*/
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




    /*阴影*/
    .back_cover {
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 10;
        background-color: rgba(0,0,0,.3);
    }
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