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


  enviarFormulario() {
    const mayusReq = /[A-Z]/;
    const numReq = /[0-9]/;

    if (!this.datosRegistro.usuario) {
      this.mostrarAlerta('Por favor, ingrese un usuario válido.');
    } else if (this.datosRegistro.contrasena.length < 8 && !mayusReq.test(this.datosRegistro.contrasena) && !numReq.test(this.datosRegistro.contrasena)) {
      this.mostrarAlerta('La contraseña debe contener al menos 8 caracteres, una mayúscula y un número');
    }else if (this.datosRegistro.contrasena.length < 8) {
      this.mostrarAlerta('La contraseña debe tener al menos 8 caracteres.');
    } else if (!mayusReq.test(this.datosRegistro.contrasena) && !numReq.test(this.datosRegistro.contrasena)) {
      this.mostrarAlerta('La contraseña debe contener al menos una mayúscula y un número');
    } else if (!mayusReq.test(this.datosRegistro.contrasena )) {
      this.mostrarAlerta('La contraseña debe contener almenos una mayuscula');
    }  else if (!numReq.test(this.datosRegistro.contrasena )) {
      this.mostrarAlerta('La contraseña debe contener almenos un numero');
    }   else if (this.datosRegistro.contrasena !== this.datosRegistro.confirmarContrasena) {
      this.mostrarAlerta('Las contraseñas no coinciden.');
    }  else {
      this.bd.registrarUsuario(this.datosRegistro.usuario, this.datosRegistro.contrasena, this.id_rol)
      this.router.navigate(['/login']);
    }
  }
}