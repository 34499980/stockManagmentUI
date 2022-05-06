import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { PermissionType } from "../enums/navigation.enum";
import { MenuItem } from "../models/menu";

@Injectable()
export class MenuService {
  private _menuItems: BehaviorSubject<MenuItem[]> = new BehaviorSubject([]);
  public get menuItems$() {
    return this._menuItems.asObservable();
  }

  constructor() {
    this._menuItems.next([      
      {
        data: null,
        label: 'NAV.OFFICE.SUBTITLES.ADDOFFICE',
        permission: PermissionType.Office,
        path: "/Office"
      },
      {
        data: null,
        label: 'NAV.OFFICE.SUBTITLES.OFFICELIST',
        permission: PermissionType.OfficeList,
        path: '/Office/all'
      }
    ]);
  }
}
