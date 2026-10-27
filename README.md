# mayunf

> Vue 3 开发工具包：Axios 网络请求、终端设备识别、事件总线、浏览器通知、本地存储

[![version](https://img.shields.io/badge/version-1.2.6-blue.svg)](https://www.npmjs.com/package/mayunf)
[![license](https://img.shields.io/badge/license-MIT-green.svg)](#license)

## 目录

- [安装](#安装)
- [引入](#引入)
- [AxiosManagerUtils 网络请求](#axiosmanagerutils-网络请求)
  - [初始化](#初始化)
  - [全局配置](#全局配置)
  - [拦截器](#拦截器)
  - [请求方法](#请求方法)
  - [put / patch / del 的四种调用方式](#put--patch--del-的四种调用方式)
  - [formData 表单提交](#formdata-表单提交)
  - [文件下载（ Blob ）](#文件下载-blob-)
  - [上传 / 下载进度](#上传--下载进度)
  - [合并请求 merger](#合并请求-merger)
  - [链式 / async 请求 flatMap](#链式--async-请求-flatmap)
- [DeviceManagerUtils 终端设备](#devicemanagerutils-终端设备)
- [EventBusManagerUtils 事件总线](#eventbusmanagerutils-事件总线)
- [NotificationManagerUtils 浏览器通知](#notificationmanagerutils-浏览器通知)
- [StorageManagerUtils 本地存储](#storagemanagerutils-本地存储)
- [更新日志](#更新日志)
- [License](#license)

---

## 安装

```bash
npm install mayunf
```

依赖：`axios`、`mitt`、`vue-cookies`。

## 引入

```js
// 方式一：整体引入
import mayunf from 'mayunf'

const {
  AxiosManagerUtils,
  DeviceManagerUtils,
  EventBusManagerUtils,
  NotificationManagerUtils,
  StorageManagerUtils
} = mayunf
```

```js
// 方式二：按需引入单个模块
import AxiosManagerUtils from 'mayunf/src/utils/AxiosManagerUtils'
import DeviceManagerUtils from 'mayunf/src/utils/DeviceManagerUtils'
import EventBusManagerUtils from 'mayunf/src/utils/EventBusManagerUtils'
import NotificationManagerUtils from 'mayunf/src/utils/NotificationManagerUtils'
import StorageManagerUtils from 'mayunf/src/utils/StorageManagerUtils'
```

---

## AxiosManagerUtils 网络请求

基于 axios 的链式封装：实例创建、基础配置、拦截器、请求方法全部支持链式调用（请求方法除外，返回 Promise）。

### 初始化

使用任何请求方法前，**必须先创建 axios 实例**，全局只需执行一次（建议放在 `main.js` 或单独的 `request.js` 中）。

| 方法 | 说明 |
| --- | --- |
| `createAxiosServer()` | 创建普通实例，响应类型 `json` |
| `createBlobAxiosServer()` | 创建二进制实例，响应类型 `blob`，用于文件下载 |

### 全局配置

| 方法 | 说明 |
| --- | --- |
| `baseApi(url)` | 设置 `baseURL`，自动拼接在请求地址前 |
| `addHeaders(headers)` | 自定义请求头 |
| `loading(bool)` | 是否显示加载框（默认 `false`，需自行结合拦截器使用） |
| `download(bool)` | 是否自动触发浏览器下载（默认 `false`） |
| `abort(bool)` | 是否取消重复请求，相同 `method + url` 的旧请求会被自动取消 |
| `log(bool)` | 是否打印请求 / 响应日志 |

默认配置：超时时间 30s、`responseType: 'json'`、`withCredentials: false`。

### 拦截器

| 方法 | 说明 |
| --- | --- |
| `addLogcatInterceptors()` | 日志拦截器 + 重复请求取消逻辑（需配合 `abort(true)`） |
| `addParamsInterceptors(fn)` | 请求参数拦截器，`fn(config)` 需返回 `config`，可用于注入 token |
| `addCodeInterceptors(successFn, errorFn)` | 响应结果 / 异常统一处理 |
| `transform(fn)` | 转换响应数据结构，只返回服务器数据部分（旧名 `transformSchedulers` 仍可用，已废弃） |
| `addBlobInterceptors()` | Blob 响应拦截器，按文件类型处理下载（需配合 `createBlobAxiosServer`） |

### 请求方法

| 方法 | 说明 |
| --- | --- |
| `get(url, params)` | GET 请求，参数走 query string |
| `post(url, data)` | POST 请求，参数走请求体 |
| `put(url, ...)` | PUT 请求，见[四种调用方式](#put--patch--del-的四种调用方式) |
| `patch(url, ...)` | PATCH 请求，见[四种调用方式](#put--patch--del-的四种调用方式) |
| `del(url, ...)` | DELETE 请求，见[四种调用方式](#put--patch--del-的四种调用方式) |
| `form(url, data)` | `multipart/form-data` 提交，见[formData 表单提交](#formdata-表单提交) |

### 完整初始化示例

```js
// request.js
import AxiosManagerUtils from 'mayunf/src/utils/AxiosManagerUtils'

AxiosManagerUtils
  .createAxiosServer()
  .baseApi('https://api.example.com')
  .log(true)
  .abort(true)
  .addLogcatInterceptors()
  // 请求拦截：统一注入 token
  .addParamsInterceptors(config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })
  // 响应拦截：统一处理业务状态码
  .addCodeInterceptors(
    response => {
      return response.data
    },
    error => {
      console.error('请求异常：', error)
      return Promise.reject(error)
    }
  )

export default AxiosManagerUtils
```

```js
import request from './request'

// GET  https://api.example.com/user/list?page=1
request.get('/user/list', { page: 1 }).then(res => {
  console.log(res)
})

// POST https://api.example.com/user
request.post('/user', { name: '张三', age: 18 })
```

### put / patch / del 的四种调用方式

三个方法签名统一为 `(url, id, data)`，根据参数**个数和类型**自动识别，支持以下四种写法：

```js
// 1. (url)：id 已在路径中，无请求体
request.del('/user/1')                       // DELETE /user/1

// 2. (url, data)：id 已在路径中，第二个参数为请求体（对象 / FormData 等）
request.put('/user/1', { name: '张三' })      // PUT    /user/1，body: { name: '张三' }

// 3. (url, id)：id 单独传入（number 或 string），自动拼接为 url/id，无请求体
request.del('/user', 1)                      // DELETE /user/1
request.del('/user', 'abc')                  // DELETE /user/abc

// 4. (url, id, data)：id 单独传入并带请求体
request.patch('/user', 1, { name: '李四' })   // PATCH  /user/1，body: { name: '李四' }
```

识别规则：

- 第二个参数为 `number` / `string` 时视为资源 id，自动拼接到 url（id 为 `0` 也能正常识别）；
- 为对象、`FormData`、`URLSearchParams` 等类型时视为请求参数；
- url 末尾自带 `/` 会自动去重，不会拼出 `//`。

> 注意：DELETE 的请求参数按 axios 规范放在请求体中（`config.data`）。

### formData 表单提交

`form(url, data)` 会自动将普通对象包装为 `FormData`：

- 自动过滤值为 `undefined` / `null` 的字段，避免提交字符串 `"undefined"`；
- 数组按同名 key 逐项 `append`；
- 可直接传文件对象。

```js
// 普通字段
request.form('/upload', { name: '张三', avatar: file })

// 文件数组（多个同名 key）
request.form('/upload', { files: [file1, file2] })
```

### 文件下载（ Blob ）

下载需要使用 **blob 实例**，支持 `xls` / `xlsx` / `video` / `pdf` 四种格式。

| 方法 | 文件类型 / 后缀 |
| --- | --- |
| `xls(fileName)` | Excel 97-2003，`.xls` |
| `xlsx(fileName)` | Excel 2007+，`.xlsx` |
| `video(fileName)` | 视频，`.mp4` |
| `pdf(fileName)` | 文档，`.pdf` |

```js
import AxiosManagerUtils from 'mayunf/src/utils/AxiosManagerUtils'

AxiosManagerUtils
  .createBlobAxiosServer()
  .baseApi('https://api.example.com')
  .addBlobInterceptors()

// download(true)：浏览器自动下载文件，文件名为「用户列表.xlsx」
// 同时 Promise 会 resolve 一个 Blob，可自行二次处理
AxiosManagerUtils.xlsx('用户列表').download(true).get('/user/export')
```

### 上传 / 下载进度

| 方法 | 说明 |
| --- | --- |
| `uploadProgressListener(fn)` | 上传进度回调，回调对象上附加了 `progress`（0-100） |
| `downloadProgressListener(fn)` | 下载进度回调，回调对象上附加了 `progress`（0-100） |

```js
AxiosManagerUtils
  .createBlobAxiosServer()
  .baseApi('https://api.example.com')
  .downloadProgressListener(e => {
    console.log(`下载进度：${e.progress}%`)
  })

AxiosManagerUtils.get('/file/large-video.mp4')
```

### 合并请求 merger

`axios.all` + `axios.spread` 的封装，多个请求并行发起，全部完成后统一回调。

```js
AxiosManagerUtils.merger(
  [
    AxiosManagerUtils.get('/user/1'),
    AxiosManagerUtils.get('/order/list')
  ],
  ([user, orders]) => {
    // 全部成功
    console.log(user, orders)
  },
  error => {
    // 任一失败
    console.error(error)
  }
)
```

### 链式 / async 请求 flatMap

`flatMap(method, url, ...args)` 返回一个标准 Promise，可配合 `async / await` 使用。
`method` 支持：`'get'`、`'post'`、`'form'`、`'put'`、`'patch'`、`'del'`。

```js
// 普通用法
AxiosManagerUtils.flatMap('post', '/user', { name: '张三' }).then(res => {
  console.log(res)
})

// async / await
async function updateUser() {
  const res = await AxiosManagerUtils.flatMap('patch', '/user', 1, { name: '李四' })
  return res
}

// 无请求体删除
AxiosManagerUtils.flatMap('del', '/user', 1)
```

---

## DeviceManagerUtils 终端设备

基于 `navigator.userAgent` 识别当前终端环境，**无需任何参数和初始化**。

### 获取设备类型

`getDeviceManager()` 返回以下字符串之一（按优先级匹配，未命中返回 `undefined`）：

| 返回值 | 环境 |
| --- | --- |
| `'miniProgram'` | 微信小程序 WebView |
| `'wechat'` | 微信浏览器 |
| `'android'` | 安卓系统浏览器 |
| `'ios'` | iOS 系统（非微信 / 非 Safari 场景） |
| `'weibo'` | 微博内置浏览器 |
| `'qq'` | QQ 内置浏览器 |
| `'safari'` | Safari 浏览器 |
| `'google'` | Chrome 浏览器 |
| `'microsoft'` | Edge 浏览器 |
| `'firefox'` | Firefox 浏览器 |

```js
import DeviceManagerUtils from 'mayunf/src/utils/DeviceManagerUtils'

const device = DeviceManagerUtils.getDeviceManager()
console.log(device) // 'google'
```

### 设备回调监听

按设备类型分发到对应回调，浏览器类环境（微博 / QQ / Safari / Chrome / Edge / Firefox）统一走 `browserListener`：

```js
DeviceManagerUtils.getDeviceManagerListener(
  device => console.log('iOS：', device),       // iosListener
  device => console.log('Android：', device),   // androidListener
  device => console.log('微信：', device),       // wxListener
  device => console.log('小程序：', device),     // miniProgramListener
  device => console.log('其他浏览器：', device)  // browserListener
)
```

### 布尔判断方法

| 方法 | 判断 |
| --- | --- |
| `isIOS()` | 是否 iOS 终端 |
| `isAndroid()` | 是否安卓终端 |
| `isWechat()` | 是否微信浏览器 |
| `isMiniProgram()` | 是否小程序环境 |
| `isWeibo()` | 是否微博浏览器 |
| `isQQ()` | 是否 QQ 浏览器 |
| `isSafari()` | 是否 Safari |
| `isGoogle()` | 是否 Chrome |
| `isMicrosoft()` | 是否 Edge |
| `isFirefox()` | 是否 Firefox |
| `getWindowNavigator()` | 获取原始 `navigator.userAgent` 字符串 |

```js
if (DeviceManagerUtils.isWechat()) {
  // 微信内逻辑（如调用微信 JSSDK）
}
```

---

## EventBusManagerUtils 事件总线

基于 [mitt](https://github.com/developit/mitt) 的跨组件通信方案，全应用共享同一个事件实例。

| 方法 | 说明 |
| --- | --- |
| `post(tag, value)` | 发送事件（emit） |
| `register(tag, callback)` | 监听事件（on） |
| `unregister(tag)` | 移除该事件的全部监听（off） |

```js
import EventBusManagerUtils from 'mayunf/src/utils/EventBusManagerUtils'

// 组件 A：发送
EventBusManagerUtils.post('refresh-user', { id: 1 })

// 组件 B：监听
EventBusManagerUtils.register('refresh-user', data => {
  console.log('收到事件：', data) // { id: 1 }
})

// 组件卸载时移除（如 onUnmounted 中）
EventBusManagerUtils.unregister('refresh-user')
```

> 建议在组件卸载时调用 `unregister`，避免重复绑定和内存泄漏。

---

## NotificationManagerUtils 浏览器通知

封装浏览器原生 [Notification API](https://developer.mozilla.org/docs/Web/API/Notification)，自动申请权限并弹出桌面通知。

| 方法 | 说明 |
| --- | --- |
| `applyNotificationPermissionDialog(title, content, icon)` | 申请通知权限，授权后弹出通知 |

```js
import NotificationManagerUtils from 'mayunf/src/utils/NotificationManagerUtils'

NotificationManagerUtils.applyNotificationPermissionDialog(
  '新消息提醒',           // 标题
  '您有一条新的订单，请及时处理', // 内容
  '/logo.png'            // 图标
)
```

行为说明：

- 浏览器不支持 Notification 时静默忽略；
- 用户授权（`granted`）后才会弹出；
- 点击通知会自动聚焦回页面窗口并关闭通知。

---

## StorageManagerUtils 本地存储

统一封装 Cookies、localStorage、sessionStorage。

### Cookies

基于 `vue-cookies`。

| 方法 | 说明 |
| --- | --- |
| `saveCookies(key, value, expires, path)` | 保存 Cookie |
| `getCookies(key)` | 读取 Cookie |
| `removeCookies(key)` | 删除 Cookie |
| `isCookiesKey(key)` | 判断 key 是否存在 |

`expires` 过期时间写法（不传默认由浏览器会话管理）：

| 写法 | 含义 |
| --- | --- |
| `'3y'` | 3 年后过期 |
| `'4m'` | 4 个月后过期 |
| `'7d'` | 7 天后过期 |
| `'1h'` | 1 小时后过期 |
| `'30min'` | 30 分钟后过期 |
| `'10s'` | 10 秒后过期 |

```js
StorageManagerUtils.saveCookies('token', 'xxx', '7d')
StorageManagerUtils.getCookies('token')   // 'xxx'
StorageManagerUtils.isCookiesKey('token') // true
StorageManagerUtils.removeCookies('token')
```

> Cookie 的 key 不能使用 `expires`、`max-age`、`path`、`domain`、`secure` 等保留关键字。

### localStorage

| 方法 | 说明 |
| --- | --- |
| `saveLocalStorage(key, value)` | 保存 |
| `getLocalStorage(key)` | 读取 |
| `removeLocalStorage(key)` | 删除指定 key |
| `removeAllLocalStorage()` | 清空全部 |

### sessionStorage

| 方法 | 说明 |
| --- | --- |
| `saveSessionStorage(key, value)` | 保存 |
| `getSessionStorage(key)` | 读取 |
| `removeSessionStorage(key)` | 删除指定 key |
| `removeAllSessionStorage()` | 清空全部 |

### 一键清除

| 方法 | 说明 |
| --- | --- |
| `removeAll()` | 同时清空 localStorage 和 sessionStorage |

```js
StorageManagerUtils.saveLocalStorage('userInfo', JSON.stringify({ name: '张三' }))
const userInfo = JSON.parse(StorageManagerUtils.getLocalStorage('userInfo'))

StorageManagerUtils.saveSessionStorage('tempKey', 'tempValue')
StorageManagerUtils.removeAll()
```

> Web Storage 只存储字符串，对象需自行 `JSON.stringify` / `JSON.parse`。

---

## 更新日志

### 1.2.6

- 新增 `patch` 请求方式；
- `put` / `patch` / `del` 统一支持 `(url)`、`(url, data)`、`(url, id)`、`(url, id, data)` 四种调用方式，id 自动拼接到路径；
- `flatMap` 链式请求新增 `patch`、`del` 支持；
- `transformSchedulers` 新增短名别名 `transform`，旧名保留以兼容历史项目；
- 修复 `removeLocalStorage` 调用不存在的 `Storage.remove` 方法的问题。

---

## License

[MIT](https://opensource.org/licenses/MIT)
