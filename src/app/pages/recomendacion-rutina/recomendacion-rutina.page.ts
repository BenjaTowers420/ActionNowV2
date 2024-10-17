import { Component, OnInit } from '@angular/core';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recomendacion-rutina',
  templateUrl: './recomendacion-rutina.page.html',
  styleUrls: ['./recomendacion-rutina.page.scss'],
})
export class RecomendacionRutinaPage implements OnInit {
  nombreUsuario: string = '';
  rutina: any = null;

  constructor(private bd:ServicebdService, private router: Router) {}

  ngOnInit() {
    this.nombreUsuario = localStorage.getItem('nombreUsuario') || '';
  }

  async asignarRutina() {
    if (this.nombreUsuario) {
      try {
        const usuario = await this.bd.obtenerUsuarioPorNombre(this.nombreUsuario);

        if (usuario) {
          const imc = usuario.imc;
          const objetivo = usuario.objetivo;

          // Asignar rutina basada en el IMC y el objetivo
          this.bd.database.executeSql(
            `SELECT * FROM rutina WHERE tipo_rutina = ? AND tipo_usuario = ?`, 
            [objetivo, this.clasificarUsuario(imc)]
          ).then(res => {
            if (res.rows.length > 0) {
              // Asignar la primera rutina encontrada
              this.rutina = {
                nombre_rutina: res.rows.item(0).nombre_rutina,
                descripcion: res.rows.item(0).descripcion,
                tipo_rutina: res.rows.item(0).tipo_rutina,
                tipo_usuario: res.rows.item(0).tipo_usuario
              };
            }
          }).catch(e => {
            console.error('Error al obtener la rutina:', e);
          });
        }
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
      }
    }
  }

  // Método para clasificar el tipo de usuario basado en el IMC
  clasificarUsuario(imc: number): string {
    if (imc < 18.5) {
      return 'flaco';
    } else if (imc >= 18.5 && imc < 25) {
      return 'normal';
    } else {
      return 'sobrepeso';
    }
  }
}
