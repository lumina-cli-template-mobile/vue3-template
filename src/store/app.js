import { defineStore } from "pinia";
import appApi from "@/api/app.js";

// 整个app的全局store
const app = defineStore({
  id: "app",
  state: () => ({
    count: 0,
    AllEnums: {},
  }),
  actions: {
    countAdd() {
      this.count++;
    },
    /**
     * @description: 根据key获取枚举列表
     * @param {*} key 枚举的key
     * @param {*} refresh 是否强制刷新（枚举值发生变化时，强制刷新）
     * @return {*}
     * @author: XiaoC
     * @Date: 2023-09-14 09:42:04
     */
    async getEnmuListByKey(key, refresh = false) {
      if (refresh || !this.AllEnums?.[key]) {
        const res = await appApi.getEnumList({ key });
        this.AllEnums[key] = res.data;
        return res.data;
      }
      if (this.AllEnums[key] && this.AllEnums[key].length > 0) {
        return this.AllEnums[key];
      }
    },
  },
  // 持久化数据
  persist: {
    enabled: true,
    strategies: [
      {
        key: "app-store",
      },
    ],
  },
});

export default app;
