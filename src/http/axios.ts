import axios from 'axios';

const axiosInst = axios.create();

axiosInst.interceptors.response.use(
  // eslint-disable-next-line consistent-return
  response => {
    // console.log('http response success -> ', response);
    const { status, data } = response;
    if (+status === 200) return data;
  },
  error => {
    const { response } = error;
    console.log('http response fail -> ', response);
    return null;
  }
);

export default axiosInst;
