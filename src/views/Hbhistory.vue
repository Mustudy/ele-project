<template>
    <div class="hbhistoryWarp">
        <!--头部-->
        <header class="benefit_top">
            <i class="el-icon-arrow-left" @click="$router.back(-1)"></i>
            <span class="my">历史红包</span>
        </header>


        <section>
            <section class="hongbao_container">
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
                                <div class="time_left">
                                    <img src="../assets/过期.png" alt="">
                                </div>
                            </section>
                            <footer class="list_item_footer">
                                <p>{{item.limit_map ? item.limit_map.restaurant_flavor_ids : ""}}</p>
                            </footer>
                        </li>
                    </ul>
                </section>
        </section>
    </div>
</template>

<script>
    export default {
        name: "Hbhistory",
        data(){
            return{
                userinfo:[],
                userid: 0,
                hongArr: [],
            }
        },
        created(){
            if (localStorage.getItem("userinfo")) {
                this.userinfo = JSON.parse(localStorage.getItem("userinfo"));
                // console.log(this.userinfo)
                this.userid = this.userinfo[0].user_id;
                // console.log(this.userid);

                this.axios.get("/promotion/v2/users/"+this.userid+"/expired_hongbaos?limit=" + 20 + "&offset=" + 0).then(res=>{
                    // console.log(res);
                    this.hongArr = res;
                    console.log(this.hongArr);
                }).catch(err=>{});

            }


        },
    }
</script>

<style scoped>
    .hbhistoryWarp {
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

    .hongbao_container {
        padding: 0 .7rem;
    }
    .hongbao_list_li {
        background: #fff url("../assets/灰色.png") repeat-x;
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
        color: #ccc;
        font-weight: 700;
    }
    .list_item_left > span:nth-of-type(2) {
        font-size: 1.5rem;
        color: #ccc;
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
        width: 3rem;
        height: 3rem;
        position: relative;
        top: -0.6rem;
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
</style>