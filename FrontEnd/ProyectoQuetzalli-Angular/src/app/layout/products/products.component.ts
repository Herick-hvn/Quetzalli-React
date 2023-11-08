import { Component, OnInit } from '@angular/core';
import { PostProductos, Productos } from 'src/app/Interfaces/productos';
import { ServiciosProductosService } from 'src/app/services/Productos/servicios-productos.service';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  
  listaProductos: Productos[]
  imageWidth: number = 50;
  imageMargin: number = 2;
  listFilter: string = "";
  showAlert: boolean = false;
  showAlertEdit: boolean = false;
  showAlertEliminar: boolean = false;


  constructor(private ServiceProductos: ServiciosProductosService) {
    this.listaProductos = [];
  }
  ngOnInit(): void {
    this.CargarProductos();
  }

  //Función para cargar los productos
  public CargarProductos() {
    this.ServiceProductos.getProductos(`https://localhost:7239/api/Productos`).subscribe(respuesta => {
      let arrayRespuesta;
      arrayRespuesta = respuesta as any[]
      

      for (let i = 0; i < arrayRespuesta.length; i++) {//Se agregan los datos a la lista de productos
        this.listaProductos.push({
          "idproductos": arrayRespuesta[i].idproductos,
          "nombreProducto": arrayRespuesta[i].nombreProducto,
          "descripcion": arrayRespuesta[i].descripcion,
          "foto": arrayRespuesta[i].foto,
          "costoProduccion": arrayRespuesta[i].costoProduccion,
          "precioVenta": arrayRespuesta[i].precioVenta,
          "observaciones": arrayRespuesta[i].observaciones,
          "idStock": arrayRespuesta[i].idStock,
          "estatus": arrayRespuesta[i].estatus
        });
      }

    })
  }

  //Funcion para agregar producto al servidor
  public AgregarProducto(producto: PostProductos[]) {
    var stringProducto
    producto.forEach(element => {
      stringProducto = {
        "nombreProducto": element.nombreProducto,
        "descripcion": element.descripcion,
        "foto": element.foto,
        "costoProduccion": element.costoProduccion,
        "precioVenta": element.precioVenta,
        "observaciones": element.observaciones,
        "idStock": element.idStock,
        "estatus": "1"
      }
    });
    this.ServiceProductos.postProductos(`https://localhost:7239/api/Productos`, stringProducto).subscribe(
      (respuesta) => {
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
          window.location.reload();
        }, 2000);
      },
    );
  }

  //Funcion para editar producto al servidor
  public EditarProducto(productoEditar: any, idP: any) {
    var stringProductoEditar = {
      "idproductos": idP,
      "nombreProducto": productoEditar[0].nombreProducto,
      "descripcion": productoEditar[0].descripcion,
      "foto": productoEditar[0].foto,
      "costoProduccion": productoEditar[0].costoProduccion,
      "precioVenta": productoEditar[0].precioVenta,
      "observaciones": productoEditar[0].observaciones,
      "idStock": productoEditar[0].idStock,
      "estatus": "1"
    }

    const jsonProductoEditar = JSON.stringify(stringProductoEditar);

    this.ServiceProductos.putProductos(`https://localhost:7239/api/Productos/${idP}`, jsonProductoEditar).subscribe(
      (respuesta) => {
        this.showAlertEdit = true;
        setTimeout(() => {
          this.showAlertEdit = false;
          window.location.reload();
        }, 2000);
      },
    );

  }


  //Funcion para eliminar producto al servidor
  public EliminarProducto(productoEliminar: any, idP: any) {

    var stringProductoEliminar = {
      "idproductos": idP,
      "nombreProducto": productoEliminar.nombreProducto,
      "descripcion": productoEliminar.descripcion,
      "foto": productoEliminar.foto,
      "costoProduccion": productoEliminar.costoProduccion,
      "precioVenta": productoEliminar.precioVenta,
      "observaciones": productoEliminar.observaciones,
      "idStock": productoEliminar.idStock,
      "estatus": "0"
    }

    const jsonProductoE = JSON.stringify(stringProductoEliminar);

    this.ServiceProductos.deleteProductos(`https://localhost:7239/api/Productos/${idP}`, jsonProductoE).subscribe(
      (respuesta) => {
        this.showAlertEliminar = true;
        setTimeout(() => {
          this.showAlertEliminar = false;
          window.location.reload();
        }, 2000);
      },
    );

  }



}
