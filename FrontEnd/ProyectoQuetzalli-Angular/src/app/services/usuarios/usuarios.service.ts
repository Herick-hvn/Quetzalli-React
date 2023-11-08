import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Usuarios } from 'src/app/Interfaces/usuarios';
import { Personas } from 'src/app/Interfaces/personas';
import { PersonaConUsuario } from 'src/app/Interfaces/personaConUsuario';
import { switchMap, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {

  private apiUrl = 'https://localhost:7239/api/Users'; 

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(this.apiUrl);
  }

  addUsuario(usuario: Usuarios): Observable<Usuarios> {
    return this.http.post<Usuarios>(this.apiUrl, usuario);
  }

  updateUsuario(id: number, usuario: Usuarios): Observable<Usuarios> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Usuarios>(url, usuario);
  }

  deleteUsuario(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }


  reactivarUsuario(id: number): Observable<any> {
    return this.getUsuario(id).pipe(
      switchMap((usuario) => {
        if (usuario) {
          usuario.active = 1; // Cambiar el estatus a activo
          return this.updateUsuario(id, usuario); // Actualizar el usuario
        } else {
          throw new Error(`Usuario con ID ${id} no encontrado.`);
        }
      }),
      catchError((error) => {
        console.error('Error al reactivar el usuario:', error);
        return of(null); // Devolver un observable con valor null en caso de error
      })
    );
  }

  getUsuario(id: number): Observable<Usuarios | null> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Usuarios>(url).pipe(
      catchError(() => {
        return of(null); // Devolver null si no se encuentra el usuario
      })
    );
  }
 

  

  addUsuarioYAsociarPersona(usuario: Usuarios, persona: Personas): Observable<any> {
    return this.http.post<Usuarios>(this.apiUrl, usuario).pipe(
      switchMap((usuarioInsertado: Usuarios) => {
        persona.idUsuario = usuarioInsertado.id;
        return this.http.post<Personas>('https://localhost:7239/api/Personas', persona);
      })
    );
  }

  editUsuarioYPersona(id: number, usuario: Usuarios, persona: Personas): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    
    return this.http.put<Usuarios>(url, usuario).pipe(
      switchMap((usuarioActualizado: Usuarios) => {
        const personaUrl = `https://localhost:7239/api/Personas/${persona.idpersona}`;
        return this.http.put<Personas>(personaUrl, persona);
      })
    );
  }

  getPersonasWithUsuarios(): Observable<PersonaConUsuario[]> {
    return this.http.get<Personas[]>('https://localhost:7239/api/Personas').pipe(
      switchMap((personas) => {
        return this.getUsuarios().pipe(
          map((usuarios) => {
            const personasConUsuarios: PersonaConUsuario[] = [];
  
            personas.forEach((persona) => {
              const usuario = usuarios.find((u) => u.id === persona.idUsuario);
              if (usuario) {
                const personaConUsuario: PersonaConUsuario = {
                  idpersona: persona.idpersona,
                  nombre: persona.nombre,
                  apellidoP: persona.apellidoP,
                  apellidoM: persona.apellidoM,
                  telefono: persona.telefono,
                  idUsuario: persona.idUsuario,
                  usuario: usuario,
                };
                personasConUsuarios.push(personaConUsuario);
              }
            });
  
            return personasConUsuarios;
          })
        );
      })
    );
  }

  getPersonaWithUsuarioById(id: number): Observable<PersonaConUsuario | null> {
    return this.http.get<Personas[]>('https://localhost:7239/api/Personas').pipe(
      switchMap((personas) => {
        return this.getUsuarios().pipe(
          map((usuarios) => {
            const persona = personas.find((p) => p.idpersona === id);
            if (!persona) {
              return null; // No se encontró la persona con el ID dado
            }
            
            const usuario = usuarios.find((u) => u.id === persona.idUsuario);
            if (!usuario) {
              return null; // No se encontró el usuario asociado a la persona
            }
            
            const personaConUsuario: PersonaConUsuario = {
              idpersona: persona.idpersona,
              nombre: persona.nombre,
              apellidoP: persona.apellidoP,
              apellidoM: persona.apellidoM,
              telefono: persona.telefono,
              idUsuario: persona.idUsuario,
              usuario: usuario,
            };
            console.log(personaConUsuario);
  
            return personaConUsuario;
          })
        );
      })
    );
  }
  
  
}
