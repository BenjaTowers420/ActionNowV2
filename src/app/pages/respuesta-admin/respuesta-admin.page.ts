import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-respuesta-admin',
  templateUrl: './respuesta-admin.page.html',
  styleUrls: ['./respuesta-admin.page.scss'],
})
export class RespuestaAdminPage implements OnInit {

  comentario: any;

  constructor(private router: Router, private activedrouter: ActivatedRoute, private bd: ServicebdService) {
    this.activedrouter.queryParams.subscribe(res=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.comentario = this.router.getCurrentNavigation()?.extras?.state?.['comentario'];
      }
    })
   }

  ngOnInit() {
  }

  modificar(){
    this.bd.responderComentario(this.comentario.id_comentario, this.comentario.respuesta);
    this.router.navigate(['/listado-comentarios']);
  }

}
