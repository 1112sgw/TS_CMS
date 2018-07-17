import axios from '@/libs/api.request'
import { getToken } from '@/libs/util'

export const axioApi = (options) => {
  let token = getToken()
  options.headers = {Authorization: 'bearer ' + token}
  return axios.request(options)
}
