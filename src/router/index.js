import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/views/layout/Index.vue";
import Login from "@/views/login/Index.vue";
import Home from "@/views/home/Home.vue";
/* 产品管理 */
const AddProduct = () => import("@/views/product/list/AddProduct.vue");
const Product = () => import("@/views/product/Index.vue");
const List = () => import("@/views/product/list/Index.vue");
const Category = () => import("@/views/product/category/Index.vue");
/* 订单管理 */
const Order = () => import("@/views/order/Index.vue");
const OrderList = () => import("@/views/order/order-list/Index.vue");
const Collect = () => import("@/views/order/order-collect/Index.vue");
const Contract = ()=>import('@/views/order/contract/Contract.vue')

// 广告
const Advert = () => import("@/views/advert/Index.vue");
const AdvertList = () => import("@/views/advert/list/Index.vue");
const News = () => import("@/views/news/Index.vue");
const NewsList = () => import("@/views/news/news-list/Index.vue");
const NewsCollect = () => import("@/views/news/news-collect/Index.vue");

//系统管理
import SystemManage from "@/views/SystemManage";
import Department from "@/views/SystemManage/department";
import Role from "@/views/SystemManage/role";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Layout,
    meta: {
      title: "首页",
    },
    children: [
      {
        path: "/",
        name: "home",
        component: Home,
        meta: {
          title: "首页",
        },
      },
      // 产品
      {
        path: "/product",
        name: "product",
        component: Product,
        redirect: "/product/list",
        meta: {
          title: "产品管理",
        },
        children: [
          {
            path: "list",
            name: "list",
            component: List,
            meta: {
              title: "产品列表",
            },
          },
          {
            path: "category",
            name: "category",
            component: Category,
            meta: {
              title: "产品分类",
            },
          },
          {
            path: "add-product",
            name: "add-product",
            component: AddProduct,
            meta: {
              //配置高亮标识
              activeMenu: "/product/list",
              title: "产品详情",
            },
          },
        ],
      },
      // 订单
      {
        path: "/order",
        name: "order",
        component: Order,
        redirect: "/order/order-list",
        meta: {
          title: "订单管理",
        },
        children: [
          {
            path: "order-list",
            name: "order-list",
            component: OrderList,
            meta: {
              title: "订单列表",
            },
          },
          {
            path: "collect",
            name: "collect",
            component: Collect,
            meta: {
              title: "汇总订单",
            },
          },
          {
            path: "contract",
            name: "contract",
            component: Contract,
            meta: {
              title: "订单审核",
            },
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
        meta: {
          title: "广告管理",
        },
        children: [
          {
            path: "advert-list",
            name: "advert-list",
            component: AdvertList,
            meta: {
              title: "广告管理",
            },
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
