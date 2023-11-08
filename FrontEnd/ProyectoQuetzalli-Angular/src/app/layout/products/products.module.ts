import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductosFilterPipe } from 'src/app/Filters/productos-filter.pipe';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalAgregarProductoComponent } from './components/modal-agregar-producto/modal-agregar-producto.component';
import { ModalEditarProductoComponent } from './components/modal-edita-producto/modal-editar-producto.component';
import { ModalEliminarProductoComponent } from './components/modal-eliminar-producto/modal-eliminar-producto.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [
    ProductsComponent,
    ProductosFilterPipe,
    ModalAgregarProductoComponent,
    ModalEditarProductoComponent,
    ModalEliminarProductoComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    AlertModule.forRoot(),
  ]
})
export class ProductsModule { }
