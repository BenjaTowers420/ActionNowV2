import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-rutinas',
  templateUrl: './rutinas.page.html',
  styleUrls: ['./rutinas.page.scss'],
})
export class RutinasPage implements OnInit {
  rutinaSeleccionada: 'pesas' | 'calistenia' | 'acondicionamiento' = 'pesas';
  ejercicios: any[] = [];


  // Define los ejercicios para cada rutina
  rutina: { [key: string]: { nombre: string; repeticiones: string; descripcion: string }[] } = {
    pesas: [
      { nombre: 'Sentadilla', repeticiones: '3x10', descripcion: 'De pie, con los pies al ancho de los hombros, baja flexionando las rodillas hasta que los muslos estén paralelos al suelo. Luego, vuelve a la posición inicial empujando con los talones.' },


      { nombre: 'Press de Banca', repeticiones: '3x8', descripcion: 'Acostado en un banco plano, agarra la barra con las manos al ancho de los hombros. Baja la barra lentamente hasta el pecho, luego empuja hacia arriba hasta extender los brazos completamente. Mantén los pies firmes en el suelo y la espalda recta durante el movimiento.' },


      { nombre: 'Peso Muerto', repeticiones: '3x10', descripcion: 'De pie, con los pies al ancho de los hombros, agarra la barra o pesas frente a tus muslos. Flexiona las caderas y las rodillas para bajar el peso hasta la altura de las espinillas, manteniendo la espalda recta. Luego, empuja con las caderas hacia adelante para volver a la posición inicial.' },


      { nombre: 'Curl de Bíceps', repeticiones: '3x12', descripcion: 'De pie, con los pies al ancho de los hombros, agarra las pesas con las palmas hacia arriba. Flexiona los codos para levantar las pesas hacia tus hombros, manteniendo los codos cerca del torso. Baja lentamente a la posición inicial.' },


      { nombre: 'Extensiones de Tríceps', repeticiones: '3x12', descripcion: 'De pie o sentado, agarra una pesa con ambas manos y levántala por encima de tu cabeza con los brazos extendidos. Flexiona los codos para bajar la pesa detrás de la cabeza, luego extiende los brazos para volver a la posición inicial. Mantén los codos cerca de la cabeza durante el movimiento.' },


      { nombre: 'Remo con Barra', repeticiones: '3x10', descripcion: 'Inclínate hacia adelante con las rodillas ligeramente flexionadas y la espalda recta. Agarra la barra con las manos al ancho de los hombros, tirando de ella hacia tu abdomen mientras aprietas los omóplatos. Baja la barra controladamente y repite el movimiento.' }
    ],
    calistenia: [
      { nombre: 'Flexiones', repeticiones: '3x15', descripcion: 'En plancha, con las manos al ancho de los hombros, baja el pecho hacia el suelo y luego empuja hacia arriba. Mantén el cuerpo recto.' },


      { nombre: 'Dominadas', repeticiones: '3x8', descripcion: 'Cuelga de una barra con las palmas hacia afuera y las manos al ancho de los hombros. Tira de tu cuerpo hacia arriba hasta que tu barbilla esté por encima de la barra, luego baja controladamente.' },


      { nombre: 'Fondos', repeticiones: '3x12', descripcion: 'Baja el cuerpo flexionando los codos y luego empuja hacia arriba.' },


      { nombre: 'Sentadillas con Peso Corporal', repeticiones: '3x20', descripcion: 'De pie, baja flexionando las rodillas hasta que los muslos estén paralelos al suelo, luego vuelve a subir.' },


      { nombre: 'Plancha', repeticiones: '3x1 min', descripcion: 'En posición de plancha, apoya los codos y pies en el suelo, mantén el cuerpo recto y contrae el core.' },


      { nombre: 'Lunges', repeticiones: '3x15', descripcion: 'Da un paso hacia adelante, baja la cadera flexionando ambas rodillas hasta que la rodilla trasera casi toque el suelo. Regresa a la posición inicial y repite con la otra pierna.' }
    ],
    acondicionamiento: [
      { nombre: 'Sprints', repeticiones: '5x30 seg', descripcion: 'Corre a máxima velocidad durante un corto período de tiempo, luego descansa y repite.' },


      { nombre: 'Burpees', repeticiones: '4x15', descripcion: 'Desde una posición de pie, baja en cuclillas y coloca las manos en el suelo, salta a una posición de plancha, realiza una flexión, regresa a cuclillas y salta hacia arriba.' },


      { nombre: 'Saltos en Caja', repeticiones: '3x12', descripcion: 'Párate frente a una caja o plataforma, salta con ambos pies y aterriza suavemente sobre la caja. Luego, baja controladamente al suelo y repite.' },


      { nombre: 'Escaladores', repeticiones: '4x30 seg', descripcion: 'En posición de plancha, lleva una rodilla hacia el pecho y luego cambia rápidamente a la otra rodilla, alternando el movimiento de forma rápida.' },


      { nombre: 'Jumping Jacks', repeticiones: '4x1 min', descripcion: 'De pie, salta abriendo las piernas y levantando los brazos por encima de la cabeza, luego regresa a la posición inicial y repite.' },


      { nombre: 'High Knees', repeticiones: '4x1 min', descripcion: 'Corre en el lugar levantando las rodillas lo más alto posible, alternando rápidamente de una pierna a la otra.' }
    ]
  };


  constructor() { }


  ngOnInit() { }


  actualizarEjercicios() {
    this.ejercicios = this.rutina[this.rutinaSeleccionada] || [];
  }
}



