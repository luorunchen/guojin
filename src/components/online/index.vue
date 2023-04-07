<template>
  <div id="online">
    <div class="title">
      <p>在线咨询</p>
    </div>

    <el-row>
      <el-col :span="1">
        <div class="home-menu">
          <div v-if="tian" @click="statusFun(false, 1)">
            <img src="../../assets/d.png" alt="">
          </div>
          <div v-else @click="statusFun(true, 1)">
            <img src="../../assets/h.png" alt="">
          </div>
          <div v-if="jia" @click="statusFun(false, 2)">
            <img src="../../assets/j.png" alt="">
          </div>
          <div v-else @click="statusFun(true, 2)">
            <img src="../../assets/z.png" alt="">

          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="home-list">
          <ul v-if="tian">

            <li v-for="item, index in chatList" :key="index" :class="specialistID.id == item.id ? 'liInfo' : ''"
              @click="specialist(item)">
              <el-badge :value="item.unread == 0 ? '' : item.unread">
                <el-row :gutter="10">
                  <el-col :span="4">
                    <!-- {{ item.online }} -->
                    <el-badge is-dot class="item" :type="item.online ? 'success' : 'danger'">
                      <div class="sender-info">
                        <img src="../../assets/n.png" alt="">
                      </div>
                    </el-badge>

                  </el-col>
                  <el-col :span="19">
                    <div class="box">
                      <p>{{ item.name }}</p>
                      <span>{{ item.date }}</span>
                    </div>
                    <span>{{ item.text }}</span>
                  </el-col>
                </el-row>
              </el-badge>



            </li>
          </ul>
          <ul v-else>

            <li v-for="item, index in personList" :key="index" @click="specialist(item)"
              :class="specialistID.id == item.id ? 'liInfo' : ''">

              <el-row :gutter="10">
                <el-col :span="4">
                  <el-badge is-dot class="item" :type="item.online ? 'success' : 'danger'">
                    <div class="sender-info">
                      <img src="../../assets/n.png" alt="">
                    </div>
                  </el-badge>
                </el-col>
                <el-col :span="19">
                  <div class="box">
                    <p>{{ item.name }}</p>
                    <!-- <span>13:03</span> -->
                  </div>
                  <span>电话:{{ item.phone }}</span>
                </el-col>
              </el-row>


            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="home-conter" v-if="tian && specialistID != ''">
          <div class="info">
            <p>{{ specialistID.name }}</p>
          </div>
          <div class="middle" ref="chatBox">
            <template v-for="item, index in messageList" :key="index">
              <!-- <div class="message-item ">
                <div class="message-item-content">
                  <div class="sender-info">
                    <img src="../../assets/n.png" alt="">
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
                <div :class="item.talkType == 'back' ? 'message-item-content' : 'message-item-content self'">
                  <div class="sender-info">
                    <img src="../../assets/n.png" alt="" v-if="item.talkType == 'back'">
                    <img src="../../assets/q.png" alt="" v-else>
                  </div>
                  <div class="message-content">
                    <div class="message-payload">
                      <div class="content-text" v-if="item.status == 'text'">{{ item.message }}</div>
                      <div class="content-text" v-else>{{ item.status == 'CS_END' ? '会话已结束' : '会话已接入' }}</div>

                    </div>
                  </div>
                </div>
              </div>
              <!-- <p v-if="messageType == 'CS_TRANSFER'">已接入会话</p>
              <p v-if="messageType == 'CS_END'">已结束会话</p>
              <p v-if="messageType == 'CS_ACCEPT'">已接入会话</p> -->
            </template>

          </div>
          <div class="push">
            <el-input v-model="textarea" :rows="3" type="textarea" @keyup.enter="sendMsg" />
          </div>
          <div class="btn">
            <el-button type="primary" @click="sendMsg">发送</el-button>
          </div>
        </div>
        <div class="home-conter" v-else>
          <div class="zixun" v-if="specialistID != ''">
            <el-row>
              <el-col :span="12">
                <img src="../../assets/n.png" alt="">
              </el-col>
              <el-col :span="12">
                <p>{{ specialistID.name }}</p>
                <p>电话:{{ specialistID.phone }}</p>
              </el-col>
            </el-row>
            <el-button type="primary" @click="Iwant">我要咨询</el-button>
          </div>

        </div>

      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, } from 'vue'
import { useStore } from "vuex";
import { getPersonList } from '@/api/index.js'
import moment from 'moment'
const store = useStore();
const tian = ref(true)
const jia = ref(false)
const specialistID: any = ref('')
const textarea = ref('')
const messageType = ref('')
const messageList = ref([])
const chatList: any = ref([])
const personList = ref([])
const chatBox = ref<HTMLElement>();
onMounted(() => {
  // connect()
  // getPersonListFun()

  store.state.goEasy.im.on(GoEasy.IM_EVENT.CS_MESSAGE_RECEIVED, onCsMessageReceived)
  store.state.goEasy.im.on(GoEasy.IM_EVENT.CONVERSATIONS_UPDATED, onConversationsUpdated);
  // console.log('中西部');

  store.state.goEasy.im.latestConversations({
    onSuccess: function (result) {
      // chatList.value = result.content.conversations
      hereNow(result.content.conversations, 'chatList')




    }
  })
})
const hereNow = (list, container) => {
  console.log(list, container, 'list, container');
  let arr = []

  list.forEach(item => {

    if (container == 'chatList') {
      item.name = item.data.name
      // item.online = false
      item.lastMessage.type == 'text' ? item.text = item.lastMessage.payload.text : item.text = '会话已结束'
      item.date =
        moment(item.lastMessage.timestamp
        ).format('HH:mm')
    }

    arr.push(item.id)

    // store.state.goEasy.im.removeConversation({
    //   conversation: item,
    //   onSuccess: function () {
    //     console.log('删除会话成功');
    //   },
    //   onFailed: function (error) {
    //     console.log(error);
    //   },
    // });
  })


  store.state.goEasy.im.hereNow({
    userIds: arr, //每次查询最多不超过50个
    onSuccess: function (res) {


      console.log(list);
      res.content.forEach(item1 => {
        list.forEach(item2 => {
          if (item1.id == item2.id) {
            item2.online = true
          }
          // item1.id
        })
      })
      // console.log(list.content.conversations, 'chatList.value ');


      container == 'chatList' ? chatList.value = list : personList.value = list
      // console.log(chatList.value, 'container');

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

    if (tian) {
      chatList.value.forEach(item => {
        if (item.id == event.id) {
          event.action == 'online' ? item.online = true : item.online = false
          // if (event.action == 'online') {
          //   item.online = true
          // }
        }

      })
    } else {
      personList.value.forEach(item => {
        if (item.id == event.id) {
          event.action == 'online' ? item.online = true : item.online = false
          // if (event.action == 'online') {
          //   item.online = true
          // }
        }

      })
    }
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
const onConversationsUpdated = (conversations) => {
  console.log(conversations, 'conversations3213121,列表监听');
  // let arr = []
  // conversations.conversations.forEach(item => {
  //   item.name = item.data.name
  //   item.lastMessage.type == 'text' ? item.text = item.lastMessage.payload.text : item.text = '会话已结束'
  //   arr.push(item.id)
  //   item.date =
  //     moment(item.lastMessage.timestamp
  //     ).format('HH:mm')

  // })

  hereNow(conversations.conversations, 'chatList')
  // store.state.goEasy.im.hereNow({
  //   userIds: arr, //每次查询最多不超过50个
  //   onSuccess: function (res) {


  //     // console.log(result);
  //     res.content.forEach(item1 => {
  //       conversations.conversations.forEach(item2 => {
  //         if (item1.id == item2.id) {
  //           item2.online = true
  //         }
  //         // item1.id
  //       })
  //     })
  //     // console.log(conversations.content.conversations, 'chatList.value ');
  //     chatList.value = conversations.conversations
  //   },
  //   onFailed: function (error) { //连接失败
  //     console.log("Failed to mark as read, code:" + error.code + " content:" + error.content);
  //   }
  // });
  // chatList.value = conversations.conversations
}
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


const getPersonListFun = () => {

  getPersonList(1, 10, '').then(res => {
    hereNow(res.data.data, 'personList')
    // let arr = []
    // res.data.data.forEach(item2 => {
    //   // item2.online = false
    //   arr.push(item2.id)
    //   // item1.id
    // })

    // store.state.goEasy.im.hereNow({
    //   userIds: arr, //每次查询最多不超过50个
    //   onSuccess: function (result) {


    //     // console.log(result);
    //     result.content.forEach(item1 => {
    //       res.data.data.forEach(item2 => {
    //         // item2.online = false
    //         if (item1.id == item2.id) {
    //           item2.online = true
    //         }
    //         // item1.id
    //       })
    //     })
    // personList.value = res.data.data
    //     console.log(personList.value, 'ss');

    //   },
    //   onFailed: function (error) { //连接失败
    //     console.log("Failed to mark as read, code:" + error.code + " content:" + error.content);
    //   }
    // });

  })

}
const onCsMessageReceived = (message) => {
  console.log('接收客服消息：', message);
  messageType.value = message.type
  // console.log(message.payload);

  let talk = message.payload != undefined ? message.payload.text : ''
  // if (message.payload != null || message.payload.text != '') {
  messageList.value.push({
    message: talk, talkType: 'back', status: message.type, timestamp
      : message.timestamp
  })
  if (specialistID.value != '') {
    markMessageAsRead()
    scrollToBottom()
  }

  // }
}
// const onConversationsUpdated = 
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
    getPersonListFun()
  }

}

const sendMsg = () => {
  // console.log('22222222');
  if (textarea.value.trim() != '') {
    messageList.value.push({ message: textarea.value, talkType: 'front', status: 'text' });

    let a = store.state.goEasy.im.createTextMessage({
      text: textarea.value,
      to: { //接收方
        type: GoEasy.IM_SCENE.CS,// 消息场景：客服消息
        id: specialistID.value.id, //要咨询的客服团队或者商家id，比如店铺Id之类的
        data: { //要咨询的客服团队或者商家信息，用于更新会话列表
          name: specialistID.value.name,
          avatar: 'https://xxx2222.png'
        }
      },
      onSuccess: (message) => {
        console.log("文字消息创建成功。222222", message)

      },
      onFailed: (e) => {
        console.log('error :', e);
      }
    })
    store.state.goEasy.im.sendMessage({
      message: a,
      onSuccess: (message) => {
        console.log('发送成功', message);
        messageType.value = ''
      },
      onFailed: function (error) {
        console.log(error);

      }
    })
    scrollToBottom()

  }

  textarea.value = ''
  // scrollToBottom()
}
const specialist = (item) => {
  // console.log(item, 'item11');

  specialistID.value = item
  store.state.goEasy.im.history({
    type: GoEasy.IM_SCENE.CS, //查询客服消息
    id: item.id, //客服团队或者商家id
    lastTimestamp: '',//空表示查询最新的，也可以传入上次查询的最后一条消息id，接着查询
    limit: 10,//每次查询十条
    onSuccess: (result) => {
      // console.log('历史消息', result);
      let arr = []
      result.content.forEach((item => {
        let talk = item.payload != undefined ? item.payload.text : ''
        if (item.type != 'text') return
        arr.push({
          message: talk, talkType: item.senderData.type, status: 'text', timestamp
            : item.timestamp
        })

      }))
      messageList.value = arr
    },
    onFailed: (error) => {
      console.log('获取历史消息失败:', error);
    }
  });
  markMessageAsRead()

}
const markMessageAsRead = () => {
  store.state.goEasy.im.markMessageAsRead({
    id: specialistID.value.id,
    type: GoEasy.IM_SCENE.CS, //群聊：GoEasy.IM_SCENE.GROUP, 客服消息：GoEasy.IM_SCENE.CS,
    onSuccess: function () {
      console.log('标记私聊已读成功');
    },
    onFailed: function (error) {
      console.log('标记私聊已读失败', error);
    },
  });
}
const Iwant = () => {
  // specialistID
  // console.log();

  // specialistID.value.lastMessage.timestamp = moment().format('HH:mm')
  console.log(specialistID.value);

  if (chatList.value.length == 0) {
    chatList.value.push(specialistID.value)
  } else {

    if (!chatList.value.some(item => item.id == specialistID.value.id)) {
      chatList.value.push(specialistID.value);
    }
  }




  console.log(chatList.value);
  jia.value = false
  tian.value = true


}
// const connect = () => {


// }

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
      height: 300px;
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

      /deep/.el-textarea__inner,


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
    height: 450px;
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

    }
  }
}
</style>