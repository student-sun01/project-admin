/* 
动态菜单-全部的菜单导航 除了首页登录
*/
//系统管理
import SystemManage from "@/views/SystemManage";
import Department from "@/views/SystemManage/department";
import Role from "@/views/SystemManage/role";

/* 产品管理 */
const AddProduct = () => import("@/views/product/list/AddProduct.vue");
const Product = () => import("@/views/product/Index.vue");
const List = () => import("@/views/product/list/Index.vue");
const Category = () => import("@/views/product/category/Index.vue");
/* 订单管理 */
const Order = () => import("@/views/order/Index.vue");
const OrderList = () => import("@/views/order/order-list/Index.vue");
const Collect = () => import("@/views/order/order-collect/Index.vue");
const Contract = () => import("@/views/order/contract/Contract.vue");

// 广告
const Advert = () => import("@/views/advert/Index.vue");
const AdvertList = () => import("@/views/advert/list/Index.vue");
const News = () => import("@/views/news/Index.vue");
const NewsList = () => import("@/views/news/news-list/Index.vue");
const NewsCollect = () => import("@/views/news/news-collect/Index.vue");

export const menu = [
  //产品
  {
    path: "/product", //产品管理
    name: "product",
    component: Product,
    redirect: "/product/list",
    meta: {
      title: "产品管理",
    },
    children: [
      {
        path: "list", //访问路径： /product/list
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
        path: "add-product", //商品添加--编辑-查看  /product/product-page
        name: "ProductPage",
        component: AddProduct,
        meta: {
          //配置高亮标识
          // activeMenu: "/product/list",//获取path
          activeMenu: "list", //获取name
          title: "添加商品",
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
          title: "汇总清单",
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
    meta: {
      title: "消息管理",
    },
    children: [
      {
        path: "news-list",
        name: "news-list",
        component: NewsList,
        meta: {
          title: "消息列表",
        },
      },
      {
        path: "news-collect",
        name: "news-collect",
        component: NewsCollect,
        meta: {
          title: "消息汇总",
        },
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
          title: "广告列表",
        },
      },
    ],
  },
  // 系统管理
  {
    path: "/systemanage",
    name: "systemanage",
    component: SystemManage,
    meta: {
      title: "系统管理",
    },
    children: [
      {
        path: "department",
        name: "department",
        component: Department,
        meta: {
          title: "部门管理",
        },
      },
      {
        path: "role",
        name: "role",
        component: Role,
        meta: {
          title: "角色管理",
        },
      },
    ],
  },
];