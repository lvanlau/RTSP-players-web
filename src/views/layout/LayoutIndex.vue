<template>
  <el-container class="home-container">
    <el-aside width="200px">
      <el-menu default-active="1"
               class="el-menu-vertical-demo"
               :router="true">
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <platform />
            </el-icon>
            <span>NVR</span>
          </template>
          <el-menu-item index="/players/real-time">实时播放</el-menu-item>
          <el-menu-item index="/players/history">历史播放</el-menu-item>
          <el-menu-item index="/players/retrospect">视频追溯</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-main>

      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
      </el-breadcrumb>
      <el-divider />
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'LayoutIndex',
}
</script>

<style>
</style>