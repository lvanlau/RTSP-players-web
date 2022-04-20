<template>
  <home-layout />
</template>


<script>
import HomeLayout from './views/layout/LayoutIndex.vue'
export default {
  components: { HomeLayout },
  name: 'App',
}
</script>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}

.home-container {
  /*因为有两个相同的标签,所以要自定义标签*/
  height: 100%;
}
.el-header {
  /*可以直接使用elementui的标签作为css选择器*/
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
}
.el-aside {
  background-color: #333744;
}
.el-main {
  background-color: #eaedf1;
}
</style>
