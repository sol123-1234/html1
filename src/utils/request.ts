import axios, { AxiosHeaders, AxiosRequestHeaders } from 'axios';
import { toLower } from 'lodash';
import { Toast } from 'antd-mobile';
import { ApiResponse } from '@/types/request';
import { env } from '@/config/env';

axios.defaults.timeout = 50000;

const request = <T>(
  method: string,
  url: string,
  params: any | null,
  needToken: boolean = true,
  headerContentType: string = 'application/json',
  baseURL: string = env.baseUrl,
): Promise<ApiResponse<T>> => {
  const headers: AxiosRequestHeaders = new AxiosHeaders();
  headers['Content-type'] = headerContentType;
  const sign = JSON.parse(localStorage.getItem('sign') || '{}');
  headers.address = toLower(sign?.address || '');
  headers.message = sign?.message || '';
  headers.signature = sign?.signature || '';
  if (needToken) {
    // if (!headers.signature) {
    //   return new Promise((_resolve, reject) => {
    //     reject(new Error('Please login first'))
    //   });
    // }
    // headers.authorized = localStorage.getItem('authorized') || '';
  }

  return new Promise((resolve, reject) => {
    axios({
      method,
      headers,
      baseURL,
      url,
      timeout: 60 * 10000,
      params: method === 'GET' || method === 'DELETE' ? params : null, // 是即将与请求一起发送的 URL 参数
      data: method === 'POST' || method === 'PUT' ? params : null, // 是作为请求主体被发送的数据
    })
      .then((res) => {
        Toast.clear();
        if (res.data.code === 1) {
          // eslint-disable-next-line no-param-reassign
          res.data.success = true;
          resolve(res.data);
        } else {
          // resolve({
          //   code: res.data.code,
          //   success: false,
          //   data: null,
          //   msg: res.data.msg || 'Network exception',
          // });
          throw new Error(res.data.msg || 'Network exception')
        }
      }).catch((error) => {
        reject(new Error(error?.response?.data?.msg || 'Network exception'))
        // Toast.clear();
        // resolve({
        //   code: 500,
        //   success: false,
        //   data: null,
        //   msg: error?.response?.data?.msg || 'Network exception',
        // });
      });
  });
};

export default request;
