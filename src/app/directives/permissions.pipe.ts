import { Pipe, PipeTransform } from "@angular/core";
import { combineLatest, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthenticationService } from "../core/services/authentication.service";
import { MenuItem } from "../models/menu";

@Pipe({
  name: "userPermissions"
})
export class UserPermissionsPipe implements PipeTransform {
  constructor(public auth: AuthenticationService) {}

  transform(value: Observable<MenuItem[]>): Observable<MenuItem[]> {
    return combineLatest([value, this.auth.getCurrentUserSubject]).pipe(
      map(([items, user]) => {
        if (!user) {
          return [];
        }
        return items.filter(i => user.permissions.includes(i.permission));
      })
    );
  }
}