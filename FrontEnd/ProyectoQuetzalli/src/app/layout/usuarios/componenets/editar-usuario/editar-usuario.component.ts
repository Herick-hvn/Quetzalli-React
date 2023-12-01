import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/services/usuarios/usuarios.service';
import { Personas } from 'src/app/Interfaces/personas';
import { Usuarios } from 'src/app/Interfaces/usuarios';
import { PersonaConUsuario } from 'src/app/Interfaces/personaConUsuario';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent {
  usuario: Usuarios = { id: 0, email: '', password: '', rol: '', active: 1 }; // Valores iniciales ficticios para Usuarios
  persona: Personas = { idpersona: 0, nombre: '', apellidoP: '', apellidoM: '', telefono: '', idUsuario: 0 }; // Valores iniciales ficticios para Personas


  constructor(
    private usuariosService: UsuariosService,
    public dialogRef: MatDialogRef<EditarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: number }
  ) {
    this.obtenerUsuarioYPersona(data.userId);
  }

  obtenerUsuarioYPersona(id: number): void {
    this.usuariosService.getPersonaWithUsuarioById(id).subscribe(
      (personaConUsuario: PersonaConUsuario | null) => { // Agregamos el tipo | null aquí
        if (personaConUsuario !== null) {
          this.usuario = personaConUsuario.usuario;
          this.persona = {
            idpersona: personaConUsuario.idpersona,
            nombre: personaConUsuario.nombre,
            apellidoP: personaConUsuario.apellidoP,
            apellidoM: personaConUsuario.apellidoM,
            telefono: personaConUsuario.telefono,
            idUsuario: personaConUsuario.idUsuario
          };
          console.log(this.usuario)
          console.log(this.persona)
          
        } else {
          console.error('No se pudo obtener la información del usuario y la persona.');
        }
      },
      (error) => {
        console.error('Error al obtener la información del usuario y la persona:', error);
      }
    );
    
  }

  guardarCambios(): void {
    this.usuariosService.editUsuarioYPersona(this.usuario.id, this.usuario, this.persona).subscribe(
      () => {
        alert('Usuario y persona actualizados exitosamente');
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error al actualizar usuario y persona:', error);
        alert('No se pudo actualizar el usuario y la persona');
      }
    );
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  formularioValido(): boolean {
    return this.usuario && this.persona ? true : false;
  }
}
