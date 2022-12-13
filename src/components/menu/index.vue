<template>

  <el-sub-menu v-if="menus.children.length" :index="menus.name">
    <template #title>

      <span style="margin-left: 10px;">{{ menus.name }}</span>
    </template>
    <label v-if="menus.children.length >= 1">
      <!-- /* 递归调用自己 */ -->
      <layout-menus v-for="i in menus.children" :key="i.id" :menus="i" />
    </label>
  </el-sub-menu>
  <el-menu-item v-else :index="menus.name" @click="menuClick(menus.name, menus.id)" v-on="$attrs">

    <template #title>{{ menus.name }}</template>
  </el-menu-item>


</template>

<script lang="ts" >
import { defineComponent, defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'LayoutMenus',
  props: {
    menus: {
      type: Object,
      require: true,
      default: () => { }
    }
  },
  setup(props, ctx) {
    const store = useStore();
    const menuClick = (menu, name) => {
      console.log(menu, name, 'zhel');
      // ctx.emit('sss', menu, name);
      // sessionStorage.setItem('menuName', menu)
      // sessionStorage.setItem('tid', name)
      // console.log(ctx);
      store.commit('setmenuName', menu)
      store.commit('setmenuID', name)
    }

    return { menuClick }
  }
})
</script>
<style scoped lang="less">

</style>