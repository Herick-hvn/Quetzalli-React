import { Pedido } from "./pedido";
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

  export interface UsuarioConPedido {
    id: number;
    email: string;
    password: string;
    rol: string;
    active: number;
    pedido: Pedido; 
  }

  export interface UsuarioConPersonaYPedido {
    id: number;
    email: string;
    password: string;
    rol: string;
    active: number;
    persona: Personas| null;
    pedido: Pedido | null;
  }