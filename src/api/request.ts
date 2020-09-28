import { get } from './http'

export const getList = async (params: any) => {
  const { page, limit, searchTxt } = params
  if (searchTxt) {
    return get(`/api/v1/docker/${searchTxt}/images`, { page, limit })
  } else {
    return get('/api/v1/docker/list', { page, limit })
  }
}

export const getImagesTag = async (params: any) => {
  const { id, page, limit } = params
  return get(`/api/v1/docker/${id}/list`, { page, limit })
}
