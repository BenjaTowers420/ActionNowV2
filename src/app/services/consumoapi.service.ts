import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ConsumoapiService {


  // URL base de la API (ahora usa la ruta relativa)
  private apiURL = '/api';  // Cambié la URL a la ruta relativa


  constructor(private http: HttpClient) {}


  // Método GET para obtener una frase aleatoria
  getRandomQuote(): Observable<any> {
    return this.http.get(`${this.apiURL}/random`).pipe(
      retry(3)  // Reintenta la petición 3 veces en caso de error
    );
  }
}


