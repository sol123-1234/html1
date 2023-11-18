import request from "@/utils/request"



export const queryUserInfo = async () => {
  const resp = await request<{ level: number, isActivate: number }>('GET', '/users/getUserInfo', null)
  return resp.data
}