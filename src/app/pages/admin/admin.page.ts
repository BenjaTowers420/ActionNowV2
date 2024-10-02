import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

interface Usuario {
  nombre: string;
  estado: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage {

  usuarios: Usuario[] = [
    { nombre: 'Usuario1', estado: 'No Verificado' },
    { nombre: 'Usuario2', estado: 'No Verificado' },
    { nombre: 'Usuario3', estado: 'No Verificado' },
  ];

  nuevoUsuario: string = '';

  constructor(private alertController: AlertController) {}

  agregarUsuario() {
    if (this.nuevoUsuario.trim() !== '') {
      this.usuarios.push({ nombre: this.nuevoUsuario, estado: 'No Verificado' });
      this.nuevoUsuario = ''; 
    }
  }

  verificarUsuario(usuario: Usuario) {
    usuario.estado = 'Verificado';
  }

  async banearUsuario(usuario: Usuario) {
    const alert = await this.alertController.create({
      header: 'Confirmar Ban',
      message: `¿Estás seguro de que quieres banear a ${usuario.nombre}?`,
      buttons: [{
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Banear',
          handler: () => {
            const index = this.usuarios.indexOf(usuario);
            if (index > -1) {
              this.usuarios.splice(index, 1);
            }
          },
        },
      ],
    });

    await alert.present();
  }
}
