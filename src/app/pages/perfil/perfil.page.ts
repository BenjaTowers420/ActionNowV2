import { Component } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {

  usuario: any;

  imagen: any;

  constructor(private bd: ServicebdService) {
    this.loadProfilePicture(); 
  }
  // ngOnInit() {
  //   this.cargarDatosUsuario();
  // }
  ionViewWillEnter() {
    // Esto se ejecuta cada vez que la página se carga
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario() {
    const nombreUsuario = localStorage.getItem('nombreUsuario');
    if (nombreUsuario) {
      this.bd.obtenerUsuarioPorNombre(nombreUsuario).then(usuario => {
        this.usuario = usuario;
      });
    }
  }

  // Método para tomar la foto y guardar la ruta en localStorage
  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
    });
  
    this.imagen = image.webPath;
  
    const nombreUsuario = localStorage.getItem('nombreUsuario');
    if (nombreUsuario) {
      // Obtén el ID del usuario
      const usuario = await this.bd.obtenerUsuarioPorNombre(nombreUsuario);
      const id = usuario.id_usuario;
  
      // Usa el nuevo método para actualizar solo la foto
      this.bd.actualizarFotoUsuario(id, this.imagen);
    }
  
    // Guarda la imagen en localStorage
    localStorage.setItem('profilePicture', this.imagen);
  };

  // Método para cargar la imagen desde la base de datos o localStorage al entrar en la página
  loadProfilePicture() {
    const savedImage = localStorage.getItem('profilePicture');
    if (savedImage) {
      this.imagen = savedImage;
    } else if (this.usuario && this.usuario.foto) {
      this.imagen = this.usuario.foto;
    }
  }
}