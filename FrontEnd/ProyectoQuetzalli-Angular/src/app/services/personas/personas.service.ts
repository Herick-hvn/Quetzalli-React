import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Personas } from 'src/app/Interfaces/personas';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  private apiUrl = 'https://localhost:7239/api/Personas';

  constructor(private http: HttpClient) { }

  getPersonas(): Observable<Personas[]> {
    return this.http.get<Personas[]>(this.apiUrl);
  }
  
  addPersona(persona: Personas): Observable<Personas> {
    return this.http.post<Personas>(this.apiUrl, persona);
  }

  updatePersona(id: number, persona: Personas): Observable<Personas> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Personas>(url, persona);
  }

  deletePersona(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
