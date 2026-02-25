export const enum MaterialType {
  /**
   * 单体
   */
  Monomer = 1,
  /**
   * 溶剂
   */
  Solvent = 2,
  /**
   * 引发剂
   */
  Initiator = 3,
  /**
   * 助剂
   */
  Auxiliary = 4,
  /**
   * 树脂
   */
  Resin = 5,
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

/**
 * @description localStorage中物料列表的key
 */
export const LOCAL_MATERIAL_LIST_KEY: string = "localMaterialList";

export const IMPORT_EXPORT_JSON_CONTENT_KEY = "lxx_json_unique_key";
