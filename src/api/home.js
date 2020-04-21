import server from "../utils/request"
/**
 * @param首页的数据
 */
export function GetHomeMultidata() {
  return server.request({
    url: "/home/multidata",
  })
}
/**
 * @param获取商品的数据
 * 
 *  */
export function GetHomeGoods(type, page) {
  return server.request({
    url: "/home/data",
    params: {
      type,
      page
    }
  })
}