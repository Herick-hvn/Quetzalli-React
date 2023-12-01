import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public pushRightClass: string = "";
    public userEmail: string = "";

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit() {
        this.pushRightClass = 'push-right';
        this.userEmail = localStorage.getItem('userEmail') || '';
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLogout() {
        this.authService.logout();
        // Redirigir a la página de inicio de sesión después de cerrar sesión
        this.router.navigate(['/LoginComponent']);
    }
}
