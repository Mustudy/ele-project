<template>
    <div class="shopdetailWarp">
        <header class="forget_top">
            <i class="el-icon-arrow-left" @click="$router.back(-1)"></i>
            <span class="my">商家详情</span>
        </header>

        <section class="activities_container">
            <div>活动属性</div>
            <ul class="actibities_ul">
                <li v-for="item in shopInfo.supports" :key="item.id">
                    <span>{{item.icon_name}}</span>
                    <span>{{item.description}}(APP专享)</span>
                </li>
            </ul>
        </section>

        <section class="shop_status_container">
            <div class="shop_status_header">
                <span class="shop_detail_title">食品监督安全公示</span>
                <div @click="isShow2 = !isShow2">
                    <span class="identification_detail">企业认证详情</span>
                    <i class="el-icon-arrow-right"></i>
                </div>
            </div>

            <section class="shop_statu_detail">
                <img src="../assets/笑脸.jpg" alt="">
                <div class="check_date">
                    <p>
                        <span>监督检查结果：</span>
                        <span style="color: #7ed321">良好</span>
                    </p>
                    <p>
                        <span>检查日期：</span>
                        <span style="color: #7ed321">2020-04-16</span>
                    </p>
                </div>
            </section>
        </section>

        <section class="shop_status_info">
            <div class="d1">商家信息</div>
            <p>{{shopInfo.name}}</p>
            <p>地址：{{shopInfo.address}}</p>
            <p>营业时间：{{shopInfo.opening_hours}}</p>
            <p @click="isShow = !isShow">营业执照
                <i class="el-icon-arrow-right"></i>
            </p>
            <p  @click="isShow = !isShow">餐饮服务许可证
                <i class="el-icon-arrow-right"></i>
            </p>
        </section>

        <section class="license_container" v-if="isShow" @click="isShow = !isShow">
            <img src="../assets/zhengjian.jpg" alt="">
        </section>



        <!--安全公示-->
        <div class="safe_shop" v-if="isShow2">
            <header class="forget_top">
                <i class="el-icon-arrow-left" @click="isShow2 = !isShow2"></i>
                <span class="my">食品监督安全公示</span>
            </header>

            <section class="shop_status_container">
                <div class="shop_status_header">
                    <span class="shop_detail_title">食品监督安全公示</span>
                </div>

                <section class="shop_statu_detail">
                    <img src="../assets/笑脸.jpg" alt="">
                    <div class="check_date">
                        <p>
                            <span>监督检查结果：</span>
                            <span style="color: #7ed321">良好</span>
                        </p>
                        <p>
                            <span>检查日期：</span>
                            <span style="color: #7ed321">2020-04-16</span>
                        </p>
                    </div>
                </section>
            </section>

            <section class="shop_status_container">
                <div class="shop_status_header">
                    <span class="shop_detail_title">工商登记信息</span>
                </div>
                <ul>
                    <li>企业名称</li>
                    <li>工商执照注册号</li>
                    <li>注册资本</li>
                    <li>注册地址</li>
                    <li>属地监管所</li>
                    <li>法定代表人</li>
                    <li>经营范围</li>
                </ul>
            </section>

            <section class="shop_status_container">
                <div class="shop_status_header">
                    <span class="shop_detail_title">餐饮许可证</span>
                </div>
                <ul>
                    <li>营业范围</li>
                    <li>许可证有效期</li>
                    <li>许可证号</li>
                    <li>发证时间</li>
                </ul>
            </section>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Shopdetail",
        data(){
            return{
                shopId: 0,
                shopInfo:"",
                isShow:false,
                isShow2:false,

            }
        },
        created(){
            this.shopId = this.$route.query.shopid;
            //店铺信息
            this.axios.get("/shopping/restaurant/"+this.shopId).then(res=>{
                // console.log(res);
                this.shopInfo = res;
            }).catch(err=>{});
        },
        methods: {

        }

    }
</script>

<style scoped>
    .shopdetailWarp {
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
    .activities_container {
        background-color: #fff;
        margin: .4rem 0;
        padding-bottom: .6rem;
    }
    .activities_container > div {
        font-size: .75rem;
        color: #333;
        line-height: 1.8rem;
        padding-left: .6rem;
        border-bottom: 1px solid #f1f1f1;
        margin-bottom: .3rem;
    }
    .actibities_ul {
        padding: 0 .6rem;
    }
    .actibities_ul > li {
        margin-bottom: .4rem;
    }
    .actibities_ul > li:nth-of-type(1) > span:nth-of-type(1) {
        background-color: rgb(153, 153, 153);
    }
    .actibities_ul > li:nth-of-type(2) > span:nth-of-type(1) {
        background-color: rgb(87, 169, 255);
    }
    .actibities_ul > li:nth-of-type(3) > span:nth-of-type(1) {
        background-color: rgb(87, 169, 255);
    }
    .actibities_ul > li > span:nth-of-type(1){
        font-size: .45rem;
        color: #fff;
        padding: .1rem;
        border: 1px;
        border-radius: .1rem;
        margin-right: .2rem
    }
    .actibities_ul > li > span:nth-of-type(2){
        font-size: .55rem;
        color: #666;
    }

    .shop_status_container {
        background-color: #fff;
        margin-bottom: .4rem;
    }
    .shop_status_header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 1.8rem;
        padding: 0 .6rem;
        border-bottom: .025rem solid #f1f1f1;
    }
    .shop_detail_title {
        font-size: .75rem;
        color: #333;
    }
    .identification_detail {
        font-size: .7rem;
        color: #bbb;
        vertical-align: middle;
    }
    .el-icon-arrow-right {
        font-size: .7rem;
        margin-left: .2rem;
        color: #bbb;
        /*float: right;*/
    }
    .shop_statu_detail {
        display: flex;
        padding: .6rem
    }
    .shop_statu_detail > img {
        width: 2rem;
        height: 2rem;
        margin-right: .6rem;
    }
    .shop_statu_detail >div >  p >span {
        font-size: .55rem;
        color: #666;
    }

    .shop_status_info {
        background-color: #fff;
        margin-bottom: .4rem
    }
    .d1 {
        line-height: 1.8rem;
        padding: 0 .6rem;
        font-size: .75rem;
        color: #333;
        border-bottom: .025rem solid #f1f1f1;
    }
    .shop_status_info > p {
        font-size: .6rem;
        color: #666;
        padding: .7rem .6rem .7rem 0;
        margin-left: .6rem;
        border-bottom: .025rem solid #f5f5f5;
    }
    .shop_status_info > p > i {
        float: right;
    }
    .license_container {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,.5);
        z-index: 101;
    }
    .license_container img{
        width: 10rem;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }

    /*安全公示*/
    .safe_shop {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding-top: 1.95rem;
        background-color: #ebebeb;
        z-index: 102;
    }
    .shop_status_container {
        background-color: #fff;
        margin-bottom: .4rem;
    }
    .shop_status_container > ul {
        margin-left: 1rem;
        padding: .4rem 0;
    }
    .shop_status_container > ul > li {
        margin-bottom: .9rem;
        font-size: .55rem;
        color: #333;
    }
</style>