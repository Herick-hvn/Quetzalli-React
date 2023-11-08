import { Pipe, PipeTransform } from '@angular/core';
import { Productos } from '../Interfaces/productos';

@Pipe({
  name: 'ProductosFilter'
})
export class ProductosFilterPipe implements PipeTransform {

    transform(value: Productos[], args: string): Productos[] {
        let filter: string = args ? args.toLocaleLowerCase() : '';
        return filter ? value.filter((producto: Productos) =>
          producto.nombreProducto.toLocaleLowerCase().includes(filter) ||
          producto.idproductos.toString().includes(filter) ||
          producto.estatus.toString().includes(filter)
        ) : value;
      }

}