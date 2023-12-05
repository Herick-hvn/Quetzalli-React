import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LandingPageClienteComponent } from '../landing-page-cliente/landing-page-cliente.component';

@Component({
    selector: 'app-header-cliente',
    templateUrl: './header-cliente.component.html',
    styleUrls: ['./header-cliente.component.scss']
})
export class HeaderClienteComponent implements OnInit {
    public pushRightClass?: string;
    contador: any;
    producto?: any[]
    carrito2: any[]
    pp: any[];
    botton: boolean
    cantidadPulsera?: number;
    cantidadInputs: { [idProducto: number]: number } = {};
    totalPagar: number;
    arrayTotal:any;

    constructor(public router: Router, private landing: LandingPageClienteComponent) {
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
                this.toggleSidebar();
            }
        });
        this.carrito2 = []
        this.botton = false
        this.pp = [];
        this.totalPagar = 0;
        this.arrayTotal=[];

    }

    cantidadInput(idProducto: number): void {
        this.cantidadInputs[idProducto] = this.cantidadInputs[idProducto] || 0;

        

        const cantidad = this.cantidadInputs[idProducto]; // Acceder a la cantidad
        const datosProduCarrito = {
            "cantidad": cantidad,
            "idProducto": idProducto
        }
        if (!this.landing.produHeader.some((item: { idProducto: number; }) => item.idProducto === idProducto)) {
            this.landing.produHeader.push(datosProduCarrito);
        } else {
            const indiceProducto = this.landing.produHeader.findIndex((producto: { idProducto: number; }) => producto.idProducto === idProducto);
            if (indiceProducto !== -1) {
                this.landing.produHeader[indiceProducto].cantidad = cantidad;
            }
        }

        const productoEncontrado = this.carrito2.find(producto => producto.idproductos === idProducto);
        const productoCantidad = this.landing.produHeader.find((producto: { idProducto: number; }) => producto.idProducto === idProducto);

        if (productoEncontrado && productoCantidad) {
            const semiTotal={
                "idProducto":productoCantidad.idProducto,
                "TotalProducto":productoEncontrado.precioVenta*productoCantidad.cantidad
            };

            if (!this.arrayTotal.some((item: { idProducto: number; }) => item.idProducto === idProducto)) {
                this.arrayTotal.push(semiTotal);
            } else {
                const indiceProducto2 = this.arrayTotal.findIndex((producto: { idProducto: number; }) => producto.idProducto === idProducto);
                if (indiceProducto2 !== -1) {
                    this.arrayTotal[indiceProducto2].TotalProducto = productoEncontrado.precioVenta*productoCantidad.cantidad;
                }
            }
            let totalPagar2 = 0;
            for (var s = 0; s < this.arrayTotal.length; s++) {
                totalPagar2 += this.arrayTotal[s].TotalProducto;
            }
            this.totalPagar=totalPagar2
        }
    }



    ngOnInit() {

        this.pushRightClass = 'push-right';
        setInterval(() => {
            this.contador = this.landing.contadorCarrito;
        }, 2000);
    }

    ProductosCarrito() {

        this.carrito2 = this.landing.carrito;

        this.carrito2.forEach(producto => {
            const idProducto = producto.idproductos;

            if (this.landing.produHeader[idProducto]) {
                this.landing.produHeader[idProducto].cantidad = 0;

                this.cantidadInputs[idProducto] = 0; // Asigna 0 como valor inicial
            }
        });

        if (this.carrito2.length > 0) {
            this.botton = true;
        }

    }

    eliminarProductoCarrito(valor: any) {
        this.landing.carrito = this.carrito2.filter(item => item.nombreProducto !== valor);
        this.carrito2 = this.landing.carrito
        if (this.carrito2.length == 0) {
            this.botton = false
        }
        this.contador = this.contador - 1
        this.landing.contadorCarrito = this.contador
        this.cantidadInputs = {}
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        if (this.pushRightClass) {
          dom.classList.toggle(this.pushRightClass);
        }
      }
      
      isToggled(): boolean {
        const dom: Element | null = document.querySelector('body');
        return dom?.classList.contains(this.pushRightClass || '') || false;
      }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }


}
