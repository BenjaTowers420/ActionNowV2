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

  constructor(private bd: ServicebdService) {}

  //ngOnInit() {
    ionViewWillEnter() {
    // Cargar el perfil del usuario actual
    this.resetPerfil();
    this.cargarDatosUsuario();
  }
  
  ngOnDestroy() {
    // Limpiar los datos del perfil para evitar mostrar datos del usuario anterior
    this.usuario = {
      nombre: '',
      estatura: 0,
      peso: 0,
      imc: '',
      objetivo: '',
      foto: ''
    };
    this.imagen = '';  // También limpia la imagen del perfil
  }

  resetPerfil() {
    this.usuario = {
      nombre: '',
      estatura: 0,
      peso: 0,
      imc: '',
      objetivo: '',
      foto: ''
    };
    this.imagen = '';
  }

  cargarDatosUsuario() {
    // Restablecer los datos del perfil antes de cargar los nuevos
    this.usuario = {
      nombre: '',
      estatura: 0,
      peso: 0,
      imc: '',
      objetivo: '',
      foto: ''
    };
  
    const nombreUsuario = localStorage.getItem('nombreUsuario');
    if (nombreUsuario) {
      this.bd.obtenerUsuarioPorNombre(nombreUsuario).then(usuario => {
        if (usuario) {
          this.usuario = usuario;
          this.imagen = this.usuario.foto;  // Actualizar la imagen del perfil
        }
      });
    }
  }

  // Método para tomar la foto y actualizarla en la base de datos
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

      // Actualizar la foto en la base de datos
      await this.bd.actualizarFotoUsuario(id, this.imagen);
      this.usuario.foto = this.imagen;  // Reflejar el cambio en la UI
    }
  }

  // Método para cargar la imagen desde la base de datos al entrar en la página
  loadProfilePicture() {
    if (this.usuario && this.usuario.foto) {
      this.imagen = this.usuario.foto;
    } else {
      this.imagen = 'https://as2.ftcdn.net/jpg/02/15/84/43/220_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'; // Ruta de una imagen por defecto
    }
  }
}
