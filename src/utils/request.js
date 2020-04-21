import axios from "axios"
const service = axios.create({
  baseURL: "http://152.136.185.210:8000/api/h8", // http://192.168.31.90:8080/api/ ===http://www.web-jshtml.cn/productapi 事实上这两个是相等的
  timeout: 20000 //请求延时为10s
});

// 添加请求拦截器
service.interceptors.request.use((config) => {
  // console.log('来到了request拦截success中');
  // 1.当发送网络请求时, 在页面中添加一个loading组件, 作为动画

  // 2.某些请求要求用户必须登录, 判断用户是否有token, 如果没有token跳转到login页面

  // 3.对请求的参数进行序列化(看服务器是否需要序列化)
  // config.data = qs.stringify(config.data)
  // console.log(config);

  // 4.等等
  // 在发送请求之前做些什么
  return config;
}, (error) => {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use((response) => {
  // 对响应数据做点什么
  return response.data;
}, (error) => {
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        error.message = '请求错误'
        break
      case 401:
        error.message = '未授权的访问'
        break
    }
  }
  // 对响应错误做点什么
  return error
});
export default service;
