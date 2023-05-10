import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page/home-page.component';
import { LoginComponent } from './pages/login/login/login.component';
import { RegisterComponent } from './pages/register/register/register.component';
import { RegisterOwnerComponent } from './components/admin/registerOwner/register-owner/register-owner.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ResetPasswordComponent } from './pages/resetPassword/reset-password/reset-password.component';
import { ManagerPageComponent } from './pages/manager/managerPage/manager-page.component';
import { AuthGuardManager } from './services/auth-guard-manager';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: RegisterOwnerComponent, canActivate: [AuthGuardService] },
  { path: 'resetPassword/:id/:token', component: ResetPasswordComponent},
  { path: 'manager-page', component: ManagerPageComponent, canActivate: [AuthGuardManager] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
