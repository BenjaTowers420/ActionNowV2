import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar-contra',
  templateUrl: './recuperar-contra.page.html',
  styleUrls: ['./recuperar-contra.page.scss'],
})
export class RecuperarContraPage implements OnInit {
  datosRegistro = {
    usuario: '',
    contrasena: '',
    confirmarContrasena: ''
  };

  constructor(private router: Router, private alertController: AlertController, private toastController: ToastController) { }

  ngOnInit() {}

  async mostrarAlerta(header: string, mensaje: string) {
    const alert = await this.alertController.create({
      header,
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

    if (!this.datosRegistro.usuario) {
      await this.mostrarAlerta('Error', 'Por favor, ingrese un usuario válido.');
    } else if (this.datosRegistro.contrasena.length < 8) {
      await this.mostrarAlerta('Error', 'La contraseña debe tener al menos 8 caracteres.');
    } else if (!mayusReq.test(this.datosRegistro.contrasena)) {
      await this.mostrarAlerta('Error', 'La contraseña debe contener al menos una mayúscula.');
    } else if (!numReq.test(this.datosRegistro.contrasena)) {
      await this.mostrarAlerta('Error', 'La contraseña debe contener al menos un número.');
    } else if (this.datosRegistro.contrasena !== this.datosRegistro.confirmarContrasena) {
      await this.mostrarAlerta('Error', 'Las contraseñas no coinciden.');
    } else {
      await this.mostrarToast('Contraseña cambiada correctamente.');
      this.router.navigate(['/login']);
    }
  }
}
