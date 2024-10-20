import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';


@Component({
  selector: 'app-cal-imc',
  templateUrl: './cal-imc.page.html',
  styleUrls: ['./cal-imc.page.scss'],
})
export class CalImcPage {
  objetivo: string = '';
  estatura: number = 0;
  peso: number = 0;
  imc: number = 0;
  nombreUsuario: string = localStorage.getItem('nombreUsuario') || '';
  id_usuario: string = ''; // El ID del usuario logeado 

  constructor(private alertController: AlertController, private bd:ServicebdService, private router: Router){}

  ngOnInit() {
    // Obtener ID del usuario logeado
    this.bd.obtenerUsuarioPorNombre(this.nombreUsuario).then(usuario => {
      if (usuario) {
        this.id_usuario = usuario.id_usuario;
      }
    });
  }
  async mostrarAlerta(header: string, mensaje: string) {
    const alert = await this.alertController.create({
      header,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  calcularIMC() {
    if (this.estatura <= 0 || this.peso <= 0) {
      this.mostrarAlerta('Error', 'La estatura y el peso deben ser mayores a cero.');
      return;
    }

    this.imc = parseFloat((this.peso / ((this.estatura / 100) ** 2)).toFixed(2));
    this.bd.actualizarDatosUsuario(this.id_usuario, this.estatura, this.peso, this.imc, this.objetivo)
    this.router.navigate(['/recomendacion-rutina']);
  }
}



