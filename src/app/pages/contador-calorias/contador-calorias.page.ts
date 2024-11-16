import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-contador-calorias',
  templateUrl: './contador-calorias.page.html',
  styleUrls: ['./contador-calorias.page.scss'],
})
export class ContadorCaloriasPage implements OnInit {
  alimentos = [
    { nombre: 'Manzana', caloriasPor100g: 52 },
    { nombre: 'Plátano', caloriasPor100g: 89 },
    { nombre: 'Pollo', caloriasPor100g: 165 },
    { nombre: 'Arroz', caloriasPor100g: 130 },
    { nombre: 'Brócoli', caloriasPor100g: 34 },
    { nombre: 'Almendras', caloriasPor100g: 579 }
  ];
 
  alimentoSeleccionado: any = null;
  cantidadGramos: number = 0;
  totalCalorias: number = 0;

  errorMessage: string = "";
  successMessage: string = "";

  constructor(private alertController: AlertController) { }


  ngOnInit() { }

  async mostrarAlerta(header: string, mensaje: string) {
    const alert = await this.alertController.create({
      header,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }


  async calcularCalorias() {
    if (this.alimentoSeleccionado && this.cantidadGramos > 0) {
      const caloriasPor100g = this.alimentoSeleccionado.caloriasPor100g;
      this.totalCalorias = (caloriasPor100g * this.cantidadGramos) / 100;
    } else if(this.cantidadGramos < 0){
      await this.mostrarAlerta('Error', 'Ingrese una cantidad valida');
    } else{
      this.totalCalorias = 0;
    }
  }


  onSubmit(): void{
    this.onValidate();
    if(!this.errorMessage){
      this.successMessage = "Formulario Validado correctamente";
      
    }
  }
  onValidate(): void{
    if(!this.alimentoSeleccionado || this.alimentoSeleccionado.trim() === ""){
      this.errorMessage = "Debe seleccionar un alimento";
    }else if(!this.cantidadGramos || this.cantidadGramos < 0){
      this.errorMessage = "Debe ingresar una cantidad válida";
    }else{
      this.errorMessage = "";
    }

  }
}



