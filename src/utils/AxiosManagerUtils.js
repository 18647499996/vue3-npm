import axiosServer from 'axios'

const config = {
  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: '',
  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求话费了超过 `timeout` 的时间，请求将被中断
  timeout: 30 * 1000,
  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false, // default
  // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // default
  // `responseEncoding` indicates encoding to use for decoding responses
  // Note: Ignored for `responseType` of 'stream' or client-side requests
  responseEncoding: 'utf8', // default
  // `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
  xsrfCookieName: 'XSRF-TOKEN', // default
  // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
  xsrfHeaderName: 'X-XSRF-TOKEN', // default
  // `maxContentLength` 定义允许的响应内容的最大尺寸
  maxContentLength: 2000,
  // 定义允许请求内容最大尺寸
  maxBodyLength: 2000,
  // 是否显示加载框,
  loading: false,
  // 是否自动导出文件
  download: false,
  // 文件下载回调方法
  onDownloadProgress: null,
  // 文件上传回调方法
  onUploadProgress: null
}

let axiosManager

/**
 * todo 创建axios引用
 */
export function createAxiosServer() {
  config.responseType = 'json';
  axiosManager = axiosServer.create(config)
  return this
}

/**
 * todo 创建axios引用（ blob ）
 * @return {createBlobAxiosServer}
 */
export function createBlobAxiosServer() {
  config.responseType = 'blob'
  axiosManager = axiosServer.create(config)
  return this
}


/**
 * todo 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
 * @param httpUrl
 */
export function baseApi(httpUrl) {
  axiosManager.defaults.baseURL = httpUrl
  return this
}

/**
 * todo 是否显示加载框
 * @param isLoading
 */
export function loading(hasLoading) {
  axiosManager.defaults.loading = hasLoading
  return this
}

/**
 * todo 是否自动导出文件
 * @param isDownload
 */
export function download(hasDownload) {
  axiosManager.defaults.download = hasDownload
  return this
}

/**
 * todo 文件回调监听（ 下载 ）
 * @param {*} listener 
 * @returns 
 */
export function downloadProgressListener(listener) {
  axiosManager.defaults.onDownloadProgress = (succeed => {
    const progress = Math.round((succeed.loaded * 100) / succeed.total);
    succeed.progress = progress
    listener(succeed)
  })
  return this
}

/**
 * todo 文件回调监听（ 上传 ）
 * @param {*} listener 
 * @returns 
 */
export function uploadProgressListener(listener) {
  axiosManager.defaults.onUploadProgress = (succeed => {
    const progress = Math.round((succeed.loaded * 100) / succeed.total);
    succeed.progress = progress
    listener(succeed)
  })
  return this
}

/**
 * todo excel格式
 * @param fileName
 * @return {xls}
 */
export function xls(fileName) {
  axiosManager.defaults.mimeType = 'application/vnd.ms-excel'
  axiosManager.defaults.fileName = fileName
  return this
}

/**
 * todo 视频格式
 * @param fileName
 * @return {xls}
 */
export function video(fileName) {
  axiosManager.defaults.mimeType = 'video/mp4'
  axiosManager.defaults.fileName = fileName
  return this
}

/**
 * todo 是即将被发送的自定义请求头
 * @param headers
 */
export function addHeaders(headers) {
  axiosManager.defaults.headers = headers
  return this
}

/**
 * todo 转换请求数据结果
 * @param transformResponseListener
 */
export function transformSchedulers(transformResponseListener) {
  axiosManager.interceptors.response.use(config => {
    // todo 避免重复引用数据转换，保证数据结构唯一性（ 只返回服务器数据结构 ）
    return transformResponseListener(undefined === config.config ? config : config.data)
  })
  return this
}

/**
 * todo 日志拦截器
 */
export function addLogcatInterceptors() {
  // 请求拦截
  let requestTime, responseTime
  axiosManager.interceptors.request.use(config => {
    requestTime = new Date().getTime()
    console.warn('请求数据：', config.baseURL + config.url, config.method, config.method === 'get' ? config.params : config.data)
    return config
  }, error => {
    return Promise.reject(error)
  })
  // 响应拦截
  axiosManager.interceptors.response.use(config => {
    responseTime = new Date().getTime()
    console.warn('返回数据：', config.request.responseURL, (responseTime - requestTime) + 's', config.data)
    return config
  }, error => {
    return Promise.reject(error)
  })
  return this
}

/**
 * todo 参数拦截器
 */
export function addParamsInterceptors(paramsListener) {
  axiosManager.interceptors.request.use(config => {
    return paramsListener(config)
  }, error => {
    return Promise.reject(error)
  })
  return this
}

/**
 * todo codeStatus拦截器
 */
export function addCodeInterceptors(codeStatusListener, errorStatusListener) {
  axiosManager.interceptors.response.use(config => {
    return codeStatusListener(config)
  }, error => {
    console.error('请求异常：', error)
    return errorStatusListener(error)
  })
  return this
}

/**
 * todo Blob请求拦截器
 */
export function addBlobInterceptors() {
  axiosManager.interceptors.response.use(config => {
    switch (config['config']['mimeType']) {
      case 'application/vnd.ms-excel':
        return getXls(config)
      case 'video/mp4':
        return getVideo(config)
      default:
        return getXls(config)
    }
  }, error => {
    return Promise.reject(error)
  })
  return this
}

/**
 * 获取excel表格下载blob
 * @param config
 */
export function getXls(config) {
  let blob = new Blob([config.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
  if (config['config']['download']) {
    let link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = config['config']['fileName'] === undefined || '' === config['config']['fileName'] ? new Date().getTime() + '.xls' : config['config']['fileName'] + '.xls'
    link.click()
  }
  return blob
}

/**
 * 获取video下载blob
 * @param config
 */
export function getVideo(config) {
  let blob = new Blob([config.data], { type: 'video/mp4' })
  if (config['config']['download']) {
    let link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = config['config']['fileName'] === undefined || '' === config['config']['fileName'] ? new Date().getTime() + '.mp4' : config['config']['fileName'] + '.mp4'
    link.click()
  }
  return blob
}

/**
 * todo post请求
 * @param url
 * @param data
 */
export function post(url, data) {
  return axiosManager.post(url, data)
}


/**
 * todo get请求
 * @param url
 * @param params
 */
export function get(url, params) {
  return axiosManager.get(url, { params: params })
}

/**
 * todo 获取fromData格式
 * @return {FormData}
 */
export function form(url, data) {
  const formData = new FormData()
  for (const item in data) {
    formData.append(item, data[item])
  }
  return post(url, formData)
}

/**
 * todo 合并请求
 * @param mergerRequest 合并请求（ 数组格式 ）
 * @param onSucceed 请求成功回调
 * @param onError 失败回调
 */
export function merger(mergerRequest, onSucceed, onError) {
  axiosServer.all(mergerRequest)
    .then(axiosServer.spread(function (...data) {
      onSucceed(data)
    }))
    .catch(error => {
      onError(error)
    })
}

/**
 * todo 链式请求 Axios + Promise
 * @param method 请求类型 post、get、form
 * @param url 请求地址
 * @param data 请求参数
 * @return {Promise<unknown>}
 */
export function flatMap(method, url, data) {
  return new Promise((resolve, reject) => {
    switch (method) {
      case 'post':
        return post(url, data)
          .then(succeed => {
            resolve(succeed)
          }).catch(error => {
            reject(error)
          })
      case 'get':
        return get(url, data)
          .then(succeed => {
            resolve(succeed)
          }).catch(error => {
            reject(error)
          })
      case 'form':
        return form(url, data)
          .then(succeed => {
            resolve(succeed)
          }).catch(error => {
            reject(error)
          })
    }
  })
}


export default {
  config,
  createAxiosServer,
  createBlobAxiosServer,
  baseApi,
  addHeaders,
  loading,
  download,
  downloadProgressListener,
  uploadProgressListener,
  xls,
  video,
  transformSchedulers,
  addLogcatInterceptors,
  addParamsInterceptors,
  addCodeInterceptors,
  addBlobInterceptors,
  post,
  get,
  merger,
  form,
  flatMap
}
