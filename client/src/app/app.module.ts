import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/shared/home-page/home-page.component';
import { LoginComponent } from './pages/shared/login/login.component';
import { RegisterComponent } from './pages/shared/register/register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RegisterOwnerComponent } from './pages/admin/registerOwner/register-owner.component';
import { Interceptor } from './services/http.interceptor';
import { ResetPasswordComponent } from './pages/shared/resetPassword/reset-password.component';
import { ManagerPageComponent } from './pages/owner/ownerPage/manager-page.component';
import { RestaurantDetailsComponent } from './pages/owner/restaurant-details/restaurant-details.component';
import { MenusPageComponent } from './pages/owner/menu-details/menus/menus-page/menus-page.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { CreateMenuComponent } from './pages/owner/menu-details/menus/create-menu/create-menu.component';
import { MenuCardComponent } from './components/owner/menu-details/menu-card/menu-card.component';
import { DepartmentsPageComponent } from './pages/owner/menu-details/departments/dpartments-page/departments-page.component';
import { CreateDepartmentComponent } from './pages/owner/menu-details/departments/create-department/create-department.component';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ToolbarComponent } from './components/shared/toolbar/toolbar.component';
import { ConfirmationDialogComponent } from './components/shared/dialogs/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginComponent,
    RegisterComponent,
    RegisterOwnerComponent,
    ResetPasswordComponent,
    ManagerPageComponent,
    RestaurantDetailsComponent,
    MenusPageComponent,
    CreateMenuComponent,
    MenuCardComponent,
    DepartmentsPageComponent,
    CreateDepartmentComponent,
    ToolbarComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,    
  ],
  providers: [{ 
    provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi:true
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
