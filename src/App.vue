<template>
  <div id="app">
    <h1>mayunf 工具包</h1>
    <p>终端设备：{{ device }}</p>
  </div>
</template>

<script>
import DeviceManagerUtils from './utils/DeviceManagerUtils'

export default {
  name: 'App',
  data() {
    return {
      device: ''
    }
  },
  created() {
    this.device = JSON.stringify(DeviceManagerUtils.getDeviceManager())
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 60px;
}
</style>
