import axios from 'axios';
import { message } from 'antd';

// message.success(content, [duration], onClose)
// message.error(content, [duration], onClose)
// message.info(content, [duration], onClose)
// message.warning(content, [duration], onClose)
// message.warn(content, [duration], onClose) // alias of warning
// message.loading(content, [duration], onClose)

const service = axios.create({
  baseURL: 'https://cnodejs.org/api/v1',
  headers: {
    post: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    }
  },
  timeout: 10000
});

/* service.interceptors.request.use(config => {
  // 自定义header，可添加项目token
  config.headers.token = 'token';
  return config;
}); */

service.interceptors.response.use(
  // eslint-disable-next-line consistent-return
  response => {
    // console.log('http response success -> ', response);
    const { status, data } = response;
    if (+status === 200) return data;
  },
  error => { // 处理网络错误
    const { response, response: { data: { success, error_msg: errorMsg }, status } } = error;
    // console.log('http response fail -> ', response);
    if (!success) message.error(errorMsg);
    return null;
  }
);

export default service;
