import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.page.html',
  styleUrls: ['./agregar-usuario.page.scss'],
})
export class AgregarUsuarioPage implements OnInit {
  nombre: string = "";
  id_rol: number = 0;

  constructor(private bd: ServicebdService, private router: Router) { }

  ngOnInit() {
  }

  insertar(){
    this.bd.insertarUsuario(this.nombre, this.id_rol);
  }

}
