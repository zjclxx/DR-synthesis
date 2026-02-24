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
          <a-button type="primary" @click="handleAutoRecognition"
            >一键识别</a-button
          >
        </div>
      </div>
    </div>

    <div mt-24px flex flex-wrap gap-x-12px>
      <a-button type="primary" class="bg-#28a745" hover="!bg-#22bc45">
        <PlusOutlined />
        新增物料
      </a-button>

      <a-button
        type="primary"
        danger
        :disabled="selectTableRowLength === 0"
        @click="handleTableDeleteSelected"
        >批量删除</a-button
      >
    </div>
    <div mt-16px>
      <a-table
        rowKey="uuid"
        :pagination="false"
        :columns="tableColumns"
        :data-source="tableData"
        :row-selection="rowSelection">
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'action'">
            <div v-if="editableData[record.uuid]" space-x-8px>
              <a-button type="link" @click="handleTableSave(record)" px-0
                >保存</a-button
              >
              <a-button type="link" @click="handleTableCancel(record)" px-0
                >取消</a-button
              >
            </div>

            <div v-else space-x-8px>
              <a-button type="link" @click="handleTableEdit(record)" px-0
                >编辑</a-button
              >
              <a-popconfirm
                v-if="tableData.length"
                :key="record.uuid"
                title="确定删除?"
                @confirm="handleTableDelete(record)">
                <a-button type="link" danger px-0>删除</a-button>
              </a-popconfirm>
            </div>
          </template>
          <template v-else-if="column.dataIndex === 'category'">
            <div v-if="editableData[record.uuid]">
              <a-select
                v-model:value="
                  editableData[record.uuid][
                    column.dataIndex as keyof IMaterialItem
                  ]
                "
                style="width: 100%"
                placeholder="请选择"
                :options="materialTypeList"
                :field-names="{ label: 'name', value: 'key' }"></a-select>
            </div>
            <template v-else>
              <span v-text="formatCategoryText(record.category)"></span>
            </template>
          </template>
          <template
            v-else-if="
              [
                'code',
                'shortName',
                'fullName',
                'tg',
                'acidValue',
                'glyoxylateValue',
              ].includes(column.dataIndex)
            ">
            <div v-if="editableData[record.uuid]">
              <a-input
                v-model:value="
                  editableData[record.uuid][
                    column.dataIndex as keyof IMaterialItem
                  ]
                "
                placeholder="请输入" />
            </div>
            <template v-else>
              <span v-text="record[column.dataIndex]"></span>
            </template>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup lang="ts">
  import useMaterial from "./useMaterial";
  import { PlusOutlined } from "@ant-design/icons-vue";
  import { materialTypeList } from "@/config/global";
  import { IMaterialItem } from "./model";

  const {
    textareaExampleText,
    importText,
    tableColumns,
    tableData,
    rowSelection,
    selectTableRowLength,
    editableData,
    handleTableEdit,
    handleTableDelete,
    handleAutoRecognition,
    formatCategoryText,
    handleTableSave,
    handleTableCancel,
    handleTableDeleteSelected,
  } = useMaterial();
</script>

<style scoped></style>
