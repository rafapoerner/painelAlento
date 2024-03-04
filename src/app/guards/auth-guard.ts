import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(): boolean {
        const isAuthenticated = this.authService.isAuthenticated();
        console.log('Verificando se está false ou true na authGuard: =>', isAuthenticated);
        if (!isAuthenticated) {
            console.log('Usuário não autenticado, redirecionando para o login');
            this.router.navigate(['/login']);
            return false;
        } else {
            console.log('Usuário autenticado, permitindo acesso à rota');
            return true;
        }
    }
    
}
