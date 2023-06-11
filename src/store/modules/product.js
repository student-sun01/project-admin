/* 
存储商品当前行的数据
*/
export default {
    namespaced:true,
    state:{
        rowData:{} ,//当前行的数据
        title:''
    },
    mutations:{
        changeRowData(state,payload){
            state.rowData = payload
        },
        changeTitle(state,title){
            state.title = title
        }
    }
}