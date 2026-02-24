import { MaterialType } from "~@/config/global";

export interface IMaterialItem {
  uuid: string;
  code: string;
  shortName: string;
  fullName: string;
  category: MaterialType | undefined;
  tg: number | undefined;
  acidValue: number | undefined;
  glyoxylateValue: number | undefined;
}
