import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/home/index.vue";
import Category from "../pages/category/index.vue";
import GoodsList from "../pages/goods-list/index.vue";
import Cart from "../pages/cart/index.vue";
import GoodsDetail from "../pages/goods-detail/index.vue";
import GoodsNotFound from "../pages/goods-notfound/index.vue";
import Login from "../pages/login/index.vue";
import Register from "../pages/register/index.vue";
import Coupon from "../pages/coupon/index.vue";
import User from "../pages/user/index.vue";
import UserAddress from "../pages/user-address/index.vue";
import AddAddress from "../pages/add-address/index.vue";
import Order from "../pages/order/index.vue";
import OrderAddress from "../pages/order-address/index.vue";
import OrderPay from "../pages/order-pay/index.vue";
import { Token } from "../utils/token"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  }, 
  {
    path: "/category",
    name: "Category",
    component: Category
  }, 
  {
    path: "/cart",
    name: "Cart",
    component: Cart
  },
  {
    path: "/goods-notfound",
    name: "GoodsNotFound",
    component: GoodsNotFound
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/goods-list",
    name: "GoodsList",
    props: route => {
      let cid = route.query.cid || 0
      const cname = route.query.cname || ''
      if(isNaN(cid)){
        cid = 0 
      }
      return {
        cid:parseInt(cid),
        cname
      }
    },
    component: GoodsList
  },
  {
    path:'/goods-detail',
    redirect:'/'
  },
  {
    path:'/coupon',
    name: "Coupon",
    component: Coupon,
  },
  {
    path:'/order',
    name: "Order",
    component: Order,
  },
  {
    path:'/order/address',
    name: "OrderAddress",
    component: OrderAddress,
  },
  {
    path:'/order/pay',
    beforeEnter(to,from,next){
      const id = to.query.id
      if(!/^\d+$/.test(id)){
        next('/')
      }else{
        next()
      } 
    },
    name: "OrderPay",
    component: OrderPay,
  },
  {
    path:'/user',
    name: "User",
    component: User,
  //   children:[
  //     {
  //       path:'/address',
  //       name: "UserAddress",
  //       component: UserAddress,
  //     }
  // ]
  },
  {
    path:'/user/address',
    name: "UserAddress",
    component: UserAddress,
  },
  {
    path:'/user/add-address',
    name: "AddAddress",
    component: AddAddress,
  },
  {
    path: "/goods-detail/:id",
    beforeEnter(to,from,next){
      const id = to.params.id
      if(!/^\d+$/.test(id)){
        next(from.path)
      }else{
        next()
      } 
    },
    props:route =>{ 
      return {
        id : parseInt(route.params.id)
      }
    },
    name: "GoodsDetail",
    component: GoodsDetail
  }, 
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  linkExactActiveClass:'active',
  scrollBehavior(){
    return { x:0,y:0}
  }
});

//需要登录验证的路由名称
const AUTH_ROUTER_NAME = ['Coupon','Order','OrderPay','UserAddress','AddAddress','OrderAddress','User']
//登陆验证
router.beforeEach((to,from,next)=>{
  if(AUTH_ROUTER_NAME.includes(to.name)){
    const token  = Token.getToken()
    if(token === ''){
      let url
      if(to.query.loginRedirect){
        url = decodeURIComponent(to.query.loginRedirect)
      }else{
        url= encodeURIComponent(to.path)
      }
      console.log(url)
      next(`/login?url=${url}`)
    }else{
      next()
    }
  }else{
    next()
  }
})

export default router;
