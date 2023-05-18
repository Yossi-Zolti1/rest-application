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
import { MenusPageComponent } from './pages/owner/menu-details/menus/menus-page/menus-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: RegisterOwnerComponent, canActivate: [AuthAdminGuardService] },
  { path: 'resetPassword/:id/:token', component: ResetPasswordComponent},
  { path: 'owner', component: ManagerPageComponent, canActivate: [AuthOwnerGuardService] },
  { path: 'restaurant-details', component: RestaurantDetailsComponent },
  { path: 'menus-page', component: MenusPageComponent, canActivate: [AuthOwnerGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
