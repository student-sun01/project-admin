import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/views/layout/Index.vue";
import Login from "@/views/login/Index.vue";
import Home from "@/views/home/Home.vue";
/* 产品管理 */
const ProductPage = () => import("@/views/product/list/ProductPage.vue");
const Product = () => import("@/views/product/Index.vue");
const List = () => import("@/views/product/list/Index.vue");
const Category = () => import("@/views/product/category/Index.vue");
const Order = ()=>import('@/views/order/Index.vue')
const OrderList = ()=>import('@/views/order/order-list/Index.vue')
const Collect = () => import("@/views/order/order-collect/Index.vue");
const Advert  = ()=>import('@/views/advert/Index.vue')
const AdvertList = ()=>import('@/views/advert/advert-list/Index.vue')
const News = () => import("@/views/news/Index.vue");
const NewsList = () => import("@/views/news/news-list/Index.vue");
const NewsCollect = () => import("@/views/news/news-collect/Index.vue");
//系统管理
import SystemManage from '@/views/SystemManage'
import Department from '@/views/SystemManage/department'
import Role from '@/views/SystemManage/role'

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
          {
            path: "product-page",
            name: "product-page",
            component: ProductPage,
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
      // 消息管理
      {
        path: "/news",
        name: "news",
        component: News,
        children: [
          {
            path: "news-list",
            name: "news-list",
            component: NewsList,
          },
          {
            path: "news-collect",
            name: "news-collect",
            component: NewsCollect,
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
      // 系统管理
      {
        path: "/systemanage",
        name: "systemanage",
        component: SystemManage,
        children: [
          {
            path: "department",
            name: "department",
            component: Department,
          },
          {
            path: "role",
            name: "role",
            component: Role,
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
