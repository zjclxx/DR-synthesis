import { get } from "lodash-es";
import router from "@/router";

export function getQueryParam(param: string | string[], defaultVal = "") {
  const query = router.currentRoute.value?.query ?? {};
  const val = get(query, param) ?? defaultVal;
  return decodeURIComponent(val);
}

/**
 * @description 判断字符串是否可以转为数字
 * @param 字符串
 * @returns
 */
export function isNumberByRegex(val: string) {
  const reg = /^-?\d+(\.\d+)?$/;
  return reg.test(val);
}
