<template>
  <div id="vedio">
    <el-row>
      <el-col :span="18">
        <div id="play" v-if="!vedioOff">

        </div>
        <div id="off" v-else>
          <h2>直播间已关闭</h2>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="box">

          <div class="middle">
            <h5>直播间人数：{{ liveBroadcastRoom }}</h5>
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
              <h5 v-if="item.status == 'join'">
                {{ item.message }}
              </h5>
              <div class="message-item " v-else>
                <div class="message-item-content">
                  <!-- <div class="sender-info">
                    <img src="../../assets/n.png" alt="" v-if="item.talkType == 'back'">
                    <img src="../../assets/q.png" alt="" v-else>
                  </div> -->
                  <div class="message-content">
                    <div class="message-payload">
                      <div class="content-text" v-if="item.status == 'text'"> <span>{{ item.nickname }}:</span> {{
                        item.message }}</div>
                      <!-- <div class="content-text" v-else>{{ item.status == 'CS_END' ? '会话已结束' : '会话已接入' }}</div> -->

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
            <!-- <el-row>
              <el-col>

              </el-col>
            </el-row> -->
            <el-input v-model="textarea" :rows="4" type="textarea" @keyup.enter="sendMsg"></el-input>
            <el-button type="primary" style="height:100%" @click="sendMsg"> 发送</el-button>
          </div>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script lang="ts" setup>
import EZUIKit from "ezuikit-js";
import { onMounted, ref, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import { getVideoAppkey } from '@/api/index.js'
const store = useStore();
let player

const textarea = ref('')
const vedioOff = ref(false)
const liveBroadcastRoom = ref(1)
const messageList = ref([])
const roomID = ref()

const props = defineProps({
  message: String
})
onMounted(() => {
  let item = JSON.parse(props.message)
  roomID.value = item.roomId
  getVideoAppkey().then((res) => {
    var items = document.getElementById("play");
    // // console.log(res.data.accessToken, "9jhhguj");
    // accessToken.value = res.data.data;
    //动态删除多出的子元素;
    while (items.firstChild) {
      // console.log("执行");

      items.removeChild(items.firstChild);
    }

    console.log(props.message, JSON.parse(props.message));

    const deviceSerial = item.productNumber.split("_")[0];
    // imei.value = item.productNumber.split("_")[0];
    const deviceSerial2 = item.productNumber.split("_")[1];



    let nums = 1
    var ezuikitTalkData = {
      // 应用accessToken
      ezopen:
        "ezopen://" +
        deviceSerial2 +
        "@open.ys7.com/" +
        deviceSerial +
        "/" +
        nums +
        ".hd.live", // 包含设备信息的ezopen协议
      decoderPath: "./", // 当前页面与插件主文件ezuiit-talk相对路径
    };

    console.log(ezuikitTalkData.ezopen, 'ezopen');
    new EZUIKit.EZUIKitPlayer({
      autoplay: true,
      id: "play",
      accessToken: res.data.data,
      // url: ezuikitTalkData.ezopen, // 这里的url可以是直播地址.live  ，也可以是回放地址.rec 或 .cloud.rec
      url: ezuikitTalkData.ezopen, // 这里的url可以是直播地址.live  ，也可以是回放地址.rec 或 .cloud.rec
      template: "standard", // simple - 极简版;standard-标准版;security - 安防版(预览回放);voice-语音版；
      // 视频上方头部控件
      header: ["capturePicture", "save"], // 如果templete参数不为simple,该字段将被覆盖
      // plugin: ["talk"], // 加载插件，talk-对讲
      // 视频下方底部控件
      // footer: ["talk", "broadcast", "hd", "fullScreen"], // 如果template参数不为simple,该字段将被覆盖
      audio: 1, // 是否默认开启声音 0 - 关闭 1 - 开启
      openSoundCallBack: (data) => console.log("开启声音回调", data),
      closeSoundCallBack: (data) => console.log("关闭声音回调", data),
      startSaveCallBack: (data) => console.log("开始录像回调", data),
      stopSaveCallBack: (data) => console.log("录像回调", data),
      capturePictureCallBack: (data) => console.log("截图成功回调", data),

      getOSDTimeCallBack: (data) => console.log("获取OSDTime回调", data),
      fullScreenCallBack: (data) => console.log("全屏回调", data),
      // // width: 100, //如果指定了width、height则以这里为准
      // height: 600, //如果没指定宽高，则以容器video-container为准
    });
  });


  store.state.goEasy.pubsub.subscribe({

    channel: item.roomId, //替换为您自己的channel

    onMessage: function (message) {

      console.log(message, '接收消息的地方');
      console.log(JSON.parse(message.content), '接收消息的地方');
      let info = JSON.parse(message.content)
      if (info.type != 'off') {
        messageList.value.push({ message: info.message, talkType: 'front', status: 'text', nickname: info.nickname })
      } else {
        vedioOff.value = true
        store.commit('setVedio', message.roomId)
      }


    },
    onSuccess: function (message) {
      console.log("Channel订阅成功。");
      messageList.value.push({ message: `${sessionStorage.getItem('userName')}加入房间`, talkType: 'front', status: 'join', nickname: sessionStorage.getItem('userName'), })
      // this.dialogVisible = true;
    },
    onFailed: function (error) {
      console.log(
        "Channel订阅失败, 错误编码：" +
        error.code +
        " 错误信息：" +
        error.content
      );
    },
  });

  loadOnlineUsers();
  // store.state.goEasy.im.on(GoEasy.IM_EVENT.GROUP_MESSAGE_RECEIVED, onGroupMessageReceived);
  listenUsersOnlineOffline()
})
// const onGroupMessageReceived = (message) => {
//   console.log(message, '群消息接受');
//   messageList.value.push({
//     message: message.payload.text, talkType: 'back', status: 'text', nickname: message.senderData
//       .nickname
//   })
//   store.state.goEasy.im.markMessageAsRead({
//     id: 'group001',
//     type: GoEasy.IM_SCENE.GROUP, //群聊：GoEasy.IM_SCENE.GROUP, 客服消息：GoEasy.IM_SCENE.CS,
//     onSuccess: function () {
//       console.log('标记私聊已读成功');
//     },
//     onFailed: function (error) {
//       console.log('标记私聊已读失败', error);
//     },
//   });

// }

onBeforeUnmount(() => {
  store.state.goEasy.pubsub.unsubscribe({
    channel: roomID.value,
    onSuccess: function () {
      // alert("订阅取消成功。");
    },
    onFailed: function (error) {
      // alert("取消订阅失败，错误编码：" + error.code + " 错误信息：" + error.content)
    }
  });
})
const sendMsg = () => {
  if (textarea.value.trim() != '') {

    store.state.goEasy.pubsub.publish({
      channel: roomID.value,//替换为您自己的channel
      message: JSON.stringify({ type: 'front', "nickname": sessionStorage.getItem('userName'), message: textarea.value }),//替换为您想要发送的消息内容
      onSuccess: function () {
        console.log("消息发布成功。");
      },
      onFailed: function (error) {
        console.log("消息发送失败，错误编码：" + error.code + " 错误信息：" + error.content);
      }
    });

    textarea.value = ''

  }

}
// 监听用户上下线
function listenUsersOnlineOffline() {
  console.log('进来监听了');

  // let roomId = currentRoom.value.roomId;
  store.state.goEasy.pubsub.subscribePresence({
    channel: roomID.value,
    onPresence: (presenceEvents) => {
      console.log(presenceEvents, 'presenceEvents监听用户上下线');
      presenceEvents.events.forEach(function (event) {
        let userData = event.data;
        let userId = event.id;
        let avatar = userData.avatar;
        let nickname = userData.nickname;
        liveBroadcastRoom.value = presenceEvents.userAmount
        if (event.action === "join" || event.action === "online") {
          //进入房间

          messageList.value.push({ message: `${nickname}加入房间`, talkType: 'front', status: 'join', nickname, })
        } else {
          messageList.value.push({ message: `${nickname}离开房间`, talkType: 'front', status: 'join', nickname, })
        }

      })

    },
    onSuccess: function () {
      console.log("用户上下线监听成功")
    },
    onFailed: function (error) {
      if (error.code === 401) {
        console.log("监听用户上下线失败,默认不开通，付费应用，可以在我的应用->查看详情，高级功能里自助开通");
      } else {
        console.log("监听用户上下线失败, code:" + error.code + ",content:" + error.content);
      }
    }
  })
}

// 加载在线用户列表
function loadOnlineUsers() {
  // let roomId = currentRoom.value.roomId;
  store.state.goEasy.pubsub.hereNow({
    channels: [roomID.value],
    includeUsers: true,
    distinct: true,
    onSuccess: function (result) {
      console.log(result, '用户在线列表');
      liveBroadcastRoom.value = result.content.channels[roomID.value].userAmount

      // let users = [];
      // let currentRoomOnlineUsers = result.content.channels[roomId];
      // currentRoomOnlineUsers.users.forEach(function (onlineUser) {
      //   let userData = onlineUser.data;
      //   let user = {
      //     id: onlineUser.id,
      //     nickname: userData.nickname,
      //     avatar: userData.avatar
      //   };
      //   users.push(user);
      // });
      // currentRoom.value.onlineUsers = {
      //   users: users,
      //   count: currentRoomOnlineUsers.clientAmount
      // };
    },
    onFailed: function (error) {
      //获取失败
      if (error.code === 401) {
        console.log("获取在线用户失败,默认不开通，付费应用，可以在我的应用->查看详情，高级功能里自助开通");
      } else {
        console.log("获取在线用户失败, code:" + error.code + ",错误信息:" + error.content);
      }
    }
  })
}
</script>

<style lang="less" scoped>
#vedio {
  margin-bottom: 10px;
  height: 550px;

  // background: black;
  #play {
    width: 100%;
    height: 550px;
    background: black;
  }

  #off {
    width: 100%;
    height: 550px;
    background: black;
    color: #fff;
    text-align: center;
    line-height: 550px;
  }

  .box {
    height: 550px;
    background: #f6f8f9;

    .middle {
      // background: #bfa;
      height: 450px;
      padding: 10px 20px;
      overflow-y: auto;
      box-sizing: border-box;

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

              span {
                color: blue;
              }
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

    .push {
      display: flex;
      border: 1px solid #d4d3d3;
      height: 100px;
      background: #fff;
      /deep/.el-textarea__inner,


      .el-textarea {
        border: none;
        box-shadow: none;
        resize: none;
        border-radius: 0;
      }
    }
  }
}
</style>