import { Component, OnInit } from '@angular/core';
import { Vibration } from '@awesome-cordova-plugins/vibration/ngx';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.page.html',
  styleUrls: ['./agregar-producto.page.scss'],
})
export class AgregarProductoPage implements OnInit {
  nombre_producto: string = "";
  descripcion_producto: string = "";
  foto_producto: any;

  errorMessage: string = "";
  successMessage: string = "";

  constructor(private bd: ServicebdService, private alertController: AlertController, private vibration: Vibration) { }

  ngOnInit() {
  }

  insertar() {
    if (!this.nombre_producto || !this.descripcion_producto || !this.foto_producto) {
      this.mostrarAlerta('Error', 'Por favor ingrese todos los campos.');
      return;
    }
    this.bd.insertarProducto(this.nombre_producto, this.descripcion_producto, this.foto_producto);
  }

  async tomarFoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
    });

    this.foto_producto = image.webPath; // Guarda la imagen como Data URL
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    this.vibration.vibrate(1000);
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }


  onSubmit(): void{
    this.onValidate();
    if(!this.errorMessage){
      this.successMessage = "Formulario Validado correctamente";
      
    }
  }
  onValidate(): void {
    if (!this.nombre_producto || this.nombre_producto.trim() === "") {
      this.errorMessage = "Debe rellenar el campo nombre"; 
    } else if (!this.descripcion_producto || this.descripcion_producto.trim() === "") {
      this.errorMessage = "Debe ingresar una descripcion para el producto"; 
    } else if (!this.foto_producto || this.foto_producto.trim() === "") {
      this.errorMessage = "Debe ingresar una foto para el producto"; 
    } else {
      this.errorMessage = "";
    }
  }

}
