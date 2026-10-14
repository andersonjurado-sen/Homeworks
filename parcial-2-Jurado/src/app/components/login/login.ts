import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
  password = '';
  error = signal<string>('');
  loading = signal<boolean>(false);

  constructor(private authService: AuthService) {}

  async onLogin(): Promise<void> {
    await this.run(() => this.authService.login(this.email, this.password));
  }

  async onRegister(): Promise<void> {
    await this.run(() => this.authService.register(this.email, this.password));
  }

  private async run(action: () => Promise<void>): Promise<void> {
    if (!this.email.trim() || !this.password) {
      this.error.set('Escribe correo y contraseña.');
      return;
    }

    this.error.set('');
    this.loading.set(true);

    try {
      await action();
    } catch (e: any) {
      this.error.set(this.translate(e?.code));
    } finally {
      this.loading.set(false);
    }
  }

  private translate(code: string): string {
    const messages: Record<string, string> = {
      'auth/invalid-credential': 'Correo o contraseña incorrectos.',
      'auth/invalid-email': 'El correo no es válido.',
      'auth/email-already-in-use': 'Ese correo ya está registrado.',
      'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.'
    };
    return messages[code] ?? 'Ocurrió un error. Intenta de nuevo.';
  }
}
