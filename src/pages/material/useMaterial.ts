export default function useMaterial() {
  const textareaExampleText: string =
    "请粘贴数据。格式：代码 全称 简称 分类 Tg(然后回车换下一行，每个空格隔开)\n" +
    "例如：\n" +
    "101003 醋酸乙烯酯 VAc 单体 32\n" +
    "300211 乙酸乙酯 ETAC 溶剂";

  const importText = ref<string>("");

  const autoRecognition = (text: string) => {
    if (!text) return;
    const lines = text.split("\n");
  };

  return {
    textareaExampleText,
    importText,
  };
}
