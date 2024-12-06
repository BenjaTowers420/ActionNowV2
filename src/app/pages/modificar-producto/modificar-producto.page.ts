import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-modificar-producto',
  templateUrl: './modificar-producto.page.html',
  styleUrls: ['./modificar-producto.page.scss'],
})
export class ModificarProductoPage implements OnInit, OnDestroy {

  producto: any;
  foto_producto: any;

  constructor(
    private router: Router,
    private activedrouter: ActivatedRoute,
    private bd: ServicebdService
  ) {
    this.activedrouter.queryParams.subscribe(res => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.producto = this.router.getCurrentNavigation()?.extras?.state?.['producto'];
      }
    });
  }

  ngOnInit() {
    // Este método no hace nada adicional por ahora
  }

  // Este método se ejecutará cuando el componente esté a punto de ser destruido
  ngOnDestroy() {
    // Aquí puedes hacer limpieza de recursos o actualizaciones si es necesario antes de que la página se destruya
    console.log('Componente está siendo destruido');
    // Por ejemplo, puedes cancelar suscripciones o liberar memoria si es necesario.
  }

  async tomarFoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
    });

    this.foto_producto = image.webPath; // Guarda la ruta de la foto como URI
    console.log('Ruta de la foto:', this.foto_producto);
  }

  async modificar() {
    if (!this.producto.nombre_producto || !this.producto.descripcion_producto || !this.foto_producto) {
      return;  // No hacer nada si falta algún campo
    }

    try {
      await this.bd.modificarProducto(this.producto.id_producto, this.producto.nombre_producto, this.producto.descripcion_producto, this.foto_producto);
      // Redirigir a la lista de productos
      this.router.navigate(['/listado-productos']);
    } catch (error) {
      console.error('Error al modificar el producto', error);
    }
  }
}
