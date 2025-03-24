import { Component, AfterViewInit, OnDestroy, PLATFORM_ID, Inject, ChangeDetectorRef, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { BarraComponent } from "../barra/barra.component";
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  @ViewChild('carrusel', { static: true }) carrusel!: ElementRef;
  @ViewChild('hexagon', { static: true }) hexagon!: ElementRef;
  @ViewChild('monedas', { static: true }) monedas!: ElementRef;
  @ViewChild('moneda1', { static: true }) moneda1!: ElementRef;
  @ViewChild('moneda2', { static: true }) moneda2!: ElementRef;
  @ViewChild('moneda3', { static: true }) moneda3!: ElementRef;
  @ViewChild('contacto', { static: true }) contacto!: ElementRef;
  @ViewChild('sobre', { static: true }) sobre!: ElementRef;
  rotationDegree: number = 0; 
  initialHeight: number = 0;
  
  tecnologias: string[] = ['Tailwind', 'Git', 'Docker', 'Nest', 'Angular', 'Bootstrap', 'Javascript', 'MySql'];
  porcentajes: number[] = [10, 20, 30, 40, 50, 60, 70, 80];
  progreso: number = 50;
  contador: number = 0;
  mensaje: string = this.tecnologias[this.contador];
  intervalId: any;
  isBrowser: boolean;
  contador2: number = 0;
  intersectionObserver!: IntersectionObserver;  // Declarado como propiedad de clase
  intersectionObserver2!: IntersectionObserver; 
  intersectionObserver3!: IntersectionObserver; 

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2 
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId); // Verifica si está en el navegador
  
  }

  ngAfterViewInit(): void {
    if (this.isBrowser && this.carrusel && this.monedas) {
      this.initializeIntersectionObserver();  // Solo inicializa si estamos en el navegador
      this.initializeIntersectionObserver2();
      this.initializeIntersectionObserver3();
   
    }
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.initialHeight = window.innerHeight;
      this.iniciarCambioDeMensaje(); // Solo inicia el temporizador en el navegador
      this.renderer.setStyle(this.hexagon.nativeElement, 'transform', 'rotateY(360deg)');
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId); // Limpia el intervalo al destruir el componente
      this.intervalId = null;
    }

    // Desconectar el IntersectionObserver si existe
    if (this.isBrowser && this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  initializeIntersectionObserver() {
    const options = {
      root: null, // root es el viewport (puedes especificar un contenedor si lo deseas)
      rootMargin: '0px',
      threshold: 0.5 // El elemento debe estar al menos al 50% visible para que se dispare
    };

    // Crear el IntersectionObserver solo si estamos en el navegador
    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
        
          console.log('El carrusel está visible en el viewport');
          this.applyFadeInEffect();
        } else {
          console.log('El carrusel no está visible en el viewport');
          this.removeFadeInEffect();
        }
      });
    }, options);

    // Empezamos a observar el carrusel solo si estamos en el navegador
    if (this.isBrowser) {
      this.intersectionObserver.observe(this.carrusel.nativeElement);
    }
  }

  

  iniciarCambioDeMensaje() {
    // Cambia el mensaje inmediatamente
    this.mensaje = this.tecnologias[this.contador];
    this.progreso = this.porcentajes[this.contador];
    this.contador = (this.contador + 1) % this.tecnologias.length;

    // Usa setInterval para cambiar el mensaje cada 2 segundos
    this.intervalId = setInterval(() => {
      this.progreso = this.porcentajes[this.contador];
      this.mensaje = this.tecnologias[this.contador];
      this.contador = (this.contador + 1) % this.tecnologias.length;
      this.contador2++;
      this.cdr.detectChanges(); // Forzar la detección de cambios manualmente
    }, 2000); // 2000ms = 2 segundos
  }

  cambiarDerecha() {
    this.renderer.setStyle(this.hexagon.nativeElement, 'transform', 'rotateY(0deg)');
    console.log(this.rotationDegree)
    this.rotationDegree -= 60;
 
  }

  cambiarIzquierda() {
    this.rotationDegree += 60;
  }

  applyFadeInEffect() {
    console.log(this.rotationDegree)
    if (this.carrusel) {
      // Establece la opacidad inicial en 0
      this.renderer.setStyle(this.carrusel.nativeElement, 'opacity', '0');
      
      // Usa un setTimeout para simular una animación (puedes ajustar la duración)
      setTimeout(() => {
        this.renderer.setStyle(this.carrusel.nativeElement, 'transition', 'opacity 1s ease-in, transform 0.1s'); // Configura la transición
        this.renderer.setStyle(this.carrusel.nativeElement, 'opacity', '1'); // Cambia la opacidad a 1
        this.renderer.setStyle(this.hexagon.nativeElement, 'transform', 'rotateY(360deg)');
      
        this.renderer.setStyle(this.hexagon.nativeElement, 'transformOrigin', 'center');
        this.rotationDegree= 360; 
        console.log(this.rotationDegree)
        
         
      
      }, 10); // Esto asegura que la transición se aplique después de que la opacidad se haya establecido a 0
    
    }
  }

  removeFadeInEffect() {
    if (this.carrusel) {
     
      this.rotationDegree= 0; 
      // Usa un setTimeout para simular una animación (puedes ajustar la duración)
      setTimeout(() => {
        this.renderer.setStyle(this.carrusel.nativeElement, 'transition', 'opacity 0.4s ease-in'); // Configura la transición
        this.renderer.setStyle(this.carrusel.nativeElement, 'opacity', '0'); // Cambia la opacidad a 1
      
       
      }, 3); // Esto asegura que la transición se aplique después de que la opacidad se haya establecido a 0
    }
  }

  animacionMonedas() {
    if (this.monedas) {
     
  
      setTimeout(() => {
        this.renderer.setStyle(this.moneda1.nativeElement, 'transition', 'opacity 0.3s ease-in, transform 0.3s ease-in');
        this.renderer.setStyle(this.moneda1.nativeElement, 'opacity', '1'); 
        this.renderer.setStyle(this.moneda1.nativeElement, 'transform', 'scale(1)');
        this.renderer.setStyle(this.moneda2.nativeElement, 'transition', 'opacity 0.3s ease-in, transform 0.3s ease-in');
        this.renderer.setStyle(this.moneda2.nativeElement, 'opacity', '1'); 
        this.renderer.setStyle(this.moneda2.nativeElement, 'transform', 'scale(1)');
        this.renderer.setStyle(this.moneda3.nativeElement, 'transition', 'opacity 0.3s ease-in, transform 0.3s ease-in');
        this.renderer.setStyle(this.moneda3.nativeElement, 'opacity', '1'); 
        this.renderer.setStyle(this.moneda3.nativeElement, 'transform', 'scale(1)');
      
      
       
      }, 3); // Esto asegura que la transición se aplique después de que la opacidad se haya establecido a 0
    }
  }

  eliminarMonedas() {
    if (this.monedas) {
     
  
      setTimeout(() => {
        this.renderer.setStyle(this.moneda1.nativeElement, 'transition', 'opacity 0.3s ease-in, transform 0.3s ease-in');
        this.renderer.setStyle(this.moneda1.nativeElement, 'opacity', '0'); 
        this.renderer.setStyle(this.moneda1.nativeElement, 'transform', 'scale(0)');
        this.renderer.setStyle(this.moneda2.nativeElement, 'transition', 'opacity 0.3s ease-in, transform 0.3s ease-in');
        this.renderer.setStyle(this.moneda2.nativeElement, 'opacity', '0'); 
        this.renderer.setStyle(this.moneda2.nativeElement, 'transform', 'scale(0)');
        this.renderer.setStyle(this.moneda3.nativeElement, 'transition', 'opacity 0.3s ease-in, transform 0.3s ease-in');
        this.renderer.setStyle(this.moneda3.nativeElement, 'opacity', '0'); 
        this.renderer.setStyle(this.moneda3.nativeElement, 'transform', 'scale(0)');
     
       
      }, 3); // Esto asegura que la transición se aplique después de que la opacidad se haya establecido a 0
    }
  }

  mostrarSobre() {
    if (this.sobre) {
     
  
      setTimeout(() => {
        this.renderer.setStyle(this.sobre.nativeElement, 'transition', 'transform 0.5s ease-in');
        this.renderer.setStyle(this.sobre.nativeElement, 'transform', 'translateX(0px)'); 
        this.renderer.addClass(this.sobre.nativeElement,'animacion')
       
     
       
      }, 500); // Esto asegura que la transición se aplique después de que la opacidad se haya establecido a 0
    }
  }





initializeIntersectionObserver2() {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
  };

  this.intersectionObserver2 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log('El otro elemento está visible en el viewport');
        this.animacionMonedas()
      } else {
        console.log('El otro elemento no está visible en el viewport');
        this.eliminarMonedas();
      }
    });
  }, options);

  this.intersectionObserver2.observe(this.monedas.nativeElement);
}

initializeIntersectionObserver3() {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
  };

  this.intersectionObserver3 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log('El otro elemento está visible en el viewport');
        this.mostrarSobre();
      
      } else {
        console.log('El otro elemento no está visible en el viewport');
     
      }
    });
  }, options);

  this.intersectionObserver3.observe(this.contacto.nativeElement);
}
}





