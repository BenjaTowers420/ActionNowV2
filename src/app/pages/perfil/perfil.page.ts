import { Component } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';

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
    descripcion: 'Desarrollador de software con 5 años de experiencia en desarrollo web y móvil.'
  };

  imagen: any;

  constructor() {
    this.loadProfilePicture(); // Cargar la imagen al iniciar la página
  }

  // Método para tomar la foto y guardar la ruta en localStorage
  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
    });

    this.imagen = image.webPath;

    // Guardar la imagen en el almacenamiento local
    localStorage.setItem('profilePicture', this.imagen);
  };

  // Método para cargar la imagen desde localStorage al entrar en la página
  loadProfilePicture() {
    const savedImage = localStorage.getItem('profilePicture');
    if (savedImage) {
      this.imagen = savedImage;
    }
  }
}