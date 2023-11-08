import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, forkJoin, map, of, switchMap } from 'rxjs';
import { Material, RecetaPulsera } from 'src/app/Interfaces/recetaPulsera';


@Injectable({
  providedIn: 'root'
})
export class RecetasService {

  private apiUrl = 'https://localhost:7239/api/RecetaPulseras'; // Actualiza la URL según la ubicación de tu API

  constructor(private http: HttpClient) { }

  getRecetas(): Observable<RecetaPulsera[]> {
    return this.http.get<RecetaPulsera[]>(this.apiUrl);
  }

  addReceta(receta: RecetaPulsera): Observable<RecetaPulsera> {
    return this.http.post<RecetaPulsera>(this.apiUrl, receta);
  }

  updateReceta(id: number, receta: RecetaPulsera): Observable<RecetaPulsera> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<RecetaPulsera>(url, receta);
  }

  deleteReceta(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  reactivarReceta(id: number): Observable<any> {
    return this.getReceta(id).pipe(
      switchMap((receta) => {
        if (receta) {
          receta.estatus = '1'; // Cambiar el estado a "1" (activo)
          return this.updateReceta(id, receta); // Actualizar la receta
        } else {
          throw new Error(`Receta con ID ${id} no encontrada.`);
        }
      }),
      catchError((error) => {
        console.error('Error al reactivar la receta:', error);
        return of(null); // Devolver un observable con valor null en caso de error
      })
    );
  }

  getReceta(id: number): Observable<RecetaPulsera | null> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<RecetaPulsera>(url).pipe(
      catchError(() => {
        return of(null); // Devolver null si no se encuentra la receta
      })
    );
  }

  addRecetaAndMaterials(receta: RecetaPulsera, pulseraMateriales: any[]): Observable<RecetaPulsera> {
    return this.http.post<RecetaPulsera>(this.apiUrl, receta).pipe(
      switchMap((recetaAgregada) => {
        const pulseraMaterialObservables = pulseraMateriales.map((pulseraMaterial) => {
          pulseraMaterial.idRecetaPulsera = recetaAgregada.idRecetaPulsera;
          return this.http.post<any>('https://localhost:7239/api/PulseraMateriales', pulseraMaterial);
        });
        return forkJoin(pulseraMaterialObservables).pipe(
          map(() => recetaAgregada)
        );
      })
    );
  }

  updateRecetaAndMaterials(receta: RecetaPulsera, pulseraMateriales: Material[]): Observable<RecetaPulsera> {
    const url = `${this.apiUrl}/${receta.idRecetaPulsera}`;
    console.log(pulseraMateriales)
  
    // Primero, actualiza la receta
    return this.http.put<RecetaPulsera>(url, receta).pipe(
      switchMap(() => {
        const pulseraMaterialObservables = pulseraMateriales.map((pulseraMaterial) => {
          // Asegúrate de modificar correctamente el id de la receta en cada material
          pulseraMaterial.idRecetaPulsera = receta.idRecetaPulsera;
          // Luego, actualiza cada material individualmente
          return this.http.put<Material>(`https://localhost:7239/api/PulseraMateriales/${pulseraMaterial.idPulseraMaterial}`, pulseraMaterial);
        });
  
        // Una vez que se actualizan los materiales, devuelve la receta actualizada
        return forkJoin(pulseraMaterialObservables).pipe(
          map(() => receta)
        );
      })
    );
  }
  
  
  getRecetaAndMaterials(id: number): Observable<RecetaPulsera | undefined> {
    const recetaUrl = `${this.apiUrl}/${id}`;
    const materialesUrl = `https://localhost:7239/api/PulseraMateriales?recetaId=${id}`;
  
    return this.http.get<RecetaPulsera>(recetaUrl).pipe(
      switchMap((receta) => {
        return this.http.get<Material[]>(materialesUrl).pipe(
          map((materiales) => {
            receta.materiales = materiales.filter(material => material.idRecetaPulsera === receta.idRecetaPulsera);
            return receta;
          }),
          catchError(() => {
            return of(undefined); // Manejar el caso en que no se puedan obtener los materiales
          })
        );
      })
    );
  }
  
  
}
