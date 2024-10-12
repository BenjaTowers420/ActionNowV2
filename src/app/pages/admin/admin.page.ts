import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage {

  arregloUsuario: any[] = [];

  constructor(private bd: ServicebdService, private router: Router) { }

  ngOnInit() {
    this.bd.dbState().subscribe(data => {
      if (data) {
        this.bd.fetchUsuarios().subscribe(res => {
          this.arregloUsuario = res;
        });
      }
    });
  }

  modificar(x: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        usuario: x
      }
    };
    this.router.navigate(['/modificar-usuario'], navigationExtras);
  }

  eliminar(x: any) {
    this.bd.eliminarUsuario(x.id_usuario).then(() => {
      // refrescar la lista tras eliminar el usuario
      this.arregloUsuario = this.arregloUsuario.filter(u => u.id_usuario !== x.id_usuario);
    });
  }

  agregar() {
    this.router.navigate(['/agregar-usuario']);
  }

  mostrarRol(id_rol: number): string {
    return id_rol === 1 ? 'Admin' : 'Usuario';
  }
}
