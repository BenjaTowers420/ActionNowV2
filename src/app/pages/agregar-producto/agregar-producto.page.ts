import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
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

  constructor(private bd: ServicebdService) { }

  ngOnInit() {
  }

  insertar(){
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

}
