import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = "https://localhost:7239/api/Users/";
  private loggedIn = new BehaviorSubject<boolean>(true); //cambiar a true para testear sin guard
  private userType = new BehaviorSubject<string | null>("administrador");//cambiar por "administrador" o "cliente" para testear sin guard

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      this.loggedIn.next(true);
    }
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get userTypeValue() {
    return this.userType.getValue();
  }

  signUp(userObj: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, userObj);
  }

  login(userObj: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}Login`, userObj).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        this.loggedIn.next(true);
        this.userType.next(res.userType);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.userType.next(null);
  }
}
