import { Component } from '@angular/core';
import { CityPeople } from './components/city-people/city-people';
import { GraphChart } from './components/graph-chart/graph-chart';
import { GraphForms } from './components/graph-forms/graph-forms';

@Component({
  selector: 'app-root',
  imports: [GraphForms, CityPeople, GraphChart],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}