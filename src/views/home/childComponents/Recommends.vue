<template>
  <div class="recommends">
    <div v-for="(item,index) in recommends" :key="index" class="recommends-item">
      <a :href="item.link">
        <img :src="item.image" alt />
      </a>
      <div>{{item.title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "recommends",
  data() {
    return {};
  },
  props: {
    recommends: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style  scoped>
.recommends {
  display: flex;
  text-align: center;
  font-size: 14px;
  padding: 10px 10px 20px 10px;
  border-bottom: 10px solid #eeeeee;
}
.recommends-item {
  flex: 1;
}
.recommends img {
  width: 70px;
  height: 70px;
}
</style>