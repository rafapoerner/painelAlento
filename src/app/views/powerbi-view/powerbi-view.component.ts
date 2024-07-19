import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-powerbi-view',
  templateUrl: './powerbi-view.component.html',
  styleUrls: ['./powerbi-view.component.scss']
})
export class PowerBiViewComponent implements OnInit {
  reportUrl: SafeResourceUrl;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {
    // Inicializa a URL de forma segura e vazia
    this.reportUrl = this.sanitizer.bypassSecurityTrustResourceUrl('about:blank');
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const url = params['url'];
      console.log('URL received:', url); // Este log vai confirmar o que estamos recebendo
      if (url) {
        const decodedUrl = decodeURIComponent(url);
        console.log('Decoded URL:', decodedUrl); // Log para a URL decodificada
        this.reportUrl = this.sanitizer.bypassSecurityTrustResourceUrl(decodedUrl);
      } else {
        console.error('URL parameter is missing');
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
