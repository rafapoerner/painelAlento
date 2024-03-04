import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PanelUserService } from '../../services/panel-user.service';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class DashboardComponent implements OnInit {

  usuarios: any[] = [];
  userName: string | null = null;
  isAdmin: boolean = false;

  constructor(private router: Router, private panelUserService: PanelUserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadUserData();
    this.carregarUsuarios();
  }

  loadUserData(): void {
    const userString = sessionStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      const userEmail = user.userToken?.email || '';
      this.authService.login(userEmail).subscribe(
        () => {
          this.panelUserService.getUserByEmail(userEmail).subscribe(
            (userData) => {
              const loggedInUser = userData.find((u: { email: string }) => u.email === userEmail);
              if (loggedInUser && loggedInUser.userName) {
                this.userName = loggedInUser.userName;
                this.isAdmin = this.checkIfUserIsAdmin(userEmail);
              }
            },
            (error) => {
              console.error('Erro ao obter informações do usuário:', error);
            }
          );
        },
        (error) => {
          console.error('Erro ao autenticar usuário:', error);
        }
      );
    }
  }

  carregarUsuarios(): void {
    this.panelUserService.getUsuarios().subscribe(
      (usuarios) => {
        this.usuarios = usuarios;
      },
      (error) => {
        console.error('Erro ao carregar usuários:', error);
      }
    );
  }

  redirectToPowerBi(link: string): void {
    window.location.href = link;
  }

  checkIfUserIsAdmin(email: string): boolean {
    const adminEmails = ['marcelotheo@grupoalento.com.br', 'rafaelcoutinho@grupoalento.com.br'];
    return adminEmails.includes(email);
  }

  logout(): void {
    sessionStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
