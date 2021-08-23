import { Injectable } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

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
