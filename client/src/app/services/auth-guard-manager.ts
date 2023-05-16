import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AuthTokenService } from 'src/app/services/auth-token.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardManager implements CanActivate {

  constructor(private authService: AuthTokenService, private router: Router) { }
  canActivate(): boolean {
    const role = this.authService.getRole();

    if (role === 'owner') {
      return true;
    }

    // Redirect to a "home page" page if the user is not authorized
    this.router.navigate(['']);
    return false;
  }
}
