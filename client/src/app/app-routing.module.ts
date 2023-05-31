import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/shared/home-page/home-page.component';
import { LoginComponent } from './pages/shared/login/login.component';
import { RegisterComponent } from './pages/shared/register/register.component';
import { RegisterOwnerComponent } from './pages/admin/registerOwner/register-owner.component';
import { AuthAdminGuardService } from './services/guards/auth-admin-guard.service';
import { ResetPasswordComponent } from './pages/shared/resetPassword/reset-password.component';
import { ManagerPageComponent } from './pages/owner/ownerPage/manager-page.component';
import { AuthOwnerGuardService } from './services/guards/auth-owner-guard.service';
import { RestaurantDetailsComponent } from './pages/owner/restaurant-details/restaurant-details.component';
import { TablesDetailsComponent } from './pages/owner/tablesPage/tables-details/tables-details.component';
import { MenusPageComponent } from './pages/owner/menu-details/menus/menus-page/menus-page.component';
import { CreateMenuComponent } from './pages/owner/menu-details/menus/create-menu/create-menu.component';
import { DepartmentsPageComponent } from './pages/owner/menu-details/departments/dpartments-page/departments-page.component';
import { CreateDepartmentComponent } from './pages/owner/menu-details/departments/create-department/create-department.component';
import { ItemsPageComponent } from './pages/owner/menu-details/items/items-page/items-page.component';
import { CreateItemComponent } from './pages/owner/menu-details/items/create-item/create-item.component';


const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: RegisterOwnerComponent, canActivate: [AuthAdminGuardService] },
  { path: 'resetPassword/:id/:token', component: ResetPasswordComponent},
  { path: 'owner', component: ManagerPageComponent, canActivate: [AuthOwnerGuardService] },
  { path: 'restaurant-details', component: RestaurantDetailsComponent },
  { path: 'tables-details', component: TablesDetailsComponent },
  { path: 'menus-page', component: MenusPageComponent, canActivate: [AuthOwnerGuardService] },
  { path: 'create-menu', component: CreateMenuComponent, canActivate: [AuthOwnerGuardService] },
  { path: 'create-menu/:menuId', component: CreateMenuComponent, canActivate: [AuthOwnerGuardService] },
  { path: 'menus-page', component: MenusPageComponent, canActivate: [AuthOwnerGuardService] },
  { path: 'departments-page/:menuId', component: DepartmentsPageComponent, canActivate: [AuthOwnerGuardService] },
  { path: 'add-department/:menuId', component: CreateDepartmentComponent, canActivate: [AuthOwnerGuardService] },
  { path: 'edit-department/:menuId/:departmentId', component: CreateDepartmentComponent, canActivate: [AuthOwnerGuardService] },
  { path: 'items-page/:departmentId', component: ItemsPageComponent, canActivate: [AuthOwnerGuardService] },
  { path: 'add-item/:departmentId', component: CreateItemComponent, canActivate: [AuthOwnerGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
