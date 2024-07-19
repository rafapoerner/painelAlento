import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { CadastroUsuarioComponent } from './views/cadastro-usuario/cadastro-usuario.component';
import { PanelUserComponent } from './views/panel-user/panel-user.component';
import { AuthGuard } from './guards/auth-guard';
import { PowerBiViewComponent } from './views/powerbi-view/powerbi-view.component';
import { LinksBIComponent } from './components/links-bi/links-bi.component';
import { WebMailComponent } from './components/web-mail/web-mail.component';
import { DegustOneComponent } from './components/degust-one/degust-one.component';
import { MenuboardPostsComponent } from './views/marketing/menuboard-posts/menuboard-posts.component';
import { VirtualStoreComponent } from './views/marketing/virtual-store/virtual-store.component';
import { MarketingFundsComponent } from './views/marketing/marketing-funds/marketing-funds.component';
import { DownloadsComponent } from './views/marketing/downloads/downloads.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'links-bi', component: LinksBIComponent },
      { path: 'web-mail', component: WebMailComponent },
      { path: 'degust-one', component: DegustOneComponent },
      { path: 'loja-virtual', component: VirtualStoreComponent },
      { path: 'fundo-de-marketing', component: MarketingFundsComponent },
      { path: 'downloads', component: DownloadsComponent },
      { path: 'menuboard-posts', component: MenuboardPostsComponent },

    ]
  },
  { path: 'cadastro-usuario', component: CadastroUsuarioComponent, canActivate: [AuthGuard] },
  { path: 'panel-user', component: PanelUserComponent, canActivate: [AuthGuard] },
  { path: 'powerbi-view', component: PowerBiViewComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
