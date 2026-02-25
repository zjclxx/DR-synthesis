/**
 * 下载JSON数据为文件
 *
 * @param json - 要下载的JSON字符串
 * @param filename - 下载文件的名称（可选，默认为'data.json'）
 *
 * 该函数将传入的JSON字符串转换为Blob对象，并通过创建一个临时的<a>标签来触发浏览器下载。
 * 下载完成后会清理DOM中的临时元素并释放URL对象。
 */
export function downloadJson(json: string, filename: string) {
  filename = filename || "data.json";
  filename = filename.endsWith(".json") ? filename : `${filename}.json`;
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename); // 设置下载的文件名
  document.body.appendChild(link);
  link.click(); // 模拟点击下载
  document.body.removeChild(link); // 清理DOM
  URL.revokeObjectURL(url); // 释放URL对象
}

/**
 * 导入JSON文件
 *
 * @param file - 要导入的JSON文件
 *
 * 该函数将传入的JSON文件转换为JSON字符串，并返回给调用者。
 * 如果文件类型不是JSON或者文件名不是以.json结尾，那么将返回一个错误。
 */
export function importJsonFile(file: File): Promise<string> {
  // console.log("file", file);
  return new Promise((resolve, reject) => {
    // 检查文件类型是否为JSON
    if (file.type !== "application/json" && !file.name.endsWith(".json")) {
      reject(new Error("请选择一个有效的JSON文件"));
      return;
    }

    const reader = new FileReader();

    // 文件读取成功后的回调
    reader.onload = (event) => {
      try {
        const jsonContent = JSON.parse(event.target?.result as string);
        resolve(jsonContent);
      } catch (error) {
        reject(new Error("JSON文件解析失败"));
      }
    };

    // 文件读取失败的回调
    reader.onerror = () => {
      reject(new Error("文件读取失败"));
    };

    // 开始读取文件
    reader.readAsText(file);
  });
}
