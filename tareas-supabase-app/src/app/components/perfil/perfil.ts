import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { AvatarService } from '../../services/avatar';

const MAX_BYTES = 2 * 1024 * 1024;

@Component({
  selector: 'app-perfil',
  imports: [RouterLink],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class Perfil implements OnInit {
  protected auth = inject(AuthService);
  private avatar = inject(AvatarService);

  url = signal('');
  msg = signal('');
  cargando = signal(false);

  async ngOnInit(): Promise<void> {
    this.url.set(await this.avatar.obtenerUrl());
  }

  async subir(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      this.msg.set('El archivo debe ser una imagen.');
      input.value = '';
      return;
    }
    if (file.size > MAX_BYTES) {
      this.msg.set('La imagen no puede pesar más de 2 MB.');
      input.value = '';
      return;
    }

    this.msg.set('');
    this.cargando.set(true);

    try {
      this.url.set(await this.avatar.subir(file));
      this.msg.set('Foto actualizada.');
    } catch (err: any) {
      this.msg.set(err?.message ?? 'No se pudo subir la imagen.');
    } finally {
      this.cargando.set(false);
      input.value = '';
    }
  }
}