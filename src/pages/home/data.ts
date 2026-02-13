interface IntroContentItem {
  name: string;
  description: string;
  path: string;
}

export const introContentList: IntroContentItem[] = [
  {
    name: "物料管理",
    description: "支持多行文本一键粘贴识别，自动分类排序。",
    path: "/material",
  },
  {
    name: "工艺管理",
    description: "动态时间轴，温度范围自动取中值，可视化折线图。",
    path: "/process",
  },
  {
    name: "配方管理",
    description: "Fox方程自动计算Tg，配方阶段与工艺图实时高亮联动。",
    path: "/recipe",
  },
];
