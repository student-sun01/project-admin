// 公共的请求方法
import base from "./base";
import axios from "@/utils/request";

const api = {
  // 首页数据统计
  totalInfo() {
    return axios.get(base.totalInfo);
  },
  // 首页订单数据
  orderInfo() {
    return axios.get(base.orderInfo);
  },
  //首页折线图数据统计 月销量、月销售额
  format() {
    return axios.get(base.format);
  },
  // 商品列表
  projectList(params) {
    return axios.get(base.projectList, { params });
  },
  /* 
    搜索接口
    params={search:xx}
  */
  search(params) {
    return axios.get(base.search, { params });
  },
  /* 删除接口 */
  deleteItemById(params) {
    return axios.get(base.deleteItemById, { params });
  },
  /* 类目选择接口 */
  selectItemCategoryByParentId(params) {
    return axios.get(base.selectItemCategoryByParentId, { params });
  },
  /**
   * 商品添加
   * 参数： title cid  category sellPoint price num descs paramsInfo image
   * title, image, sellPoint, price, cid, category, num, descs, paramsInfo
   */
  insertTbItem(params) {
    return axios.get(base.insertTbItem, { params });
  },
};
export default api;
