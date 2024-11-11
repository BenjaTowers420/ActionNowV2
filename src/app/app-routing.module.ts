import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  
  {
    path: 'cal-imc',
    loadChildren: () => import('./pages/cal-imc/cal-imc.module').then( m => m.CalImcPageModule)
  },
  {
    path: 'contador-calorias',
    loadChildren: () => import('./pages/contador-calorias/contador-calorias.module').then( m => m.ContadorCaloriasPageModule)
  },
  {
    path: 'recomendacion-rutina',
    loadChildren: () => import('./pages/recomendacion-rutina/recomendacion-rutina.module').then( m => m.RecomendacionRutinaPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'notfound',
    loadChildren: () => import('./pages/notfound/notfound.module').then( m => m.NotfoundPageModule)
  },
  {
    path: 'recuperar-contra',
    loadChildren: () => import('./pages/recuperar-contra/recuperar-contra.module').then( m => m.RecuperarContraPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'productos',
    loadChildren: () => import('./pages/productos/productos.module').then( m => m.ProductosPageModule)
  },
  {
    path: 'agregar-usuario',
    loadChildren: () => import('./pages/agregar-usuario/agregar-usuario.module').then( m => m.AgregarUsuarioPageModule)
  },
  {
    path: 'modificar-usuario',
    loadChildren: () => import('./pages/modificar-usuario/modificar-usuario.module').then( m => m.ModificarUsuarioPageModule)
  },
  {
    path: 'comentarios',
    loadChildren: () => import('./pages/comentarios/comentarios.module').then( m => m.ComentariosPageModule)
  },
  {
    path: 'listado-comentarios',
    loadChildren: () => import('./pages/listado-comentarios/listado-comentarios.module').then( m => m.ListadoComentariosPageModule)
  },
  {
    path: 'agregar-producto',
    loadChildren: () => import('./pages/agregar-producto/agregar-producto.module').then( m => m.AgregarProductoPageModule)
  },
  {
    path: 'listado-productos',
    loadChildren: () => import('./pages/listado-productos/listado-productos.module').then( m => m.ListadoProductosPageModule)
  },
  {
    path: 'respuesta-admin',
    loadChildren: () => import('./pages/respuesta-admin/respuesta-admin.module').then( m => m.RespuestaAdminPageModule)
  },
  {
    path: 'respuesta-usuario',
    loadChildren: () => import('./pages/respuesta-usuario/respuesta-usuario.module').then( m => m.RespuestaUsuarioPageModule)
  },
  {
    path: 'frases',
    loadChildren: () => import('./pages/frases/frases.module').then( m => m.FrasesPageModule)
  },
  {
    path: '**', 
    redirectTo: 'notfound',
    pathMatch: 'full'
  },
  


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
