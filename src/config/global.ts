export const enum MaterialType {
  Monomer = 1, //单体
  Solvent = 2, //溶剂
  Initiator = 3, //引发剂
  Auxiliary = 4, //助剂
  Resin = 5, //树脂
}

interface MaterialTypeItem {
  key: MaterialType;
  name: string;
}

export const materialTypeList: MaterialTypeItem[] = [
  {
    key: MaterialType.Monomer,
    name: "单体",
  },
  {
    key: MaterialType.Solvent,
    name: "溶剂",
  },
  {
    key: MaterialType.Initiator,
    name: "引发剂",
  },
  {
    key: MaterialType.Auxiliary,
    name: "助剂",
  },
  {
    key: MaterialType.Resin,
    name: "树脂",
  },
];

export const enum SystemStatus {
  Running = 1, //运行中
  Paused = 0, //暂停中
}

interface SystemStatusItem {
  key: SystemStatus;
  name: string;
}
export const systemStatusList: SystemStatusItem[] = [
  {
    key: SystemStatus.Running,
    name: "运行中",
  },
  {
    key: SystemStatus.Paused,
    name: "暂停中",
  },
];
