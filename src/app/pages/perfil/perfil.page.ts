import { Component } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {

  usuario: any = {
    nombre: '',
    estatura: 0,
    peso: 0,
    imc: '',
    objetivo: '',
    foto: ''
  };

  imagen: any;
  rutinaAsignada: string = '';

  // Rutinas predefinidas
  rutinaFlacos = 'Rutina Extreme PPL';
  rutinaNormal = 'Rutina Cardiovascular X Deus';
  rutinaGordos = 'Rutina Full cardio para Big Poppas';
  noRutina = 'No hay rutina asignada'

  constructor(private bd: ServicebdService) {}

  ionViewWillEnter() {
    this.resetPerfil();
    this.cargarDatosUsuario();
  }
  
  ngOnDestroy() {
    this.resetPerfil();
  }

  resetPerfil() {
    this.usuario = {
      nombre: '',
      estatura: 0,
      peso: 0,
      imc: '',
      objetivo: '',
      foto: '',
    };
    this.imagen = '';
  }

  async cargarDatosUsuario() {
    const nombreUsuario = localStorage.getItem('nombreUsuario');
    if (nombreUsuario) {
      const usuario = await this.bd.obtenerUsuarioPorNombre(nombreUsuario);
      if (usuario) {
        this.usuario = usuario;
        this.imagen = this.usuario.foto;
        this.asignarRutina();
      }
    }
  }

  // Función para asignar la rutina
  asignarRutina() {
    const imc = parseFloat(this.usuario.imc);

    // Verificamos si el IMC es un número válido
    if (isNaN(imc) || imc <= 0) {
        this.rutinaAsignada = this.noRutina; 
        return;
    }

    // Asignación de rutinas según el IMC
    if (imc < 18.5) {
        this.rutinaAsignada = this.rutinaFlacos;
    } else if (imc < 24.9) {
        this.rutinaAsignada = this.rutinaNormal;
    } else {
        this.rutinaAsignada = this.rutinaGordos;
    }
}

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
    });

    this.imagen = image.webPath;

    const nombreUsuario = localStorage.getItem('nombreUsuario');
    if (nombreUsuario) {
      const usuario = await this.bd.obtenerUsuarioPorNombre(nombreUsuario);
      const id = usuario.id_usuario;

      await this.bd.actualizarFotoUsuario(id, this.imagen);
      this.usuario.foto = this.imagen;
    }
  }

  loadProfilePicture() {
    if (this.usuario && this.usuario.foto) {
      this.imagen = this.usuario.foto;
    } else {
      this.imagen = 'https://as2.ftcdn.net/jpg/02/15/84/43/220_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg';
    }
  }
}
