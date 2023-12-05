import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { Personas } from 'src/app/Interfaces/personas';
import { Usuarios } from 'src/app/Interfaces/usuarios';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.scss']
})
export class AgregarUsuarioComponent {
  constructor(private usuariosService: UsuariosService, public dialogRef: MatDialogRef<AgregarUsuarioComponent>) {}

  crearCuenta(): void {
    // Obtener los valores del formulario y crear los objetos de Usuario y Persona
    const firstName = (document.getElementById('firstname') as HTMLInputElement).value;
    const lastName = (document.getElementById('lastname') as HTMLInputElement).value;
    const email = (document.getElementById('correo') as HTMLInputElement).value;
    const phoneNumber = (document.getElementById('number') as HTMLInputElement).value;
    const materno = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const rol = (document.getElementById('rol') as HTMLInputElement).value;

    const nuevoUsuario: Usuarios = {
      id: 0,
      email: email,
      password: password,
      rol: rol,
      active: 1,
    };

    const nuevaPersona: Personas = {
      idpersona: 0,
      nombre: firstName,
      apellidoP: lastName,
      apellidoM: materno,
      telefono: phoneNumber,
      idUsuario: 0,
    };

    // Llamar al servicio para crear el usuario y asociar la persona
    this.usuariosService.addUsuarioYAsociarPersona(nuevoUsuario, nuevaPersona).subscribe(
      () => {
        alert('La cuenta se creó correctamente');
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error al crear cuenta:', error);
        alert('No se pudo crear la cuenta');
      }
    );
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  formularioValido(): boolean {
    const firstname = (document.getElementById('firstname') as HTMLInputElement).value;
    const lastname = (document.getElementById('lastname') as HTMLInputElement).value;
    const email = (document.getElementById('correo') as HTMLInputElement).value;
    const correo = (document.getElementById('correo') as HTMLInputElement).value;
    const rol = (document.getElementById('rol') as HTMLSelectElement).value;
    const number = (document.getElementById('number') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    return firstname && lastname && email && correo && rol && number && password ? true : false;
  }
}
