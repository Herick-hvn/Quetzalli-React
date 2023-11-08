import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosProductosService } from '../services/Productos/servicios-productos.service';
import { Productos } from '../Interfaces/productos';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {

  images = [
    'https://picsum.photos/800/600/?random',
    'https://picsum.photos/800/600/?random',
    'https://picsum.photos/800/600/?random',
    'https://picsum.photos/800/600/?random'
  ];

  listaProductos: Productos[]
  listaProductos2: Productos[]

  currentImageIndex = 0;
  imageWidth: number=180;
  imageMargin: number=50;


  constructor(private router: Router,private ServiceProductos: ServiciosProductosService) {
    this.listaProductos = [];
    this.listaProductos2 = [];
    this.CargarProductos()
  }

  
  public CargarProductos() {
    this.ServiceProductos.getProductos(`https://localhost:7239/api/Productos`).subscribe(respuesta => {
      let arrayRespuesta ;
      arrayRespuesta = respuesta as any[];


      for (let i = 8; i < 14; i++) {//Se agregan los datos a la lista de productos

        const puntoIndex = arrayRespuesta[i].descripcion.indexOf('.');
        if (puntoIndex !== -1) {
           this.listaProductos.push({
            "idproductos": arrayRespuesta[i].idproductos,
            "nombreProducto": arrayRespuesta[i].nombreProducto,
            "descripcion": arrayRespuesta[i].descripcion.substring(0, puntoIndex + 1),
            "foto": arrayRespuesta[i].foto,
            "costoProduccion": arrayRespuesta[i].costoProduccion,
            "precioVenta": arrayRespuesta[i].precioVenta,
            "observaciones": arrayRespuesta[i].observaciones,
            "idStock": arrayRespuesta[i].idStock,
            "estatus": arrayRespuesta[i].estatus
          });
        }
      }
    })
  }

  changeBirdImage(direction: string): void {
    if (direction === 'prev') {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
    } else if (direction === 'next') {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    }
  }

  imgslider(image: string): void {
    const starbucksImg = document.querySelector(".quetzalli") as HTMLImageElement;
    starbucksImg.src = image;
  }

  changeBackgroundColor(color: string): void {
    const circle = document.querySelector(".circle") as HTMLElement;
    circle.style.background = color;
  }

  navigateToLogin() {
    this.router.navigateByUrl('/LoginComponent');
  }

}
