import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }
  canActivate(): boolean {
    const role = this.authService.getRole();

    if (role === 'admin') {
      return true;
    }

    // Redirect to a "permission denied" page if the user is not authorized
    this.router.navigate(['/permission-denied']);
    return false;
  }
}
