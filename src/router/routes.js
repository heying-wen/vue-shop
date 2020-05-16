import Home from "../pages/home/index.vue";
const routes = [
    {
      path: "/",
      name: "Home",
      component: Home
    }, 
    {
      path: "/category",
      name: "Category",
      component: () => import ('../pages/category/index.vue')
    }, 
    {
      path: "/cart",
      name: "Cart",
      component: () => import ('../pages/cart/index.vue')
    },
    {
      path: "/search",
      name: "Search",
      component: () => import ('../pages/search/index.vue')
    },
    {
      path: "/searchlist",
      name: "SearchList",
      component: () => import ('../pages/search-list/index.vue')
    },
    {
      path: "/goods-notfound",
      name: "GoodsNotFound",
      component: () => import ('../pages/goods-notfound/index.vue')
    },
    {
      path: "/login",
      name: "Login",
      component: () => import ('../pages/login/index.vue')
    },
    {
      path: "/register",
      name: "Register",
      component: () => import ('../pages/register/index.vue')
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
      component: () => import ('../pages/goods-list/index.vue')
    },
    {
      path:'/goods-detail',
      redirect:'/'
    },
    {
      path:'/coupon',
      name: "Coupon",
      component:  () => import ('../pages/coupon/index.vue')
    },
    {
      path:'/order',
      name: "Order",
      component: () => import ('../pages/order/index.vue'),
    },
    {
      path:'/order/address',
      name: "OrderAddress",
      component: () => import ('../pages/order-address/index.vue'),
    },
    {
      path: "/order-detail/:id",
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
      name: "OrderDetail",
      component: () => import ('../pages/order-detail/index.vue'),
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
      component: () => import ('../pages/order-pay/index.vue'),
    },
    {
      path:'/user',
      name: "User",
      component: () => import ('../pages/user/index.vue'),
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
      component: () => import ('../pages/user-address/index.vue'),
    },
    {
      path:'/user/add-address',
      name: "AddAddress",
      component: () => import ('../pages/add-address/index.vue'),
    },
    {
      path:'/user/info',
      name: "UserInfo",
      component: () => import ('../pages/user-info/index.vue'),
    },
    {
        path:'/user/order',
        name: "UserOrder",
        component: () => import ('../pages/user-order/index.vue'),
      },
    {
      path:'/user/sign',
      name: "UserSign",
      component: () => import ('../pages/user-sign/index.vue'),
    },
    {
      path:'/user/coupon',
      name: "UserCoupon",
      component: () => import ('../pages/user-coupon/index.vue'),
    },
    {
      path:'/user/footprint',
      name: "UserFootprint",
      component: () => import ('../pages/user-footprint/index.vue'),
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
      component: () => import ('../pages/goods-detail/index.vue'),
    }, 
];
export {
    routes
}