import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  standalone: true,
  imports:[CommonModule]
})
export class SideBarComponent {

  constructor(private router: Router){}

  @Input() selectedCategory: string | null = null;
  @Input() powerBILinks: any[] = [];
  @Output() categorySelected = new EventEmitter<string>();

  isSidebarClosed = true;
  isMarketingMenuOpen = false;

  toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;
    if (this.isSidebarClosed) {
      this.isMarketingMenuOpen = false; 
    }
  }

  toggleMarketingMenu() {
    this.isMarketingMenuOpen = !this.isMarketingMenuOpen;
  }

  selectCategory(category: string) {
    this.categorySelected.emit(category);
  }

  navigateTo(subCategory: string) {
    switch (subCategory) {
      case 'B.I.':
        this.categorySelected.emit('B.I.');
        console.log('Navegando para B.I.');
         this.router.navigate(['/dashboard/links-bi']);
        break;
      case 'Emails':
        this.categorySelected.emit('Emails');
        console.log('Navegando para Emails');
        this.router.navigate(['/dashboard/web-mail']);
        break;
      case 'Degust One':
        this.categorySelected.emit('Degust One');
        console.log('Navegando para Degust One');
        this.router.navigate(['/dashboard/degust-one']);
        break;
      case 'loja-virtual':
        this.categorySelected.emit('Loja Virtual');
        console.log('Navegando para Loja Virtual');
        this.router.navigate(['/dashboard/loja-virtual']);
        break;
      case 'fundo-de-marketing':
        this.categorySelected.emit('Fundo de Marketing');
        console.log('Navegando para Fundo de Marketing');
        this.router.navigate(['/dashboard/fundo-de-marketing']);
        break;
      case 'menuboard-posts':
        this.categorySelected.emit('Menuboard Posts');
        console.log('Navegando para Menuboard Posts');
        this.router.navigate(['/dashboard/menuboard-posts']);
        break;
      case 'downloads':
        this.categorySelected.emit('Downloads');
        console.log('Navegando para Downloads');
        this.router.navigate(['/dashboard/downloads']);
        break;
      default:
        console.error(`Rota não encontrada para a subcategoria: ${subCategory}`);
    }
  }
  
}
