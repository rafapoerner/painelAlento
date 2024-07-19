import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { PanelUserService } from "./services/panel-user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLogged$: Observable<boolean> = this.isLoggedSubject.asObservable();

  constructor(private userService: PanelUserService) { }

  login(email: string): Observable<any> {
    return this.userService.getUserByEmail(email).pipe(
      tap((userData: any[]) => {
        const authenticatedUser = userData.find((user: any) => user.email === email);
        if (authenticatedUser && authenticatedUser.email) {
          console.log('Usuário autenticado:', authenticatedUser.email);
          sessionStorage.setItem('user', JSON.stringify(authenticatedUser)); // Salva o usuário no sessionStorage
          this.isLoggedSubject.next(true); // Atualiza o estado de autenticação para true
        } else {
          console.log('Usuário não encontrado');
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

  logout(): void {
    sessionStorage.removeItem('user'); // Remove o usuário do sessionStorage ao fazer logout
    this.isLoggedSubject.next(false); // Atualiza o estado de autenticação para false ao fazer logout
  }
}
