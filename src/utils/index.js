/* istanbul ignore next */
// import StatementComponents from '../components/StatementComponents'
//
// StatementComponents.install = function(Vue) {
//   Vue.component(StatementComponents.name, StatementComponents)
// }

import NotificationManagerUtils from './NotificationManagerUtils'
import DeviceManagerUtils from './DeviceManagerUtils'
import AxiosManagerUtils from './AxiosManagerUtils'
import StorageManagerUtils from './StorageManagerUtils'
import EventBusManagerUtils from './EventBusManagerUtils'
import LocationManagerUtils from './LocationManagerUtils'
import ChatMessageUtils from './ChatMessageUtils'
import ConstantManagerUtils from './ConstantManagerUtils'

export default {
  NotificationManagerUtils,
  DeviceManagerUtils,
  AxiosManagerUtils,
  StorageManagerUtils,
  EventBusManagerUtils,
  LocationManagerUtils,
  ChatMessageUtils,
  ConstantManagerUtils
}
