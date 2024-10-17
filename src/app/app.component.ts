import { Component } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  nombreUsuario: string = '';

  constructor(private menu: MenuController, private router: Router, private alertController: AlertController) {
    // Escuchar los cambios de navegación para actualizar el nombre del usuario
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.nombreUsuario = localStorage.getItem('nombreUsuario') || '';
      }
    });
  }
  

  
  ngOnInit() {
    // Cargar el nombre del usuario al iniciar la app
    this.nombreUsuario = localStorage.getItem('nombreUsuario') || '';
    
  }

  closeMenu(){
    this.menu.close();
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
    this.menu.close();
  }

  // cerrarSesion() {
  //   // Limpiar datos del perfil y nombre del usuario logeado
  //   localStorage.removeItem('nombreUsuario'); // Remover el nombre de usuario almacenado
  //   localStorage.removeItem('profilePicture'); // Remover la foto de perfil almacenada
  //   localStorage.removeItem('objetivo'); // Remover el objetivo si está almacenado
  //   this.router.navigate(['/login']); // Redirigir al login
  // }
  cerrarSesion() {
    localStorage.clear(); // Limpia todos los datos almacenados en el LocalStorage
    this.nombreUsuario = ''; // Limpia el nombre de usuario en el componente principal
    this.router.navigate(['/login']); 
  }
}