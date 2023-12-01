import { Usuarios } from "./usuarios";

export interface PersonaConUsuario {
  idpersona: number;
  nombre: string;
  apellidoP: string;
  apellidoM: string;
  telefono: string;
  idUsuario: number;
  usuario: Usuarios;
}
