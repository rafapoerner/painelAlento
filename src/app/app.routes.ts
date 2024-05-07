import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { CadastroUsuarioComponent } from './views/cadastro-usuario/cadastro-usuario.component';
import { PanelUserComponent } from './views/panel-user/panel-user.component';
import { AuthGuard } from './guards/auth-guard';
import { PowerBiViewComponent } from './views/powerbi-view/powerbi-view.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent},
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'cadastro-usuario', component: CadastroUsuarioComponent, canActivate: [AuthGuard] },
    { path: 'panel-user', component: PanelUserComponent, canActivate: [AuthGuard] },
    { path: 'powerbi-view/:url', component: PowerBiViewComponent },
    { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
 