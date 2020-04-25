<template>
   <div class="cityWarp">
       <!--头部导航-->
       <header>
           <!--返回home页面-->
           <i class="el-icon-arrow-left" @click="goHome"></i>
           <!--当前城市-->
           <span class="h_city">{{cityInfo ? cityInfo.name : ""}}</span>
           <!--切换城市按钮-->
           <router-link to="/home"><span>切换城市</span></router-link>
       </header>

       <!--搜索框-->
       <div class="city_form">
           <!--搜索框-->
           <div class="i1">
               <input type="text" placeholder="输入学校、商务楼、地址" class="city_input" v-model="inputV">
           </div>
           <!--提交按钮-->
           <div class="i2">
               <div class="city_submit" @click="searchPlace">提交</div>
           </div>
       </div>

       <!--搜索历史-->
       <p class="search_history" v-if="isShowHistoryHeader">搜索历史</p>

       <!--将来展示搜索内容或者历史记录-->
       <ul>
           <li v-for="p in placeArr" :key="p.geohash" @click="choosePlace(p)">
               <h4 class="ellipsis p_name">{{p.name}}</h4>
               <p class="ellipsis p_address">{{p.address}}</p>
           </li>
       </ul>

       <!--清空所有-->
       <div class="clearHistory" @click="clearAllPlace" v-if="isShowClearBtn">
           清空所有
       </div>
   </div>
</template>

<script>
    export default {
        name: "City",
        data(){
            return {
                cityId: 0,
                cityInfo: null,
                inputV: "",
                placeArr:[],
                //控制搜索历史的显隐
                isShowHistoryHeader: true,
                //控制清除所有历史记录按钮的显隐
                isShowClearBtn: false

            }
        },
        created(){
          //获取params传递来的城市id，根据id发起来网络请求获取城市信息
            this.cityId = this.$route.params.cityId;
            this.axios.get("/v1/cities/"+this.cityId).then(res=>{
                this.cityInfo = res;
            }).catch(err=>{});

            //进入该页面之前，先查看是否有历史记录，如果有，展示
            if (localStorage.getItem("placeHistory")) {
                this.placeArr = JSON.parse(localStorage.getItem("placeHistory"));
                //显示清楚按钮
                this.isShowClearBtn = true;
            }
        },
        methods: {
            goHome(){
                this.$router.push({path:'/Home'});
            },
            searchPlace(){
                this.axios.get("v1/pois", {
                    params: {
                        city_id:this.cityInfo.id,
                        keyword:this.inputV,
                        type:"search"
                    }
                }).then(res=>{
                    this.placeArr = res;
                    // console.log(this.placeArr);
                    this.isShowHistoryHeader = false;
                }).catch(err=>{
                    console.log(err)
                })
            },
            choosePlace(p){
                // console.log(p);
                /*
                    第一次存，先创建一个数组，将p放进数组，将数组存储在localStorage
                    以后存，获取数组，将p放进数组，将数组存储在localStorage
                 */

                // this.$store.state.geohash = p.geohash;
                // this.$store.state.latitude = p.latitude;
                // this.$store.state.longitude = p.longitude;


                localStorage.setItem("placeNameHistory", JSON.stringify(p));

                // console.log(localStorage.getItem("placeHistory"));
                if (!localStorage.getItem("placeHistory")) {
                    //第一次存
                    let hisArr = [];
                    hisArr.push(p);
                    localStorage.setItem("placeHistory", JSON.stringify(hisArr));

                    this.$router.push({path:'/msite'});

                } else {
                    //之后存
                    let hisArr = JSON.parse(localStorage.getItem("placeHistory"));
                    // console.log(hisArr);

                    // hisArr.push(p);
                    // localStorage.setItem("placeHistory", JSON.stringify(hisArr));



                    // 去重
                    let newArr = hisArr.filter(v=>{
                        return v.name == p.name
                    })
                    if (!newArr.length) {
                        hisArr.push(p);
                        localStorage.setItem("placeHistory",JSON.stringify(hisArr));
                    }



                    // this.$router.push({name:'d',params:{mName: p.geohash,latitude: p.latitude,longitude: p.longitude}});
                    this.$router.push({path:'/msite'});
                }
            },
            clearAllPlace() {
                //点击清楚所有，删除placeHistory的localStorage  ，清空下拉列表， 隐藏清空按钮
                localStorage.removeItem("placeHistory");
                this.placeArr = [];
                this.isShowClearBtn = false;
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
    header>i {
        color: #fff;
        font-size: .65rem;
        position: absolute;
        top: 50%;
        left: .4rem;
        transform: translateY(-50%);
    }
    .h_city {
        font-size: .8rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        color: #fff;
        text-align: center;
        font-weight: 700
    }
    header>a>span {
        right: .4rem;
        font-size: .6rem;
        color: #fff;
        position: absolute;
        top: 50%;
        transform: translateY(-50%)
    }
    .city_form {
        background-color: #fff;
        border-top: 1px solid #e4e4e4;
        border-bottom: 1px solid #e4e4e4;
        padding-top: .4rem;
        margin-top: 2.34rem;
    }
    .i1, .i2{
        width: 90%;
        margin: 0 auto;
        text-align: center
    }
    .city_input {
        border: 1px solid #e4e4e4;
        padding: 0 .3rem;
        font-size: .65rem;
        color: #333;
        border-radius: .1rem;
        margin-bottom: .4rem;
        width: 100%;
        height: 1.4rem;
        box-sizing: border-box;
        outline: none;
    }
    .city_submit {
        background-color: #3190e8;
        font-size: .65rem;
        color: #fff;
        border-radius: .1rem;
        margin-bottom: .4rem;
        width: 100%;
        height: 1.4rem;
        line-height: 1.4rem;
    }
    .search_history {
        border-top: 1px solid #e4e4e4;
        border-bottom: 1px solid #e4e4e4;
        padding-left: .5rem;
        font-size: .475rem;
        line-height: 0.8rem;
        font-family: Microsoft YaHe;

    }
    .clearHistory {
        font-size: .7rem;
        color: #666;
        text-align: center;
        line-height: 2rem;
        background-color: #fff
    }
    ul li {
        margin: 0 auto;
        padding-top: .65rem;
        border-bottom: 1px solid #e4e4e4;
        background-color: #fff;
    }
    .p_name {
        margin: 0 auto .35rem;
        width: 90%;
        font-size: .65rem;
        color: #333
    }
    .p_address {
        width: 90%;
        margin: 0 auto .55rem;
        font-size: .45rem;
        color: #999;
    }
</style>