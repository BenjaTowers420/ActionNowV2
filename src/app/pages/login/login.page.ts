import { Component } from '@angular/core';
import { Router } from '@angular/router';
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


  constructor(private bd: ServicebdService, private router: Router, private alertController: AlertController) {}

  async login() {
    const isValid = await this.bd.verificarUsuario(this.datosLogin.usuario, this.datosLogin.contrasena);
    if (isValid) {
      // Almacenar el nombre de usuario y redirigir al home
      localStorage.setItem('nombreUsuario', this.datosLogin.usuario);
      this.router.navigate(['/home']);
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Nombre de usuario o contraseña incorrectos',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}



