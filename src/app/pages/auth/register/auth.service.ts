import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Firebase Authentication
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth = inject(Auth); // Inyectamos Firebase Auth

  constructor() { }

  // Método para iniciar sesión con correo electrónico y contraseña
  login(email: string, password: string) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Método para cerrar sesión
  logout() {
    const auth = getAuth();
    return auth.signOut();
  }
}
