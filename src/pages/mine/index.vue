<template>
  <view class="page">
    <view class="title">
      {{ title }}
    </view>
    <view>
      当前用户状态有：
      <view v-for="(item, index) in userStatusEnum" :key="index">
        lable:{{ item.lable }} id:{{ item.id }}
      </view>
    </view>
  </view>
</template>

<script setup>
import { reactive, ref, computed } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import appStore from "@/store/app";

let title = ref("我的页面");

onLoad(() => {
  console.log("mine onLoad", userStatusEnum.value);
});

let userStatusEnum = computed(() => {
  return appStore().AllEnums["userStatus"];
});
</script>

<style lang="scss" scoped></style>
