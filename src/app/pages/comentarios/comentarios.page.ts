import { Component, OnInit } from '@angular/core';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.page.html',
  styleUrls: ['./comentarios.page.scss'],
})
export class ComentariosPage implements OnInit {

  nombre_usuario: string = '';
  motivo: string = '';
  texto: string = '';

  constructor(private bd:ServicebdService) { }

  ngOnInit() {
    this.nombre_usuario = localStorage.getItem('nombreUsuario') || '';
  }
  

  insertar(){
    this.bd.insertarComentario(this.nombre_usuario, this.motivo, this.texto);
  }

}
