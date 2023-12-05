import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { Insumo } from 'src/app/Interfaces/Insumo';

@Injectable({
  providedIn: 'root'
})
export class InsumosService {

  private apiUrl = 'https://localhost:7239/api/Insumos'; // Actualiza la URL según la ubicación de tu API

  constructor(private http: HttpClient) { }

  getInsumos(): Observable<Insumo[]> {
    return this.http.get<Insumo[]>(this.apiUrl);
  }

  addInsumo(insumo: Insumo): Observable<Insumo> {
    return this.http.post<Insumo>(this.apiUrl, insumo);
  }

  updateInsumo(id: number, insumo: Insumo): Observable<Insumo> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Insumo>(url, insumo);
  }

  deleteInsumo(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  reactivarInsumo(id: number): Observable<any> {
    return this.getInsumo(id).pipe(
      switchMap((insumo) => {
        if (insumo) {
          insumo.estatus = '1'; // Cambiar el estado a "1" (activo)
          return this.updateInsumo(id, insumo); // Actualizar el insumo
        } else {
          throw new Error(`Insumo con ID ${id} no encontrado.`);
        }
      }),
      catchError((error) => {
        console.error('Error al reactivar el insumo:', error);
        return of(null); // Devolver un observable con valor null en caso de error
      })
    );
  }

  getInsumo(id: number): Observable<Insumo | null> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Insumo>(url).pipe(
      catchError(() => {
        return of(null); // Devolver null si no se encuentra el insumo
      })
    );
  }
}
