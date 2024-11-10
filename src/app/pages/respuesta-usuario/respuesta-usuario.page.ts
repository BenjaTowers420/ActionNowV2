import { Component } from '@angular/core';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { IonList } from '@ionic/angular';

@Component({
  selector: 'app-respuesta-usuario',
  templateUrl: './respuesta-usuario.page.html',
  styleUrls: ['./respuesta-usuario.page.scss'],
})
export class RespuestaUsuarioPage {

  nombre_usuario: string = '';  // Variable para almacenar el nombre del usuario logueado
  comentarios: any[] = [];  // Lista de comentarios que pertenecen al usuario logueado

  constructor(private bd: ServicebdService) {}

  // Método que se ejecuta antes de que la vista se cargue
  ionViewWillEnter() {
    // Recuperar el nombre del usuario desde localStorage
    this.nombre_usuario = localStorage.getItem('nombreUsuario') || '';

    // Llamar al servicio para obtener los comentarios del usuario logueado
    this.obtenerComentariosDeUsuario();
  }

  obtenerComentariosDeUsuario() {
    // Llamar al servicio para obtener todos los comentarios
    this.bd.fetchComentarios().subscribe(comentarios => {
      // Filtrar los comentarios que pertenecen al usuario logueado
      this.comentarios = comentarios.filter(comentario => comentario.nombre_usuario === this.nombre_usuario);
    });
  }
}
