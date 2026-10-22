/**
 * 申请浏览器通知权限
 * @param title 通知标题
 * @param content 通知内容
 * @param icon 通知图标
 */
export function applyNotificationPermissionDialog(title, content, icon) {
  // 判断浏览器是否支持Notification
  if (window.Notification) { 
    Notification.requestPermission().then(permission => {
      // 向浏览器请求允许通知
      if (permission === 'granted') {
        //发起一条新通知
        console.log('弹出通知')
        const myNotification = new Notification(title, {
          body: content,
          icon: icon,
          tag:'1',
          renotify:true,
          requireInteraction:true
        })
        myNotification.onclick = function() {
          //点击消息通知后回到相应窗口
          window.focus()
          //关闭清除通知
          myNotification.close()
        }
      }
    })
  }
}

export default {
  applyNotificationPermissionDialog
}
