import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.page.html',
  styleUrls: ['./modificar-usuario.page.scss'],
})
export class ModificarPage implements OnInit {

  usuario: any;

  constructor(
    private router: Router,
    private activedrouter: ActivatedRoute,
    private bd: ServicebdService,
    private alertController: AlertController
  ) {
    this.activedrouter.queryParams.subscribe(res => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.usuario = this.router.getCurrentNavigation()?.extras?.state?.['usuario'];
      }
    });
  }

  ngOnInit() {
  }

  async modificar() {
    this.bd.modificarUsuario(this.usuario.id_usuario, this.usuario.nombre, this.usuario.id_rol);
  }
}
