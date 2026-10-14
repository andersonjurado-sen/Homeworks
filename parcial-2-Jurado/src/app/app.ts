import { Component } from '@angular/core';
import { AuthService } from './services/auth';
import { Login } from './components/login/login';
import { TreeExplorer } from './components/tree-explorer/tree-explorer';

@Component({
  selector: 'app-root',
  imports: [Login, TreeExplorer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(protected auth: AuthService) {}
}