import { TableColumnType, Modal, message } from "ant-design-vue";
import { IMaterialItem } from "./model";
import { buildUUID } from "~@/utils/uuid";
import { isNumberByRegex } from "~@/utils/tools";
import {
  materialTypeList,
  MaterialType,
  LOCAL_MATERIAL_LIST_KEY,
} from "~@/config/global";
import { cloneDeep } from "lodash-es";
import type { UnwrapRef } from "vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
export default function useMaterial() {
  const textareaExampleText: string =
    "请粘贴数据。格式：代码 全称 简称 分类 Tg(然后回车换下一行，每个空格或者多个空格隔开, 若是数值不为数字则转为0)\n" +
    "例如：\n" +
    "101003 醋酸乙烯酯 VAc 单体 32\n" +
    "300211 乙酸乙酯 ETAC 溶剂";

  const importText = ref<string>("");

  const handleAutoRecognition = () => {
    if (!importText.value) return;
    const lines = importText.value.split("\n"); //分行
    for (let i = 0; i < lines.length; i++) {
      const normalizedText = lines[i].replace(/ +/g, " "); //所有的多个连续空格都被替换成了单个空格
      const fiedls = normalizedText.split(" ");
      const categoryText = fiedls[3] || undefined;
      const tableItemCategory = materialTypeList.find(
        (item) => item.name === categoryText,
      )?.key;
      const tableItem: IMaterialItem = {
        uuid: buildUUID(),
        code: fiedls[0] || "",
        fullName: fiedls[1] || "",
        shortName: fiedls[2] || "",
        category: tableItemCategory,
        tg:
          MaterialType.Monomer === tableItemCategory
            ? isNumberByRegex(fiedls[4])
              ? parseFloat(fiedls[4])
              : 0
            : undefined,
        acidValue: undefined,
        glyoxylateValue: undefined,
      };
      tableData.value.push(tableItem);
    }
  };

  const tableColumns: TableColumnType[] = [
    {
      title: "物料代码",
      dataIndex: "code",
    },
    {
      title: "简称",
      dataIndex: "shortName",
    },
    {
      title: "全称",
      dataIndex: "fullName",
    },
    {
      title: "Tg(℃)",
      dataIndex: "tg",
    },
    {
      title: "分类",
      dataIndex: "category",
      width: 140,
    },
    {
      title: "酸值",
      dataIndex: "acidValue",
    },
    {
      title: "羟值",
      dataIndex: "glyoxylateValue",
    },
    {
      title: "操作",
      dataIndex: "action",
      width: 180,
    },
  ];

  const tableData = ref<IMaterialItem[]>([]);

  const tableSelectKeys = ref<string[]>([]);
  const handleTableSelectChange = (selectedRowKeys: string[]) => {
    tableSelectKeys.value = selectedRowKeys;
  };

  const selectTableRowLength = computed(() => tableSelectKeys.value.length);

  const rowSelection = reactive({
    selectedRowKeys: tableSelectKeys,
    onChange: handleTableSelectChange,
  });

  const formatCategoryText = (category: MaterialType | undefined) => {
    const categoryItem = materialTypeList.find((item) => item.key === category);
    return categoryItem ? categoryItem.name : "";
  };

  /**
   * 表格中的编辑数据，用其中的某个字段作为key，并且解包不需要.value
   */
  const editableData: UnwrapRef<Record<string, IMaterialItem>> = reactive({});

  const handleTableEdit = (record: IMaterialItem) => {
    editableData[record.uuid] = cloneDeep(record);
  };
  const handleTableDelete = (record: IMaterialItem) => {
    const index = tableData.value.findIndex(
      (item) => item.uuid === record.uuid,
    );
    if (index !== -1) {
      tableData.value.splice(index, 1);
      message.success("删除成功！");
    }
  };

  const handleTableSave = (record: IMaterialItem) => {
    const findItem = tableData.value.find((item) => item.uuid === record.uuid);
    if (!findItem) return;
    Object.assign(findItem, editableData[record.uuid]);
    delete editableData[record.uuid];
  };
  const handleTableCancel = (record: IMaterialItem) => {
    delete editableData[record.uuid];
  };

  const handleTableDeleteSelected = () => {
    Modal.confirm({
      title: `确定要删除勾选的这${selectTableRowLength.value}项吗？`,
      icon: h(ExclamationCircleOutlined),
      centered: true,
      onOk() {
        tableData.value = tableData.value.filter(
          (item) => !tableSelectKeys.value.includes(item.uuid),
        );
        tableSelectKeys.value = [];
        message.success("删除成功！");
      },
      onCancel() {},
    });
  };

  const handleTableAdd = () => {
    const id = buildUUID();
    const item = {
      uuid: id,
      code: "",
      shortName: "",
      fullName: "",
      category: undefined,
      tg: undefined,
      acidValue: undefined,
      glyoxylateValue: undefined,
    };
    tableData.value.push(item);
    editableData[id] = cloneDeep(item);
  };

  const handlSaveTableDataToLocalStorage = () => {
    localStorage.setItem(
      LOCAL_MATERIAL_LIST_KEY,
      JSON.stringify(tableData.value),
    );
  };

  const handleLoadTableDataFromLocalStorage = () => {
    const localData = localStorage.getItem(LOCAL_MATERIAL_LIST_KEY);
    if (localData) {
      try {
        tableData.value = JSON.parse(localData);
      } catch (e) {
        console.error("从本地存储转化数据失败", e);
      }
    }
  };

  onBeforeMount(() => {
    handleLoadTableDataFromLocalStorage();
  });

  onMounted(() => {
    // 第一次加载时，如果有数据必定会触发watch，所以可以等数据初始化结束后再生成监听
    watch(
      () => tableData.value,
      () => {
        handlSaveTableDataToLocalStorage();
      },
      { deep: true },
    );
  });

  return {
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
    handleTableAdd,
  };
}
