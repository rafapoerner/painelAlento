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
  fotoBase64: string = ''

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
              const loggedInUser = userData.find((u: any) => u.email === userEmail);
              if (loggedInUser && loggedInUser.userName) {
                this.userName = loggedInUser.userName;
                this.isAdmin = this.checkIfUserIsAdmin(userEmail);
                this.fotoBase64 = 'https://painelalentoapi.alentointeligencia.com.br/api/identity/image/' + loggedInUser.fotoBase64;
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

  atualizarUrlFoto(email: string, photoUrl: string): void {
    const usuario = this.usuarios.find(u => u.email === email)
    if (usuario) {
      usuario.photoUrl = photoUrl
    }
  }

  redirectToPowerBi(encodedUrl: string): void {
    this.router.navigate(['/powerbi-view/:url', { url: encodedUrl }]);
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
