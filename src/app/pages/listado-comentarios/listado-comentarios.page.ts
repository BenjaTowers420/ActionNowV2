import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-listado-comentarios',
  templateUrl: './listado-comentarios.page.html',
  styleUrls: ['./listado-comentarios.page.scss'],
})
export class ListadoComentariosPage implements OnInit {

  arregloComentario: any = []

  constructor(private bd:ServicebdService, private router: Router) { }

  ngOnInit() {
    this.bd.dbState().subscribe(data => {
      if (data) {
        this.bd.fetchComentarios().subscribe(res => {
          this.arregloComentario = res;
        });
      }
    });
  }
}
