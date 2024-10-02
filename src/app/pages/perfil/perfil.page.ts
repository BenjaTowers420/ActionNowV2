import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {
  perfil = {
    nombre: 'Josue Machaca',
    edad: 28,
    email: 'j.machaca@gmail.com',
    telefono: '+56912345678',
    direccion: 'Av. Del Peru 123, Recoleta, Chile',
    descripcion: 'Desarrollador de software con 5 años de experiencia en desarrollo web y móvil.',
  };

  constructor() { }
}
