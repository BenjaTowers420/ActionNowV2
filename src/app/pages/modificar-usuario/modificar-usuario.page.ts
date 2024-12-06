import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.page.html',
  styleUrls: ['./modificar-usuario.page.scss'],
})
export class ModificarUsuarioPage implements OnInit {

  usuario: any;

  constructor(
    private router: Router,
    private activedrouter: ActivatedRoute,
    private bd: ServicebdService
  ) {
    this.activedrouter.queryParams.subscribe(res => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.usuario = this.router.getCurrentNavigation()?.extras?.state?.['usuario'];
      }
    });
  }

  ngOnInit() {
    // Este método no hace nada adicional por ahora
  }

  // Función para determinar el placeholder según el rol
  getPlaceholder() {
    if (this.usuario && this.usuario.id_rol === 1) {
      return 'Admin';  // Si es Admin, el placeholder es "Admin"
    } else if (this.usuario && this.usuario.id_rol === 2) {
      return 'Usuario';  // Si es Usuario, el placeholder es "Usuario"
    }
    return 'Seleccione un rol';  // Valor por defecto
  }

  async modificar() {
    if (!this.usuario.nombre || !this.usuario.id_rol) {
      return;  // No hacer nada si falta algún campo
    }

    try {
      await this.bd.modificarUsuario(this.usuario.id_usuario, this.usuario.nombre, this.usuario.id_rol);
      // Redirigir a la lista de usuarios sin mostrar alertas
      this.router.navigate(['/admin']);
    } catch (error) {
      // El manejo de errores se debe realizar en el servicio
      console.error('Error al modificar el usuario', error);
    }
  }
}
