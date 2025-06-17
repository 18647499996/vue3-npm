<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import AxiosManagerUtils from './utils/AxiosManagerUtils';
import ChatMessageUtils from './utils/ChatMessageUtils';
import DeviceManagerUtils from './utils/DeviceManagerUtils';
import EventBusManagerUtils from './utils/EventBusManagerUtils';
import NotificationManagerUtils from './utils/NotificationManagerUtils';
import StorageManagerUtils from './utils/StorageManagerUtils';


export default {
  name: 'App',
  created() {
    console.log('终端设备：', DeviceManagerUtils.getDeviceManager());
    // StorageManagerUtils.saveLocalStorage('liudonghan', '刘冬涵');
    // console.log('本地存储：', StorageManagerUtils.getLocalStorage('liudonghan'));
    // AxiosManagerUtils
    //   .createAxiosServer()
    //   .baseApi('https://csapi1.xinfushenghuo.cn')
    //   .addLogcatInterceptors()
    //   .addParamsInterceptors(params => {
    //     return params
    //   })
    //   .addCodeInterceptors(code => {
    //     return code.data
    //   })
    //   .flatMap('get', '/apiindex/get-navigation-location?', { is_index: 1 })
    //   .then(suucceed => {

    //   })
    //   .catch(error => {

    //   })
    // EventBusManagerUtils.register('TAG', callback => {
    //   console.log('观察者模式监听：', callback);
    // })

    // EventBusManagerUtils.post('TAG', '发送了一条数据');
    // NotificationManagerUtils.applyNotificationPermissionDialog('这是一条通知标题','通知栏内容',0)
    // ChatMessageUtils.createTimChat();
  }

}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
