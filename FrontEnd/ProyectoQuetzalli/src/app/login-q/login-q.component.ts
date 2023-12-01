import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login-q',
  templateUrl: './login-q.component.html',
  styleUrls: ['./login-q.component.css'],
})
export class LoginQComponent implements OnInit {
  loginForm!: FormGroup;
  imageUrl: string = './assets/imagenes/LandingPage/logoSF.png';

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private formBuilder: FormBuilder,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required],
    });
  }

  getImageUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.imageUrl);
  }

  onLoggedin() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.userType === 'administrador') {
            this.router.navigate(['/Layout']);
            localStorage.setItem('userEmail', this.loginForm.value.Email);
            localStorage.setItem('userid', res.UserID);
          } else if (res.userType === 'cliente') {
            // Guardar el correo electrónico en el local storage
            localStorage.setItem('userEmail', this.loginForm.value.Email);
            localStorage.setItem('userid', res.userId);
            
            this.router.navigate(['/LandingPageCliente']);
          }
        },
        error: (err) => {
          alert(err?.error.message);
        },
      });
    } else {
      alert('El formulario no es válido');
    }
  }

    navigateToCreateAccount() {
    this.router.navigate(['/CrearCuentaComponent']);
  }
}
