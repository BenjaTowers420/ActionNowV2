import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-recomendacion-rutina',
  templateUrl: './recomendacion-rutina.page.html',
  styleUrls: ['./recomendacion-rutina.page.scss'],
})
export class RecomendacionRutinaPage implements OnInit {
  selectedOption: string = '';
  routineMessage: string = '';


  constructor() { }


  ngOnInit() {
  }


  updateRoutine() {
    // Actualiza el mensaje de rutina con la opcion
    switch (this.selectedOption) {
      case 'opcion1':
        this.routineMessage = 'Tu rutina ideal es Entrenamiento de Pesas.';
        break;
      case 'opcion2':
        this.routineMessage = 'Tu rutina ideal es Entrenamiento Cardiovascular.';
        break;
      case 'opcion3':
        this.routineMessage = 'Tu rutina ideal es Entrenamiento de Acondicionamiento.';
        break;
      default:
        this.routineMessage = '';
    }
  }
}



