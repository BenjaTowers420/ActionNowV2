import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';  // Importa Router


@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.page.html',
  styleUrls: ['./ayuda.page.scss'],
})
export class AyudaPage implements OnInit {
  motivoSeleccionado: string = '';
  mensaje: string = '';


  constructor(
    private toastController: ToastController,
    private router: Router,
    private alertController: AlertController
  ) { }


  ngOnInit() { }

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });


    await alert.present();
  }

  enviarFormulario() {
    console.log('Mensaje:', this.mensaje);
    console.log('Motivo Seleccionado:', this.motivoSeleccionado);
  
    if (!this.mensaje.trim() || !this.motivoSeleccionado) {
      this.mostrarAlerta('Por favor, complete todos los campos.');
      return;
    } else {
      this.router.navigate(['/home']);
    }
  
    // Procesar y enviar el formulario
    const datosFormulario = {
      mensaje: this.mensaje,
      motivo: this.motivoSeleccionado
    };
  
    console.log('Datos del formulario:', datosFormulario);
  }


  irPagina() {
    this.presentToast('bottom'); // Mostrar el toast antes de redirigir
    this.router.navigate(['/home']);
  }


  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Mensaje enviado',
      duration: 2500,
      position: position,
    });


    await toast.present();
  }
}



