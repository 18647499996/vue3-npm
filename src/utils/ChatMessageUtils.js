import TIM from 'tim-js-sdk'
import TIMUploadPlugin from 'tim-upload-plugin'
import ConstantManagerUtils from './ConstantManagerUtils'
import formatUtils from '../utils/FormatUtils'

let chatSDK = null

/**
 * todo 创建腾讯IM实例
 * @return {ChatSDK}
 */
export function createTimChat() {
  if (null !== chatSDK) {
    return chatSDK
  }
  // 创建 SDK 实例，`TIM.create()`方法对于同一个 `SDKAppID` 只会返回同一份实例
  chatSDK = TIM.create({ SDKAppID: ConstantManagerUtils.config.timSdkId })
  // '0' debug   普通级别，日志量较多，接入时建议使用
  // '1' release 级别，SDK 输出关键信息，生产环境时建议使用
  chatSDK.setLogLevel(ConstantManagerUtils.config.logLevel)
  // 注册腾讯云即时通信 IM 上传插件
  chatSDK.registerPlugin({ 'tim-upload-plugin': TIMUploadPlugin })
  return chatSDK
}

/**
 * todo 登录IM服务器
 * @param userId
 * @param userSig
 * @param loginListener
 */
export function login(userId, userSig, loginListener) {
  createTimChat().login({ userID: userId, userSig: userSig })
    .then(response => {
      loginListener(response)
    }).catch(error => {
    console.error('Tim Chat IM Server Login Error：', error)
  })
}

/**
 * todo 退出登录
 */
export function logout(logoutListener) {
  createTimChat().logout()
    .then(response => {
      logoutListener(response)
    }).catch(error => {
    console.error('Tim Chat IM Server Logout Error：', error)
  })
}

/**
 * todo 销毁登录
 * @param destroyListener
 */
export function destroy(destroyListener) {
  createTimChat().destroy()
    .then(response => {
      chatSDK = null
      destroyListener(response)
    }).catch(error => {
    console.error('Tim Chat IM Server Destroy Error：', error)
  })
}

/**
 * todo SDK 收到推送的单聊、群聊、群提示、群系统通知的新消息，接入侧可通过遍历 event.data 获取消息列表数据并渲染到页面
 * @param onMessageReceived
 * @return {this}
 */
export function onMessageReceived(onMessageReceived) {
  createTimChat().on(TIM.EVENT.MESSAGE_RECEIVED, onMessageReceived)
  return this
}

/**
 * todo SDK 收到消息被撤回的通知，可通过遍历 event.data 获取被撤回的消息列表数据并渲染到页面，如单聊会话内可展示为 "对方撤回了一条消息"；群聊会话内可展示为 "XXX撤回了一条消息"。
 * @param onMessageRevoked
 * @return {this}
 */
export function onMessageRevoked(onMessageRevoked) {
  createTimChat().on(TIM.EVENT.MESSAGE_REVOKED, onMessageRevoked)
  return this
}

/**
 * todo 群组管理功能指的是创建群组、加入群组、获取已加入的群组、退出群组和解散群组等。
 * @param onGroupListUpdated
 * @return {this}
 */
export function onGroupListUpdated(onGroupListUpdated) {
  createTimChat().on(TIM.EVENT.GROUP_LIST_UPDATED, onGroupListUpdated)
  return this
}

/**
 * todo 群属性更新时触发，可通过 event.data 获取到更新后的群属性数据（v2.14.0起支持）
 * @param onGroupAttributesUpdated
 * @return {this}
 */
export function onGroupAttributesUpdated(onGroupAttributesUpdated) {
  createTimChat().on(TIM.EVENT.GROUP_ATTRIBUTES_UPDATED, onGroupAttributesUpdated)
  return this
}

/**
 * todo 网络状态发生改变
 * v2.5.0 起支持
 * event.data.state 当前网络状态，枚举值及说明如下：
 * TIM.TYPES.NET_STATE_CONNECTED - 已接入网络
 * TIM.TYPES.NET_STATE_CONNECTING - 连接中。很可能遇到网络抖动，SDK 在重试。接入侧可根据此状态提示“当前网络不稳定”或“连接中”
 * TIM.TYPES.NET_STATE_DISCONNECTED - 未接入网络。接入侧可根据此状态提示“当前网络不可用”。SDK 仍会继续重试，若用户网络恢复，SDK 会自动同步消息
 * @param onNetStateChange
 * @return {this}
 */
export function onNetWorkStateChange(onNetStateChange) {
  createTimChat().on(TIM.EVENT.NET_STATE_CHANGE, onNetStateChange)
  return this
}

/**
 * todo 用户被踢下线时触发
 * TIM.TYPES.KICKED_OUT_MULT_ACCOUNT(Web端，同一帐号，多页面登录被踢)
 * TIM.TYPES.KICKED_OUT_MULT_DEVICE(同一帐号，多端登录被踢)
 * TIM.TYPES.KICKED_OUT_USERSIG_EXPIRED(签名过期)
 * TIM.TYPES.KICKED_OUT_REST_API(REST API kick 接口踢出。v2.20.0起支持)
 * @param onKickedOut
 * @return {this}
 */
export function onKickedOut(onKickedOut) {
  createTimChat().on(TIM.EVENT.KICKED_OUT, onKickedOut)
  return this
}

/**
 * todo 格式化Chat消息数据
 * todo 根据platform消息来源终端类型（ android、ios、web、api ）
 * todo 根据消息类型elemType（ 1.文本 2.自定义 3.图片 4.语音 7.位置）
 * @param data 消息数据
 * @returns {*}
 */
export function transformMessageList(data) {
  try {
    let transformList = []
    for (let i = 0; i < data.length; i++) {
      // todo 新数据结构体
      const transformModel = {
        messageContent: {}
      }
      const messageModel = data[i]['_source']
      // const bodyModel = JSON.parse(messageModel['body'])
      transformModel['id'] = messageModel['id']
      transformModel['platform'] = messageModel['platform']
      transformModel['contentType'] = messageModel['contentType']
      transformModel['messageCreateTime'] = messageModel['createTimeInMillis']
      transformModel['senderTimeMillis'] = formatUtils.getTimestamp(messageModel['createTimeInMillis'])
      transformModel['conversationType'] = messageModel['targetType']
      transformModel['isRead'] = messageModel['isPeerRead']
      transformModel['nickName'] = messageModel['formUserInfo']['nickname']
      transformModel['faceUrl'] = messageModel['formUserInfo']['head_portrait']
      transformModel['senderUserID'] = messageModel['fromID']
      transformModel['messageStatus'] = 2
      transformModel['messageContent'] = getMessageContent(messageModel['platform'], parseInt(messageModel['contentType']), messageModel['filePath'], JSON.parse(messageModel['body']))
      transformList.push(transformModel)
    }
    return transformList
  } catch (e) {
    console.error('Transform Message Error：', e)
  }
}

/**
 * todo 推送聊天消息
 * @param message 消息体
 * @param platform 终端平台
 * @param filePath 文件路径
 * @param targetId 接受者ID
 * @param targetName 接受者昵称
 * @param phoneModel 手机型号
 * @param manufacturer 厂商
 * @param appKey SDK ID
 * @returns {*}
 */
export function pushChatMessageData(message, platform, filePath, targetId, targetName, phoneModel, manufacturer, appKey) {
  return {
    'serverMessageId': message['ID'],
    'platform': platform,
    'contentType': transformElemType(message['type']),
    'targetType': 'C2C' === message['conversationType'] ? 'single' : 'group',
    'filePath': filePath,
    'fromID': message['from'],
    'fromName': message['nick'],
    'targetID': targetId,
    'targetName': targetName,
    'createTimeInMillis': message['time'],
    'fromAppkey': message['conversationID'],
    'targetAppkey': appKey,
    'body': JSON.stringify(message),
    'cloudCustomData': '',
    'isRevoked': '',
    'manufacturer': manufacturer,
    'phoneModel': phoneModel,
    'content': 1 === transformElemType(message['type']) ? message['payload']['text'] : ''
  }
}

/**
 * todo 获取会话列表
 * @param data
 * @returns {*[]}
 */
export function getConversationList(data) {
  try {
    let conversationList = []
    for (let i = 0; i < data.length; i++) {
      // todo 新数据结构体
      const conversationModel = {
        messageContent: {}
      }
      conversationModel['conversationType'] = 1 === data[i]['conversation_type'] ? 'single' : 'group'
      conversationModel['showName'] = 2 === data[i]['conversation_type'] ? null === data[i]['wheat_group'] ? '' : data[i]['wheat_group']['name'] : null === data[i]['wheat_user'] ? '' : data[i]['wheat_user']['nickname']
      conversationModel['faceUrl'] = 2 === data[i]['conversation_type'] ? null === data[i]['wheat_group'] ? '' : data[i]['wheat_group']['avatar'] : null === data[i]['wheat_user'] ? '' : data[i]['wheat_user']['head_portrait']
      conversationModel['cid'] = 2 === data[i]['conversation_type'] ? null === data[i]['wheat_group'] ? '' : data[i]['wheat_group']['im_biaoshi'] : null === data[i]['wheat_user'] ? '' : data[i]['wheat_user']['username']
      conversationModel['fromName'] = undefined === data[i]['fromName'] ? '' : data[i]['fromName']
      conversationModel['fromId'] = data[i]['userId']
      conversationModel['userId'] = data[i]['userId'].split('_')[1]
      conversationModel['id'] = data[i]['id']
      conversationModel['unreadCount'] = data[i]['unread']
      conversationModel['isTop'] = data[i]['sorts']
      conversationModel['isDisturb'] = data[i]['is_disturb']
      conversationModel['updateTime'] = data[i]['updated_at']
      conversationModel['senderTimeMillis'] = formatUtils.getTimestamp(data[i]['updated_at'])
      conversationModel['messageContent'] = null == data[i]['wheat_news_rocerd'] ? null : getMessageContent(data[i]['wheat_news_rocerd']['platform'], parseInt(data[i]['wheat_news_rocerd']['contentType']), data[i]['wheat_news_rocerd']['filename'], JSON.parse(data[i]['wheat_news_rocerd']['body']))
      conversationModel['platform'] = null == data[i]['wheat_news_rocerd'] ? 'unknown' : data[i]['wheat_news_rocerd']['platform']
      conversationList.push(conversationModel)
    }
    return conversationList
  } catch (e) {
    console.error('Get Conversation Message Error：', e)
  }
}

/**
 * todo 显示会话内容描述
 * @param elemType
 * @param dec
 * @returns {string|*}
 */
export function getConversationContentDec(elemType, dec) {
  switch (elemType) {
    case 'txt':
      return dec
    case 'custom':
      return '[自定义消息]'
    case 'image':
      return '[图片]'
    case 'voice':
      return '[语音]'
    case 'video':
      return '[视频]'
    case 'location':
      return '[位置]'
  }
}

/**
 * todo 获取接收消息数据
 * @param data 消息数据
 * @returns {{}} 聊天数组
 */
export function transformReceiveMessage(data) {
  try {
    const transformReceiveModel = {}
    transformReceiveModel['messageStatus'] = 2
    transformReceiveModel['senderUserID'] = data['from']
    transformReceiveModel['faceUrl'] = data['avatar']
    transformReceiveModel['nickName'] = data['nick']
    transformReceiveModel['senderTimeMillis'] = data['clientTime']
    transformReceiveModel['platform'] = 'receive'
    transformReceiveModel['contentType'] = transformElemType(data['type'])
    transformReceiveModel['id'] = data['ID']
    transformReceiveModel['messageCreateTime'] = data['time']
    transformReceiveModel['conversationType'] = 'C2C' === data['type'] ? 'single' : 'group'
    transformReceiveModel['isRead'] = data['isRead']
    transformReceiveModel['messageContent'] = getMessageContent('receive', transformElemType(data['type']), '', data['payload'])
    return transformReceiveModel
  } catch (e) {
    console.error('Transform Receive Message Error：', e)
  }
}

/**
 * 消息发送限制
 * TODO 1.首先循环取出当天所有的聊天记录
 * TODO 2.根据当天聊天记查询是否有对方发送的消息
 * TODO 3.如果有则当天发送消息无限制
 * TODO 4.如果当天没有对方发送消息则只允许发送一条消息
 * TODO 5.群聊发送无限制
 * @param friendList 好友列表
 * @param messageList 消息列表
 * @param targetId 接收人ID
 * @param fromId 发送人ID
 * @param conversationType 会话类型 'single' : 'group'
 * @returns {boolean}
 */
export function isConstraintMessageSend(friendList, messageList, targetId, fromId, conversationType) {
  switch (conversationType) {
    case 'single':
      // 是否好友
      let isFriend = false
      // 当天是否接收过消息
      let isReceive = false
      // 当天是否发送过消息
      let isFirst = true
      for (let i = 0; i < friendList.length; i++) {
        // 是否好友
        if (friendList[i]['touid'] === targetId) {
          isFriend = true
        }
      }
      let currentDate = formatUtils.getDateFormat(new Date().getTime(), 'yyyy-MM-dd')
      for (let i = 0; i < messageList.length; i++) {
        // 查询当日消息
        console.warn('当日时间：' + currentDate + ' ------- ' + '消息时间：' + formatUtils.getDateFormat(messageList[i]['senderTimeMillis'] * 1000, 'yyyy-MM-dd'))
        if (currentDate === formatUtils.getDateFormat(messageList[i]['senderTimeMillis'] * 1000, 'yyyy-MM-dd')) {
          // 是否有接收消息
          if (messageList[i]['senderUserID'] === targetId) {
            isReceive = true
          }
          console.warn('发送人ID：' + messageList[i]['senderUserID'] + ' -------- 当前发送人ID：' + fromId)
          if (messageList[i]['senderUserID'] === fromId) {
            // 是否有发送成功消息
            console.warn('消息状态：' + messageList[i]['messageStatus'])
            if (messageList[i]['messageStatus'] === 2) {
              isFirst = false
            }
          }
        }
      }
      console.log('isFriend：' + isFriend + ' ---- ' + 'isReceive：' + isReceive + ' ------ ' + 'isFirst：' + isFirst)
      return isFriend || isReceive || isFirst
    case 'group':
      return true
  }
}

/**
 * todo 消息列表时间显示规则
 * @param position 索引
 * @param messageCount 消息数量
 * @param messageList 消息列表
 * @param currentTimeStamp 当前消息时间
 * @returns {boolean}
 */
export function isShowMessageTime(position, messageCount, messageList, currentTimeStamp) {
  if (messageCount === 20) {
    if (position % 20 === 0) {
      return true
    } else {
      // 如果两条消息之间的间隔超过五分钟则显示时间
      const lastTimeStamp = messageList[position - 1]['senderTimeMillis'] * 1000
      return currentTimeStamp - lastTimeStamp > 300000
    }
  } else {
    if (position === 0 || position === messageCount || (position - messageCount) % 20 === 0) {
      return true
    } else {
      const lastTimeStamp = messageList[position - 1]['senderTimeMillis'] * 1000
      // 如果两条消息之间的间隔超过五分钟则显示时间
      return currentTimeStamp - lastTimeStamp > 300000
    }
  }
}


/**
 * todo 获取用户身份
 * @param targetId 用户ID
 * @returns {string}
 */
export function getUserRoute(targetId) {
  if ('' === targetId) {
    return ''
  }
  const route = targetId.split('_')[0]
  switch (route) {
    case 'user':
      return '个人'
    case 'comGroup':
      return '企业'
    case 'supplier':
      return '商户'
    case 'platform':
      return '平台'
    default:
      return '群组'
  }
}

/**
 * 获取消息体
 * @param platform 终端平台 ios、android、web、h5、api、receive
 * @param contentType 消息类型 1.文本 2.自定义 3.图片 4.语音 5.视频 7.位置 10.群组消息
 * @param filePath 文件路径
 * @param bodyModel body数据
 * @returns {{}}
 */
function getMessageContent(platform, contentType, filePath, bodyModel) {
  const messageContent = {}
  if (undefined === bodyModel || null == bodyModel) {
    return null
  }
  switch (platform) {
    case 'IOS':
    case 'web':
    case 'h5':
    case 'Android':
    case 'api':
      switch (contentType) {
        case 1:
          messageContent['elemType'] = 'text'
          messageContent['elemValue'] = bodyModel[0]['MsgContent']['Text']
          break
        case 2:
          messageContent['elemType'] = 'custom'
          messageContent['elemValue'] = ''
          messageContent['customInfo'] = getCustomMessageContent(JSON.parse(bodyModel[0]['MsgContent']['Data']))
          messageContent['customType'] = JSON.parse(bodyModel[0]['MsgContent']['Data'])['type']
          break
        case 3:
          messageContent['elemType'] = 'image'
          messageContent['elemValue'] = filePath
          messageContent['imageList'] = bodyModel[0]['MsgContent']['ImageInfoArray']
          break
        case 4:
          messageContent['elemType'] = 'voice'
          messageContent['elemValue'] = bodyModel[0]['MsgContent']['Url']
          messageContent['duration'] = bodyModel[0]['MsgContent']['Second']
          break
        case 5:
          messageContent['elemType'] = 'video'
          messageContent['elemValue'] = bodyModel[0]['MsgContent']['VideoUrl']
          messageContent['elemCover'] = bodyModel[0]['MsgContent']['ThumbUrl']
          messageContent['duration'] = bodyModel[0]['MsgContent']['VideoSecond']
          break
        case 7:
          messageContent['elemType'] = 'location'
          messageContent['elemValue'] = ''
          messageContent['locationInfo'] = JSON.parse(bodyModel[0]['MsgContent']['Desc'])
          messageContent['longitude'] = bodyModel[0]['MsgContent']['Longitude']
          messageContent['latitude'] = bodyModel[0]['MsgContent']['Latitude']
          break
        case 10:
          messageContent['elemType'] = 'groupTips'
          messageContent['elemValue'] = bodyModel[0]['MsgContent']['Text']
          messageContent['customInfo'] = ''
          messageContent['customType'] = ''
          break
      }
      break
    case 'receive':
      switch (contentType) {
        case 1:
          messageContent['elemType'] = 'text'
          messageContent['elemValue'] = bodyModel['text']
          break
        case 2:
          messageContent['elemType'] = 'custom'
          messageContent['elemValue'] = ''
          messageContent['customInfo'] = getCustomMessageContent(JSON.parse(bodyModel['data']))
          messageContent['customType'] = JSON.parse(bodyModel['data'])['type']
          break
        case 3:
          messageContent['elemType'] = 'image'
          messageContent['elemValue'] = bodyModel['imageInfoArray'][0]['imageUrl']
          messageContent['imageList'] = bodyModel['imageInfoArray']
          break
        case 4:
          messageContent['elemType'] = 'voice'
          messageContent['elemValue'] = bodyModel['url']
          messageContent['duration'] = bodyModel['second']
          break
        case 5:
          messageContent['elemType'] = 'video'
          messageContent['elemValue'] = bodyModel['videoUrl']
          messageContent['elemCover'] = bodyModel['thumbUrl']
          break
        case 7:
          messageContent['elemType'] = 'location'
          messageContent['elemValue'] = ''
          messageContent['locationInfo'] = JSON.parse(bodyModel['description'])
          messageContent['longitude'] = bodyModel['longitude']
          messageContent['latitude'] = bodyModel['latitude']
          break
      }
      break
  }
  return messageContent
}

/**
 * 获取自定义消息结构
 * todo 01.站内邀请 （ 发送群组名片信息 ）
 * todo 02.订单消息 （ 发送用户订单信息 ）
 * todo 03.商品消息 （ 发送商家商品信息 ）
 * todo 04.订单推送 （ 用户下单 服务器通过极光 REST API 分别发送一条订单推送至商家和用户 ）
 * todo 05.退款推送 （ 服务器通过极光 REST API 接口 发送退款消息通知商家端 ）
 * todo 06.拉黑消息 （ 当对方将你拉黑之后，发送消息时创建一条本地拉黑消息提示"消息已发出，但被对方拒收"）
 * todo 07.透传消息 （ 透传类型"cmd_type"：1.拉黑通知 ）
 * todo 08.限制消息 （ 当双方未进行相互关注"非好友关系" 24小时内（ 如果对方未回复情况下 ）只能发送一条消息
 * todo 09.群组限制 （ 当用户被踢出群聊、退出群聊 发送群组异常消息提示 ）
 * todo 10.问诊消息 （ 医护端创建一条问诊消息发送给患者端 ）
 * todo 11.文章消息 （ 用户发送文章类型消息 ）
 * todo 12.名片消息 （ 用户发送名片类型消息 ）
 * todo 13.存证消息 （ 汇存证链接消息 ）
 * @param messageModelElement 自定义消息体
 * @returns {*}
 */
function getCustomMessageContent(messageModelElement) {
  switch (Number(messageModelElement['type'])) {
    case 1:
      return messageModelElement['groupInfo']
    case 2:
      return messageModelElement['orderInfo']
    case 3:
      return messageModelElement['goodsInfo']
    case 4:
      return messageModelElement['orderInfo']
    case 5:
      return messageModelElement['refundInfo']
    case 10:
      return messageModelElement['patientCardInfo']
    case 11:
      return messageModelElement['articleInfo']
    case 12:
      return messageModelElement['businessCardInfo']
  }
}

/**
 * Web端消息发送状态
 * @param status
 * todo unSend(未发送)
 * todo success(发送成功)
 * todo fail(发送失败)
 * @returns {number}
 */
function getMessageSendStatus(status) {
  switch (status) {
    case 'unSend':
      return 1
    case 'success':
      return 2
    case 'fail':
      return 3
  }
}

/**
 * 格式化消息类型（ 将消息类型String 转换 int ）
 * @param elemType
 * @returns {int}
 */
function transformElemType(elemType) {
  switch (elemType) {
    case 'TIMTextElem':
      return 1
    case 'TIMCustomElem':
      return 2
    case 'TIMImageElem':
      return 3
    case 'TIMSoundElem':
      return 4
    case 'TIMVideoFileElem':
      return 5
    case 'TIMLocationElem':
      return 7
    default:
      return 0
  }
}

export default {
  transformMessageList,
  pushChatMessageData,
  getConversationList,
  transformReceiveMessage,
  getCustomMessageContent,
  getMessageContent,
  getConversationContentDec,
  isConstraintMessageSend,
  isShowMessageTime,
  getUserRoute,
  createTimChat,
  login,
  logout,
  destroy,
  onMessageReceived,
  onMessageRevoked,
  onGroupListUpdated,
  onGroupAttributesUpdated,
  onNetWorkStateChange,
  onKickedOut,
  TIM
}
