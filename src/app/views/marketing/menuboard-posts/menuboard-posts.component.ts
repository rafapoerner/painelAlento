import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-menuboard-posts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menuboard-posts.component.html',
  styleUrl: './menuboard-posts.component.scss'
})
export class MenuboardPostsComponent {

  @Input() selectedCategory: string | null = null;
  @Input() powerBILinks: { url: string; description: string; imageName: string }[] = [];
  @Output() linkClicked = new EventEmitter<string>();

  filteredLinks(): { url: string; description: string; imageName: string }[] {
    if (this.selectedCategory === 'Menuboard Posts') {
      return this.powerBILinks;
    }
    return this.powerBILinks.filter(
      (link) => link.description === this.selectedCategory
    );
  }

  onLinkClick(url: string): void {
    console.log('Menuboard Post Emitting link:', url);
    this.linkClicked.emit(url);
  }
}
