import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PanelUserService } from '../../services/panel-user.service';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';
import { UserProfile, UserRole } from '../../models/userProfile';  // Ajuste o caminho conforme necessário

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class DashboardComponent implements OnInit {

  usuarios: UserProfile[] = [];
  usuario: UserProfile[] = [];
  userName: string | null = null;
  isAdmin: boolean = false;
  fotoBase64: string = '';
  powerBILinks: { url: string, description: string, imageName: string }[] = [];

  constructor(private router: Router, private panelUserService: PanelUserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    const userString = sessionStorage.getItem('user');
    if (userString) {
      const userEmail = userString.replace(/"/g, '');

      this.carregarUsuario(userEmail);
      // this.carregarLinksUsuario(userEmail)
    }
  }

  carregarUsuario(userEmail: string): void {
    this.panelUserService.getUserByEmail(userEmail).subscribe(
      (usuario: any) => {
        console.log("Dados do usuário:", usuario);
        if (usuario) {
          this.userName = usuario.userName;
          this.isAdmin = this.checkIfUserIsAdmin(userEmail);
          this.fotoBase64 = 'https://painelalentoapi.alentointeligencia.com.br/api/identity/image/' + usuario.fotoBase64;
          this.powerBILinks = usuario.powerBILinks
          this.mapearImagensParaLinks(usuario.powerBILinks);
        }
        // console.log("links", usuario.powerBILinks)
      },
      (error) => {
        console.error('Erro ao carregar usuário:', error);
      }
    );
  }

  mapearImagensParaLinks(links: { url: string, description: string }[]): void {
    if (links) {
      this.powerBILinks = links.map(link => ({
        url: link.url,
        description: link.description,
        imageName: this.getNomeImagemPorLink(link.description)
      }));
      console.log("Power BI Links mapeados:", this.powerBILinks);
    }
  }

  getNomeImagemPorLink(imageName: string): string {
    imageName = imageName.trim()
    if (imageName === "Acompanhamento Lojas Novas") {
      return 'newStore.png';
    } else if (imageName === "Resumo Executivo") {
      return 'resumo_executivo.png';
    } else if (imageName === 'Marketing') {
      return 'marketing.png';
    } else if (imageName === 'Delivery') {
      return 'ifood.png';
    } else if (imageName === 'Gente & Gestão') {
      return 'gente_gestao.png';
    } else if (imageName === 'Painel Alento') {
      return 'resumoExecutivo.png';
    } else if (imageName === 'Faturamento Lojas - Braza') {
      return 'braza_pt.jpeg';
    } else if (imageName === 'Delivery Braza') {
      return 'braza_delivery.jpeg';
    } else if (imageName === 'Formulário de Lançamento') {
      return 'lancamento_formulario.png';
    } else {
      return 'default_icon.png'; 
    }
  }
  



  atualizarUrlFoto(email: string, photoUrl: string): void {
    const usuario = this.usuarios.find(u => u.email === email);
    if (usuario) {
      usuario.fotoBase64 = photoUrl;
    }
  }

  redirectToPowerBi(encodedUrl: string): void {
    this.router.navigate(['/powerbi-view/:url', { url: encodedUrl }]);
  }

  logout(): void {
    sessionStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  checkIfUserIsAdmin(email: string): boolean {
    const adminEmails = ['marcelotheo@grupoalento.com.br', 'rafaelcoutinho@grupoalento.com.br'];
    return adminEmails.includes(email);
  }
}
