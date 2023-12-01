import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { HttpClientModule } from '@angular/common/http';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MenuComponent } from './menu/menu.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CrearCuentaModule } from './crear-cuenta/crear-cuenta.module';
import { LoginQModule } from './login-q/login-q.module';
import { NotfoundModule } from './notfound/notfound.module';
import { AgregarComponent } from './proveedores/componentes/agregar/agregar.component';
import { ConfirmDialogComponent } from './shared/dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LandingPageClienteModule } from './landing-page-cliente/landing-page-cliente.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap'; // Importa NgbDropdown para utilizar las directivas ngbDropdownToggle y ngbDropdownMenu






@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    MenuComponent,
    AgregarComponent,
    ConfirmDialogComponent,

    
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CrearCuentaModule,
    LoginQModule,
    NotfoundModule,
    MatDialogModule,
    LandingPageClienteModule,
    NgbModule,
    NgbDropdown
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
