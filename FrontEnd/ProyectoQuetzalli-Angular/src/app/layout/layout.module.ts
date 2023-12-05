import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { InsumosComponent } from './insumos/insumos.component';
import { InventarioComponent } from './inventario/inventario.component';
import { VentasComponent } from './ventas/ventas.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsModule } from './products/products.module';
import { RecetasComponent } from './recetas/recetas.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDialogModule } from '@angular/material/dialog';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { AgregarUsuarioComponent } from './usuarios/componenets/agregar-usuario/agregar-usuario.component';
import { EditarUsuarioComponent } from './usuarios/componenets/editar-usuario/editar-usuario.component';
import { EditarProveedorComponent } from './proveedores/componenets/editar-proveedor/editar-proveedor.component';
import { AgregarProveedorComponent } from './proveedores/componenets/agregar-proveedor/agregar-proveedor.component';
import { AgregarInsumoComponent } from './insumos/componenets/agregar-insumo/agregar-insumo.component';
import { EditarInsumoComponent } from './insumos/componenets/editar-insumo/editar-insumo.component';
import { AgregarRecetaComponent } from './recetas/componenets/agregar-receta/agregar-receta.component';
import { EditarRecetaComponent } from './recetas/componenets/editar-receta/editar-receta.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { AgregarRecetasComponent } from './agregar-recetas/agregar-recetas.component';
import { ProductosRecetaComponent } from './productos-receta/productos-receta.component';
import { EditarproductorecetaComponent } from './productos-receta/components/editarproductoreceta/editarproductoreceta.component';
import { AgregarProductoRecetaComponent } from './productos-receta/components/agregarproductoreceta/agregarproductoreceta.component';
import { NgChartsModule  as Ng2Charts } from 'ng2-charts';
import { EditarpedidoComponent } from './pedidos/components/editarpedido/editarpedido.component';




@NgModule({
  declarations: [
    LayoutComponent,
    BodyComponent,
    SidenavComponent,
    DashboardComponent,
    SettingsComponent,
    InsumosComponent,
    InventarioComponent,
    VentasComponent,
    UsuariosComponent,
    RecetasComponent,
    HeaderComponent,
    ProveedoresComponent,
    AgregarUsuarioComponent,
    EditarUsuarioComponent,
    AgregarProveedorComponent,
    EditarProveedorComponent,
    AgregarInsumoComponent,
    EditarInsumoComponent,
    AgregarRecetaComponent,
    EditarRecetaComponent,
    PedidosComponent,
    AgregarRecetasComponent,
    ProductosRecetaComponent,
    EditarproductorecetaComponent,
    AgregarProductoRecetaComponent,
    EditarpedidoComponent

  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    HttpClientModule,
    FormsModule,
    ProductsModule,
    NgbModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatSelectModule, 
    Ng2Charts


    
  ],
  exports: [
    LayoutComponent,
  ],
  bootstrap: [LayoutComponent]
})
export class LayoutModule { }
