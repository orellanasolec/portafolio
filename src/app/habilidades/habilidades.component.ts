import { Component, OnInit, OnDestroy, Inject, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-habilidades',
  standalone: true,
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit, OnDestroy {

  tecnologias: string[] = ['Tailwind', 'Git', 'Docker', 'Nest', 'Angular', 'Bootstrap', 'Javascript', 'MySql'];
  porcentajes:number[] =[10,20,30,40,50,60,70,80]
  progreso: number =50;
  contador: number = 0;
  mensaje: string = this.tecnologias[this.contador];
  intervalId: any;
  isBrowser: boolean;
  contador2:number=0;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId); // Verifica si está en el navegador
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.iniciarCambioDeMensaje(); // Solo inicia el temporizador en el navegador
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId); // Limpia el intervalo al destruir el componente
      this.intervalId = null;
    }
  }

  iniciarCambioDeMensaje() {
    // Cambia el mensaje inmediatamente
    this.mensaje = this.tecnologias[this.contador];
    this.progreso=this.porcentajes[this.contador];
    this.contador = (this.contador + 1) % this.tecnologias.length;

    // Usa setInterval para cambiar el mensaje cada 10 segundos
    this.intervalId = setInterval(() => {
      this.progreso=this.porcentajes[this.contador];
      this.mensaje = this.tecnologias[this.contador];
      this.contador = (this.contador + 1) % this.tecnologias.length;
      this.contador2++;
      this.cdr.detectChanges(); // Forzar la detección de cambios manualmente
    }, 10000); // 10000ms = 10 segundos
  }
}