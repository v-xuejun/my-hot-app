import axios, { Method } from "axios"
export const requestAxios = (url: string, method: Method, data?: any): Promise<any> => {
  const parameter = method.toUpperCase() === 'GET' ? { params: data } : { data }
  return new Promise((resolve, reject) => {
    axios.request({
      url: url,
      method: method,
      ...parameter
    })
      .then((res) => {
        const { code, msg, success } = res.data
        if (+code === 200 || success) resolve(res.data)
        else {
          const err = new Error(msg || 'System error')
          reject(err)
        }
      })
      .catch((err) => {
        console.error(err)
        reject(err)
      })
  })
}