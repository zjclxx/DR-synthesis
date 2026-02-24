<script setup lang="ts">
  import zhCN from "ant-design-vue/es/locale/zh_CN";
  const appStore = useAppStore();
</script>

<template>
  <a-config-provider :theme="appStore.theme" :locale="zhCN">
    <RouterView />
  </a-config-provider>
</template>
