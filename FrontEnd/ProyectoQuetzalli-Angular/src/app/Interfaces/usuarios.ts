import { Personas } from "./personas";

export interface Usuarios {
    id: number;
    email: string;
    password: string;
    rol: string;
    active: number;
  }
  
  export interface UsuarioConPersona {
    id: number;
    email: string;
    password: string;
    rol: string;
    active: number;
    persona: Personas; 
  }