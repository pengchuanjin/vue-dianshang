<template>
  <div class="nav-tab">
    <div class="nav-left">
      <slot name="left"></slot>
    </div>
    <div class="nav-content">
      <slot name="content">标题</slot>
    </div>
    <div class="nav-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "navtab",
  data() {
    return {};
  }
};
</script>

<style scoped>
.nav-tab {
  display: flex;
  height: 44px;
  line-height: 44px;
  text-align: center;
}
.nav-left {
  width: 60px;
}
.nav-content {
  flex: 1;
}
.nav-right {
  width: 60px;
}
</style>
