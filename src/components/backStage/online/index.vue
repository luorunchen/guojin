<template>
  <div id="online">
    <div class="title">
      <p>在线咨询</p>
    </div>

    <el-row>
      <el-col :span="1">
        <div class="home-menu">
          <div v-if="tian" @click="statusFun(false, 1)">
            <img src="../../../assets/d.png" alt="">
          </div>
          <div v-else @click="statusFun(true, 1)">
            <img src="../../../assets/h.png" alt="">
          </div>

        </div>
      </el-col>
      <el-col :span="5">
        <div class="home-list">
          <ul>
            待接入 {{ conversations.length }}
            <li v-for="item, index in conversations" :key="index" :class="specialistID.id == item.id ? 'liInfo' : ''"
              @click="specialist(item, '待接入')">
              <el-badge :value="item.unread == 0 ? '' : item.unread">
                <el-row>
                  <el-col :span="4">
                    <div class="sender-info">
                      <img src="../../../assets/q.png" alt="">
                    </div>
                  </el-col>
                  <el-col :span="19">
                    <div class="box">
                      <p>{{ item.lastMessage.senderData
                        .nickname }}</p>
                      <span>{{ moment(item.lastMessage.timestamp
                      ).format('HH:mm') }}</span>
                    </div>
                    <span>{{ item.lastMessage
                      .payload.text }}</span>
                  </el-col>
                </el-row>
              </el-badge>



            </li>
          </ul>
          <ul>
            已接入 {{ pendingConversations.length }}
            <li v-for="item, index in pendingConversations" :key="index"
              :class="specialistID.id == item.id ? 'liInfo' : ''" @click="specialist(item, '已接入')">

              <el-badge :value="item.unread == 0 ? '' : item.unread">
                <el-row :gutter="10">
                  <el-col :span="4">
                    <el-badge is-dot class="item" :type="item.online ? 'success' : 'danger'">
                      <div class="sender-info">
                        <img src="../../../assets/q.png" alt="">
                      </div>
                    </el-badge>

                  </el-col>
                  <el-col :span="19">
                    <div class="box">
                      <p>{{ item.data.nickname }}</p>
                      <span>{{ moment(item.lastMessage.timestamp
                      ).format('hh:mm') }}</span>
                    </div>
                    <span>{{ item.ended ? '对话已结束' : item.lastMessage
                      .payload.text }}</span>
                  </el-col>
                </el-row></el-badge>



            </li>
          </ul>

        </div>
      </el-col>
      <el-col :span="18">
        <div class="home-conter" v-if="specialistType == '已接入'">
          <div class="info">
            <p>{{ specialistID.data.nickname }}</p>
          </div>
          <div class="middle" ref="chatBox">
            <div v-for="item, index in messageList" :key="index">
              <!-- <div class="message-item ">
                <div class="message-item-content">
                  <div class="sender-info">
                    <img src="../../../assets/n.png" alt="">
                  </div>
                  <div class="message-content">
                    <div class="message-payload">
                      <div class="content-text">121212</div>
                    </div>
                  </div>
                </div>
              </div> -->
              <h5>
                {{ renderMessageDate(item, index) }}
              </h5>
              <div class="message-item ">
                <div :class="item.talkType == 'back' ? 'message-item-content  self' : 'message-item-content'">
                  <div class="sender-info">
                    <img src="../../../assets/n.png" alt="" v-if="item.talkType == 'back'">
                    <img src="../../../assets/q.png" alt="" v-else>

                  </div>
                  <div class="message-content">
                    <div class="message-payload">
                      <div class="content-text" v-if="item.status == 'text'">{{ item.message }}</div>
                      <!-- <div class="content-text" v-else>{{ item.status == 'CS_END' ? '会话已结束' : '会话已接入' }}</div> -->

                    </div>
                  </div>
                </div>
              </div>


            </div>

          </div>
          <div class="push">
            <template v-if="endTalkStatus != 'CS_END'">
              <el-input v-model="textarea" :rows="3" type="textarea" @keyup.enter="sendMsg" />
              <div class="btn">
                <el-button type="danger" @click="endTalk">结束会话</el-button>
                <el-button type="primary" @click="sendMsg">发送</el-button>
              </div>
            </template>
            <h3 v-else>对话已结束</h3>

          </div>

        </div>
        <div class="home-conter" v-else>
          <div class="zixun" v-if="specialistID != ''">
            <el-row>
              <el-col :span="12">
                <img src="../../../assets/q.png" alt="">
              </el-col>
              <el-col :span="12">
                <p>{{ specialistID.data.nickname }}</p>
                <p>已等待:{{ time }}</p>
              </el-col>
            </el-row>
            <el-button type="primary" @click="Iwant">立即接入</el-button>
          </div>

        </div>

      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, defineComponent, watchEffect } from 'vue'
import { useStore } from "vuex";
import { getPersonList } from '@/api/index.js'
import moment from 'moment'
const store = useStore();
const tian = ref(true)
const jia = ref(false)
const endTalkStatus = ref('')
const specialistID: any = ref('')
const specialistType = ref('')
const time = ref('')
const textarea = ref('')
const messageList = ref([])
const chatList: any = ref([])
const personList = ref([])
const conversations = ref([])
const pendingConversations = ref([])
const csteam = ref()
const chatBox = ref<HTMLElement>();
// const chatBox = ref<HTMLElement>();


onMounted(() => {
  // connect()
  getPersonListFun()

  csteam.value = store.state.goEasy.im.csteam(sessionStorage.getItem('userId')); //将要作为哪个团队或者商家的客服上线
  csteam.value.isOnline({
    teamData: { nickname: sessionStorage.getItem('userName'), type: 'back' },//客服团队或者商家信息，将会显示在用户端的会话列表
    agentData: { nickname: sessionStorage.getItem('userName'), type: 'back' },//客服数据，将会作为每条客服发送消息的的senderData
    onSuccess: (msg) => {
      console.log('已上线', msg);
    },
    onFailed: (error) => {
      console.log('上线失败,error:', error);
    }
  })
  csteam.value.online({
    teamData: { nickname: sessionStorage.getItem('userName'), type: 'back' },//客服团队或者商家信息，将会显示在用户端的会话列表
    agentData: { nickname: sessionStorage.getItem('userName'), type: 'back' },//客服数据，将会作为每条客服发送消息的的senderData
    onSuccess: () => {
      // this.onlineConfig.online = true;
      console.log('已上线222');
    },
    onFailed: (error) => {
      console.log('上线失败,error:', error);
    }
  })

  loadConversations()
  listenConversationUpdate()
  // onPendingConversationUpdated()

  // console.log(GoEasy, 'GoEasy');


})
const scrollToBottom = () => {
  // console.log('到底部了', chatBox.value.scrollTop, chatBox.value.scrollHeight);
  setTimeout(() => {
    chatBox.value.scrollTop = chatBox.value.scrollHeight
    chatBox.value.scrollTo({
      top: chatBox.value.scrollHeight,
      behavior: 'smooth',
    });
  }, 500);

}
const listenConversationUpdate = () => {
  // // 监听会话列表变化
  store.state.goEasy.im.on(GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, renderPendingConversations);
  store.state.goEasy.im.on(GoEasy.IM_EVENT.PENDING_CONVERSATIONS_UPDATED, renderLatestConversations);

}
const renderMessageDate = (message, index) => {
  // console.log(message, index, 'message');

  if (index === 0) {
    // console.log(message.timestamp);

    return moment(message.timestamp).format('YYYY-MM-DD HH:mm:ss')
  } else {
    // console.log(message.timestamp - messageList.value[index - 1].timestamp > 5 * 30 * 1000);

    if (message.timestamp - messageList.value[index - 1].timestamp > 60 * 1000) {
      return moment(message.timestamp).format('YYYY-MM-DD HH:mm:ss')
    }
  }
  return '';
}
const renderPendingConversations = (content) => {
  // console.log(content, '1111222');
  // pendingConversations.value = content.conversations;


  // console.log(pendingConversations.value, '已接入列表');
  hereNow(content.conversations)
  // 
}
const renderLatestConversations = (content) => {
  conversations.value = content.conversations;
  console.log(content, '1111ddasdasdasada');

}
const listenCustomer = () => {
  csteam.value.listenCustomer({
    id: specialistID.value.id,
    onSuccess: () => {
      console.log('listen customer successfully');

    },
    onFailed: (error) => {
      console.log('failed to listen customer:', error);
    },
    onStatusUpdated: (customerStatus) => {
      // console.log('用户最新会话状态', customerStatus);
    },
    onNewMessage: (message) => {
      // console.log(message, 'message11111');

      if (message.type == 'text') {
        let talk = message.payload != undefined ? message.payload.text : ''
        // if (message.payload != null || message.payload.text != '') {
        messageList.value.push({ message: talk, talkType: 'front', status: message.type, timestamp: message.timestamp })
        scrollToBottom()
        markMessageAsRead()

      }

    },
  })
}

const hereNow = (list) => {
  let arr = []
  list.forEach(item2 => {
    item2.online = false
    arr.push(item2.id)
    // item1.id
  })

  store.state.goEasy.im.hereNow({
    userIds: arr, //每次查询最多不超过50个
    onSuccess: function (res) {


      // console.log(result);
      res.content.forEach(item1 => {
        list.forEach(item2 => {
          if (item1.id == item2.id) {
            item2.online = true
          }
          // item1.id
        })
      })
      // console.log(result.content.conversations, '已接入的会话列表');
      pendingConversations.value = list

    },
    onFailed: function (error) { //连接失败
      console.log("Failed to mark as read, code:" + error.code + " content:" + error.content);
    }
  });
  var onUserPresence = function (event) {
    //被监听的用户有上线或者下线行为，就会触发本方法
    //单聊用户上下线event示例
    // {
    //     "time": 1592807533798,
    //     "action": "online",
    //     "id": "user002",
    //     "data": {"avatar":"/images/Avatar-2.png","name":"Wallace"}
    // }
    console.log(event, 'event');
    pendingConversations.value.forEach(item => {
      if (item.id == event.id) {
        event.action == 'online' ? item.online = true : item.online = false

      }

    })

  };
  //接受用户上下线状态变化
  store.state.goEasy.im.on(GoEasy.IM_EVENT.USER_PRESENCE, onUserPresence);
  store.state.goEasy.im.subscribeUserPresence({
    userIds: arr,
    onSuccess: function () {
      console.log("Subscribe user presence successfully.");
    },
    onFailed: function (error) { //连接失败
      console.log("Failed to subscribe user presence, code:" + error.code + " content:" + error.content);
    }
  });
}
const markMessageAsRead = () => {


  console.log(specialistID.value.id, 'specialistID.value.id');

  csteam.value.markMessageAsRead({
    id: specialistID.value.id,
    type: GoEasy.IM_SCENE.CS, //群聊：GoEasy.IM_SCENE.GROUP, 客服消息：GoEasy.IM_SCENE.CS,
    onSuccess: function () {
      console.log('标记私聊已读成功');
      // loadConversations()
    },
    onFailed: function (error) {
      console.log('标记私聊已读失败', error);
    },
  });
}
const loadConversations = () => {
  store.state.goEasy.im.pendingConversations({
    onSuccess: (result) => {
      console.log('获取待接入列表:', result);
    },
    onFailed: (error) => {
      console.log('获取待接入列表失败, code:' + error.code + 'content:' + error.content);
    },
  });
  store.state.goEasy.im.latestConversations({
    onSuccess: (result) => {
      // this.renderLatestConversations(result.content);

      hereNow(result.content.conversations)

      // chatList.value = result.content.conversations

    },
    onFailed: (error) => {
      console.log('获取已接入列表失败, code:' + error.code + 'content:' + error.content);
    },
  });
}
const getPersonListFun = () => {
  getPersonList(1, 10, '').then(res => {
    personList.value = res.data.data
  })
}

const statusFun = (type: boolean, status: Number) => {
  // tian. == type
  console.log(tian.value, status);

  if (status == 1) {
    if (jia.value) {
      tian.value = true
      jia.value = false
    }
  }
  if (status == 2) {
    if (tian.value) {
      jia.value = true
      tian.value = false
    }
  }

}

const sendMsg = () => {
  if (textarea.value.trim() != '') {

    messageList.value.push({ message: textarea.value, talkType: 'back', status: 'text' });
    // messageList.value.push(textarea.value);
    let a = csteam.value.createTextMessage({
      text: textarea.value,
      to: {
        type: GoEasy.IM_SCENE.CS, //消息场景：客服
        id: specialistID.value.id, //客户id
        data: { nickname: specialistID.value.data.nickname, avatar: 'xx321321x.png' },//客户数据，用于显示在客服的会话列表
      },
      onSuccess: (message) => {
        console.log("消息创建成功:", message);
        store.state.goEasy.im.sendMessage({
          message,
          onSuccess: (message) => {
            console.log('发送成功', message);
          },
          onFailed: function (error) {
            console.log(error);

          }
        })
      },
      onFailed: (err) => {
        console.log("创建消息失败:", err);
      }
    });
    scrollToBottom()
  }


  textarea.value = ''

}
const formateTime = (time) => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const now = new Date().getTime();
  const diffValue = now - time;

  // 计算差异时间的量级
  const secondC = diffValue / second;
  const minC = diffValue / minute;
  const hourC = diffValue / hour;
  const dayC = diffValue / day;

  if (dayC >= 1) {
    return parseInt(dayC) + "天";
  } else if (hourC >= 1) {
    return parseInt(hourC) + "小时";
  } else if (minC >= 1) {
    return parseInt(minC) + "分钟";
  } else if (secondC >= 1) {
    return parseInt(secondC) + "秒";
  } else {
    return '0秒';
  }
}
const specialist = (item, type) => {
  specialistID.value = item

  specialistType.value = type
  time.value = formateTime(item.lastMessage.timestamp)
  endTalkStatus.value = item.lastMessage.type
  console.log(item, 'item');

  csteam.value.history({
    id: item.id, //客户id
    type: GoEasy.IM_SCENE.CS,
    lastTimestamp: '', //上次查询的最后一条消息，空表示查询最后几天消息历史
    limit: 20,
    onSuccess: (result) => {
      console.log('查询历史消息成功:', result.content);
      let arr = []
      result.content.forEach((item => {
        let talk = item.payload != undefined ? item.payload.text : ''
        if (item.type != 'text') return
        arr.push({
          message: talk, talkType: item.senderData.type, status: 'text', timestamp: item.timestamp
        })

      }))
      messageList.value = arr
      scrollToBottom()
      markMessageAsRead()
    },
    onFailed: (error) => {
      console.log('获取历史消息失败, code:' + error.code + ',错误信息:' + error.content);
    },
  });
  listenCustomer()

}
const Iwant = () => {
  // specialistID
  // console.log();

  specialistType.value = '已接入'
  csteam.value.accept({
    customer: {
      id: specialistID.value.id,//用户id
      data: {
        nickname: specialistID.value.lastMessage.senderData
          .nickname, avatar: 'xxx.png'
      },//客户数据，用于显示在客服的会话列表
    },
    onSuccess: () => {
      console.log('accept successfully.');
    },
    onFailed: (error) => {
      console.log('accept failed', error);
    }
  });


}
const endTalk = () => {
  csteam.value.end({
    id: specialistID.value.id, //用户id
    onSuccess: () => {
      console.log('end successfully.');
      // endTalkStatus.value = true
    },
    onFailed: (error) => {
      console.log('end failed', error);
    }
  })
}

</script>

<style lang="less" scoped>
#online {
  margin-bottom: 25px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  .title {
    width: 100%;
    height: 40px;
    background: #0165D0;

    p {
      line-height: 40px;
      color: #fff;
      margin-left: 20px;
    }
  }

  .home-conter {
    position: relative;
    background: #fff;

    .zixun {

      width: 50%;
      margin: 50px auto 0;

      p {
        line-height: 100px;
      }

      .el-button--primary {
        width: 100%;
      }
    }

    .info {
      width: 100%;
      height: 30px;
      background: #eeeeee;

      p {
        line-height: 30px;
        color: #000;
        margin-left: 20px;
      }
    }

    .middle {
      // background: #bfa;
      height: 450px;
      padding: 10px 20px;
      overflow-y: auto;

      h5 {
        text-align: center;
      }

      .message-item {
        display: flex;



        .message-item-content {
          flex: 1;
          margin: 5px;
          overflow: hidden;
          display: flex;

          .sender-info {
            margin: 6px 5px;

            img {
              width: 30px;
              height: 30px;
            }
          }

          .message-payload {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;

            .content-text {
              display: flex;
              align-items: center;
              text-align: left;
              background: #eee;
              font-size: 14px;
              font-weight: 500;
              padding: 6px 8px;
              margin: 3px 0;
              line-height: 25px;
              white-space: pre-line;
              overflow-wrap: anywhere;
              border-radius: 8px;
              word-break: break-all;
              flex-wrap: wrap;
            }
          }

        }

        .self {
          overflow: hidden;
          display: flex;
          justify-content: flex-start;
          flex-direction: row-reverse;
        }

      }



    }

    .btn {
      position: absolute;
      right: 10px;
      bottom: 10px;
    }

    .push {
      border-top: 1px solid #ededed;
      // background: cadetblue;
      height: 120px;
      text-align: center;

      /deep/.el-textarea__inner,

      // h3 {
      //   line-height: 120px;
      //   text-align: center;
      // }

      .el-textarea {
        border: none;
        box-shadow: none;
        resize: none;
        border-radius: 0;
      }

    }

    ::-webkit-scrollbar {
      display: none;
    }
  }


  .home-menu {
    width: 100%;
    background-color: #F7F7F7;
    border-right: 1px solid #eeeeee;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 600px;
    padding-top: 1px;


    img {
      margin-top: 30px;
      width: 35px;
      height: 35px;
    }
  }

  .home-list {
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: white;
    border-right: #dbd6d6 1px solid;
    padding: 20px 0;
    box-sizing: border-box;

    /deep/.el-badge {
      width: 100%;
    }

    li {
      padding: 10px 20px;

      cursor: pointer;

      img {
        width: 40px;
        height: 40px;
      }

      span {
        font-size: 13px;
        color: #b3b3b3;
      }
    }

    .liInfo {
      background: #eeeeee;
    }

    .box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-align: right;

      // padding: 0 20px;
      p {
        white-space: nowrap;
        /* 确保文本不换行 */
        overflow: hidden;
        /* 将超出部分隐藏 */
        text-overflow: ellipsis;
        /* 以省略号形式显示被隐藏的部分 */
      }
    }
  }
}
</style>