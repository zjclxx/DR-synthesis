<script setup lang="ts">
  import { notification } from "ant-design-vue";

  onMounted(() => {
    // console.log(useUserStore().userInfo);
  });
  const openNotification = () => {
    // notification.info({
    //   message: "测试",
    //   description: "测试的内容",
    //   placement: "topLeft",
    //   duration: 0,
    // });
    // console.log(Notification.permission);
    if (!("Notification" in window)) {
      // 检查浏览器是否支持通知
      notification.info({
        message: "通知",
        description: "当前浏览器不支持桌面通知",
        placement: "topLeft",
        duration: 0,
      });
    } else if (Notification.permission === "granted") {
      // 检查是否已授予通知权限；如果是的话，创建一个通知
      new Notification("这是个桌面通知！", {
        body: "欢迎接受",
      });
      // const notification = new Notification("这是个桌面通知！");
      // console.log("notification", notification);
      // …
    } else if (Notification.permission !== "denied") {
      // 我们需要征求用户的许可
      Notification.requestPermission().then((permission) => {
        console.log(permission);
        // 如果用户接受，我们就创建一个通知
        if (permission === "granted") {
          new Notification("你同意了桌面通知！");
          // …
        } else if (permission === "denied") {
          notification.error({
            message: "通知",
            description: "你拒绝了桌面通知！",
          });
        }
      });
    } else {
      notification.error({
        message: "通知",
        description: "你拒绝了桌面通知！，可以在浏览器设置中重新打开",
      });
    }

    // 最后，如果用户拒绝了通知，并且你想尊重用户的选择，则无需再打扰他们
  };
  // const router = useRouter();

  const text = ref<string>("这是首页");
</script>

<template>
  <div p-2>
    {{ text }}
    <a-button @click="openNotification"> Notification </a-button>
  </div>
</template>
