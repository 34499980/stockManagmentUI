import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserListComponent } from './userlist/userlist.component';
import { UserListResolver } from 'src/app/resolvers/userlist.resolver';
import { ProfileComponent } from './profil/profile.component';
import { OfficeResolver } from 'src/app/resolvers/office.resolver';
import { RolesResolver } from 'src/app/resolvers/roles.resolver';
import { UserResolver } from './profil/profile.resolver';
import { CountriesResolver } from 'src/app/resolvers/countries.resolver';
const routes: Routes = [
  {
    path: 'all',
    component: UserListComponent,
    resolve:{     
      office: OfficeResolver,
      roles: RolesResolver,
      countries: CountriesResolver
    }
  },
  {
    path: ':id',
    component: ProfileComponent,
    resolve:{
      office: OfficeResolver,
      roles: RolesResolver,
      profile: UserResolver,
      countries: CountriesResolver
    }
  },
  {
    path: '',
    component: ProfileComponent,
    resolve:{
      office: OfficeResolver,
      roles: RolesResolver,
      countries: CountriesResolver
    }
  }
]


@NgModule({
  declarations: [UserListComponent, ProfileComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: [UserListResolver, OfficeResolver, RolesResolver, UserResolver, CountriesResolver]

})
export class ProfileModule { }
