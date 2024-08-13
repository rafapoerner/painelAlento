import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { PanelUserService } from '../../services/panel-user.service';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { TopMenuComponent } from '../../components/top-menu/top-menu.component';
import { CommonModule } from '@angular/common';
import { LinksBIComponent } from '../../components/links-bi/links-bi.component';
import { WebMailComponent } from '../../components/web-mail/web-mail.component';
import { DegustOneComponent } from '../../components/degust-one/degust-one.component';
import { MenuboardPostsComponent } from '../marketing/menuboard-posts/menuboard-posts.component';
import { VirtualStoreComponent } from '../marketing/virtual-store/virtual-store.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, SideBarComponent, TopMenuComponent,
    LinksBIComponent, WebMailComponent, RouterOutlet,
    DegustOneComponent, MenuboardPostsComponent, VirtualStoreComponent]
})
export class DashboardComponent implements OnInit {
  userName: string | null = null;
  isAdmin: boolean = false;
  fotoBase64: string = '';
  powerBILinks: { url: string, description: string, imageName: string }[] = [];
  selectedCategory: string | null = null;
  filteredPowerBILinks: { url: string; description: string; imageName: string }[] = [];
  showIframe: boolean = true;

  constructor(
    private router: Router,
    private panelUserService: PanelUserService
  ) { }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    const userString = sessionStorage.getItem('user');
    if (userString) {
      const userEmail = userString.replace(/"/g, '');
      this.carregarUsuario(userEmail);
    }
  }

  carregarUsuario(userEmail: string): void {
    this.panelUserService.getUserByEmail(userEmail).subscribe(
      (usuario: any) => {
        if (usuario) {
          this.userName = usuario.userName;
          this.fotoBase64 =
            'https://painelalentoapi.alentointeligencia.com.br/api/identity/image/' +
            usuario.fotoBase64;
          this.mapearImagensParaLinks(usuario.powerBILinks);
        }
      },
      (error: any) => {
        console.error('Erro ao carregar usuário:', error);
      }
    );
  }

  mapearImagensParaLinks(links: { url: string; description: string }[]): void {
    if (links) {
      this.powerBILinks = links.map((link) => ({
        url: link.url,
        description: link.description,
        imageName: this.getNomeImagemPorLink(link.description),
      }));
    }
  }

  getNomeImagemPorLink(imageName: string): string {
    imageName = imageName.trim();
    if (imageName === 'Acompanhamento Lojas Novas') {
      return 'newStore.png';
    } else if (imageName === 'Resumo Executivo') {
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
    } else if (imageName === 'Degust One') {
      return 'degust_linx.jpeg';
    } else if (imageName === 'Drive') {
      return 'google_drive.png';
    } else if (imageName === 'Web Mail BTG') {
      return 'btgLojas.jpeg';
    } else if (imageName === 'Resumo DayPart') {
      return 'dayPart.png';
    } else {
      return 'default_icon.png';
    }
  }

  // Método para filtrar os cards para cada item do menu
  selectCategory(category: string) {
    this.selectedCategory = category;
    this.showIframe = false;
    console.log('Categoria selecionada:', this.selectedCategory);
    if (this.selectedCategory === 'B.I.') {
      this.filteredPowerBILinks = this.powerBILinks.filter(link => {
        return !['Web Mail BTG', 'Degust One', 'Drive'].includes(link.description);
      });
    } else if (this.selectedCategory === 'Emails') {
      this.filteredPowerBILinks = this.powerBILinks.filter(link => link.description === 'Web Mail BTG');
    } else if (this.selectedCategory === 'Degust One') {
      this.filteredPowerBILinks = this.powerBILinks.filter(link => link.description === 'Degust One');
    } else if (this.selectedCategory === 'Menuboard Posts') {
      this.filteredPowerBILinks = this.powerBILinks.filter(link => link.description === 'Drive');
    } else {
      this.filteredPowerBILinks = this.powerBILinks;
    }
  }

  onLinkClicked(url: string): void {
    console.log('Dashboard Redirecionando para:', url);
    const encodedUrl = encodeURIComponent(url);
    this.router.navigate(['/powerbi-view', { url: encodedUrl }]);
  }

  logout(): void {
    sessionStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
