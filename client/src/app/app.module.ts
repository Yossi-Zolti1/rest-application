import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page/home-page.component';
import { LoginComponent } from './pages/login/login/login.component';
import { RegisterComponent } from './pages/register/register/register.component';
import { HeaderComponent } from './components/header/header/header.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RegisterOwnerComponent } from './components/admin/registerOwner/register-owner/register-owner.component';
import { Interceptor } from './services/http.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    RegisterOwnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{ 
    provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi:true
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
