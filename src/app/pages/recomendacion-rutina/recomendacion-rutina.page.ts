import { Component } from '@angular/core';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-recomendacion-rutina',
  templateUrl: './recomendacion-rutina.page.html',
  styleUrls: ['./recomendacion-rutina.page.scss'],
})
export class RecomendacionRutinaPage {

  usuario: any = {
    nombre: '',
    imc: 0,
    objetivo: '',
  };

  rutina: string = '';
  ejercicios: any[] = [];

  rutinas = {
    pesas: [
      { nombre: 'Sentadilla', repeticiones: '3x10', descripcion: 'De pie, con los pies al ancho de los hombros, baja flexionando las rodillas hasta que los muslos estén paralelos al suelo. Luego, vuelve a la posición inicial empujando con los talones.' },
      { nombre: 'Press de Banca', repeticiones: '3x8', descripcion: 'Acostado en un banco plano, agarra la barra con las manos al ancho de los hombros. Baja la barra lentamente hasta el pecho, luego empuja hacia arriba hasta extender los brazos completamente.' },
      { nombre: 'Peso Muerto', repeticiones: '3x10', descripcion: 'De pie, agarra la barra o pesas frente a tus muslos. Flexiona las caderas y las rodillas para bajar el peso hasta la altura de las espinillas.' },
      { nombre: 'Curl de Bíceps', repeticiones: '3x12', descripcion: 'De pie, agarra las pesas con las palmas hacia arriba. Flexiona los codos para levantar las pesas hacia tus hombros.' },
      { nombre: 'Extensiones de Tríceps', repeticiones: '3x12', descripcion: 'Agarra una pesa con ambas manos y levántala por encima de tu cabeza. Flexiona los codos para bajar la pesa detrás de la cabeza.' },
      { nombre: 'Remo con Barra', repeticiones: '3x10', descripcion: 'Inclínate hacia adelante y agarra la barra con las manos al ancho de los hombros, tirando de ella hacia tu abdomen.' },
    ],
    calistenia: [
      { nombre: 'Flexiones', repeticiones: '3x15', descripcion: 'En plancha, baja el pecho hacia el suelo y luego empuja hacia arriba.' },
      { nombre: 'Dominadas', repeticiones: '3x8', descripcion: 'Cuelga de una barra y tira de tu cuerpo hacia arriba.' },
      { nombre: 'Fondos', repeticiones: '3x12', descripcion: 'Baja el cuerpo flexionando los codos y luego empuja hacia arriba.' },
      { nombre: 'Sentadillas con Peso Corporal', repeticiones: '3x20', descripcion: 'Baja flexionando las rodillas hasta que los muslos estén paralelos al suelo.' },
      { nombre: 'Plancha', repeticiones: '3x1 min', descripcion: 'Mantén el cuerpo recto y contrae el core.' },
      { nombre: 'Lunges', repeticiones: '3x15', descripcion: 'Da un paso hacia adelante, baja la cadera y regresa a la posición inicial.' },
    ],
    acondicionamiento: [
      { nombre: 'Sprints', repeticiones: '5x30 seg', descripcion: 'Corre a máxima velocidad durante un corto período de tiempo.' },
      { nombre: 'Burpees', repeticiones: '4x15', descripcion: 'Baja en cuclillas, salta a una posición de plancha, realiza una flexión y salta hacia arriba.' },
      { nombre: 'Saltos en Caja', repeticiones: '3x12', descripcion: 'Salta con ambos pies y aterriza suavemente sobre la caja.' },
      { nombre: 'Escaladores', repeticiones: '4x30 seg', descripcion: 'Alterna las rodillas hacia el pecho rápidamente.' },
      { nombre: 'Jumping Jacks', repeticiones: '4x1 min', descripcion: 'Salta abriendo las piernas y levantando los brazos por encima de la cabeza.' },
      { nombre: 'High Knees', repeticiones: '4x1 min', descripcion: 'Corre en el lugar levantando las rodillas lo más alto posible.' },
    ],
  };

  constructor(private bd: ServicebdService) { }

  ionViewWillEnter() {
    this.cargarDatosUsuario();
  }

  async cargarDatosUsuario() {
    const nombreUsuario = localStorage.getItem('nombreUsuario');
    if (nombreUsuario) {
      const usuario = await this.bd.obtenerUsuarioPorNombre(nombreUsuario);
      if (usuario) {
        this.usuario = usuario;
        this.asignarRutinaPorIMC();
      }
    }
  }

  asignarRutinaPorIMC() {
    const imc = parseFloat(this.usuario.imc);

    if (isNaN(imc) || imc <= 0) {
      this.rutina = 'No se ha asignado rutina';
      this.ejercicios = [];
      return;
    }

    if (imc < 18.5) {
      this.rutina = 'Pesas (Rutina de Musculación)';
      this.ejercicios = this.rutinas.pesas;
    } else if (imc < 24.9) {
      this.rutina = 'Calistenia (Rutina de Mantenimiento)';
      this.ejercicios = this.rutinas.calistenia;
    } else {
      this.rutina = 'Acondicionamiento (Rutina de Pérdida de Peso)';
      this.ejercicios = this.rutinas.acondicionamiento;
    }
  }
}
