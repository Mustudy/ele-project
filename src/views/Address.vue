<template>
    <div class="addressWarp">
        <header class="forget_top">
            <i class="el-icon-arrow-left" @click="$router.back(-1)"></i>
            <span class="my">编辑地址</span>
            <span class="s2" v-if="change1" @click="redact1">编辑</span>
            <span class="s2" v-if="change2" @click="redact2">完成</span>

        </header>

        <section class="address">
            <ul class="addresslist">
                <li v-for="(item, index) in address" :key="item.id">
                <!--<li>-->
                    <div>
                        <p>{{item.address}}</p>
                        <!--<p>11</p>-->
                        <p>
                            <span>{{item.name}}</span>
                            <!--<span>11</span>-->
                        </p>
                    </div>
                    <i class="el-icon-close" @click="remove(item,index)"  v-if="change3"></i>
                </li>

            </ul>

            <router-link to="/addaddress">
                <div class="addsite">
                    <span>新增地址</span>
                    <i class="el-icon-arrow-right"></i>
                </div>
            </router-link>
        </section>
    </div>
</template>

<script>
    export default {
        name: "Address",
        data() {
            return{
                userid:0,
                address:[],
                //编辑完成
                change1:true,
                change2:false,
                //删除的显隐
                change3:false,
            }
        },
        created() {
            if (localStorage.getItem("userinfo")) {
                this.userinfo = JSON.parse(localStorage.getItem("userinfo"));
                // console.log(this.userinfo)
                // this.gift = this.userinfo[0].gift_amount;
                this.userid = this.userinfo[0].user_id;
                // console.log(this.userid);

                this.axios.get("/v1/users/"+this.userid+"/addresses").then(res=>{
                    // console.log(res);
                    this.address = res;
                    // console.log(this.address);
                }).catch(err=>{});
            }

        },
        methods: {
            // 编辑
            redact1(){
              this.change1 = false;
              this.change2 = true;
              this.change3 = true;
            },
            // 完成
            redact2(){
                this.change1 = true;
                this.change2 = false;
                this.change3 = false;
            },
            //删除地址
            remove(i, s) {
                // console.log(i)
                this.axios.delete("/v1/users/"+this.userid+"/addresses/" + i.id).then(res=>{
                    // console.log(res);
                    this.address.splice(s, 1);
                }).catch(err=>{});
            }
        }
    }
</script>

<style scoped>
    .addressWarp {
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
    .s2 {
        font-size: .8rem;
        position: absolute;
        top: 50%;
        right: 0%;
        transform: translate(-50%,-50%);
        color: #fff;
        text-align: center;
        font-weight: 700
    }

    .address {
        width: 100%;
        margin-top: .4rem;
        border-top: 1px solid #d9d9d9;
        border-bottom: 1px solid #d9d9d9;
    }
    .addresslist {
        background: #fff;
    }
    .addresslist > li {
        background: #fff8c3;
        border-bottom: 1px solid #d9d9d9;
        padding: .4rem;
        display: flex;
        justify-content: space-between;
    }
    .addresslist > li > div > p {
        line-height: .9rem;
        font-size: .6rem;
        color: #333;
    }
    .addresslist > li > div > p > span{
        display: inline-block;
        font-size: .6rem;
        color: #333;
    }

    .addsite {
        margin-top: .4rem;
        background: #fff;
        padding: .2rem .4rem;
        border-top: 1px solid #d9d9d9;
        display: flex;
        justify-content: space-between;
    }
    .addsite > span {
        display: block;
        font-size: .7rem;
        color: #333;
        line-height: 1.4rem;
    }
    .el-icon-arrow-right {
        position: relative;
        top: .3rem;
        color: rgb(216, 216, 216);;
    }

    .el-icon-close {
        /*display: block;*/
        font-size: .8rem;
        color: #999;
        position: relative;
        top: .6rem;
    }
</style>