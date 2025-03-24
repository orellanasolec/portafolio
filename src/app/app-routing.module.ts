import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importa tus componentes
import { HomeComponent } from './home/home.component';
import { HabilidadesComponent } from './habilidades/habilidades.component';

const routes: Routes = [
  { path: '', component: HomeComponent },  // Ruta por defecto
  { path: 'habilidades', component: HabilidadesComponent },
  // Puedes agregar más rutas según tus necesidades
  { path: '**', redirectTo: '', pathMatch: 'full' } // Ruta de redirección si la URL no coincide
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Este método importa las rutas
  exports: [RouterModule] // Exporta RouterModule para usarlo en otros módulos
})
export class AppRoutingModule { }
