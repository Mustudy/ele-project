<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>
    html, body, #app {
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;
    }
    /*超出部分...代替*/
    .ellipsis {
        /*不换行*/
        white-space: nowrap;
        /*超出部分隐藏*/
        overflow: hidden;
        /*超出的部分用...代替*/
        text-overflow: ellipsis;
    }
    a {
      text-decoration: none;
    }
</style>
