
const StockTaking = {
  path: '/stock-taking',
  name: 'stock_taking',
  component: () => import(/* webpackChunkName: "MyMachine" */ '@v/stock-taking/stock-taking.vue'),
  meta: {
    title: '库存盘点'
  }
}
export default [StockTaking]
