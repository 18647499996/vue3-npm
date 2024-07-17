<template>
  <div>
    <a-row style="line-height:30px; padding:  16px 16px; text-align: center;  font-size: 14px;">
      <a-col>
        <img :width="30" src="../assets/favicon.png" @click="onClick()" />
        <span class="span-title" @click="onClick()">Bemi API</span>
      </a-col>
    </a-row>
    <a-menu v-model:selectedKeys="selectedKeys" :open-keys="openKeys" theme="light" mode="inline" :items="items"
      @openChange="onOpenChange" @click="onClickMenu"></a-menu>
  </div>
</template>

<script>

import { mapMenu } from '../router/index.js';

export default {
  name: 'SiderMenuComponents',
  props: {
  },
  data() {
    return {
      items: [],
      selectedKeys: [],
      openKeys: [],
      totalKey: [],
    }
  },

  created() {
    this.items = this.transfromRouterList()
    this.items.find(key => {
      this.totalKey.push(key.key)
    })
  },

  mounted() {

  },

  methods: {

    /**
     * 转换路由列表数据
     */
    transfromRouterList() {
      const list = [];
      mapMenu.find(key => {
        let object = {};
        object.key = key.name
        object.label = key.meta.title
        object.icon = key.meta.icon
        object.path = key.path
        object.redirect = key.redirect
        if (key.children !== undefined) {
          let child = [];
          key.children.find(i => {
            let childObject = {};
            childObject.key = i.name
            childObject.label = i.meta.title
            childObject.path = i.path
            childObject.redirect = i.redirect
            child.push(childObject)
          })
          object.children = child
        }
        list.push(object)
      })
      return list
    },

    onOpenChange(postion) {
      const latestOpenKey = postion.find(key => this.openKeys.indexOf(key) === -1)
      if (this.totalKey.indexOf(latestOpenKey) === -1) {
        this.openKeys = postion;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },

    onClickMenu(e) {
      this.$router.push(e.item.path)
    },

    onClick() {
      this.$router.push('/index')
      this.onOpenChange(['index'])
      this.selectedKeys = ['data']
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.span-title {
  font-size: 16px;
  font-weight: 600;
  margin-left: 8px;
  color: #333;
}
</style>
