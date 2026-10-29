import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RealtimeChannel } from '@supabase/supabase-js';
import { Tarea } from '../../models/tarea';
import { AuthService } from '../../services/auth';
import { TareasService } from '../../services/tareas';

@Component({
  selector: 'app-tareas',
  imports: [FormsModule, RouterLink],
  templateUrl: './tareas.html',
  styleUrl: './tareas.css'
})
export class Tareas implements OnInit, OnDestroy {
  protected auth = inject(AuthService);
  private srv = inject(TareasService);
  private router = inject(Router);
  private canal?: RealtimeChannel;

  tareas = signal<Tarea[]>([]);
  nueva = '';
  error = signal('');

  async ngOnInit(): Promise<void> {
    await this.cargar();
    this.canal = this.srv.escuchar(() => this.cargar());
  }

  ngOnDestroy(): void {
    if (this.canal) {
      this.srv.detener(this.canal);
    }
  }

  async cargar(): Promise<void> {
    const { data, error } = await this.srv.listar();

    if (error) {
      this.error.set(error.message);
    } else {
      this.tareas.set((data ?? []) as Tarea[]);
    }
  }

  async agregar(): Promise<void> {
    const titulo = this.nueva.trim();
    if (!titulo) return;

    this.error.set('');
    const { error } = await this.srv.crear(titulo);

    if (error) {
      this.error.set(error.message);
    } else {
      this.nueva = '';
    }
  }

  async completar(t: Tarea): Promise<void> {
    const { error } = await this.srv.completar(t.id, !t.completada);
    if (error) this.error.set(error.message);
  }

  async borrar(id: number): Promise<void> {
    const { error } = await this.srv.borrar(id);
    if (error) this.error.set(error.message);
  }

  async salir(): Promise<void> {
    await this.auth.salir();
    this.router.navigate(['/login']);
  }
}