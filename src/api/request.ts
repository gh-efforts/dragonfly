import { get, post } from './http';

/** Basic */
export const getQiniuToken = (): Promise<{ token: string }> =>
  get('/basic/qiniu_token', { bucket: 'pics' });
