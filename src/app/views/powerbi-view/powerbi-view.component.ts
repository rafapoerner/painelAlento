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
    this.route.paramMap.subscribe(params => {
      const url = params.get('url');
      console.log('URL received:', url); // Este log vai confirmar o que estamos recebendo
      if (url) {
        // Não há necessidade de decodificar base64 aqui. Apenas sanitize e use.
        this.reportUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      } else {
        console.error('URL parameter is missing');
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
