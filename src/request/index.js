import Request from "luch-request";
import { baseUrl, apiPath } from "../config/index";

const options = {
  // 显示操作成功消息 默认不显示
  showSuccess: false,
  // 成功提醒 默认使用后端返回值
  successMsg: "",
  // 显示失败消息 默认显示
  showError: true,
  // 失败提醒 默认使用后端返回信息
  errorMsg: "",
  // 显示请求时loading模态框 默认不显示
  showLoading: false,
  // loading提醒文字
  loadingMsg: "加载中",
  // 需要授权才能请求 默认放开
  auth: false,
  // ...
};

// Loading全局实例
let LoadingInstance = {
  target: null,
  count: 0,
};

/**
 * 关闭loading
 */
function closeLoading() {
  if (LoadingInstance.count > 0) LoadingInstance.count--;
  if (LoadingInstance.count === 0) uni.hideLoading();
}

/**
 * @description 请求基础配置 可直接使用访问自定义请求
 */
const http = new Request({
  baseURL: baseUrl,
  timeout: 8000,
  method: "GET",
  header: {
    "Content-Type": "application/json;charset=UTF-8",
  },
  custom: options,
});

/**
 * @description 请求拦截器
 */
http.interceptors.request.use(
  (config) => {
    if (config.custom.showLoading) {
      LoadingInstance.count++;
      LoadingInstance.count === 1 &&
        uni.showLoading({
          title: config.custom.loadingMsg,
          mask: true,
          fail: () => {
            uni.hideLoading();
          },
        });
    }
    const token = uni.getStorageSync("token");
    if (token) config.header["Authorization"] = `Bearer ${token}`;
    if (region) {
      config.header["region"] = `${region}`;
    }
    if (companyId) {
      config.header["company"] = `${companyId}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * @description 响应拦截器
 */
http.interceptors.response.use(
  (response) => {
    // 自动设置登陆令牌
    if (response.header.authorization || response.header.Authorization) {
    }

    // 如果有设置开启loading，这里关闭
    response.config.custom.showLoading && closeLoading();

    if (response.data.code !== 0 && response.statusCode !== 200) {
      if (response.config.custom.showError)
        uni.showToast({
          title: response.data.msg || "服务器开小差啦,请稍后再试~",
          icon: "none",
          mask: true,
        });
      return Promise.resolve(response.data);
    }

    // 这里如果接口正常响应并且设置了 showSuccess ，弹窗展示
    if (
      response.data.code === 0 &&
      response.data.msg !== "" &&
      response.config.custom.showSuccess
    ) {
      uni.showToast({
        title: response.config.custom.successMsg || response.data.msg,
      });
    }
    // 接口未响应成功
    if (
      response.data.code != 0 &&
      response.data.code != 1010105 &&
      response.data.status !== 200
    ) {
      if (response.config.custom.showError)
        uni.showToast({
          title: response.data.msg,
          icon: "none",
          mask: true,
        });
    }
    return Promise.resolve(response.data);
  },
  (error) => {
    console.log(error, "network error");
    let errorMessage = "网络请求出错";
    if (error !== undefined) {
      switch (error.statusCode) {
        case 400:
          errorMessage = "请求错误";
          break;
      }
      if (error.errMsg.includes("timeout")) errorMessage = "请求超时";
    }

    if (error && error.config) {
      if (error.config.custom.showError !== false) {
        uni.showToast({
          title: error.data?.msg || errorMessage,
          icon: "none",
          mask: true,
        });
      }
      error.config.custom.showLoading && closeLoading();
    }

    return false;
  }
);

const request = (config) => {
  if (config.url[0] !== "/") {
    config.url = apiPath + config.url;
  }
  return http.middleware(config);
};

export default request;
