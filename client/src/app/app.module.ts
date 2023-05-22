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
import { HeaderComponent } from './components/owner/menu-details/header/header.component';
import { MenusPageComponent } from './pages/owner/menu-details/menus/menus-page/menus-page.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { CreateMenuComponent } from './pages/owner/menu-details/menus/create-menu/create-menu.component';
import { MenuCardComponent } from './components/owner/menu-details/menu-card/menu-card.component';

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
    HeaderComponent,
    MenusPageComponent,
    CreateMenuComponent,
    MenuCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule

  ],
  providers: [{ 
    provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi:true
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
