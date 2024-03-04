import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from './auth.service';
import { NgxWebstorageModule } from 'ngx-webstorage';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(), 
    provideAnimations(),
    provideToastr(),
    provideHttpClient(withFetch()),
    AuthService,
    BsModalService,
  ]
};
