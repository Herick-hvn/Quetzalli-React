import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginQComponent } from './login-q/login-q.component';
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';
import { LandingPageClienteComponent } from './landing-page-cliente/landing-page-cliente.component';
import { authGuard } from './shared/guard/auth/auth.guard';


const routes: Routes = [
  // Página de inicio
  { path: '', redirectTo: 'LandingPageComponent', pathMatch: 'full' },
  { path: 'LandingPageComponent', component: LandingPageComponent },

  // Login
  { path: 'LoginComponent', component: LoginQComponent },
  
  // Crear cuenta
  { path: 'CrearCuentaComponent', component: CrearCuentaComponent },

  // Dashboard Administrador
  {
    path: 'Layout',
    loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule),
  },

   // Crear cuenta
   { path: 'LandingPageCliente',canMatch:[authGuard], component: LandingPageClienteComponent },



];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
