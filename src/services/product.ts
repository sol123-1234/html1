import request from "@/utils/request"



export const fetchProductList = async (params: any) => {
  const resp = await request<any>('GET', '/pagination', params, false)
  return resp.data
}