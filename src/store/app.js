import { defineStore } from "pinia";

// 整个app的全局store
const app = defineStore({
  id: "app",
  state: () => ({
    count: 0,
  }),
  actions: {
    countAdd() {
      this.count++;
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
