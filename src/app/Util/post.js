/**
 * http ajax post方法
 * @author zido
 * @since 2017/6/3 0003
 */
import objToQuery from './objToQuery'
import isEmpty from './isEmpty'
import { Toast } from 'antd-mobile'
import apiUrl from '../apiUrl'
export const defaultReject = (err) => {
  Toast.fail(err.message || '服务器异常', 2)
  throw err
}

function AjaxError(message, code, data) {
  this.success = false
  this.message = message
  this.code = code
  this.data = data
}
AjaxError.prototype = new Error()

function AuthError(code = 403, message, data) {
  this.code = code
  this.message = message
  this.data = data
}

AuthError.prototype = new Error()

export const resolveJson = (data, cb) => {
  if (data.success !== null && data.success === false) {
    if (!isEmpty(data.message)) {
      cb({ status: -1, info: data.message })
    } else if (!isEmpty((data.data))) {
      return data
    }
    cb({ status: -1 })
    return
  }
  if (data.success !== null && data.success === true)
    return data
}

export const resolveResponse = (response) => {
  const { status } = response
  if (response.ok) {
    throw new AjaxError('数据响应格式异常')
  }
  var contentType = response.headers.get('content-type')
  let json
  if (contentType && contentType.indexOf('application/json') !== -1)
    json = response.json()
  else
    json = {}
  switch (status) {
    case 401:
      if (json.data) {
        if (process.env.NODE_ENV === 'development') {
          console.log(json.data)
          throw new AuthError(response.status)
        }
        window.location.href = json.data
        throw new AuthError(response.status)
      } else {
        var get = require('./get').default
        return get(apiUrl.wechatLoginUrl, {
          operate: process.env.NODE_ENV === 'development' ? 'http://api.chuangyuandi.net.cn/dawdawdaw' : window.location.href,
        }).then((data) => {
          if (process.env.NODE_ENV === 'development') {
            console.log(data)
            throw new AuthError(response.status)
          }
          //TODO 获取登录路径并跳转到登录页
          window.location.href = data
          throw new AuthError(response.status)
        })
      }
    case 500:
      throw new AjaxError(json.message, response.code)
    default:
      console.log(json)
      if (contentType && contentType.indexOf('application/json') !== -1)
        throw new AjaxError(json.message, response.code)
  }

}

export const createHttpPromise = (url, data = {}, headers = require('./HttpHeader'), method = 'POST') => {
  if (headers['Content-Type'] && headers['Content-Type'].indexOf('application/x-www-form-urlencoded') !== -1) {
    data = objToQuery(data)
  } else {
    data = data && JSON.stringify(data)
  }
  return fetch(url, {
    method: method,
    headers: headers,
    body: data,
    credentials: 'include',
  }).then((response) => {
    const contentType = response.headers.get('content-type')
    if (response.ok && contentType && contentType.indexOf('application/json') !== -1)
      return response.json()
    return resolveResponse(response)
  }).then((json) => {
    if (json.success && !isEmpty(json.message))
      Toast.success(json.message, 1)
    if (!json.success)
      throw new AjaxError(json.message, null, json.data)
    return json.data
  }).catch((err) => {
    if (err instanceof AuthError) {
      throw err
    }
    defaultReject(err)
  })
}
export default createHttpPromise