import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import {setStore, getStore, removeStore} from './LS'

export default new Vuex.Store({
  state: {
      geohash:"",
      latitude:"",
      longitude:"",

      cartList: {}
  },
    mutations: {
        add_cart(state, {
            shopid,
            category_id,
            item_id,
            food_id,
            name,
            price,
            specs,
            packing_fee,
            sku_id,
            stock
        }) {
            let cart = state.cartList;
            let shop = cart[shopid] = (cart[shopid] || {});
            let category = shop[category_id] = (shop[category_id] || {});
            let item = category[item_id] = (category[item_id] || {});
            if (item[food_id]) {
                item[food_id]['num']++;
            } else {
                item[food_id] = {
                    "num": 1,
                    "id": food_id,
                    "name": name,
                    "price": price,
                    "specs": specs,
                    "packing_fee": packing_fee,
                    "sku_id": sku_id,
                    "stock": stock
                };
            }
            state.cartList = {...cart};
            //存入localStorage
            setStore('buyCart', state.cartList);
        },
        init_buy_cart(state) {
            let initCart = getStore('buyCart');
            if (initCart) {
                state.cartList = JSON.parse(initCart);
            }
        },
        reduce_cart(state, {
            shopid,
            category_id,
            item_id,
            food_id,
            name,
            price,
            specs,
        }) {
            let cart = state.cartList;
            let shop = (cart[shopid] || {});
            let category = (shop[category_id] || {});
            let item = (category[item_id] || {});
            if (item && item[food_id]) {
                item[food_id]['num']--;
                if (item[food_id]['num'] > 0) {
                    console.log('asdasdasd')
                    state.cartList = {...cart};
                    setStore('buyCart', state.cartList);
                } else {
                    //商品数量为0，则清空当前商品的信息
                    delete item[food_id];
                    if (Object.keys(item).length == 0) {
                        delete category[item_id];
                        if (Object.keys(category).length == 0) {
                            delete shop[category_id];
                            if (Object.keys(shop).length == 0) {
                                delete cart[shopid];
                                if (Object.keys(cart).length == 0) {
                                    state.cartList = {...cart};
                                    removeStore("buyCart");
                                    return;
                                }
                            }
                        }
                    }
                    state.cartList = {...cart};
                    setStore('buyCart', state.cartList);
                }

            }
        },
        delete_cart(state,{shopid}){
            let cart = state.cartList;
            let shop = (cart[shopid] || {});
            delete cart[shopid];
            if (Object.keys(cart).length == 0) {
                removeStore("buyCart");
                state.cartList = {};
                setStore('buyCart', state.cartList);
            }
            // removeStore("buyCart");
            state.cartList = {...cart};
            setStore('buyCart', state.cartList);
        }
    },
  actions: {
  },
  modules: {
  }
})
