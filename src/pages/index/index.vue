<template>
  <view class="page">
    <view class="title">
      {{ title }}
    </view>
    <view class="flex">
      <up-button
        text="增加"
        color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"
        @click="handleAdd"
      ></up-button>
      <view class="count">{{ state.count }}</view>
      <up-button
        text="减少"
        color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"
        @click="handleSub"
      ></up-button>
    </view>
    <up-button text="修改用户枚举" @click="handleChangeEnum"></up-button>
    <TestComA />
  </view>
</template>

<script setup>
import { onLoad } from "@dcloudio/uni-app";
import { reactive, ref, computed } from "vue";
import appStore from "@/store/app";
let title = ref("首页");
let state = reactive({
  count: computed(() => appStore().count),
});

onLoad(() => {
  appStore().getEnmuListByKey("userStatus", true);
  appStore().getEnmuListByKey("orderStatus");
});

const handleAdd = () => {
  appStore().countAdd();
};
const handleSub = () => {
  appStore().count--;
};

const handleChangeEnum = () => {
  appStore().AllEnums["userStatus"].push({
    id: appStore().AllEnums["userStatus"].length + 1,
    lable: "测试枚举",
  });
};
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
}

.flex {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.count {
  height: 80rpx;
  line-height: 80rpx;
  width: 200rpx;
  text-align: center;
}
</style>
