// 公共的请求方法
import base from './base'
import axios from '@/utils/request'

const api = {
    // 首页数据统计
    totalInfo(){
        return axios.get(base.totalInfo)
    }
}
export default api