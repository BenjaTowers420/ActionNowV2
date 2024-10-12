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

  irPerfil() {
    this.router.navigate(['/perfil']);
  }
  

  closeMenu(){
    this.menu.close();
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
    this.menu.close();
  }

  cerrarSesion() {
    localStorage.removeItem('nombreUsuario');
    this.nombreUsuario = '';

    this.router.navigate(['/login']);
  }
}