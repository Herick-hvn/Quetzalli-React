import { Component } from '@angular/core';
import { UsuariosService } from '../services/usuarios/usuarios.service';
import { Usuarios } from '../Interfaces/usuarios';
import { Personas } from '../Interfaces/personas';


@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.css'],
})
export class CrearCuentaComponent {
  constructor(private usuariosService: UsuariosService) {}

  crearCuenta(event: Event): void {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente

    // Capturar los valores del formulario
    const firstName = (document.getElementById('firstname') as HTMLInputElement).value;
    const lastName = (document.getElementById('lastname') as HTMLInputElement).value;
    const email = (document.getElementById('correo') as HTMLInputElement).value;
    const phoneNumber = (document.getElementById('number') as HTMLInputElement).value;
    const materno = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    // Crear un objeto de Usuario
    const nuevoUsuario: Usuarios = {
      id: 0,
      email: email, // Asegúrate de que 'email' sea una variable previamente definida
      password: password, // Asegúrate de que 'password' sea una variable previamente definida
      rol: 'cliente', 
      active: 1, 
    };
    
    // Crear un objeto de Persona
    const nuevaPersona: Personas = {
      idpersona: 0, // El ID se generará en el servidor
      nombre: firstName,
      apellidoP: lastName,
      apellidoM: materno,
      telefono: phoneNumber,
      idUsuario: 0, // El ID se actualizará después de la inserción del usuario
    };

    // Llamar al servicio para crear el usuario y asociar la persona
    this.usuariosService.addUsuarioYAsociarPersona(nuevoUsuario, nuevaPersona).subscribe(
      () => {
        alert('La cuenta se creó correctamente');
      },
      (error) => {
        // Manejar el error si algo sale mal en la operación
        console.error('Error al crear cuenta:', error);
        alert('No se pudo crear la cuenta');
        // Aquí puedes mostrar un mensaje de error al usuario si lo deseas
      }
    );
  }
}
