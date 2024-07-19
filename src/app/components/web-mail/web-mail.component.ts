import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-web-mail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './web-mail.component.html',
  styleUrl: './web-mail.component.scss'
})
export class WebMailComponent {
  @Input() selectedCategory: string | null = null;
  @Input() powerBILinks: { url: string; description: string; imageName: string }[] = [];
  @Output() linkClicked = new EventEmitter<string>();

  filteredLinks(): { url: string; description: string; imageName: string }[] {
    if (this.selectedCategory === 'Emails') {
      return this.powerBILinks;
    }
    return this.powerBILinks.filter(
      (link) => link.description === this.selectedCategory
    );
  }

  onLinkClick(url: string): void {
    console.log('Emails Emitting link:', url);
    this.linkClicked.emit(url);
  }
}
