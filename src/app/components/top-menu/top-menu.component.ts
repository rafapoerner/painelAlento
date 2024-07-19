import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PanelUserService } from '../../services/panel-user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class TopMenuComponent implements OnInit {
  isAdmin: boolean = false;
  fotoBase64: string = '';
  userName: string | null = null;
  powerBILinks: { url: string, description: string, imageName: string }[] = [];

  constructor(private router: Router, private panelUserService: PanelUserService) { }

  ngOnInit(): void {
    this.loadUserData();
  }

  logout(): void {
    if (this.router.url.includes('/dashboard')) {
      sessionStorage.removeItem('user');
      this.router.navigate(['/login']);
    } else if (this.router.url.includes('/panel-user')) {
      this.router.navigate(['/dashboard']);
    }
  }

  loadUserData(): void {
    const userString = sessionStorage.getItem('user');
    if (userString) {
      const userEmail = userString.replace(/"/g, '');

      this.loadUser(userEmail);
    }
  }

  loadUser(userEmail: string): void {
    this.panelUserService.getUserByEmail(userEmail).subscribe(
      (user: any) => {
        if (user) {
          this.userName = user.userName;
          this.isAdmin = this.checkIfUserIsAdmin(userEmail);
          this.fotoBase64 = 'https://painelalentoapi.alentointeligencia.com.br/api/identity/image/' + user.fotoBase64;
          // this.mapImagesToLinks(user.powerBILinks);
        }
      },
      (error) => {
        console.error('Erro ao carregar usuário:', error);
      }
    );
  }

  checkIfUserIsAdmin(email: string): boolean {
    const adminEmails = [
      'marcelotheo@grupoalento.com.br',
      'rafaelcoutinho@grupoalento.com.br',
      'andrezzarodrigues@grupoalento.com.br'
    ];
    return adminEmails.includes(email);
  }

}
