// 开发环境配置
export let baseUrl = "http://192.168.6.166:3000";
export let version = "1.0.0";
let env = import.meta.env;
// if (env.VITE_USER_NODE_ENV === "production") {
//   //线上环境
//   if (env.VITE_APP_FLAG === "dev") {
//     baseUrl = "xxx";
//   } else if (env.VITE_APP_FLAG === "prep") {
//     baseUrl = "xxx";
//   } else if (env.VITE_APP_FLAG === "prod") {
//     baseUrl = "xxx";
//   }
// } else {
//   //开发环境
//   if (env.VITE_APP_FLAG === "dev") {
//     baseUrl = "xxx";
//   } else if (env.VITE_APP_FLAG === "prep") {
//     baseUrl = "xxx";
//   } else if (env.VITE_APP_FLAG === "prod") {
//     baseUrl = "xxx";
//   }
// }

export const apiPath = ""; //这里可以配置请求前缀

export default {
  baseUrl,
  apiPath,
};
