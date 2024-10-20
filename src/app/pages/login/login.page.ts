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
}



