<template>
  <el-sub-menu v-if="menus.children.length" :index="menus.id">
    <template #title>
      <el-tooltip class="box-item" effect="dark" :content="menus.name" placement="right-start"
        v-if="menus.name.length > 5">
        <span style="margin-left: 20px" @click="titleClick(menus.name, menus.id, menus.status)">{{ menus.name }}</span>
      </el-tooltip>
      <span v-else style="margin-left: 20px" @click="titleClick(menus.name, menus.id, menus.status)">{{ menus.name
      }}</span>
    </template>
    <label v-if="menus.children.length >= 1">
      <!-- /* 递归调用自己 */ -->
      <layout-menus v-for="i in menus.children" :key="i.id" :menus="i" />
    </label>
  </el-sub-menu>
  <el-menu-item v-else :index="menus.id" @click="menuClick(menus.name, menus.id, menus.parent_id, menus)" v-on="$attrs">
    <el-tooltip class="box-item" effect="dark" :content="menus.name" placement="right-start" v-if="menus.name.length > 5">
      <span style="margin-left: 20px"> {{ menus.name }}</span></el-tooltip>
    <span v-else style="margin-left: 20px"> {{ menus.name }}</span>
  </el-menu-item>
</template>

<script lang="ts" >
import { defineComponent, defineProps, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
let arr = []
export default defineComponent({
  name: "LayoutMenus",
  props: {
    menus: {
      type: Object,
      require: true,
      default: () => { },
    },
  },


  setup(props, ctx) {
    // const arr = ref([])

    const store = useStore();
    const menuClick = (menu, name, parent_id, menus) => {
      // console.log(menu, name, "zhel", parent_id);


      if (sessionStorage.getItem("userName") == null) {
        return ElMessage({
          showClose: true,
          message: "您未登录,请先登录",
          type: "warning",
        });
      }

      let arr = {
        title: menus.name,
        status: menus.status,
        id: menus.id

      }
      store.commit("setMenus", arr);
      store.commit("setmenuName", menu);
      store.commit("setmenuParentId", parent_id);
      store.commit("setmenuID", name);
      sessionStorage.setItem('tid', menus.id)
    };
    const titleClick = (name, id, status) => {

      // console.log(name, id, status, '111');
      sessionStorage.setItem('tid', id)

      // if (name.indexOf('台账') != -1) {


      console.log('进来了');
      let arr = {
        title: name,
        status: status,
        id: id

      }
      store.commit("setMenus", arr);
      // }

    };
    return { menuClick, titleClick };
  },
});
</script>
<style scoped lang="less">
span {
  height: 35px;
  line-height: 35px;
}

// /deep/.el-submenu__title {
//   display: flex;
//   align-items: center;
// }
// /deep/.el-submenu__title span {
//   white-space: normal;
//   word-break: break-all;
//   line-height: 20px;
//   flex: 1;
//   padding-right: 20px;
// }

// /deep/.el-menu-item {
//   display: flex;
//   align-items: center;
//   padding-right: 20px !important;
// }
// /deep/.el-menu-item span {
//   white-space: normal;
//   word-break: break-all;
//   line-height: 20px;
//   flex: 1;
// }
</style>