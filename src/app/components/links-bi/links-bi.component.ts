import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-links-bi',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './links-bi.component.html',
  styleUrls: ['./links-bi.component.scss']
})
export class LinksBIComponent {
  @Input() selectedCategory: string | null = null;
  @Input() powerBILinks: { url: string; description: string; imageName: string }[] = [];
  @Output() linkClicked = new EventEmitter<string>();

  filteredLinks(): { url: string; description: string; imageName: string }[] {
    if (this.selectedCategory === 'B.I.') {
      return this.powerBILinks;
    }
    return this.powerBILinks.filter(
      (link) => link.description === this.selectedCategory
    );
  }

  onLinkClick(url: string): void {
    console.log('LinksBI Emitting link:', url);
    this.linkClicked.emit(url);
  }
}
