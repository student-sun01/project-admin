// 接口地址
const base = {
  /* 首页 */
  totalInfo: "/api/home/dataCount", //首页统计数据
  orderInfo: "/api/home/orderinfo", //首页订单数据
  format: "/api/home/format", //首页折线图数据统计 月销量、月销售额
  /* 商品管理 */
  projectList: "/api/goods/projectList", //商品列表
  search: "/api/goods/search", //搜索接口
  deleteItemById: "/api/goods/deleteItemById", //删除接口
};
// 单一导出
export const host = "xxxx";
export default base;
