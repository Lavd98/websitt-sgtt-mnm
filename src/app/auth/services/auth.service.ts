import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);  
  private mostrar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); 
  private usuario: BehaviorSubject<string> = new BehaviorSubject<string>("");   
  private password: BehaviorSubject<string> = new BehaviorSubject<string>("");   

  constructor(
    private router: Router
  ) { }

  login(
    user
    ) {
    if (user.userName !== '' && user.password !== '' ) {
      this.loggedIn.next(true);
      this.mostrar.next(false);
      this.usuario.next(user.userName);
      this.password.next(user.password);
      this.router.navigate(['/subsistema']);
    }
  }

  logout() {
    this.loggedIn.next(false);
    this.mostrar.next(false);
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
