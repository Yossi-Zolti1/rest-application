import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RegisterOwnerComponent } from './components/admin/registerOwner/register-owner.component';
import { AuthAdminGuardService } from './services/auth-admin-guard.service';
import { ResetPasswordComponent } from './pages/resetPassword/reset-password.component';
import { ManagerPageComponent } from './pages/manager/managerPage/manager-page.component';
import { AuthOwnerGuardService } from './services/auth-owner-guard.service';
import { RestaurantDetailsComponent } from './pages/manager/restaurant-details/restaurant-details.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: RegisterOwnerComponent, canActivate: [AuthAdminGuardService] },
  { path: 'resetPassword/:id/:token', component: ResetPasswordComponent},
  { path: 'owner', component: ManagerPageComponent, canActivate: [AuthOwnerGuardService] },
  { path: 'restaurant-details', component: RestaurantDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
