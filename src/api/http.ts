import axios from 'axios';
import queryString from 'query-string';
import { BASE_URL } from '@/config';

const message = {
  error(msg: string) {
    console.log(msg);
  },
  success(msg: string) {
    console.log(msg);
  }
};

interface FetchConfig {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
  data?: Record<string, any>;
}

axios.defaults.timeout = 5000;

axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    message.error('加载超时');
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  data => {
    return data;
  },
  error => {
    message.error('加载失败');
    return Promise.reject(error);
  }
);

export function fetch(config: FetchConfig): Promise<any> {
  let token = '';
  let uid = '';
  try {
    let user: any = localStorage.getItem('user') || '';
    user = JSON.parse(user);
    token = user.token;
    uid = user.id;
  } catch {}

  return new Promise((resolve, reject) => {
    const instance = axios.create({
      // 请求超时
      timeout: 5000,
      headers: {
        token,
        mid: uid
      },
      // 定义请求根目录
      baseURL: BASE_URL
    });
    instance(config)
      .then(res => {
        if (res.data.errno === 401) {
          localStorage.clear();
        }
        if (res.data.errno !== 0) {
          // eslint-disable-next-line
          throw res.data.result?.message || '网络异常';
        }
        resolve(res.data.result?.items ?? res.data.result ?? res.data);
      })
      .catch(err => {
        if (typeof err === 'object') {
          err = '网络异常';
        }
        message.error(err);
        reject(err);
      });
  });
}

export function get(url: string, data?: Record<string, any>) {
  if (data) {
    // eslint-disable-next-line
    url += `?${queryString.stringify(data)}`;
  }
  return fetch({
    url,
    method: 'get'
  });
}
export function post(url: string, data: Record<string, any>) {
  return fetch({
    url,
    method: 'post',
    data
  });
}
export function del(url: string) {
  return fetch({
    url,
    method: 'delete'
  });
}
