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

  isAdmin: boolean = false;

  constructor(private menu: MenuController, private router: Router, private alertController: AlertController) {
    // Escuchar los cambios de navegación para actualizar el nombre del usuario
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.nombreUsuario = localStorage.getItem('nombreUsuario') || '';
      }
    });

    // Verificar si el usuario es admin
    const idRol = localStorage.getItem('id_rol');
    this.isAdmin = idRol === '1';
  }
  

  
  ngOnInit() {
    // Cargar el nombre del usuario al iniciar la app
    this.nombreUsuario = localStorage.getItem('nombreUsuario') || '';
    this.isAdmin = localStorage.getItem('id_rol') === '1';

  // Escuchar el evento cuando el usuario inicia sesión
  window.addEventListener('userLoggedIn', () => {
    this.isAdmin = localStorage.getItem('id_rol') === '1';
  });
    
  }

  closeMenu(){
    this.menu.close();
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
    this.menu.close();
  }

  cerrarSesion() {
    localStorage.clear(); 
    this.nombreUsuario = ''; 
    this.isAdmin = false;
    this.router.navigate(['/login']); 
  }
}