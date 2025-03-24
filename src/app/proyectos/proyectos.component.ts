import { AfterViewInit, Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [],
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.css'
})
export class ProyectosComponent implements AfterViewInit {

  @ViewChild('carrusel') carrusel: any; 
  imagenes:string[]=["peliculas.png","fundacion.png","bandolim.png","magaldi.png"]

  ngAfterViewInit() {
    // Este método se ejecuta después de que la vista está completamente inicializada
    // Aquí puedes hacer manipulaciones directas sobre el carrusel si es necesario
    console.log(this.carrusel); // Verifica si el carrusel se accede correctamente
  }


  cambiarIzquierda(){
   
  
    const primeraImagen = this.imagenes.shift(); // Saca el primer elemento
    if (primeraImagen) {
      this.imagenes.push(primeraImagen); // Añade el elemento al final
  
  }}

  cambiarDerecha(){
    const ultimaImagen = this.imagenes.pop(); // Saca el último elemento
    if (ultimaImagen) {
      this.imagenes.unshift(ultimaImagen); // Añade el elemento al principio
 
  }
}
}

