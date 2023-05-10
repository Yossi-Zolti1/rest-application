import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardManager implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }
  canActivate(): boolean {
    const role = this.authService.getRole();

    if (role === 'manager') {
      return true;
    }

    // Redirect to a "home page" page if the user is not authorized
    this.router.navigate(['']);
    return false;
  }
}
