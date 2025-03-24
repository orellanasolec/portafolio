import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BarraComponent } from "./barra/barra.component";
import { HabilidadesComponent } from "./habilidades/habilidades.component";
import { HomeComponent } from "./home/home.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BarraComponent, HabilidadesComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'orellanaportafolio';
}
