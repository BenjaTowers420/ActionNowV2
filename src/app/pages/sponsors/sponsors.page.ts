import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.page.html',
  styleUrls: ['./sponsors.page.scss'],
})
export class SponsorsPage {
  productos = [
    { nombre: 'Pre-Entreno Kaioken', descripcion: 'Ideal para antes de entrenar', precio: 18990, imagen: 'https://m.media-amazon.com/images/I/61FVdUE6AHL.jpg' },
    { nombre: 'Creatina', descripcion: 'Maximiza tu progreso', precio: 14990, imagen: 'https://farmaciasdeldrsimicl.vtexassets.com/arquivos/ids/157861-2000-2000?v=638439071174470000&width=2000&height=2000&aspect=true' },
    { nombre: 'Whey Protein', descripcion: 'Ayuda a ganar masa muscular', precio: 59990, imagen: 'https://allnutrition.cl/cdn/shop/files/s101006-2l-13-fc6dbf1c-6bfe-4da4-8ecf-1c91b83c00be.jpg?v=1724859659' },
    { nombre: 'Trembolona', descripcion: 'Te ayuda a mutar', precio: 120000, imagen: 'https://dojiw2m9tvv09.cloudfront.net/76774/product/trembolona0091.gif' }
  ];


  total = 0;


  constructor(private toastController: ToastController, private alertController: AlertController, private router: Router) {}

  Pagar() {
    this.presentAlert('Gracias por comprar').then(() => {
      this.router.navigate(['/home']);
    });
  }
  

  async presentAlert(titulo: string) {
    const alert = await this.alertController.create({
      header: titulo,
      buttons: ['OK'],
    });

    await alert.present();
  }


  async agregarAlCarrito(producto: { nombre: string; descripcion: string; precio: number }) {
    this.total += producto.precio;


    const toast = await this.toastController.create({
      message: `${producto.nombre} ha sido agregado al carrito.`,
      duration: 2000
    });
    await toast.present();
  }


  async irAlCarrito() {
    const alert = await this.alertController.create({
      header: 'Carrito',
      message: 'El carrito no está disponible aún.',
      buttons: ['OK']
    });


    await alert.present();
  }
}



