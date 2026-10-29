import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = '';
  clave = '';
  msg = signal('');
  cargando = signal(false);

  async entrar(): Promise<void> {
    if (!this.datosValidos()) return;

    this.cargando.set(true);
    const { error } = await this.auth.entrar(this.email, this.clave);
    this.cargando.set(false);

    if (error) {
      this.msg.set(error.message);
    } else {
      this.router.navigate(['/tareas']);
    }
  }

  async registrar(): Promise<void> {
    if (!this.datosValidos()) return;

    this.cargando.set(true);
    const { data, error } = await this.auth.registrar(this.email, this.clave);
    this.cargando.set(false);

    if (error) {
      this.msg.set(error.message);
    } else if (data.session) {
      this.router.navigate(['/tareas']);
    } else {
      this.msg.set('Cuenta creada. Revisa tu correo para confirmarla.');
    }
  }

  private datosValidos(): boolean {
    if (!this.email.trim() || !this.clave) {
      this.msg.set('Escribe correo y contraseña.');
      return false;
    }
    this.msg.set('');
    return true;
  }
}