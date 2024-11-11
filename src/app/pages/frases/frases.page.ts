import { Component, OnInit } from '@angular/core';
import { ConsumoapiService } from 'src/app/services/consumoapi.service';

@Component({
  selector: 'app-frases',
  templateUrl: './frases.page.html',
  styleUrls: ['./frases.page.scss'],
})
export class FrasesPage implements OnInit {
  quote: string = '';  // Variable para almacenar la frase obtenida


  constructor(private api: ConsumoapiService) {}  // Inyectamos el servicio en el constructor


  ngOnInit() {
    this.loadRandomQuote();  // Llamamos al método para cargar la frase aleatoria
  }


  // Método para obtener la frase aleatoria
  loadRandomQuote() {
    this.api.getRandomQuote().subscribe(
      (response) => {
        console.log('Respuesta de la API:', response);  // Verificamos qué estamos recibiendo
        if (response && response.length > 0) {
          this.quote = response[0].q;  // Accedemos a la frase dentro de 'q'
        } else {
          console.error('No se encontró una frase.');
        }
      },
      (error) => {
        console.error('Error al cargar la frase:', error);  // Maneja el error
      }
    );
  }
}




