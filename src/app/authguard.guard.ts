import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { fromEventPattern } from 'rxjs';
import { ServicesService } from './services/services.service';

@Injectable({
    providedIn: 'root'
})

export class AuthguardGuard implements CanActivate {
    constructor(private apiService: ServicesService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
            const user = this.apiService.userVal;
            if (user) {
                return true;
            } else{
                this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
                return false;
            }
        }

}

