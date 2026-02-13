<template>
  <div>
    <h2>欢迎使用RD 合成系统</h2>
    <p class="system-status-text normal-text1">
      系统状态：
      <span class="system-status" :class="systemStatusClass">{{
        statusText
      }}</span>
    </p>
    <div
      border-1px
      border-dashed
      rounded-6px
      p-20px
      class="description-content">
      <h4 my-10px text-18px>功能亮点</h4>

      <ul mt-32px space-y-10px>
        <li v-for="item in introContentList" :key="item.name" text-16px>
          <RouterLink :to="item.path" font-500>{{ item.name }}</RouterLink>
          <span font-500> ：</span>
          <span>{{ item.description }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { SystemStatus, systemStatusList } from "@/config/global";
  import { introContentList } from "./data";

  const status = ref<SystemStatus>(SystemStatus.Running);

  const statusText = computed(() => {
    const item = systemStatusList.find((item) => item.key === status.value);
    if (item) {
      return item.name;
    }
    return systemStatusList[0].name;
  });

  const systemStatusClass = computed(() => {
    switch (status.value) {
      case SystemStatus.Running:
        return "running-status";
      default:
        return "paused-status";
    }
  });
</script>

<style lang="less" scoped>
  .system-status-text {
    margin-top: 32px;
    .system-status {
      &.running-status {
        color: #52c41a;
      }
      &.paused-status {
        color: #ff4d4f;
      }
      &::before {
        content: "●";
        display: inline-block;
        margin-right: 4px;
      }
    }
  }
  .normal-text1 {
    color: var(--text-color);
  }
  .description-content {
    border-color: var(--border-color);
  }
</style>
