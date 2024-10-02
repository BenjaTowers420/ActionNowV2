import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  nombreUsuario: string='';

  constructor( private router: Router) {}

  irRutina() {
    this.router.navigate(['/rutinas'])
  }

  irContador() {
    this.router.navigate(['/contador-calorias'])
  }

  irIMC() {
    this.router.navigate(['/cal-imc'])
  }

  irProductos() {
    this.router.navigate(['/productos'])
  }

  ngOnInit() {
  }


  

}
