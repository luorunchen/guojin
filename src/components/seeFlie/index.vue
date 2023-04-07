<template>
  <div id="overlay">
    <!-- <el-button @click="dialogVisible = true">查看文件</el-button> -->
    <!-- src="http://192.168.30.119:8080/download/3.pdf#toolbar=0" -->

    <el-drawer v-model="dialogVisible" direction="rtl" :title="info.title" size="100%" :append-to-body="true"
      :show-close="false" custom-class="drawer" destroy-on-close>
      <template #header="{ close, titleId, titleClass }">
        <!-- <div class="infoBox"> -->
        <h4 :id="titleId" :class="titleClass">{{ info.title }}</h4>
        <div class="btn">
          <!-- <el-button type="primary" @click="shapes" v-if="states != 'law' && states != 'baike'">
            <el-icon class="el-icon--left"><Select /></el-icon>
            电子签名
          </el-button> -->
          <el-button type="primary" @click="preservation" v-if="states != 'law' && states != 'baike'">
            <el-icon class="el-icon--left"><Select /></el-icon>
            保存
          </el-button>
          <el-button type="danger" @click="close">
            <el-icon class="el-icon--left">
              <CircleCloseFilled />
            </el-icon>
            退出
          </el-button>
        </div>

        <!-- </div> -->

      </template>
      <!-- <p>上传人员:{{ info.perpeo }}</p>
      <p>上传时间:{{ info.time }}</p> -->
      <!-- <el-divider /> -->
      <iframe v-if="states == 'law' || states == 'baike'" :src="pSrc" frameborder="0" class="pdf" style="width: 100%" />
      <div class="customMount" v-else></div>
    </el-drawer>

    <!-- <el-dialog v-model="dialogVisible" title="Tips" width="80%" top="10px">
      <iframe
        :src="pSrc"
        frameborder="0"
        class="pdf"
        style="width: 100%"
      ></iframe>
    </el-dialog> -->
  </div>
</template>

<script lang="ts" setup>
import { getViewUrlDbPath, Bookmarks, returnBookmarksContent, getPercent } from "@/api/index.js";
import { ref, onMounted, nextTick, defineExpose, reactive } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { useBase64 } from "@vueuse/core";
import { CircleCloseFilled, Select } from "@element-plus/icons-vue";
const dialogVisible = ref(false);
const info = reactive({
  title: "",
  perpeo: "",
  time: "",
  id: ""
});
// const key = ref(1)
const states = ref();
const jssdk = ref();
const pSrc: any = ref();
const bookmarksflag = ref([])
const responsibleList = ref([])
onMounted(() => {
  // loadPDF()
});


const shapes = async () => {
  const app = jssdk.value.Application;
  // 图形对象
  const shapes = await app.ActiveDocument.Shapes;
  console.log(shapes, 'shapes');
  responsibleList.value.forEach(async item => {
    await shapes.AddPicture({
      FileName: 'https://img2.baidu.com/it/u=217644621,621859478&fm=253&fmt=auto&app=138&f=JPEG?w=616&h=396', // 图片地址
      LinkToFile: true,
      SaveWithDocument: true,

      Range: {
        start: item.begin,
        end: item.end,
      },
    });
  });


}

const preservation = async () => {
  const result = await jssdk.value.save();
  await jssdk.value.ready();

  const app = jssdk.value.Application;
  const bookmarks = await app.ActiveDocument.Bookmarks;
  // console.log(bookmarksflag.value, "result");
  let num = {
    trues: 0,
    falses: 0,
  }


  bookmarksflag.value.forEach(async item => {

    const bookmarkText = await bookmarks.GetBookmarkText(item);



    bookmarkText.trim() != '' ? ++num.trues : num.falses++
    console.log(num.trues, bookmarksflag.value.length);
  })

  console.log(num.trues, '456789123');

  // console.l


  setTimeout(() => {
    let fenshu = num.trues / bookmarksflag.value.length != 0 ? (num.trues / bookmarksflag.value.length).toFixed(1) : num.trues / bookmarksflag.value.length

    getPercent(info.id, bookmarksflag.value.length == 0 ? 1 : isNaN(num.trues / bookmarksflag.value.length) ? 0 : fenshu).then(res => {
      // console.log(res);

    })
  }, 1000);






  let text = "";

  switch (result.result) {
    case "nochange":
      text = "文档无更新，无需保存";
      break;
    case "SavedEmptyFile":
      text = "暂不支持保存空文件 触发场景：内核保存完后文件为空";
      break;
    case "SpaceFull":
      text = "空间已满";
      break;
    case "QueneFull":
      text = "保存中请勿频繁操作 触发场景：服务端处理保存队列已满，正在排队";
      break;
    case "fail":
      text = "保存失败";
      break;
    case "ok":
      text = "保存成功";
      break;
  }

  ElMessage({
    showClose: true,
    type: "warning",
    message: text,
  });
};
const refreshToken = () => {
  // 自身业务处理...

  // 可以返回 Promise 或者 return { token, timeout }
  return Promise.resolve({
    token: '0', // 必需：你需要设置的 token
    timeout: 1 * 6 * 1000, //  必需：token 超时时间，单位为毫秒，示例为 10 分钟
  });
};
const show = async (row: any, state) => {
  // let u = url.split('156.5')

  info.id = row.id
  info.title = row.title;
  info.perpeo = row.create_name;
  info.time = row.create_date;
  states.value = state;
  // pSrc.value = `../../pdf/web/viewer.html?file=/api/${u[1]}`
  // pSrc.value = `https://view.xdocin.com/view?src=${row.url}&copyable=false&printable=false&saveable=false`
  // pSrc.value = `http://vw.usdoc.cn/?m=5&src=${row.url}`;
  // pSrc.value = row.url
  // office web查看器
  // var encodedData = window.btoa();

  dialogVisible.value = true;
  console.log(state, "state");

  if (state == "law" || state == undefined) {
    let a = encodeURIComponent(row.url);
    let i = window.btoa(a);
    // pSrc.value = "http://119.91.156.5:8012/onlinePreview?url=" + i;
    // pSrc.value = "https://view.xdocin.com/view?src=" + row.url;
    pSrc.value = `https://view.xdocin.com/view?src=${a}&copyable=false&printable=false&saveable=false`;
    console.log(pSrc.value, "11");
  } else if (state == 'baike') {
    console.log(row, 'ss');

    pSrc.value = `https://baike.baidu.com/item/${row}`
  } else {


    getViewUrlDbPath(
      state == "law"
        ? "d" + row.id
        : state == "account"
          ? "e" + row.id
          : row.id,
      sessionStorage.getItem("userId")
    ).then((res) => {
      if (res.data.data.wpsUrl == undefined || res.data.data.wpsUrl == null) {
        return show(res.data.data, "see");
      }
      nextTick(() => {
        jssdk.value = WebOfficeSDK.config({
          url: res.data.data.wpsUrl, // 该地址需要对接方服务端提供，形如 https://wwo.wps.cn/office/p/xxx
          // url: "https://wwo.wps.cn/office/w/711aa56d7dac49fba00c80fb9da412bd?_w_userid=-1&_w_filetype=web&_w_filepath=https://www.gjsafe.com.cn/download/test/test.docx&_w_tokentype=1&_w_appid=c6f5453b3b2e41d498cef259edffac54&_w_redirectkey=123456&_w_signature=DsjcA28gCGXMsC2GudRMvelVTG0%3D", // 该地址需要对接方服务端提供，形如 https://wwo.wps.cn/office/p/xxx
          mount: document.querySelector(".customMount"),
          mode: state != "law" ? "nomal" : "simple",
          refreshToken
          // 更多配置参数...
        });
        console.log(res.data.data.wpsUrl, "state");
        // wpsUrl.value = res.data.data.wpsUrl;

        // console.log(jssdk.iframem, "2");
        jssdk.value.setToken({
          token: '0',
          timeout: 10 * 60 * 1000,
        });

        example(row)

      });
    });
  }

  // console.log(i);

  // // let docUrl = 'https://view.xdocin.com/demo/view.docx'
  // // let url = encodeURIComponent('http://119.91.156.5/download/b390071e-f679-4e00-a8a1-75ade57e79fe生产安全事故应急条例.docx')
  // // pSrc.value = 'http://view.officeapps.live.com/op/view.aspx?src=' + url

  // console.log(url, 99);

  // office web查看器
  // console.log("引入后可以开始使用 JSSDK 了~");
  // console.log(WebOfficeSDK);
};
const example = async (row) => {
  await jssdk.value.ready();

  const app = jssdk.value.Application;
  // 获取所有书签
  const bookmarks = await app.ActiveDocument.Bookmarks.Json();
  console.log(bookmarks, 'bookmarks');



  let name = []
  let resble = []
  bookmarks.forEach((item) => {
    if (item.name.indexOf('userfilling') == -1) {

      if (item.name.indexOf('responsible') != -1) {
        resble.push(item)
      }
      name.push(item.name)

    } else {

      bookmarksflag.value.push(item.name)
    }

  })
  // console.log(responsibleList.value);

  console.log(name, 'name');
  const bookmarks2 = await app.ActiveDocument.Bookmarks;
  Bookmarks(row.id, name.toString()).then(res => {

    if (res.data.code == 200) {
      returnBookmarksContent(row.id).then(async res => {

        //    var index = UploadFile.name.lastIndexOf("\.");
        // numberValidateForm.title = UploadFile.name.substring(0, index);

        // let str = "https://www.example.com/path/to/file.html";


        if (res.data.code == 200) {

          const app = jssdk.value.Application;
          // InlineShapes
          const shapes = await app.ActiveDocument.InlineShapes;
          // console.log(shapes, 'shapes');
          resble.forEach(async (arr, index) => {

            let parts = res.data.data.responsible.split("/");
            let lastPart = parts[parts.length - 1];
            console.log(lastPart, 'item');

            await shapes.AddPicture({
              FileName: `https://www.gjsafe.com.cn/download/${lastPart}`, // 图片地址
              LinkToFile: true,
              SaveWithDocument: true,

              Range: {
                start: arr.begin,
                end: arr.end,
              },
            });

            const shape = await shapes.Item(index + 1);
            shape.Width = 70
            shape.Height = 30
            // console.log(shape, 'shape');
            // await shape.ConvertToShape();
          })

          // 

          name.forEach(async item => {
            console.log(item);

            if (item.indexOf('responsible') == -1) {
              for (let key in res.data.data) {
                // console.log(key, 'key');

                if (item.indexOf(key) != -1) {
                  const isEmpty = await app.ActiveDocument.Bookmarks.Item(item).Empty;
                  // console.log(isEmpty, 'isEmpty');
                  if (!isEmpty) {
                    // console.log('进来了');

                    const isReplaceSuccess = await bookmarks2.ReplaceBookmark([
                      {
                        name: item,
                        type: 'text',
                        value: res.data.data[key],
                      },
                    ]);
                  }
                }
              }
            }


          })



        }


      })
    }

  })
  // // 书签对象





  // console.log(isReplaceSuccess); // true
}
defineExpose({
  show,
});
</script>

<style lang="less" scoped>
// .el-drawer__header {
//   margin-bottom: 0px;
// }
body {
  /deep/.drawer {
    background: #bfa;
    font-size: 50px;


  }

}

.btn {
  position: absolute;
  right: 10px;
}

.customMount {
  width: 100%;
  // height: 800px;
  height: calc(86vh);
  // background: #bfa;
}
</style>