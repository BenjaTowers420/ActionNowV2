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

  constructor(private bd: ServicebdService, private router: Router, private alertController: AlertController) { }

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
    if (x.id_rol === 1) { // Verificamos si el usuario es un admin
      this.presentAlert('Error', 'No se puede eliminar un usuario con rol de Administrador.');
    } else {
      this.bd.eliminarUsuario(x.id_usuario).then(() => {
        // Refrescar la lista tras eliminar el usuario
        this.arregloUsuario = this.arregloUsuario.filter(u => u.id_usuario !== x.id_usuario);
      })
    }
  }

  mostrarRol(id_rol: number): string {
    return id_rol === 1 ? 'Admin' : 'Usuario';
  }

  async presentAlert(titulo: string, msj: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
