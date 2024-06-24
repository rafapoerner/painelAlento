import { Observable, BehaviorSubject, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { PanelUserService } from "./services/panel-user.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isLoggedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isLogged$: Observable<boolean> = this.isLoggedSubject.asObservable();

    constructor(private userService: PanelUserService) { }

    login(email: string): Observable<any> {
        return this.userService.getUserByEmail(email).pipe(
            tap((userData) => {
                const authenticatedUser = userData.find((user: any) => user.email === email);
                if (authenticatedUser && authenticatedUser.email) {
                    console.log('Usuário autenticado:', authenticatedUser.email);
                    this.isLoggedSubject.next(true); // Atualiza o estado de autenticação para true
                } else {
                    this.isLoggedSubject.next(false); // Atualiza o estado de autenticação para false
                }
            }),
            catchError((error) => {
                console.error('Erro ao fazer login:', error);
                return throwError(error);
            })
        );
    }

    isAuthenticated(): boolean {
        const user = sessionStorage.getItem('user');
        return user !== null; // Retorna true se o usuário estiver autenticado (se o item 'user' estiver definido no sessionStorage)
    }
    

    getUserByEmail(email: string): Observable<any> {
        return this.userService.getUserByEmail(email).pipe(
            tap((userData) => {
                const authenticatedUser = userData.find((user: any) => user.email === email);
                if (authenticatedUser && authenticatedUser.email) {
                    console.log('Usuário autenticado:', authenticatedUser.email);
                    this.isLoggedSubject.next(true); // Atualiza o estado de autenticação para true
                } else {
                    console.log('Usuário não autenticado');
                    this.isLoggedSubject.next(false); // Atualiza o estado de autenticação para false
                }
            }),
            catchError((error) => {
                console.error('Erro ao fazer login:', error);
                return throwError(error);
            })
        );
    }


    logout() {
        this.isLoggedSubject.next(false); // Atualiza o estado de autenticação para false ao fazer logout
    }
}
