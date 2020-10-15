import { get } from './http'

export const getList = async (params: any) => {
  const { page, limit, searchTxt } = params
  return get('/api/v1/docker/list', { currentPage: page, pageSize: limit, like: searchTxt })
}

export const getImagesTag = async (params: any) => {
  const { id, page, limit } = params
  return get(`/api/v1/docker/${id}/list`, { currentPage: page, pageSize: limit })
}
