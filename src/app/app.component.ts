import { Component } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private menu: MenuController, private router: Router, private alertController: AlertController) {}

  irPerfil() {
    this.router.navigate(['/perfil']);
  }
  

  closeMenu(){
    this.menu.close();
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
    this.menu.close();
}}