import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.page.html',
  styleUrls: ['./listado-productos.page.scss'],
})
export class ListadoProductosPage implements OnInit {

  arregloProducto: any = []

  constructor(private bd: ServicebdService, private router: Router) { }

  ngOnInit() {
    this.bd.dbState().subscribe(data => {
      if (data) {
        this.bd.fetchProductos().subscribe(res => {
          this.arregloProducto = res;
        });
      }
    });
  }

  

  eliminar(x:any){
    this.bd.eliminarProducto(x.id_producto);
  }

  agregar(){
    this.router.navigate(['/agregar-producto']);
  }

  modificar(x: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        producto: x
      }
    };
    this.router.navigate(['/modificar-producto'], navigationExtras);
  }

}
