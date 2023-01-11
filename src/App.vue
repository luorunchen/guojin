<template>
  <!-- <form name="punchout_form" method="post" -->
  <!-- action="https://openapi.alipaydev.com/gateway.do?charset=utf-8&method=alipay.trade.page.pay&sign=jKKbwYD6fMBfgccnKzPEgF9iIXsl%2B%2FSS5or%2BzccOFEfgP4I7d3zYradsh734%2BOV67gyU0ohGopFQ8Q%2BOE2REt2oARaDbdlMTilaV%2BpjQPNKf9cg4gGMBakUtnsywLm9gJKdE1fpecaw9B%2Fr1vLftXUfZQuVhNfIqV7K3xu3KDJSPdgpzwjvh%2FlSzMT0aRydd5%2FWnDMfSOWBolNKQhMXS9tF%2FMcKpvCK6hEr4XyNZKqKeoV5p1KI0FopyVE81TinBXziRuP8bzH0WIGjpUL6kxYPnTI3n8jpwE6IJV2qpkiYr%2FAUy0RTloDJ725CX0tkXsXKvoxAyjYpzvmSG2Z%2FWrQ%3D%3D&return_url=http%3A%2F%2F9w5v87.natappfree.cc%2Fpay%2Freturn_url&notify_url=http%3A%2F%2F9w5v87.natappfree.cc%2Fpay%2Fnotify_url&version=1.0&app_id=2021000121690208&sign_type=RSA2&timestamp=2022-11-30+09%3A01%3A38&alipay_sdk=alipay-sdk-java-dynamicVersionNo&format=json"> -->
  <input type="hidden" name="biz_content" />
  <input type="submit" value="立即支付" style="display: none" />
  <!-- </form> -->
  <!-- 32131 -->
  <router-view />
</template>
<script setup lang="ts">
</script>

<style lang="less">
* {
  padding: 0;
  margin: 0;
  // font-size: 18px;
}
ul{
  list-style: none;
}
body::-webkit-scrollbar {
  display: none;
}

.amap-sug-result {
  // position: absolute;
  z-index: 10000 !important
  // .auto-item {
  // background: #1f459c;
  // }
}
.el-drawer.rtl {
  //

  .el-drawer__title {
    font-size: 25px;
    color: #000;
    text-align: center;
  }

  .pdf {
    height: calc(84vh);
  }
}
</style>
