import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-frases',
  templateUrl: './frases.page.html',
  styleUrls: ['./frases.page.scss'],
})
export class FrasesPage {
  fraseActual: string = '';
  autor: string = '';
  loading: boolean = false; // Variable para mostrar el estado de carga

  constructor(private http: HttpClient) {
    this.cargarFrase(); // Cargar una frase inicial al inicio
  }

  cargarFrase() {
    this.loading = true; // Mostrar el indicador de carga
    const url = `https://api.allorigins.win/get?url=https://zenquotes.io/api/random?nocache=${new Date().getTime()}`;

    
    // Hacemos la solicitud HTTP para obtener una nueva frase
    this.http.get<any>(url).subscribe(
      (data) => {
        const response = JSON.parse(data.contents); // Procesamos la respuesta
        this.fraseActual = response[0]?.q || 'No se encontró la frase.'; // Si no hay frase, mostramos un mensaje por defecto
        this.autor = response[0]?.a || 'Anónimo'; // Autor de la frase
        this.loading = false; // Ocultar el indicador de carga
      },
      (error) => {
        this.fraseActual = 'Error al cargar la frase.'; // En caso de error
        this.autor = '';
        this.loading = false; // Ocultar el indicador de carga
        console.error('Error al cargar la frase:', error);
      }
    );
  }
}
