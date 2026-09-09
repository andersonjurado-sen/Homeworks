import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  SinglyLinkedList,
  DoublyLinkedList,
  CircularLinkedList,
  DoublyCircularLinkedList
} from './models/linked-lists';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  pacientesEspera = new SinglyLinkedList<string>();
  historialAtencion = new DoublyLinkedList<string>();
  medicosGuardia = new CircularLinkedList<string>();
  comiteAdmin = new DoublyCircularLinkedList<{ cargo: string; nombre: string }>();
  comiteActual: { cargo: string; nombre: string } | null = null;

siguienteComite(): void {
  this.comiteActual = this.comiteAdmin.next();
}

anteriorComite(): void {
  this.comiteActual = this.comiteAdmin.prev();
}
  medicoActual: string | null = null;
  nuevoPaciente: string = '';
  private timerId: any;

  ngOnInit(): void {
    ['Doctor Anderson', 'Doctor Fidencio', 'Doctora Jennifer'].forEach(m => this.medicosGuardia.add(m));
    this.medicoActual = this.medicosGuardia.current?.value || null;

    [
      { cargo: 'Director', nombre: 'Pepe' },
      { cargo: 'Subdirectora', nombre: 'Nicol' },
      { cargo: 'Gerente', nombre: 'Cristiano Messi' }
    ].forEach(c => this.comiteAdmin.add(c));
    this.comiteActual = this.comiteAdmin.getCurrent();

    ['Yeison Gutierrez', 'Gustavo Petro', 'Walter White', 'Maria Antonieda de las Nieves'].forEach(p => this.pacientesEspera.enqueue(p));

    this.timerId = setInterval(() => {
      this.medicoActual = this.medicosGuardia.rotate();
    }, 10000);
  }

  ngOnDestroy(): void {
    if (this.timerId) clearInterval(this.timerId);
  }

  agregarPaciente(): void {
    if (this.nuevoPaciente.trim()) {
      this.pacientesEspera.enqueue(this.nuevoPaciente.trim());
      this.nuevoPaciente = '';
    }
  }

  atenderPaciente(): void {
    const paciente = this.pacientesEspera.dequeue();
    if (paciente) {
      const hora = new Date().toLocaleTimeString();
      const registro = `${paciente} (Atendido por: ${this.medicoActual} a las ${hora})`;
      this.historialAtencion.add(registro);
    }
  }
}