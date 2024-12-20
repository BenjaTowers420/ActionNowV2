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

  errorMessage: string = "";
  successMessage: string = "";

  constructor(private bd:ServicebdService) { }

  ngOnInit() {
    this.nombre_usuario = localStorage.getItem('nombreUsuario') || '';
  }
  

  insertar(){
    this.bd.insertarComentario(this.nombre_usuario, this.motivo, this.texto);
  }

  onSubmit(): void{
    this.onValidate();
    if(!this.errorMessage){
      this.successMessage = "Formulario Validado correctamente";
      
    }
  }
  onValidate(): void {
    if (!this.nombre_usuario || this.nombre_usuario.trim() === "") {
      this.errorMessage = "Debe rellenar el campo nombre"; 
    } else if (!this.motivo || this.motivo.trim() === "") {
      this.errorMessage = "Debe ingresar un motivo"; 
    } else if (!this.texto || this.texto.trim() === "") {
      this.errorMessage = "Debe ingresar un texto"; 
    } else {
      this.errorMessage = "";
    }
  }
  

}
