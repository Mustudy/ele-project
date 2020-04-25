import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        redirect: "/home"
    },
    {
        path:"/home",
        component:()=>import("../views/Home")
    },
    {
        path:"/city/:cityId",
        name:'c',
        component: ()=>import("../views/City")
    },
    {
        path:"/login",
        component:()=>import("../views/Login")
    },
    {
        path:"/msite",
        // name:'d',
        component:()=>import("../views/Msite")
    },
    {
        path:"/profile",
        component:()=>import("../views/Profile")
    },
    {
      path: "/food/:head/:latitude/:longitude",
        name: 'f',
      component:()=>import("../views/Food")
    },
    {
        path: "/info",
        component:()=>import("../views/Info")
    },
    {
        path: "/setusername",
        component:()=>import("../views/Setusername")
    },
    {
        path: "/forget",
        component:()=>import("../views/Forget")
    },
    {
        path: "/balance",
        component:()=>import("../views/Balance")
    },
    {
        path:"/shop",
        component:()=>import("../views/Shop")
    },
    {
        path:"/benefit",
        component:()=>import("../views/Benefit")
    },
    {
        path:"/points",
        component:()=>import("../views/Points")
    },
    {
        path:"/order",
        component:()=>import("../views/Order")
    },
    {
        path:"/integral",
        component:()=>import("../views/Integral")
    },
    {
        path:"/vipcard",
        component:()=>import("../views/Vipcard"),

    },
    {
        path:"/usecartid",
        component: ()=>import("../views/Usecart"),
    },
    {
        path:"/payment",
        component: ()=>import("../views/Payment"),
    },
    {
        path:"/service",
        component: ()=>import("../views/Service"),
    },
    {
        path:"/download",
        component: ()=>import("../views/Download"),
    },
    {
        path:"/search",
        // name:"se",
        component: ()=>import("../views/Search"),
    },
    {
        path:"/hbhistory",
        component: ()=>import("../views/Hbhistory"),
    },
    {
        path:"/exchange",
        component: ()=>import("../views/Exchange"),
    },
    {
        path:"/commend",
        component: ()=>import("../views/Commend"),
    },
    {
        path:"/shopdetail",
        component: ()=>import("../views/Shopdetail"),
    },
    {
        path:"/address",
        component: ()=>import("../views/Address"),
    },
    {
        path:"/addaddress",
        component: ()=>import("../views/addAddress"),
    },
]

const router = new VueRouter({
  routes
})

export default router
