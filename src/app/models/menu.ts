import { PermissionType } from "../enums/navigation.enum";


export interface MenuItem {
  label: string;
  data: any;
  permission: PermissionType;
  path: string;
}