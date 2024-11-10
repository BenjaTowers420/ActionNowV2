import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-listado-comentarios',
  templateUrl: './listado-comentarios.page.html',
  styleUrls: ['./listado-comentarios.page.scss'],
})
export class ListadoComentariosPage implements OnInit {

  arregloComentario: any = [
    {
      id: '',
      usuario: '',
      motivo: '',
      texto: '',
      respuesta: '',
      respondido: false,  //campo para saber si ya tiene respuesta
    }
  ]

  constructor(private bd:ServicebdService, private router: Router) { }

  ngOnInit() {
    this.cargarComentarios();  // Se carga al inicio
  }
  
  ionViewWillEnter() {
    this.cargarComentarios();  // Se vuelve a cargar cada vez que la página se vuelve a cargar
  }
  
  cargarComentarios() {
    this.bd.dbState().subscribe(data => {
      // Verifica si la base de datos está lista
      if (data) {
        // Suscribirse al observable de los comentarios
        this.bd.fetchComentarios().subscribe(res => {
          // Asegúrate de que cada comentario tenga la propiedad 'respondido'
          this.arregloComentario = res.map(comentario => ({
            ...comentario,
            respondido: comentario.respuesta ? true : false  // Si hay respuesta, marcar como respondido
          }));
        });
      }
    });
  }

  responder(x: any) {
    // Marcar el comentario como respondido antes de navegar
    x.respondido = true;
  
    // Actualizar el arreglo de comentarios para que la vista se actualice
    this.arregloComentario = [...this.arregloComentario];  // Crear una nueva referencia para forzar la actualización
  
    let navigationsExtras: NavigationExtras = {
      state: {
        comentario: x
      }
    };
  
    this.router.navigate(['/respuesta-admin'], navigationsExtras);
  }

  eliminar(x:any){
    this.bd.eliminarComentario(x.id_comentario);
  }
}
