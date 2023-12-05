import { DataSource } from '@angular/cdk/collections';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, ReplaySubject } from 'rxjs';
import { Insumo } from 'src/app/Interfaces/Insumo';
import { RecetaPulsera } from 'src/app/Interfaces/recetaPulsera';
import { InsumosService } from 'src/app/services/insumos/insumos.service';
import { RecetasService } from 'src/app/services/recetas/recetas.service';

interface RecetaElement {
  selectedInsumo: Insumo | null;
  cantidad: number;
  cantidadOriginal: number; // Nueva propiedad
}

@Component({
  selector: 'app-editar-receta',
  templateUrl: './editar-receta.component.html',
  styleUrls: ['./editar-receta.component.scss']
})
export class EditarRecetaComponent implements OnInit {
  displayedColumns: string[] = ['nombreInsumo', 'precio', 'unidad', 'cantidad'];
  dataToDisplay: RecetaElement[] = [];
  dataSource = new ExampleDataSource(this.dataToDisplay);
  insumos: Insumo[] = [];
  changesPending: boolean = false;
  costoProduccionTotal: number = 0;
  receta!: RecetaPulsera; // Agrega el signo de exclamación aquí
  originalReceta: RecetaPulsera = { ...this.receta }; // Almacena los datos originales de la receta

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { recetaId: number },
    private recetasService: RecetasService,
    private insumosService: InsumosService,
    public dialogRef: MatDialogRef<EditarRecetaComponent>
  ) { }

  ngOnInit() {
    this.loadInsumos();
    this.receta = {
      idRecetaPulsera: 0,
      nombre: '',
      descripcion: '',
      foto: '',
      costoProduccion: 0,
      precioVenta: 0,
      observaciones: '',
      estatus: '1',
      materiales: []
    }; // Inicializa receta como un objeto vacío
  
    this.recetasService.getRecetaAndMaterials(this.data.recetaId).subscribe(
      (receta) => {
        if (receta) {
          // Actualiza la variable receta con los datos obtenidos del servicio
          this.receta = receta;
          console.log(this.receta);
  
          // Filtra y mapea los materiales utilizando la variable receta actualizada
          this.receta.materiales = receta.materiales?.filter(material => {
            const isInsumoValid = this.insumos.some(insumo => insumo.idinsumo === material.idMaterial);
            return isInsumoValid && material.idRecetaPulsera === receta.idRecetaPulsera;
          }) || [];
  
          this.dataToDisplay = this.receta.materiales.map(material => {
            const selectedInsumo = this.insumos.find(insumo => insumo.idinsumo === material.idMaterial);
            return {
              selectedInsumo: selectedInsumo || null,
              cantidad: material.cantidad,
              cantidadOriginal: material.cantidad
            };
          });
  
          this.dataSource.setData(this.dataToDisplay);
        } else {
          console.error('Receta no encontrada');
        }
      },
      (error) => {
        console.error('Error al obtener receta y materiales:', error);
      }
    );
  }
  


  loadInsumos() {
    this.insumosService.getInsumos().subscribe(insumos => {
      this.insumos = insumos;
    });
  }



  actualizarReceta() {
    if (this.receta && this.receta.materiales) {
      this.recetasService.updateRecetaAndMaterials(this.receta, this.receta.materiales).subscribe(
        (recetaActualizada) => {
          if (recetaActualizada) {
            alert('Receta y materiales actualizados con éxito');
            
            // Actualiza los datos originales con los datos actualizados
            this.originalReceta = { ...this.receta };
          }
        },
        (error) => {
          console.error('Error al actualizar receta y materiales:', error);
        }
      );
    } else {
      console.error('Receta o materiales no cargados aún.');
    }
  }

  onInsumoSelected(element: RecetaElement) {
    if (this.dataToDisplay.length === 0) {
      const selectedInsumo = element.selectedInsumo;
      const newRow: RecetaElement = {
        selectedInsumo: selectedInsumo,
        cantidad: 1,
        cantidadOriginal: 1 // Establecer la cantidad original
      };
      this.dataToDisplay.push(newRow);
      this.dataSource.setData(this.dataToDisplay);
      this.changesPending = true; // Activar cambios pendientes
    }
  }


  addData() {
    const newRow: RecetaElement = {
      selectedInsumo: this.insumos[0],
      cantidad: 1,
      cantidadOriginal: 1 // Establecer la cantidad original
    };
    this.dataToDisplay.push(newRow);
    this.dataSource.setData(this.dataToDisplay);
    this.changesPending = true; // Activar cambios pendientes
  }


  onCantidadChange(element: RecetaElement) {
    if (element.cantidad !== element.cantidadOriginal) {
      this.changesPending = true;
    }
  }


  removeData() {
    if (this.dataToDisplay.length > 0) {
      this.dataToDisplay.pop();
      this.dataSource.setData(this.dataToDisplay);
      this.changesPending = true;
    }
  }

  guardar() {
    // Verificar si hay cantidades negativas
    const hasNegativeQuantity = this.dataToDisplay.some(row => row.cantidad < 0);

    if (hasNegativeQuantity) {
      alert('No puedes agregar cantidades negativas.');
      return;
    }

    // Calcular el costo de producción total
    this.costoProduccionTotal = this.dataToDisplay.reduce((total, row) => {
      const precio = row.selectedInsumo ? row.selectedInsumo.precio : 0; // Manejo de posible valor nulo
      const cantidad = row.cantidad;
      return total + (precio * cantidad);
    }, 0);

    this.changesPending = false; // Reiniciar los cambios pendientes
  }



  formularioValido(): boolean {
    const nombre = (document.getElementById('nombre') as HTMLInputElement).value;
    const descripcion = (document.getElementById('descripcion') as HTMLTextAreaElement).value;

    return nombre && descripcion ? true : false;
  }

  cancelar(): void {
    // Restaura la variable receta con los datos originales
    this.receta = { ...this.originalReceta };
    this.dialogRef.close();
  }
}


class ExampleDataSource extends DataSource<RecetaElement> {
  private _dataStream = new ReplaySubject<RecetaElement[]>();

  constructor(initialData: RecetaElement[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<RecetaElement[]> {
    return this._dataStream;
  }

  disconnect() { }

  setData(data: RecetaElement[]) {
    this._dataStream.next(data);
  }
}