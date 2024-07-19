import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-degust-one',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './degust-one.component.html',
  styleUrl: './degust-one.component.scss'
})
export class DegustOneComponent {
  @Input() selectedCategory: string | null = null;
  @Input() powerBILinks: { url: string; description: string; imageName: string }[] = [];
  @Output() linkClicked = new EventEmitter<string>();

  filteredLinks(): { url: string; description: string; imageName: string }[] {
    if (this.selectedCategory === 'Degust One') {
      return this.powerBILinks;
    }
    return this.powerBILinks.filter(
      (link) => link.description === this.selectedCategory
    );
  }

  onLinkClick(url: string): void {
    console.log('Degust One Emitting link:', url);
    this.linkClicked.emit(url);
  }
}
