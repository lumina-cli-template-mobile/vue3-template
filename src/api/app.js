import request from "@/tools/request/index";
import { baseUrl } from "../config/index";

export default {
  // 获取城市列表
  getCityList: () =>
    request({
      url: "/common/district/open",
      method: "GET",
    }),
  // 获取首页的banner
  getBannerList: (params) =>
    request({
      url: "/banners",
      method: "GET",
      params: params,
    }),
};
