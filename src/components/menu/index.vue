<template>
  <el-sub-menu v-if="menus.children.length" :index="menus.name">
    <template #title>
      <span style="margin-left: 20px">{{ menus.name }}</span>
    </template>
    <label v-if="menus.children.length >= 1">
      <!-- /* 递归调用自己 */ -->
      <layout-menus v-for="i in menus.children" :key="i.id" :menus="i" />
    </label>
  </el-sub-menu>
  <el-menu-item
    v-else
    :index="menus.name"
    @click="menuClick(menus.name, menus.id, menus.parent_id)"
    v-on="$attrs"
  >
    <span style="margin-left: 20px"> {{ menus.name }}</span>
  </el-menu-item>
</template>

<script lang="ts" >
import { defineComponent, defineProps } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default defineComponent({
  name: "LayoutMenus",
  props: {
    menus: {
      type: Object,
      require: true,
      default: () => {},
    },
  },
  setup(props, ctx) {
    const store = useStore();
    const menuClick = (menu, name, parent_id) => {
      // console.log(menu, name, "zhel", parent_id);
      // ctx.emit('sss', menu, name);
      // sessionStorage.setItem('menuName', menu)
      // sessionStorage.setItem('tid', name)
      // console.log(ctx);
      store.commit("setmenuName", menu);
      store.commit("setmenuParentId", parent_id);
      store.commit("setmenuID", name);
    };

    return { menuClick };
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