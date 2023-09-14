import request from "@/request/index";
import { baseUrl } from "../config/index";

export default {
  // 获取枚举列表
  getEnumList: (param) =>
    request({
      url: `/enum`,
      data: param,
      method: "GET",
    }),
};
