import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

interface Usuario {
  nombre: string;
  estado: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage {

  arregloUsuario: any = [
    {
      id: '',
      nombre: '',
      rol: ''
    }
  ]


  constructor(private bd: ServicebdService, private router: Router) { }

  ngOnInit() {
    
  }

  modificar(x:any){
    let navigationsExtras: NavigationExtras = {
      state: {
        noticia: x
      }
    }
    this.router.navigate(['/modificar-usuario'], navigationsExtras);

  }
  eliminar(x:any){
    //this.bd.eliminarNoticia(x.idnoticia);
  }

  agregar(){
    this.router.navigate(['/agregar-usuario']);
  }

}