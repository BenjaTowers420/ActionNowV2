import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage {
  productos = [
    {
      nombre: 'Pre Entreno',
      imagen: 'https://m.media-amazon.com/images/I/61FVdUE6AHL.jpg',
      descripcion: 'Un suplemento esencial para impulsar tu rendimiento en cada sesión. Formulado para aumentar la energía, la concentración y la resistencia, este preentreno te prepara para entrenamientos intensos y desafiantes. Con ingredientes de alta calidad, te ayuda a maximizar tus resultados y a superar tus límites.',
    },
    {
      nombre: 'Trembolona',
      imagen: 'https://dojiw2m9tvv09.cloudfront.net/76774/product/trembolona0091.gif',
      descripcion: 'Un suplemento esencial para quienes buscan maximizar su rendimiento y lograr una definición muscular impresionante. La trembolona está diseñada para aumentar la masa muscular magra, mejorar la fuerza y acelerar la recuperación, permitiéndote alcanzar tus objetivos más ambiciosos en el gimnasio.',
    },
    {
      nombre: 'Whey Protein',
      imagen: 'https://www.whitemov.com/wp-content/uploads/proteinas-ejercicios.png',
      descripcion: 'Un suplemento esencial para quienes buscan construir músculo y acelerar la recuperación. Nuestra proteína de suero de alta calidad proporciona una fuente rica en aminoácidos esenciales, ideal para apoyar el crecimiento muscular y mejorar el rendimiento físico. Fácil de mezclar y disponible en deliciosos sabores, es perfecta para tomar antes o después de entrenar.',
    },
    {
      nombre: 'Creatina',
      imagen: 'https://farmaciasdeldrsimicl.vtexassets.com/arquivos/ids/157861-2000-2000?v=638439071174470000&width=2000&height=2000&aspect=true',
      descripcion: 'Un suplemento esencial diseñado para mejorar tu rendimiento y acelerar tus resultados. Cada porción de 5 g está formulada para aumentar la fuerza, la resistencia y la recuperación muscular, permitiéndote alcanzar tus objetivos más ambiciosos.',
    }
  ];

  isModalOpen = false;
  productoSeleccionado: any;

  arregloProducto: any = []

  constructor(private modalController: ModalController, private bd: ServicebdService) {}

  ngOnInit() {
    this.bd.dbState().subscribe(data => {
      if (data) {
        this.bd.fetchProductos().subscribe(res => {
          this.arregloProducto = res;
        });
      }
    });
  }

  mostrarDetalles(producto: any) {
    this.productoSeleccionado = producto;
    this.isModalOpen = true;
  }
}

