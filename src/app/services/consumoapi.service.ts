import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsumoapiService {

  // URL completa de la API de ZenQuotes
  private apiURL = 'https://zenquotes.io/api/quotes/';

  constructor(private http: HttpClient) { }

  // Método para obtener la frase aleatoria desde la API
  getRandomQuote(): Observable<any> {
    return this.http.get(this.apiURL);
  }
}
