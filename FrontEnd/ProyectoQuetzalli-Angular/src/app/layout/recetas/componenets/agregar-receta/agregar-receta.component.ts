import { Component, ChangeDetectorRef } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, ReplaySubject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { InsumosService } from 'src/app/services/insumos/insumos.service';
import { Insumo } from 'src/app/Interfaces/Insumo';
import { RecetaPulsera } from 'src/app/Interfaces/recetaPulsera';
import { RecetasService } from 'src/app/services/recetas/recetas.service';
import { MatDialogRef } from '@angular/material/dialog';

interface RecetaElement {
  selectedInsumo: Insumo;
  cantidad: number;
  cantidadOriginal: number; // Nueva propiedad
}

@Component({
  selector: 'app-agregar-receta',
  templateUrl: './agregar-receta.component.html',
  styleUrls: ['./agregar-receta.component.scss']
})


export class AgregarRecetaComponent {
  displayedColumns: string[] = ['nombreInsumo', 'precio', 'unidad', 'cantidad'];
  dataToDisplay: RecetaElement[] = [];
  dataSource = new ExampleDataSource(this.dataToDisplay);
  insumos: Insumo[] = [];
  changesPending: boolean = false;
  costoProduccionTotal: number = 0;
  

  constructor(
    private insumosService: InsumosService,
    private recetasService: RecetasService, // Agrega esta línea
    public dialogRef: MatDialogRef<AgregarRecetaComponent>
  ) {}
  
  ngOnInit() {

    this.loadInsumos();
   
  }

  loadInsumos() {
    this.insumosService.getInsumos().subscribe(insumos => {
      this.insumos = insumos;
    });
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
      const precio = row.selectedInsumo.precio;
      const cantidad = row.cantidad;
      return total + (precio * cantidad);
    }, 0);
  
    this.changesPending = false; // Reiniciar los cambios pendientes
  }
  agregar() {
    if (this.formularioValido() && this.costoProduccionTotal > 0) {
      const nombreReceta = (document.getElementById('nombre') as HTMLInputElement).value;
      const descripcionReceta = (document.getElementById('descripcion') as HTMLTextAreaElement).value;
  
      const nuevaReceta: RecetaPulsera = {
        idRecetaPulsera: 0,
        nombre: nombreReceta,
        descripcion: descripcionReceta,
        foto: '', 
        costoProduccion: this.costoProduccionTotal,
        precioVenta: parseFloat((document.getElementById('precioVenta') as HTMLInputElement).value),
        observaciones: '',
        estatus: '1',
      };
  
      const pulseraMateriales = this.dataToDisplay.map((row) => ({
        idMaterial: row.selectedInsumo.idinsumo,
        cantidad: row.cantidad
      }));
  
      this.recetasService.addRecetaAndMaterials(nuevaReceta, pulseraMateriales).subscribe(
        (recetaAgregada: any) => {
          if (recetaAgregada) {
            alert('Receta y materiales agregados con éxito:')
            // Realiza otras acciones si es necesario
          }
        },
        (error: any) => {
          console.error('Error al agregar receta y materiales:', error);
        }
      );
    } else {
      console.log('Formulario no válido o costo de producción incorrecto');
    }
  }
  

  formularioValido(): boolean {
    const nombre = (document.getElementById('nombre') as HTMLInputElement).value;
    const descripcion = (document.getElementById('descripcion') as HTMLTextAreaElement).value;

    return nombre && descripcion  ? true : false;
  }

  
  cancelar(): void {
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

  disconnect() {}

  setData(data: RecetaElement[]) {
    this._dataStream.next(data);
  }
}
