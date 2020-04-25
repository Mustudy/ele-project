<!--<script src="../store/index.js"></script>-->
<template>
    <div class="shopWarp">
        <!--商家信息-->
       <header class="shop_detail_header" style="z-index: 100;position: relative">
           <section class="description_header">
               <div class="description_top" style="display: flex">
                   <i class="el-icon-arrow-left" @click="$router.back(-1)"></i>
                    <section class="description_left">
                        <img :src="'https://elm.cangdu.org/img/' + shopInfo.image_path" alt="">
                    </section>

                   <section class="description_right">
                       <h4 class="description_title ellipsis">{{shopInfo.name}}</h4>
                       <p class="description_text">商家配送／分钟送达／{{shopInfo.piecewise_agent_fee ? shopInfo.piecewise_agent_fee.tips : ""}}</p>
                       <p class="description_promotion ellipsis">公告：{{shopInfo.promotion_info}}</p>
                   </section>

                   <i class="el-icon-arrow-right" @click="goDetail"></i>
               </div>
           </section>
       </header>



        <!--商品和评价按钮-->
        <section class="change_show_type">
            <div><span class="activity_show" @click="commodity" :style="{'color' : iscommodity ? '#3190e8' : '#666', 'border-color' : iscommodity ?  '#3190e8' : '#fff'}">商品</span></div>
            <div><span @click="evaluate"  :style="{'color' : isevaluate ? '#3190e8' : '#666','border-color' : isevaluate ?  '#3190e8' : '#fff'}">评价</span></div>
        </section>

        <!--商品-->
        <section class="food_container" v-if="iscommodity">
            <section class="menu_container">
                <!--左边分类-->
                <section class="menu_left">
                    <ul>
                        <li class="menu_left_li activity_menu" v-for="(item, index) in listArr" :key="item.id" @click="selectClass(item, index)" :style="{'background-color': className == index ? '#fff' : '#f5f5f5','border-left': className == index ? '.15rem solid #3190e8' : ''}">

                            <!-- 点击动画 -->
                            <el-badge :value="itemCount(item.id)" :hidden="itemCount(item.id) ? false : true">
                                <span class="badegspan">{{item.name}}</span>
                            </el-badge>
                            <!--<span>{{item.name}}</span>-->
                        </li>
                    </ul>
                </section>
                <!--右边食品-->
                <section class="menu_right">
                    <ul>
                        <li v-for="(item1,index1) in listArr" :key="index1">
                            <header class="menu_detail_header">
                                <section class="menu_detail_header_left">
                                    <strong class="menu_item_title">{{item1.name}}</strong>
                                    <span class="menu_item_description">{{item1.description}}</span>
                                </section>
                                <span class="menu_detail_header_right" @click="isHint">...</span>
                                <p class="description_tip" v-if="hint">
                                    <span>{{item1.name}}</span>  {{item1.description}}
                                    <img src="../assets/上箭头.png" alt="">
                                </p>
                            </header>

                            <section class="menu_detail_list" v-for="(pro,index2) in item1.foods" :key="index2">
                                <div class="menu_detail_link">
                                    <section class="menu_food_img">
                                        <img :src="'https://elm.cangdu.org/img/' + pro.image_path" alt="">
                                    </section>
                                    <section class="menu_food_description">
                                        <h3 class="food_description_head">
                                            <strong class="description_foodname"> {{pro.name}}</strong>
                                            <!--<p class="zp">招牌</p>-->
                                            <!--<p class="zp">{{pro.attributes.icon_name}}</p>-->
                                        </h3>

                                        <p class="food_description_content">{{pro.description}}</p>
                                        <p class="food_description_sale_rating">
                                            <span>月售{{pro.month_sales}}份</span>
                                            <span style="margin-left: .2rem">好评率{{pro.satisfy_rate}}%</span>
                                        </p>
                                        <p class="food_activity">
                                           <span>el</span>
                                        </p>
                                    </section>
                                </div>

                                <footer class="menu_detail_footer">
                                    <section class="food_price">
                                        <span class="food_price1">￥</span>
                                        <span class="food_price2">{{popp(pro)}}</span>
                                        <span class="food_price3">起</span>
                                    </section>



                                    <section class="cart_module">
                                        <section class="choose_specification">
                                            <section class="choose_icon_container">
                                                <!--<span class="show_chooselist" v-if="s2.specifications.length?true:false">{{s2.specifications.length?'选规格':'+'}}</span> -->
                                                <!-- <span class="show_chooselist" v-if="s2.specifications.length?true:false" @click="xuanguige(s2.specfoods,s2.category_id)">选规格</span> -->
                                                <div class="cart_button">
                                                    <div v-if="foodNum(pro)">
                                  <span
                                          @click="pro.specifications.length?xggjianshao():jianshao(foodNum(pro),pro.category_id, pro.item_id, pro.specfoods[0].food_id, pro.specfoods[0].name, pro.specfoods[0].price, pro.specfoods[0].specs, pro.specfoods[0].packing_fee, pro.specfoods[0].sku_id, pro.specfoods[0].stock)"
                                  >
                                    <i class="el-icon-remove-outline"></i>
                                  </span>
                                                        <span class="cart_num1">{{foodNum(pro)}}</span>



                                                    </div>
                                                    <span
                                                            class="show_chooselist"
                                                            v-if="pro.specifications.length?true:false"
                                                            @click="xuanguige(pro.specfoods,pro.category_id)"
                                                    >选规格</span>
                                                    <span class="add_icon" v-if="pro.specifications.length?false:true">
                                <i
                                        class="el-icon-circle-plus-outline"
                                        @click="tianjia(pro.category_id, pro.item_id, pro.specfoods[0].food_id, pro.specfoods[0].name, pro.specfoods[0].price, pro.specfoods[0].specs, pro.specfoods[0].packing_fee, pro.specfoods[0].sku_id, pro.specfoods[0].stock)"
                                ></i>
                              </span>
                                                </div>

                                            </section>
                                            <div class="specs_list" v-if="xuanguigeIsshow">
                                                <div class="specs_list_header">
                                                    <h4 class="ellipsis">{{xuanguigeName}}</h4>
                                                    <i
                                                            class="specs_cancel el-icon-close"
                                                            @click="closethis"
                                                            style="font-size:1rem"
                                                    ></i>
                                                </div>
                                                <section class="specs_details">
                                                    <h5 class="specs_details_title">规格</h5>
                                                    <ul>
                                                        <li
                                                                class="specs_activity"
                                                                :style="guigebgc==index?'color:blue;':''"
                                                                v-for="(gg,index) in xuanguigeArr"
                                                                :key="index"
                                                                @click="guigeID(index)"
                                                        >{{gg.specs[0].value}}</li>
                                                    </ul>
                                                </section>
                                                <div class="specs_footer">
                                                    <div class="specs_price">
                                                        <span>¥</span>
                                                        <span>{{guigeArr.price}}</span>
                                                    </div>
                                                    <div
                                                            class="specs_addto_cart"
                                                            @click="putCar(xuanguigecId, xuanguigeArr[guigebgc].item_id, xuanguigeArr[guigebgc].food_id, xuanguigeName, guigeArr.price, xuanguigeArr[guigebgc].specs[0].value, xuanguigeArr[guigebgc].packing_fee, xuanguigeArr[guigebgc].sku_id, xuanguigeArr[guigebgc].stock)"
                                                    >加入购物车</div>
                                                </div>
                                            </div>
                                        </section>
                                    </section>








                                </footer>
                            </section>
                        </li>
                    </ul>
                </section>
            </section>





            <!--购物车-->
            <section class="buy_cart_container">
                <section class="cart_icon_num">
                    <div class="cart_icon_container"     @click="showCar"
                         :style="allFoodsPrice?'background-color:#3190e8':''">
                        <span class="cart_list_length" v-if="allFoodsPrice">{{allItemCount}}</span>
                        <img src="../assets/购物车.png" alt="" class="cart_icon">
                    </div>
                    <div class="cart_num">
                        <div class="cart_num_money1">¥ {{allFoodsPrice}}.00</div>
                        <div class="cart_num_money2">配送费5元</div>
                    </div>
                </section>

                <section class="gotopay"   :style="allFoodsPrice?'background-color:#4cd964':''"
                         @click="goDist">
                    <!--<span class="gotopay_button_style">还差¥20起送</span>-->
                    <!--<span class="gotopay_button_style" style="background-color: #4cd964;" v-if="isClose">去结算</span>-->
                    <span class="gotopay_button_style">{{allFoodsPrice ? '去下单' : '还差¥20起送'}}</span>
                </section>
            </section>
        </section>


        <!-- 购物车展示 -->
        <el-collapse-transition>
            <section class="cart_food_list" v-if="carShow">
                <div class="carheader">
                    <h4>购物车</h4>
                    <div>
                        <i></i>
                        <span class="clear_cart" @click="clearAll">清空</span>
                    </div>
                </div>
                <section id="cartFood" class="cart_food_details">
                    <ul>
                        <li class="cart_food_li" v-for="(good1,index) in nowCart" :key="index">
                            <div class="cart_list_num">
                                <p class="ellipsis">{{good1.name}}</p>
                                <p class="ellipsis" style="font-size:.5rem">{{good1.specs == ''?'':good1.specs}}</p>
                                <!-- <p class="ellipsis">{{}}</p> -->
                            </div>
                            <div class="cart_list_price">
                                <span>¥</span>
                                <span>{{good1.price}}</span>
                            </div>
                            <section class="cart_list_control">
                                <div class="cart_button" style="display:block">
                    <span>
                      <i
                              class="el-icon-remove-outline"
                              @click="jianshao1(good1.shopId,good1.category_id, good1.item_id, good1.food_id, good1.name, good1.price, good1.specs, good1.packing_fee, good1.sku_id, good1.stock)"
                      ></i>
                    </span>
                                    <span class="cart_num1">{{good1.num}}</span>
                                </div>
                                <span class="add_icon">
                    <i
                            class="el-icon-circle-plus-outline"
                            @click="tianjia1(good1.shopId,good1.category_id, good1.item_id, good1.food_id, good1.name, good1.price, good1.specs, good1.packing_fee, good1.sku_id, good1.stock)"
                    ></i>
                  </span>
                            </section>
                        </li>
                    </ul>
                </section>
            </section>
        </el-collapse-transition>


        <!--评价-->
        <section class="rating_container" v-if="isevaluate">
            <section>
                <section style="pointer-events: auto;">
                    <!--店铺信息-->
                    <header class="rating_header">
                        <section class="rating_header_left">
                            <p>{{shopInfo.rating}}</p>
                            <p>综合评价</p>
                            <p>高于周边商家76.9%</p>
                        </section>
                        <section class="rating_header_right">
                            <p>
                                <span>服务态度</span>
                                <!--<span>111</span>-->
                                <el-rate
                                        v-model="value"
                                        disabled
                                        show-score
                                        text-color="#ff9900"
                                        score-template="{value}">
                                </el-rate>
                            </p>
                            <p>
                                <span>菜品评价</span>
                                <el-rate
                                        v-model="value2"
                                        disabled
                                        show-score
                                        text-color="#ff9900"
                                        score-template="{value}">
                                </el-rate>
                            </p>
                            <p>
                                <span>配送时间</span>
                                <span>{{shopInfo.order_lead_time ? shopInfo.order_lead_time : "40分钟"}}</span>
                            </p>
                        </section>
                    </header>

                    <!--评论分类-->
                    <ul class="tag_list_ul">
                        <li v-for="list in commentClass" :key="list._id" @click="classColor(list)" :style="{'background-color' :  className2 == list.name ? '#3190e8' : '#f5f5f5', 'color' : className2 == list.name ? '#fff' : '#6d7885'}">
                            <span :class="{'unsatisfied' : '不满意' == list.name ? true : false}">{{list.name}}({{list.count}})</span>
                        </li>
                    </ul>
                    <!--具体评论-->
                    <ul class="rating_list_ul">
                        <li class="rating_list_li" v-for="info in foodcomment" :key="info._id">
                            <img src="../assets/yonghu2.png" alt="">
                            <section class="rating_list_details">
                                <header>
                                    <section class="username_star">
                                        <p class="username">{{info.username}}</p>
                                        <p class="star_desc">
                                            <el-rate
                                                    v-model='info.rating_star'
                                                    disabled
                                                    text-color="#ff9900"
                                                    score-template="{value}">
                                            </el-rate>
                                            <span class="time_spent_desc">{{info.time_spent_desc ? info.time_spent_desc : ""}}</span>
                                        </p>
                                    </section>
                                    <time class="rated_at">{{info.rated_at}}</time>
                                </header>
                                <ul class="food_img_ul">
                                    <li v-for="i in info.item_ratings" :key="i.food_id">
                                        <img :src="i.image_hash ? 'https://fuss10.elemecdn.com/' + i.image_hash : ''" alt="" v-if="i.image_hash">
                                    </li>
                                </ul>
                                <ul class="food_name_ul">
                                    <li class="ellipsis" v-for="s in info.item_ratings" :key="s.food_id">
                                        {{s.food_name}}
                                    </li>
                                </ul>
                            </section>
                        </li>
                    </ul>
                </section>
            </section>
        </section>
    </div>
</template>

<script>
    import { mapState } from "vuex";

    export default {
        name: "Shop",
        data() {
            return {
                geohash: "",
                shopID: "",
                shopInfo: "",
                value: 0,
                value2: 0,
                value3: 0,
                //店铺食品分类
                listArr: [],
                className:0,
                // 榜单头部的冒号显隐
                hint: false,
                //去结算按钮的变化
                isClose: false,
                //评价分类
                commentClass: [],
                //评价分类名字
                className2: "全部",
                //菜品评价
                foodcomment: 0 ,
                //商品的显隐
                iscommodity: true,
                //评价的显隐
                isevaluate: false,



                isShow: true,
                active1: 99999,
                shopCount: 0,
                priceAll: 0,
                countAll: 0,
                isShowcount: false,
                carShow: false,
                goodsIndex: [],
                xuanguigeIsshow: false,
                xuanguigeArr: [],
                guigeArr: [],
                guigebgc: 90,
                xuanguigeName: "",
                xuanguigecId: "",
                carArr: [],
                shopCarts: null,

            }
        },
        created() {
                this.geohash = this.$route.query.geohash;
                this.shopId = this.$route.query.id;
                // console.log(this.shopId);
            //店铺信息
            this.axios.get("/shopping/restaurant/"+this.shopId).then(res=>{
               // console.log(res);
               this.shopInfo = res;
               this.value = res.rating;
               // console.log(this.shopInfo)
            }).catch(err=>{});
            //店铺内食品
            this.axios.get("/shopping/v2/menu?restaurant_id="+this.shopId).then(res=>{
                // console.log(res);
                this.listArr = res;
                // console.log(this.listArr)
            }).catch(err=>{});
            //餐馆菜品评价
            this.axios.get("/ugc/v2/restaurants/"+this.shopId+"/ratings/scores").then(res=>{
                // console.log(res);
                this.value2 = res.food_score.toFixed(1)-0;
                // console.log(this.value2)
            }).catch(err=>{});
            //获取评价分类
            this.axios.get("/ugc/v2/restaurants/"+this.shopId+"/ratings/tags").then(res=>{
                // console.log(res);
                this.commentClass = res;
                // console.log(this.commentClass);
            }).catch(err=>{});
            //获取评价内容
            this.axios.get("/ugc/v2/restaurants/"+this.shopId+"/ratings").then(res=>{
                // console.log(res);
                this.foodcomment = res;
                // console.log(this.foodcomment);
            }).catch(err=>{});


            // 初始化vuex, 让每次页面刷新之后 vueX里能存入LS里的数据
            this.$store.commit("init_buy_cart");

        },
        methods: {
            goDetail() {
            //去往店铺详情
                this.$router.push({path:'/shopdetail',query:{shopid:this.shopInfo.id}});
                console.log(this.shopInfo.id);
            },
            //商品分类的点击事件
            selectClass(item, index) {
                this.className = index;
                // console.log(index);
                let selector = ".menu_right>ul>li:nth-child(" + (index + 1) + ")";
                this.$el.querySelector(selector).scrollIntoView({
                    behavior: "smooth", // 平滑过渡
                    block: "start" // 上边框与视窗顶部平齐。默认值
                });
            },
            isHint() {
                this.hint = !this.hint;
            },
            popp(i) {
                let a = []
                for (let q in i.specfoods) {
                    a.push(i.specfoods[q].price)
                }
                a.sort();
                if (a[0] === null) {
                    return 0
                } else {
                    return a[0]
                }
            },
            //商品的点击事件
            commodity() {
              this.isevaluate = false;
              this.iscommodity = true;
            },
            //评价的点击事件
            evaluate() {
                this.iscommodity = false;
                this.isevaluate = true;
            },
            //评价分类的点击事件
            classColor(i) {
                this.className2 = i.name;
            },





            topingjia() {
                this.isShow = false;
            },
            //普通添加
            tianjia(
                category_id,
                item_id,
                food_id,
                name,
                price,
                specs,
                packing_fee,
                sku_id,
                stock
            ) {
                this.$store.commit("add_cart", { shopid: this.shopId, category_id,
                    item_id,
                    food_id,
                    name,
                    price,
                    specs,
                    packing_fee,
                    sku_id,
                    stock
                });
            },
            //普通减少
            jianshao(
                i,
                category_id,
                item_id,
                food_id,
                name,
                price,
                specs,
                packing_fee,
                sku_id,
                stock
            ) {
                //console.log("减少", i, category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock);
                this.$store.commit("reduce_cart", {
                    shopid: this.shopId,
                    category_id,
                    item_id,
                    food_id,
                    name,
                    price,
                    specs,
                    packing_fee,
                    sku_id,
                    stock
                });
            },
            //选规格添加
            putCar(
                category_id,
                item_id,
                food_id,
                name,
                price,
                specs,
                packing_fee,
                sku_id,
                stock
            ) {
                // console.log(category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock)
                this.$store.commit("add_cart", {
                    shopid: this.shopId,
                    category_id,
                    item_id,
                    food_id,
                    name,
                    price,
                    specs,
                    packing_fee,
                    sku_id,
                    stock
                });
                this.xuanguigeIsshow = !this.xuanguigeIsshow;
            },
            //购物车列表添加
            tianjia1(
                shopId,
                category_id,
                item_id,
                food_id,
                name,
                price,
                specs,
                packing_fee,
                sku_id,
                stock
            ) {
                console.log(
                    shopId,
                    category_id,
                    item_id,
                    food_id,
                    name,
                    price,
                    specs,
                    packing_fee,
                    sku_id,
                    stock
                );
                this.$store.commit("add_cart", {
                    shopid: shopId,
                    category_id,
                    item_id,
                    food_id,
                    name,
                    price,
                    specs,
                    packing_fee,
                    sku_id,
                    stock
                });
            },
            //购物车列表减少
            jianshao1(
                shopId,
                category_id,
                item_id,
                food_id,
                name,
                price,
                specs,
                packing_fee,
                sku_id,
                stock
            ) {
                this.$store.commit("reduce_cart", {
                    shopid: shopId,
                    category_id,
                    item_id,
                    food_id,
                    name,
                    price,
                    specs,
                    packing_fee,
                    sku_id,
                    stock
                });
            },
            showCar() {
                this.carShow = !this.carShow;
            },
            clearAll() {
                this.$store.commit("delete_cart", { shopid: this.shopId });
                this.carShow = !this.carShow;
            },
            xuanguige(i, cId) {
                this.xuanguigeIsshow = !this.xuanguigeIsshow;
                // console.log(i)
                this.xuanguigeArr = i;
                // console.log(this.xuanguigeArr);
                this.xuanguigeName = i[0].name;
                this.xuanguigecId = cId;
                // console.log(this.xuanguigeName)
            },
            closethis() {
                this.xuanguigeIsshow = !this.xuanguigeIsshow;
            },
            guigeID(i) {
                // console.log(i)
                this.guigeArr = this.xuanguigeArr[i];
                // console.log(this.guigeArr)
                this.guigebgc = i;
            },
            xggjianshao() {
                alert("请去购物车列表操作");
            },

            goDist() {
                this.$router.push("/dist");
                // console.log(this.allFoodsPrice)
                localStorage.setItem('allprice',this.allFoodsPrice)
            }

        },


        computed: {
            /*
              计算属性: 会监听data数据或者props数据的变化, 只要其依赖的数据发生变化, 计算属性就能监测到, 进而自动触发对应代码
                 计算属性有两种写法:
                 1. 写成个函数 (该函数必须有返回值, 默认为计算属性的get方法)
                 2. 写成个对象, 对象里会有get和set两个方法, 根据如何操作计算属性, 系统会自动触发set或者get
                 在使用时, 只能写属性名
                 当系统检查到获取计算属性值时, 会自动触发该属性的get方法, 如果监测到是在设置该计算属性的值, 会自动触发get方法
             */
            //总价格
            allFoodsPrice() {
                let allFoodsCount = 0;
                Object.keys(this.shopCart).forEach(category_id => {
                    Object.keys(this.shopCart[category_id]).forEach(
                        item_id => {
                            Object.keys(
                                this.shopCart[category_id][item_id]
                            ).forEach(food_id => {
                                let foodItem = this.shopCart[category_id][item_id][
                                    food_id
                                    ];
                                let newFoodItem = {
                                    ...foodItem,
                                    category_id,
                                    item_id,
                                    food_id,
                                    shopId: this.shopId
                                };
                                allFoodsCount += newFoodItem.num * newFoodItem.price;
                            });
                        }
                    );
                });
                return allFoodsCount;
            },
            //购物车总数量
            allItemCount() {
                let allItemCount = 0;
                Object.keys(this.shopCart).forEach(category_id => {
                    Object.keys(this.shopCart[category_id]).forEach(
                        item_id => {
                            Object.keys(
                                this.shopCart[category_id][item_id]
                            ).forEach(food_id => {
                                let foodItem = this.shopCart[category_id][item_id][
                                    food_id
                                    ];
                                let newFoodItem = {
                                    ...foodItem,
                                    category_id,
                                    item_id,
                                    food_id,
                                    shopId: this.shopId
                                };
                                allItemCount += newFoodItem.num;
                            });
                        }
                    );
                });
                return allItemCount;
            },
            //分类总数量
            itemCount() {
                return cateid => {
                    let itemFoodCount = 0;
                    if (this.shopCart && this.shopCart[cateid]) {
                        Object.values(this.shopCart[cateid]).forEach(foods => {
                            Object.values(foods).forEach(food => {
                                // console.log(food);
                                itemFoodCount += food.num;
                            });
                        });
                    }
                    return itemFoodCount;
                };
            },
            //购物车
            shopCart() {
                return {...this.$store.state.cartList[this.shopId]};
            },
            //商品数量
            foodNum() {
                return foods => {
                    let category_id = foods.category_id;
                    let item_id = foods.item_id;
                    let itemNum;
                    if (
                        this.shopCart &&
                        this.shopCart[category_id] &&
                        this.shopCart[category_id][item_id]
                    ) {
                        Object.values(this.shopCart[category_id][item_id]).forEach(
                            item => {
                                itemNum = item ? item.num : 0;
                            }
                        );
                        return itemNum;
                    } else {
                        return 0;
                    }
                };
            },    // 获取当前商铺购物车的所有商品

            nowCart() {
                let nowCartArr = [];
                Object.keys(this.shopCart).forEach(category_id => {
                    Object.keys(this.shopCart[category_id]).forEach(item_id => {
                        Object.keys(this.shopCart[category_id][item_id]).forEach(
                            food_id => {
                                let foodItem = this.shopCart[category_id][item_id][
                                    food_id
                                    ];
                                let newFoodItem = {
                                    ...foodItem,
                                    category_id,
                                    item_id,
                                    food_id,
                                    shopId: this.shopId
                                };
                                nowCartArr.push(newFoodItem);
                            }
                        );
                    });
                });
                return nowCartArr;
            },

        }
    }
</script>

<style scoped>
    .shopWarp {
        display: flex;
        flex-direction: column;
        position: absolute;
        right: 0;
        left: 0;
        height: 100%;
    }
    .description_header {
        position: relative;
        z-index: 10;
        background-color: rgba(119,103,137,.43);
        padding: .4rem 0 .4rem .4rem;
        width: 100%;
        overflow: hidden;
        box-sizing: border-box;
    }
    .description_left {
        margin-right: .3rem;
    }
    .description_left > img {
        width: 2.9rem;
        height: 2.9rem;
        display: block;
        border-radius: .15rem;
    }
    .description_title {
        font-size: .8rem;
        color: #fff;
        font-weight: 700;
        width: 100%;
        margin-bottom: .3rem;
        margin-top: .2rem;
    }
    .description_text {
        font-size: .5rem;
        color: #fff;
        margin-bottom: .3rem;
        margin-top: .5rem;
    }
    .description_promotion {
        font-size: .5rem;
        color: #fff;
        width: 11.5rem;
        margin-top: .2rem;
    }
    .el-icon-arrow-right  {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: .6rem;
        font-size: .8rem;
        z-index: 11;
        color: white;
    }
    .el-icon-arrow-left {
        position: absolute;
        top: 10%;
        left: -.2rem;
        font-size: 1.5rem;
        z-index: 11;
        color: white;
    }

    /*商品和评价*/
    .change_show_type {
        display: flex;
        background-color: #fff;
        padding: .3rem 0 .6rem;
        border-bottom: 1px solid #ebebeb;
    }
    .change_show_type > div {
        flex: 1;
        text-align: center;
    }
    .change_show_type > div:nth-of-type(2) > span {
        font-size: .65rem;
        color: #666;
        padding: .2rem .1rem;
        border-bottom: .12rem solid #fff;
    }
    .activity_show {
        color: #3190e8;
        font-size: .65rem;
        padding: .2rem .1rem;
        border-bottom: .12rem solid #fff;
        border-color: #3190e8;
    }
    /*商品*/
    .food_container {
        display: flex;
        flex: 1;
        padding-bottom: 2rem;
        overflow: hidden;
    }
    .menu_container {
        display: flex;
        flex: 1;
        overflow-y: hidden;
        position: relative;
    }
    .menu_left {
        width: 3.8rem;
        overflow: scroll;
    }
    .menu_left_li {
        padding: .7rem .3rem;
        border-bottom: .025rem solid #ededed;
        box-sizing: border-box;
        /*border-left: .15rem solid #f8f8f8;*/
        position: relative;
    }
    /*.activity_menu {*/
        /*border-left: .15rem solid #3190e8;*/
        /*background-color: #fff;*/
    /*}*/
    .badegspan {
        font-size: .6rem;
        color: #666;
    }

    .menu_right {
        flex: 4;
        overflow-y: auto;
    }

    .menu_detail_header {
        width: 100%;
        padding: .4rem;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
    }
    .menu_detail_header_left {
        width: 11rem;
        white-space: nowrap;
        overflow: hidden
    }
    .menu_item_title {
        font-size: .7rem;
        color: #666;
        font-weight: 700;
    }
    .menu_item_description {
        font-size: .5rem;
        color: #999;
        width: 30%;
        overflow: hidden;
        margin-left: .3rem;
    }
    .menu_detail_header_right {
        width: .5rem;
        height: 1rem;
        display: block;
        margin-top: -0.2rem;
    }
    .description_tip {
        background-color: #39373a;
        opacity: .95;
        font-size: .5rem;
        color: #fff;
        position: absolute;
        top: 1.5rem;
        z-index: 14;
        width: 6rem;
        right: .2rem;
        padding: .5rem .4rem;
        border: 1px;
        border-radius: .2rem;
    }
    .description_tip > span {
        color: #fff;
        line-height: .6rem;
        font-size: .55rem;
    }
    .description_tip > img {
        position: absolute;
        width: .6rem;
        height: .6rem;
        top: -.4rem;
        right: .10rem;
    }
    .menu_detail_list {
        background-color: #fff;
        padding: .6rem .4rem;
        border-bottom: 1px solid #f8f8f8;
        position: relative;
        overflow: hidden;
    }
    .menu_detail_link {
        display: flex;
    }
    .menu_food_img {
        margin-right: .4rem;
    }
    .menu_food_img > img {
        width: 2rem;
        height: 2rem;
        display: block;
    }
    .menu_food_description {
        width: 100%;
    }
    .food_description_head {
        display: flex;
        justify-content: space-between;
        margin-bottom: .2rem;
    }
    .description_foodname {
        font-size: .7rem;
        color: #333;
    }
    .zp {
        font-size: .3rem;
        height: .6rem;
        line-height: .6rem;
        padding: .1rem;
        border: 1px solid rgb(240, 115, 115);
        border-radius: .3rem;
        margin-right: .1rem;
        transform: scale(.8);
        color: rgb(240, 115, 115);;
    }
    .food_description_content {
        font-size: .5rem;
        color: #999;
        line-height: .6rem;
    }
    .food_description_sale_rating {
        line-height: .8rem;
    }
    .food_description_sale_rating > span{
        font-size: .5rem;
        color: #333;
    }
    .food_activity {
        line-height: .4rem;
    }
    .food_activity > span {
        font-size: .3rem;
        border: 1px solid ;
        border-radius: .3rem;
        padding: .08rem;
        display: inline-block;
        transform: scale(.8);
        /*margin-left: -.35rem;*/
        color: rgb(241, 136, 79);
        border-color: rgb(240, 115, 115);

    }
    .menu_detail_footer {
        font-size: 0;
        margin-top: .3rem;
        display: flex;
        justify-content: space-between;
        margin-left: 2.4rem;
    }
    .food_price > span:nth-of-type(1) {
        font-size: .5rem;
        color: #f60;
        margin-right: .05rem;
    }
    .food_price > span:nth-of-type(2) {
        font-size: .7rem;
        color: #f60;
        font-weight: 700;
        margin-right: .3rem;
    }
    .food_price > span:nth-of-type(3) {
        font-size: .5rem;
        color: #666;
    }
    /*购物车*/
    .buy_cart_container {
        position: absolute;
        background-color: #3d3d3f;
        bottom: 0;
        left: 0;
        z-index: 13;
        display: flex;
        width: 100%;
        height: 2rem;
    }
    .cart_icon_num {
        flex: 1;
    }
    .cart_icon_container {
        display: flex;
        background-color: #3d3d3f;
        position: absolute;
        padding: .4rem;
        border: .18rem solid #444;
        border-radius: 50%;
        left: .5rem;
        top: -.7rem;
    }
    .cart_list_length {
        position: absolute;
        top: -.25rem;
        right: -.25rem;
        background-color: #ff461d;
        line-height: .7rem;
        text-align: center;
        border-radius: 50%;
        border: .025rem solid #ff461d;
        min-width: .7rem;
        height: .7rem;
        font-size: .5rem;
        color: #fff;
        font-family: Helvetica Neue,Tahoma,Arial;
    }
    .cart_icon {
        width: 1.2rem;
        height: 1.2rem;
    }
    .cart_num {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 3.5rem;
    }
    .cart_num_money1 {
        font-size: .8rem;
        font-weight: 700;
        margin-bottom: .3rem;
        color: white;
    }
    .cart_num_money2 {
        font-size: .4rem;
        color: white;
    }
    .gotopay {
        position: absolute;
        right: 0;
        background-color: #535356;
        width: 5rem;
        height: 100%;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .gotopay_button_style {
        font-size: .7rem;
        color: #fff;
        font-weight: 700;
    }

    /*评价*/
    .rating_container {
        flex: 1;
        overflow: scroll;
        flex-direction: column;
    }
    .rating_header {
        display: flex;
        background-color: #fff;
        padding: .8rem .5rem;
        margin-bottom: .5rem;
    }
    .rating_header_left{
        flex: 3;
        text-align: center;
    }
    .rating_header_left > p:nth-of-type(1){
        font-size: 1.2rem;
        color: #f60;
        margin: .2rem 0rem;
    }
    .rating_header_left > p:nth-of-type(2){
        font-size: .65rem;
        color: #666;
        margin-bottom: .2rem;
    }
    .rating_header_left > p:nth-of-type(3){
        font-size: .4rem;
        color: #999;
    }
    .rating_header_right {
        flex: 4;
    }
    .rating_header_right > p {
        font-size: .65rem;
        line-height: 1rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }
    .rating_header_right > p > span {
        color: #666;
        margin-right: .5rem;
    }
    /*.rating_container {*/
        /*display: inline-block;*/
        /*position: relative;*/
        /*top: .2rem;*/
        /*width: 2rem;*/
        /*height: .4rem;*/
        /*overflow-y: hidden;*/
        /*flex-direction: column;*/
    /*}*/
    .tag_list_ul {
        display: flex;
        flex-wrap: wrap;
        background-color: #fff;
        padding: .5rem;
    }
    .tag_list_ul > li {
        font-size: .6rem;
        color: #6d7885;
        padding: .3rem;
        background-color: #ebf5ff;
        border-radius: .2rem;
        border: 1px;
        margin: 0 .4rem .2rem 0;
    }
    .rating_list_ul {
        background-color: #fff;
        padding: 0 .5rem;
    }
    .rating_list_li {
        border-top: 1px solid #f1f1f1;
        display: flex;
        padding: .6rem 0;
    }
    .rating_list_li > img {
        width: 1.5rem;
        height: 1.5rem;
        border: .025rem;
        border-radius: 50%;
        margin-right: .8rem;
    }
    .rating_list_details {
        flex: 1;
    }
    .rating_list_details > header {
        display: flex;
        flex: 1;
        justify-content: space-between;
        margin-bottom: .3rem;
    }
    .username_star {
        font-size: .55rem;
        color: #666
    }
    .username {
        color: #666;
        margin-bottom: .2rem;
    }
    .star_desc {
        display: flex;
        align-items: center;
    }
    .time_spent_desc {
        font-size: .55rem;
        color: #666;
        margin-left: .15rem;
    }
    .rated_at {
        font-size: .4rem;
        color: #999;
    }
    .food_img_ul {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: .4rem;
    }
    .food_img_ul > li > img {
        width: 3rem;
        height: 3rem;
        margin-right: .4rem;
        display: block;
    }
    .food_name_ul {
        display: flex;
        flex-wrap: wrap;
    }
    .food_name_ul > li {
        font-size: .55rem;
        color: #999;
        width: 2.2rem;
        padding: .2rem;
        border: .025rem solid #ebebeb;
        border-radius: .15rem;
        margin-right: .3rem;
        margin-bottom: 4px;
    }



    .unsatisfied {
        background-color: #f5f5f5;
        color: #aaa;
    }










    .cart_button {
        display: flex;
        align-items: center;
        /*display: none;*/
    }

    .cart_button i {
        width: 0.9rem;
        height: 0.9rem;
        color: #3190e8;
        font-size: 0.7rem;
    }

    .cart_num1 {
        font-size: 0.65rem;
        color: #666;
        min-width: 1rem;
        text-align: center;
        font-family: Helvetica Neue, Tahoma;
    }

    .add_icon {
        width: 0.9rem;
        height: 0.9rem;
        color: #3190e8;
        font-size: 0.7rem;
        /*line-height: 0.9rem;*/
        margin-left: .2rem;
        position: relative;
        top: -0.03rem;
    }
    .cart_list_control .add_icon{
        width: 0.9rem;
        height: 0.5rem;
        color: #3190e8;
        font-size: 0.7rem;
    }
    .cart_food_list {
        position: fixed;
        width: 100%;
        padding-bottom: 2rem;
        z-index: 12;
        bottom: 0;
        left: 0;
        background-color: #fff;
    }

    .carheader {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.3rem 0.6rem;
        background-color: #eceff1;
    }

    .carheader h4 {
        font-size: 0.7rem;
        color: #666;
    }

    .clear_cart {
        font-size: 0.6rem;
        color: #666;
    }

    .cart_food_details {
        background-color: #fff;
        max-height: 20rem;
        overflow-y: auto;
    }

    .cart_food_li {
        display: flex;
        justify-content: space-between;
        padding: 0.6rem 0.5rem;
    }

    .cart_list_num {
        width: 55%;
    }

    .cart_list_num p {
        font-size: 0.7rem;
        color: #666;
        font-weight: 700;
    }

    .cart_list_price span {
        font-size: 0.7rem;
        color: #f60;
        font-family: Helvetica Neue, Tahoma;
        font-weight: 700;
    }

    .cart_list_control {
        display: flex;
        align-items: center;
    }

    .specs_list {
        position: fixed;
        top: 35%;
        left: 15%;
        width: 70%;
        background-color: #fff;
        z-index: 18;
        border: 1px;
        border-radius: 0.2rem;
    }

    .specs_list_header h4 {
        font-size: 0.7rem;
        color: #222;
        font-weight: 400;
        text-align: center;
        padding: 0.5rem;
    }

    .specs_cancel {
        position: absolute;
        right: 0.5rem;
        top: 0.5rem;
    }

    .specs_details {
        padding: 0.5rem;
    }

    .specs_details_title {
        font-size: 0.6rem;
        color: #666;
    }

    .specs_details ul {
        display: flex;
        flex-wrap: wrap;
        padding: 0.4rem 0;
    }

    .specs_activity {
        font-size: 0.6rem;
        padding: 0.3rem 0.5rem;
        border: 0.025rem solid #ddd;
        border-radius: 0.2rem;
        margin-right: 0.5rem;
        margin-bottom: 0.2rem;
    }

    .specs_footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #f9f9f9;
        padding: 0.5rem;
        border: 1px;
        border-bottom-left-radius: 0.2rem;
        border-bottom-right-radius: 0.2rem;
    }

    .specs_addto_cart {
        width: 4rem;
        height: 1.3rem;
        background-color: #3199e8;
        border: 1px;
        border-radius: 0.15rem;
        font-size: 0.6rem;
        color: #fff;
        text-align: center;
        line-height: 1.3rem;
    }

    .specs_price span:first-of-type {
        font-size: 0.5rem;
        color: #ff6000;
    }

    .specs_price span:nth-of-type(2) {
        font-size: 0.8rem;
        font-weight: 700;
        font-family: Helvetica Neue, Tahoma;
        color: #ff6000;
    }

    .el-badge sup {
        top: 10px !important;
    }


    .show_chooselist {
        display: block;
        font-size: .55rem;
        color: #fff;
        padding: .1rem .2rem;
        background-color: #3190e8;
        border-radius: .2rem;
        border: 1px solid #3190e8;
    }
</style>


<style>
    .el-rate__icon  {
        font-size: .5rem;
        margin-right: 0px;
    }
    .el-badge__content.is-fixed{
        position: absolute;
        top: 0;
        right: 0px
    }
</style>