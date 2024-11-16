import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Vibration } from '@awesome-cordova-plugins/vibration/ngx';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  datosLogin = {
    usuario: '',
    contrasena: ''
  };

  errorMessage: string = "";
  successMessage: string = "";
  
  constructor(private bd: ServicebdService, private router: Router, private alertController: AlertController, private vibration: Vibration) {}

  async login() {
    // Verificar usuario y recibir los detalles del mismo (incluyendo id_rol)
    const usuario = await this.bd.verificarUsuario(this.datosLogin.usuario, this.datosLogin.contrasena);
    
    if (usuario) {
      // Almacenar el nombre de usuario y su id_rol en localStorage
      localStorage.setItem('nombreUsuario', usuario.nombre);
      localStorage.setItem('id_rol', usuario.id_rol.toString());

      window.dispatchEvent(new Event('userLoggedIn')); 

      // Redirigir según el rol
      if (usuario.id_rol == 1) {
        this.router.navigate(['/admin']); 
      } else if (usuario.id_rol == 2) {
        this.router.navigate(['/home']); 
      }
    } else {
      this.vibration.vibrate(1000);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Nombre de usuario o contraseña incorrectos',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  onSubmit(): void{
    this.onValidate();
    if(!this.errorMessage){
      this.successMessage = "Formulario Validado correctamente";
      
    }
  }
  onValidate(): void {
    this.errorMessage = ""; // Resetear mensaje de error
    
    // Validación de campos vacíos
    if (!this.datosLogin.usuario || this.datosLogin.usuario.trim() === "") {
      this.errorMessage = "Debe rellenar el campo nombre";
    }
    if (!this.datosLogin.contrasena || this.datosLogin.contrasena.trim() === "") {
      if (this.errorMessage) {
        this.errorMessage += " y contraseña";  // Concatenar si ya hay un mensaje de error
      } else {
        this.errorMessage = "Debe rellenar el campo contraseña";
      }
    }
  
    // Validación de contraseña con mayúscula y número
    if (this.datosLogin.contrasena) {
      if (!/[A-Z]/.test(this.datosLogin.contrasena)) {
        this.errorMessage = this.errorMessage ? `${this.errorMessage} - La contraseña debe contener al menos una mayúscula` : 'La contraseña debe contener al menos una mayúscula';
      }
      if (!/\d/.test(this.datosLogin.contrasena)) {
        this.errorMessage = this.errorMessage ? `${this.errorMessage} y un número` : 'La contraseña debe contener al menos un número';
      }
    }
  
    // Si ambos campos son válidos, limpiar el mensaje de error
    if (this.datosLogin.usuario && this.datosLogin.contrasena && !this.errorMessage) {
      this.errorMessage = ""; 
    }
  }
  
}



