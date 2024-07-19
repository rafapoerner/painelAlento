import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

interface Promotion {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

@Component({
  selector: 'app-virtual-store',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './virtual-store.component.html',
  styleUrl: './virtual-store.component.scss'
})


export class VirtualStoreComponent {
  
  @Input() selectedCategoryPromo: string | null = null;

  promotions: Promotion[] = [
    {
      title: 'Promo Balde Lata Amstel',
      description: 'Promoção Balde 5 latas (350ml) Amstel – Display Balcão',
      price: 25.00,
      imageUrl: '/assets/promo-lata-amstel.jpg'
    },
    {
      title: 'Promo Balde Latão Amstel',
      description: 'Promoções Balde 5 Latões Amstel – Display Balcão',
      price: 25.00,
      imageUrl: '/assets/promo-latao-amstel.jpg'
    },
    // Adicione mais promoções conforme necessário
  ];

  filteredPromotions: Promotion[] = [];

  constructor() { }

  ngOnInit(): void {

  }

  filterPromotions(): void {
    if (this.selectedCategoryPromo === 'Loja Virtual') {
      this.filteredPromotions = this.promotions; // Exibir todas as promoções de marketing
    } else {
      this.filteredPromotions = []; // Limpar as promoções se a categoria não for 'Marketing'
    }
  }

}
