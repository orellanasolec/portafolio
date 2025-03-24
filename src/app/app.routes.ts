// app.routes.ts
import { Route } from '@angular/router';
import { HabilidadesComponent } from './habilidades/habilidades.component'; // Ruta al componente Habilidades
import { HomeComponent } from './home/home.component'; // Ruta al componente Home
import { ProyectosComponent } from './proyectos/proyectos.component';
import { OtrosComponent } from './otros/otros.component';

// Definir las rutas
export const routes: Route[] = [
  { path: 'habilidades', component: HabilidadesComponent },  // Ruta para el componente Habilidades
  { path: 'home', component: HomeComponent },                // Ruta para el componente Home
  { path: '', redirectTo: '/home', pathMatch: 'full' },      // Ruta por defecto
  { path: 'proyectos', component: ProyectosComponent},
  { path: 'otros', component: OtrosComponent}          
];
