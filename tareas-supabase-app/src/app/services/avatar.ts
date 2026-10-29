import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {
  private sb = inject(SupabaseService).client;
  private readonly bucket = 'avatars';
  private readonly nombre = 'avatar';

  async obtenerUrl(): Promise<string> {
    const id = await this.userId();
    if (!id) return '';

    const { data } = await this.sb.storage.from(this.bucket).list(id);
    const existe = data?.some(f => f.name === this.nombre);

    return existe ? this.urlPublica(id) : '';
  }

  async subir(file: File): Promise<string> {
    const id = await this.userId();
    if (!id) throw new Error('Debes iniciar sesión.');

    const { error } = await this.sb.storage
      .from(this.bucket)
      .upload(`${id}/${this.nombre}`, file, {
        upsert: true,
        contentType: file.type
      });

    if (error) throw error;

    return this.urlPublica(id);
  }

  private async userId(): Promise<string | null> {
    const { data } = await this.sb.auth.getSession();
    return data.session?.user.id ?? null;
  }

  private urlPublica(id: string): string {
    const { data } = this.sb.storage
      .from(this.bucket)
      .getPublicUrl(`${id}/${this.nombre}`);

    return `${data.publicUrl}?t=${Date.now()}`;
  }
}