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
            const routeurl : string = state.url;
            return this.isLogin(routeurl);
    }
    
    isLogin(routeurl: string) {
        if (this.apiService.isLoggedIn()){
            return true;
        }
        this.apiService.redirect_URL = routeurl;
        this.router.navigate(['/login'], {queryParams: { returnUrl: routeurl }} );
    }




}

