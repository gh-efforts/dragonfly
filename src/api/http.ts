import axios from 'axios'
import queryString from 'query-string'
import { BASE_URL } from '@/config'

const message = {
  error (msg: string) {
    console.log(msg)
  },
  success (msg: string) {
    console.log(msg)
  }
}

interface FetchConfig {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
  data?: Record<string, any>;
}

axios.defaults.timeout = 5000

axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    message.error('Time Out')
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  data => {
    return data
  },
  error => {
    message.error('Loading Error')
    return Promise.reject(error)
  }
)

export function fetch (config: FetchConfig): Promise<any> {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      timeout: 5000,
      headers: {},
      baseURL: BASE_URL
    })
    instance(config)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        if (typeof err === 'object') {
          err = 'Network Error'
        }
        message.error(err)
        reject(err)
      })
  })
}

export function get (url: string, data?: Record<string, any>) {
  if (data) {
    // eslint-disable-next-line
    url += `?${queryString.stringify(data)}`;
  }
  return fetch({
    url,
    method: 'get'
  })
}
export function post (url: string, data: Record<string, any>) {
  return fetch({
    url,
    method: 'post',
    data
  })
}
export function del (url: string) {
  return fetch({
    url,
    method: 'delete'
  })
}
