<template>
  <div>
    <h3>物料管理</h3>

    <div px-24px py-16px rounded-4px class="bg-[var(--bg-container-color2)]">
      <div>
        <h3>多行一键识别</h3>
        <div mt-20px space-y-16px>
          <a-textarea
            v-model:value="importText"
            :rows="4"
            :placeholder="textareaExampleText"
            allow-clear />
          <a-button type="primary">一键识别</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import useMaterial from "./useMaterial";

  const { textareaExampleText, importText } = useMaterial();
</script>

<style scoped></style>
