import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }
  canActivate(): boolean {
    const role = this.authService.getRole();
    if (role === 'admin') {
      return true;
    }

    // Redirect to a "home page" page if the user is not authorized
    this.router.navigate(['']);
    return false;
  }
}
