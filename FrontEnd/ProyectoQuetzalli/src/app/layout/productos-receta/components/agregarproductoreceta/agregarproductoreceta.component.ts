import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RecetaPulsera, Material } from 'src/app/Interfaces/recetaPulsera';
import { ProductosRecetasService } from 'src/app/services/productosRecetas/productos-recetas.service';
import { RecetasService } from 'src/app/services/recetas/recetas.service';
import { InsumosService } from 'src/app/services/insumos/insumos.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, combineLatest, of } from 'rxjs';
import { Insumo } from 'src/app/Interfaces/Insumo';
import { Productos } from 'src/app/Interfaces/productos';

@Component({
  selector: 'app-agregarproductoreceta',
  templateUrl: './agregarproductoreceta.component.html',
  styleUrls: ['./agregarproductoreceta.component.scss']
})
export class AgregarProductoRecetaComponent implements OnInit {
  recetas: RecetaPulsera[] = [];
  selectedRecetaId: number = 0;
  cantidad: number = 0;
  foto: string = ''; // Cambiar esto según cómo manejes la foto
  insumos: Insumo[] = []; // Agrega esta línea
  true=true
  cantidadProduccion: number = 0; // Agregar esta línea
  
  constructor(
    private recetasService: RecetasService,
    private productosRecetasService: ProductosRecetasService,
    private insumosService: InsumosService,
    public dialogRef: MatDialogRef<AgregarProductoRecetaComponent>
  ) {}

  ngOnInit(): void {
    this.obtenerRecetas();
  }

  obtenerRecetas(): void {
    this.recetasService.getRecetas().subscribe(
      (recetas) => {
        this.recetas = recetas;
      },
      (error) => {
        console.error('Error al obtener recetas:', error);
      }
    );
  }

  crearProductoReceta(): void {
    if (this.formularioValido()) {
      this.recetasService.getReceta(this.selectedRecetaId).subscribe(
        (selectedReceta) => {
          if (selectedReceta) {
            if (this.true) {
              this.cantidadProduccion = this.cantidad;
              console.log(this.cantidadProduccion)
              const nombreArchivo = this.foto.replace(/^.*\\/, '');
              const rutaArchivo = 'assets/imagenesProductos/' + nombreArchivo;
              const nuevoProductoReceta: Productos = {
                idproductos: 0,
                nombreProducto: selectedReceta.nombre,
                descripcion: selectedReceta.descripcion,
                costoProduccion: selectedReceta.costoProduccion,
                precioVenta: selectedReceta.precioVenta,
                estatus: '1',
                observaciones: selectedReceta.observaciones,
                foto: rutaArchivo,
                cantidad: this.cantidad
              };

              
    
              this.productosRecetasService.addProducto(nuevoProductoReceta).subscribe(
                () => {
                  alert('El producto receta se agregó correctamente');
                  this.realizarProduccion();
                },
                (error: any) => {
                  console.error('Error al agregar producto receta:', error);
                  alert('No se pudo agregar el producto receta');
                }
              );
            } else {
              alert('No hay suficientes insumos para la producción');
            }
          } else {
            alert('Selecciona una receta válida');
          }
        },
        (error) => {
          console.error('Error al obtener la receta:', error);
          alert('No se pudo obtener la receta');
        }
      );
    } else {
      alert('Completa los campos requeridos');
    }
  }
  

  cancelar(): void {
    this.dialogRef.close();
  }

  formularioValido(): boolean {
    return (
      this.selectedRecetaId > 0 &&
      this.cantidad > 0 &&
      this.foto !== '' // Cambiar esta validación si la foto es opcional
    );
  }

  realizarProduccion(): void {
    this.recetasService.getRecetaAndMaterials(this.selectedRecetaId).subscribe(
      (receta) => {
        if (receta) {
          if (this.verificarInsumosSuficientes(receta)) {
            this.actualizarInsumos(receta);
            
          } else {
            alert('No hay suficientes insumos para la producción');
          }
        } else {
          alert('No se pudo obtener la receta y los materiales');
        }
      },
      (error) => {
        console.error('Error al obtener receta y materiales:', error);
      }
    );
  }

  verificarInsumosSuficientes(receta: RecetaPulsera): boolean {
    let insumosSuficientes = true; // Suponemos inicialmente que los insumos son suficientes
  
    if (receta.materiales && receta.materiales.length > 0) {
      for (const material of receta.materiales) {
        this.insumosService.getInsumo(material.idMaterial).subscribe(
          (insumo) => {
            if (!insumo || insumo.cantidad < material.cantidad * this.cantidad) {
              console.log('No hay suficientes insumos para este material:', material.idMaterial);
              insumosSuficientes = false; // Cambiamos el estado a falso si no hay suficientes insumos
            }
          },
          (error) => {
            console.error('Error al obtener insumo:', error);
          }
        );
      }
    } else {
      console.warn('La receta no tiene materiales definidos.');
      return false; // La receta no tiene materiales definidos
    }
  
    return insumosSuficientes; // Devolvemos el estado de suficiencia de insumos
  }
  
  
  

  actualizarInsumos(receta: RecetaPulsera): void {
    const cantidadProduccion = this.cantidad; // Guardamos el valor de cantidad en una variable local
  
    let suficientesInsumos = true; // Variable para controlar si hay suficientes insumos
  
    receta.materiales?.forEach((material) => {
      if (material.idRecetaPulsera === receta.idRecetaPulsera) {
        this.insumosService.getInsumo(material.idMaterial).subscribe(
          (insumo) => {
            if (insumo) {
              const cantidadNueva = insumo.cantidad - material.cantidad * cantidadProduccion; // Usamos la variable local aquí
              console.log(`Insumo: ${insumo.nombreInsumo}, Cantidad nueva: ${cantidadNueva}`);
              if (cantidadNueva >= 0) {
                insumo.cantidad = cantidadNueva;
                this.insumosService.updateInsumo(insumo.idinsumo, insumo).subscribe(
                  () => {
                    alert(`Cantidad actualizada de insumo ${insumo.nombreInsumo}`);
                  },
                  (error) => {
                    alert(`Error al actualizar insumo ${insumo.nombreInsumo}:`);
                    suficientesInsumos = false; // Marcamos que no hay suficientes insumos
                  }
                );
              } else {
                alert(`No hay suficiente insumo ${insumo.nombreInsumo} para la producción.`);
                suficientesInsumos = false; // Marcamos que no hay suficientes insumos
              }
            }
          },
          (error) => {
            alert(`Error al obtener insumo con ID ${material.idMaterial}:`);
            suficientesInsumos = false; // Marcamos que no hay suficientes insumos
          }
        );
      }
    });
  
    // Llamamos a crearProductoReceta() solo si hay suficientes insumos

  }

  cantidadProduct():number{
    const cantidadProduccion = this.cantidad;
    return cantidadProduccion
  }
  
}
