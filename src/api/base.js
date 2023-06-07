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
  selectItemCategoryByParentId:
    "/api/goods/itemCategory/selectItemCategoryByParentId", //商品添加 类目选择
  uploadUrl: "/api/upload", //图片上传接口
  insertTbItem: "/api/goods/item/insertTbItem", //添加商品
};
// 单一导出
export const host = "http://localhost:7788";
export const uploadUrl = "/api/upload"; ;
export default base;
