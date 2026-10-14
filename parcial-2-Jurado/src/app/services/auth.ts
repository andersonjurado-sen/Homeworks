import { Injectable, signal } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User
} from 'firebase/auth';
import { auth } from '../firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser = signal<User | null>(null);
  initializing = signal<boolean>(true);

  constructor() {
    onAuthStateChanged(auth, user => {
      this.currentUser.set(user);
      this.initializing.set(false);
    });
  }

  async login(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async register(email: string, password: string): Promise<void> {
    await createUserWithEmailAndPassword(auth, email, password);
  }

  logout(): Promise<void> {
    return signOut(auth);
  }
}