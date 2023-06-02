import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/views/layout/Index.vue";
import Login from "@/views/login/Index.vue";
import Home from "@/views/home/Home.vue";
const Product = () => import("@/views/product/Index.vue");
const List = () => import("@/views/product/list/Index.vue");
const Category = () => import("@/views/product/category/Index.vue");
const Order = ()=>import('@/views/order/Index.vue')
const OrderList = ()=>import('@/views/order/order-list/Index.vue')
const Collect = () => import("@/views/order/order-collect/Index.vue");
const Advert  = ()=>import('@/views/advert/Index.vue')
const AdvertList = ()=>import('@/views/advert/advert-list/Index.vue')
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/",
        name: "home",
        component: Home,
      },
      // 产品
      {
        path: "/product",
        name: "product",
        component: Product,
        children: [
          {
            path: "list",
            name: "list",
            component: List,
          },
          {
            path: "category",
            name: "category",
            component: Category,
          },
        ],
      },
      // 订单
      {
        path: "/order",
        name: "order",
        component: Order,
        children: [
          {
            path: "order-list",
            name: "order-list",
            component: OrderList,
          },
          {
            path: "collect",
            name: "collect",
            component: Collect,
          },
        ],
      },
      // 广告
      {
        path: "/advert",
        name: "advert",
        component: Advert,
        children: [
          {
            path: "advert-list",
            name: "advert-list",
            component: AdvertList,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
export default router;
