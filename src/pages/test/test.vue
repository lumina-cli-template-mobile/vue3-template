<template>
  <view class="page">
    <view class="title">
      {{ title }}
    </view>
  </view>
</template>

<script setup>
import { reactive, ref, computed } from "vue";
let title = ref("测试测试页面");
</script>

<style lang="scss" scoped></style>
