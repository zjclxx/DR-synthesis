import type { RouteRecordRaw } from "vue-router";
export const ROOT_ROUTE_REDIRECT_PATH = "/home";
const Layout = () => import("~/layouts/index.vue");
// const basicRouteMap = {
//   // iframe模式下使用
//   Iframe: () => import("~/pages/common/iframe.vue"),
//   // 一般用于存在子集的页面
//   RouteView: () => import("~/pages/common/route-view.vue"),
// };
export const rootRoute: RouteRecordRaw = {
  path: "/",
  name: "rootPath",
  redirect: ROOT_ROUTE_REDIRECT_PATH,
  component: Layout,
  children: [],
};

export default [
  {
    path: "/home",
    name: "Home",
    meta: {
      title: "首页",
      icon: "HomeOutlined",
    },
    component: () => import("~/pages/dashboard/analysis.vue"),
  },
  {
    path: "/material",
    name: "Material",
    meta: {
      title: "物料管理",
      icon: "BarsOutlined",
    },
    component: () => import("~/pages/profile/index.vue"),
  },
  {
    path: "/process",
    name: "Process",
    meta: {
      title: "工艺管理",
      icon: "ReconciliationOutlined",
    },
    component: () => import("~/pages/process/index.vue"),
  },
  {
    path: "/recipe",
    name: "Recipe",
    meta: {
      title: "配方管理",
      icon: "DeploymentUnitOutlined",
    },
    component: () => import("~/pages/recipe/index.vue"),
  },
] as RouteRecordRaw[];
