import type { MenuData } from "~@/layouts/basic-layout/typing";
import dynamicRoutes, { rootRoute } from "~@/router/dynamic-routes";
import { genRoutes } from "~@/router/generate-route";
import type { UserInfo } from "~@/api/common/user";

export const useUserStore = defineStore("user", () => {
  const routerData = shallowRef();
  const menuData = shallowRef<MenuData>([]);
  // const userInfo = reactive({
  //   avatar:
  //     "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
  //   username: "admin",
  //   nickname: "超级管理员",
  // });
  const userInfo = shallowRef<UserInfo>();
  const token = useAuthorization();

  const avatar = computed(() => userInfo.value?.avatar);
  // const avatar =
  //   "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png";
  const nickname = computed(
    () => userInfo.value?.nickname ?? userInfo.value?.username
  );
  // const nickname = "aaa";

  const generateRoutes = async () => {
    const currentRoute = {
      ...rootRoute,
      children: dynamicRoutes,
    };
    menuData.value = genRoutes(dynamicRoutes);
    return currentRoute;
  };

  const generateDynamicRoutes = async () => {
    const routerDatas = await generateRoutes();
    routerData.value = routerDatas;
    return routerDatas;
  };

  const logout = async () => {
    // 退出登录
    // 1. 清空用户信息
    try {
      // await logoutApi();
    } finally {
      token.value = null;
      userInfo.value = undefined;
      routerData.value = undefined;
      menuData.value = [];
    }
  };

  // 获取用户信息
  const getUserInfo = async () => {
    // 获取用户信息
    // const { data } = await getUserInfoApi();
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = {
          id: 1,
          username: "admin",
          nickname: "超级管理员",
          avatar:
            "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
        };
        userInfo.value = data;
        resolve(data);
      }, 1000);
    });
  };

  return {
    userInfo,
    routerData,
    menuData,
    generateDynamicRoutes,
    avatar,
    nickname,
    logout,
    getUserInfo,
  };
});
