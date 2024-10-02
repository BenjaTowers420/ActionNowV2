import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-cal-imc',
  templateUrl: './cal-imc.page.html',
  styleUrls: ['./cal-imc.page.scss'],
})
export class CalImcPage {
  altura: number = 0;
  peso: number = 0;  


  imc: number | null = null;  

  constructor(private alertController: AlertController){}

  ngOnInit() { }

  async mostrarAlerta(header: string, mensaje: string) {
    const alert = await this.alertController.create({
      header,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  async calcularIMC() {
    if (this.altura > 0 && this.peso > 0) {
      const alturaEnMetros = this.altura / 100;
      this.imc = this.peso / (alturaEnMetros * alturaEnMetros);
    } else if (this.altura < 0 || this.peso < 0){
      await this.mostrarAlerta('Error', 'Ingrese una cantidad valida');
    } else{
      this.imc = null;
    }
  }
}



