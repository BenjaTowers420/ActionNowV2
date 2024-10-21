import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vibration } from '@awesome-cordova-plugins/vibration/ngx';
import { AlertController, ToastController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-recuperar-contra',
  templateUrl: './recuperar-contra.page.html',
  styleUrls: ['./recuperar-contra.page.scss'],
})
export class RecuperarContraPage implements OnInit {
  datosRecuperacion = {
    usuario: '',
    contrasena: '',
    confirmarContrasena: ''
  };

  constructor(private router: Router, private alertController: AlertController, private toastController: ToastController, private bd: ServicebdService, private vibration: Vibration) { }

  ngOnInit() {}

  async mostrarAlerta(mensaje: string) {
    this.vibration.vibrate(1000);
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
    });
    await toast.present();
  }

  async enviarFormulario() {
    const mayusReq = /[A-Z]/;
    const numReq = /[0-9]/;

    if (!this.datosRecuperacion.usuario) {
      return this.mostrarAlerta('Por favor, ingrese un usuario válido.');
    }

    if (this.datosRecuperacion.contrasena.length < 8) {
      return this.mostrarAlerta('La contraseña debe tener al menos 8 caracteres.');
    }

    if (!mayusReq.test(this.datosRecuperacion.contrasena)) {
      return this.mostrarAlerta('La contraseña debe contener al menos una mayúscula.');
    }

    if (!numReq.test(this.datosRecuperacion.contrasena)) {
      return this.mostrarAlerta('La contraseña debe contener al menos un número.');
    }

    if (this.datosRecuperacion.contrasena !== this.datosRecuperacion.confirmarContrasena) {
      return this.mostrarAlerta('Las contraseñas no coinciden.');
    }

    // Verifica si el usuario existe
    const existeUsuario = await this.bd.obtenerUsuarioPorNombre(this.datosRecuperacion.usuario);
    if (!existeUsuario) {
      return this.mostrarAlerta('El usuario no existe. Por favor, verifique el nombre de usuario.');
    }

    try {
      await this.bd.cambiarContrasena(this.datosRecuperacion.usuario, this.datosRecuperacion.contrasena);
      await this.mostrarToast('Contraseña cambiada correctamente.');
      this.router.navigate(['/login']);
    } catch (error) {
      this.mostrarAlerta('Error al cambiar la contraseña. Inténtelo de nuevo.');
    }
  }
}


