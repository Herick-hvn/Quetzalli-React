import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { SettingsComponent } from './settings/settings.component';
import { InventarioComponent } from './inventario/inventario.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { InsumosComponent } from './insumos/insumos.component';
import { VentasComponent } from './ventas/ventas.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RecetasComponent } from './recetas/recetas.component';
import { authGuard } from '../shared/guard/auth/auth.guard';
import { PedidosComponent } from './pedidos/pedidos.component';
import { AgregarRecetasComponent } from './agregar-recetas/agregar-recetas.component';
import { ProductosRecetaComponent } from './productos-receta/productos-receta.component';



const routes: Routes = [
  {
    path: 'Layout',
    component: LayoutComponent,
    canMatch:[authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'inventory', component: InventarioComponent },
      { path: 'suppliers', component: ProveedoresComponent },
      { path: 'inputs', component: InsumosComponent },
      { path: 'sales', component: VentasComponent },
      { path: 'users', component: UsuariosComponent },
      {path: 'recetas', component: RecetasComponent },
      { path: 'pedidos', component: PedidosComponent },
      { path: 'agregarReceta', component: AgregarRecetasComponent },//borrrar luego es para las receta
      { path: 'productosRecetas', component: ProductosRecetaComponent },
      
    ],
  },
  

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
