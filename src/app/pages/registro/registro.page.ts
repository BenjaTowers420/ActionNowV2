import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  datosRegistro = {
    usuario: '',
    contrasena: '',
    confirmarContrasena: ''
  };
  id_rol: number = 2;


  constructor(private router: Router, private alertController: AlertController, private bd: ServicebdService) {}


  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });


    await alert.present();
  }


  async enviarFormulario() {
    const mayusReq = /[A-Z]/;
    const numReq = /[0-9]/;
  
    if (!this.datosRegistro.usuario) {
      return this.mostrarAlerta('Por favor, ingrese un usuario válido.');
    } 
  
    if (this.datosRegistro.contrasena.length < 8) {
      return this.mostrarAlerta('La contraseña debe tener al menos 8 caracteres.');
    }
  
    if (!mayusReq.test(this.datosRegistro.contrasena)) {
      return this.mostrarAlerta('La contraseña debe contener al menos una mayúscula.');
    } 
  
    if (!numReq.test(this.datosRegistro.contrasena)) {
      return this.mostrarAlerta('La contraseña debe contener al menos un número.');
    } 
  
    if (this.datosRegistro.contrasena !== this.datosRegistro.confirmarContrasena) {
      return this.mostrarAlerta('Las contraseñas no coinciden.');
    } 

    const existeUsuario = await this.bd.verificarUsuarioExistente(this.datosRegistro.usuario);
    if (existeUsuario) {
      return this.mostrarAlerta('El usuario ya existe. Por favor, elija otro.');
  }
  
    try {
      await this.bd.registrarUsuario(this.datosRegistro.usuario, this.datosRegistro.contrasena, this.id_rol);
      this.router.navigate(['/login']);
    } catch (error) {
      this.mostrarAlerta('Error al registrar el usuario. Inténtelo de nuevo.');
    }
  }
}