import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './shared/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.auth.isAuthenticated()) {
      return true;
    }
    this.auth.logout();
    this.router.navigate(['/auth'], {
      queryParams: {
        loginAgain: true,
      },
    });
    return false;
  }
}
