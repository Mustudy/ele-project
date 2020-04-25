<template>
    <div class="homeWarp">
        <!--头部导航-->
        <header>
            <!--logo-->
            <span class="logo">ele.me</span>
            <!--登录注册按钮-->
            <router-link to="/login"><span>登录|注册</span></router-link>
        </header>
        <!--定位城市-->
        <nav>
            <div>
                <span>当前定位城市：</span>
                <span class="r_span">定位不准时，请在城市列表中选择</span>
            </div>
            <router-link :to="{name:'c', params:{cityId:guessCity ? guessCity.id : 1}}">
                <span>{{guessCity ? guessCity.name : ""}}</span>
                <i class="el-icon-arrow-right"></i>
            </router-link>
        </nav>
        <!--热门城市-->
        <section class="hot_city">
            <h4 class="city_title">热门城市</h4>
            <ul>
                <li v-for="c in hotCity" :key="c.id" class="city_style" @click="chooseCity(c.id)">{{c.name}}</li>
            </ul>
        </section>

        <!--所有城市-->
        <section class="group_city">
            <ul>
                <!--城市首字母-->
                <li v-for="(city_arr, group_key, index) in groupCity" class="g_li" :key="group_key" >
                    <!--首字母-->
                    <h4 class="city_title">
                        {{group_key}}
                        <!--<span v-if="index ? false : true">(按字母排序)</span>-->
                        {{index ? "" : "(按字母排序)"}}
                    </h4>
                    <!--字母对应城市-->
                    <ul >
                        <li v-for="city in city_arr" class="city_style ellipsis" :key="city.id" @click="chooseCity(city.id)">{{city.name}}</li>
                    </ul>
                </li>
            </ul>
        </section>
    </div>

</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                guessCity:null,
                hotCity:[],
                groupCity:null
            }
        },
        created() {
            //定位城市的网络请求
            this.axios.get("/v1/cities",{
                params: {type: "guess"}
            }).then(res=>{
                this.guessCity = res;
                // console.log(res);
            }).catch(err=>{});

            //热门城市的网络请求
            this.axios.get("/v1/cities",{
                params: {type: "hot"}
            }).then(res=>{
                this.hotCity = res;
                // console.log(res);
            }).catch(err=>{});

            //所有城市的网络请求
            this.axios.get("/v1/cities",{
                params: {type: "group"}
            }).then(res=>{
                // console.log(res);
                //处理所有城市的方法
                this.handleGroupCity(res);
            }).catch(err=>{});
        },
        methods: {
            handleGroupCity(cityGroup){
                const orderCity = {};

                //对象按key值排序
                Object.keys(cityGroup).sort().forEach(key=>{
                    orderCity[key] = cityGroup[key]
                });
                this.groupCity = orderCity;
                // console.log(this.groupCity);
            },
            chooseCity(cId) {
                console.log(cId);
                this.$router.push({name:'c', params:{cityId:cId}});
            }
        }
    }
</script>

<style scoped>
    header {
        width: 100%;
        height: 1.95rem;
        position: fixed;
        top: 0;
        left: 0;
        background-color: #3190e8;
    }
    .logo {
        left: .4rem;
        font-weight: 400;
        font-size: .7rem;
        color: #fff;
        width: 2.3rem;
        height: .7rem;
        /*上下居中的格式*/
        position: absolute;
        top: 50%;
        transform: translateY(-50%)
    }
    header>a {
        color: #fff;
        font-size: .65rem;
        position: absolute;
        top: 50%;
        right: .4rem;
        transform: translateY(-50%);
        text-decoration: none;
    }
    nav {
        width: 100%;
        padding-top: 2.35rem;
        background-color: #fff;
        margin-bottom: .4rem;
    }
    nav>div {
        display: flex;
        justify-content: space-between;
        line-height: 1.45rem;
        padding: 0 .45rem
    }
    nav>div>span {
        font-size: .55rem;
        color: #666;
    }
    .r_span {
        font-size: .475rem;
        color: #9f9f9f;
        font-weight: 900;
    }
    nav>a {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1.8rem;
        padding: 0 .45rem;
        border-top: 1px solid #e4e4e4;
        border-bottom: 2px solid #e4e4e4;
        font-size: .75rem;
        line-height: 1.8rem;
        font-family: Microsoft YaHei;
        text-decoration: none;
    }
    nav>a>span {
        color: #3190e8;
    }
    .hot_city {
        background-color: #fff;
    }
    .city_title {
        color: #666;
        font-weight: 400;
        text-indent: .45rem;
        border-top: 2px solid #e4e4e4;
        border-bottom: 1px solid #e4e4e4;
        font-size: .55rem;
        line-height: 1.45rem;
        font-family: Helvetica Neue;

    }
    .hot_city>ul {
        overflow: hidden;
    }
    .city_style {
        float: left;
        text-align: center;
        color: #3190e8;
        border-bottom: .025rem solid #e4e4e4;
        border-right: .025rem solid #e4e4e4;
        width: 25%;
        height: 1.75rem;
        font: .6rem/1.75rem Microsoft YaHei;
        box-sizing: border-box;
    }
    .g_li {
        margin-bottom: .4rem;
        background-color: #fff;
        border-bottom: 1px solid #e4e4e4;
    }
    .g_li>ul {
        overflow: hidden;
    }


</style>