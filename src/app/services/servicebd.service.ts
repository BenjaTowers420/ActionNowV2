import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Rol } from './rol';
import { Comentarios } from './comentarios';
import { Usuarios } from './usuarios';
import { Productos } from './productos';

@Injectable({
  providedIn: 'root'
})
export class ServicebdService {

  //variable de conexión a Base de Datos
  public database!: SQLiteObject;

  
  //tablas sin Clave Foranea
tablaRol: string = "CREATE TABLE IF NOT EXISTS rol (id_rol INTEGER PRIMARY KEY, nombre_rol VARCHAR(20) NOT NULL);";

tablaComentario: string = "CREATE TABLE IF NOT EXISTS comentario (id_comentario INTEGER PRIMARY KEY autoincrement, nombre_usuario VARCHAR(100) NOT NULL, motivo VARCHAR(100) NOT NULL, texto VARCHAR(250) NOT NULL, respuesta VARCHAR(250));";

tablaProducto: string = "CREATE TABLE IF NOT EXISTS producto (id_producto INTEGER PRIMARY KEY autoincrement, nombre_producto VARCHAR(100) NOT NULL, descripcion_producto VARCHAR(200) NOT NULL, foto_producto VARCHAR(200) NOT NULL)";


//Tablas con Clave

tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario (id_usuario INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(100) NOT NULL, estatura INTEGER, peso INTEGER, imc VARCHAR(40), objetivo VARCHAR(60), id_rol INTEGER NOT NULL, contrasena VARCHAR(150) NOT NULL, foto VARCHAR(200), pregunta1 VARCHAR(150), pregunta2 VARCHAR(150), FOREIGN KEY (id_rol) REFERENCES rol(id_rol));";


tablaRutina: string = "CREATE TABLE IF NOT EXISTS rutina (id_rutina INTEGER PRIMARY KEY, nombre_rutina VARCHAR(30) NOT NULL, descripcion VARCHAR(2000) NOT NULL, clasificacion_imc VARCHAR(80) NOT NULL, objetivo VARCHAR(80) NOT NULL);";


  //INSERT
  registroRol: string = "INSERT OR IGNORE INTO rol (id_rol, nombre_rol) VALUES (1, 'administrador'), (2, 'usuario')";
  
  registroComentario: string = "INSERT OR IGNORE INTO comentario (id_comentario, nombre_usuario, motivo, texto, respuesta) VALUES (1, 'Joao Da Silva', 'prueba de comentario', 'esto es una prueba', 'respuesta de comentario')";

  registroProducto: string = "INSERT OR IGNORE INTO producto (id_producto, nombre_producto, descripcion_producto, foto_producto) VALUES (1, 'Proteina', 'Buena para ganar masa muscular', 'https://www.nutrabody.cl/catalogo/imagen-100-whey-protein-professional-2-350-grs--coco-1040151040.jpeg')";

  registroUsuario: string = "INSERT OR IGNORE INTO usuario (id_usuario, nombre, estatura, peso, imc, objetivo, id_rol, contrasena, foto, pregunta1, pregunta2) VALUES(1, 'Josue Machaca', 1, 1, '1', '', 1, 'ASD12345', 'https://pics.filmaffinity.com/206770211157388-nm_200.jpg', 'gato', 'Mia Khalifa'), (2, 'prueba', 170, 500,'500', 'Bajar de peso', 2, 'ASD12345', 'https://static.theclinic.cl/media/2009/04/evomorales.jpg', 'perro', 'jenifer lawrence');";

  registroRutina: string = "INSERT OR IGNORE INTO rutina (id_rutina, nombre_rutina, descripcion, clasificacion_imc, objetivo) VALUES " +
                         "(1, 'Plan A', 'Rutina de hipertrofia', 'bajo peso', 'ganar masa muscular'), " +
                         "(2, 'Plan B', 'Rutina de hipertrofia', 'bajo peso', 'ganar masa muscular'), " +
                         "(3, 'Plan C', 'Rutina de hipertrofia', 'bajo peso', 'ganar masa muscular'), " +
                         "(4, 'Plan D', 'Rutina cardiovascular', 'peso normal', 'perder peso'), " +
                         "(5, 'Plan E', 'Rutina cardiovascular', 'peso normal', 'perder peso'), " +
                         "(6, 'Plan F', 'Rutina cardiovascular', 'peso normal', 'perder peso'), " +
                         "(7, 'Plan G', 'Rutina de hipertrofia', 'sobrepeso', 'salud'), " +
                         "(8, 'Plan H', 'Rutina de hipertrofia', 'sobrepeso', 'salud'), " +
                         "(9, 'Plan J', 'Rutina de hipertrofia', 'sobrepeso', 'salud');";
  //POr si da error al agregar datos
  // borrarTablad:string="DROP TABLE usuario;";

  //GUARDAR DATOS DE LAS CONSULTAS EN LAS TABLAS
  listadoRol = new BehaviorSubject([]);
  listadoComentarios = new BehaviorSubject([]);
  listadoProductos = new BehaviorSubject([]);
  listadoUsuarios = new BehaviorSubject ([]);
  listadoRutinas = new BehaviorSubject ([]);

  //variable para el status de la Base de datos
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, private alertController: AlertController) { 
    this.createBD();
  }

  async presentAlert(titulo: string, msj:string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  //metodos para manipular los observables

  fetchRol(): Observable<Rol[]>{
    return this.listadoRol.asObservable();
  }

  fetchComentarios(): Observable<Comentarios[]>{
    return this.listadoComentarios.asObservable();
  }
  

  fetchProductos(): Observable<Productos[]>{
    return this.listadoProductos.asObservable();
  }

  fetchUsuarios(): Observable<Usuarios[]>{
    return this.listadoUsuarios.asObservable();
  }

  fetchRutinas(): Observable<Usuarios[]>{
    return this.listadoRutinas.asObservable();
  }

  dbState(){
    return this.isDBReady.asObservable();
  }

 
  createBD(){
    //varificar si la plataforma esta disponible
    this.platform.ready().then(()=>{
      //crear la Base de Datos
      this.sqlite.create({
        name: 'usuarios.db',
        location: 'default'
      }).then((db: SQLiteObject)=>{
        //capturar la conexion a la BD
        this.database = db;
        //llamamos a la función para crear las tablas
        this.crearTablas();
      }).catch(e=>{
        this.presentAlert('Base de Datos', 'Error en crear la BD: ' + JSON.stringify(e));
      })
    })

  }

  async crearTablas(){
    try{

      // Eliminar la tabla si ya existe
      //await this.database.executeSql('DROP TABLE IF EXISTS usuario', []);
      //await this.database.executeSql('DROP TABLE IF EXISTS comentario', []);
      //await this.database.executeSql('DROP TABLE IF EXISTS rutina', []);
      //await this.database.executeSql('DROP TABLE IF EXISTS rol', []);

      //ejecuto la creación de Tablas
      await this.database.executeSql(this.tablaRol, []);
      await this.database.executeSql(this.tablaComentario, []);
      await this.database.executeSql(this.tablaProducto, []);
      await this.database.executeSql(this.tablaRutina, []);
      await this.database.executeSql(this.tablaUsuario, []);

      //ejecuto los insert por defecto en el caso que existan
      await this.database.executeSql(this.registroRol, []);
      await this.database.executeSql(this.registroComentario, []);
      await this.database.executeSql(this.registroProducto, []);
      await this.database.executeSql(this.registroRutina, []);
      await this.database.executeSql(this.registroUsuario, []);

      this.seleccionarUsuarios();
      this.seleccionarComentarios();
      this.seleccionarProductos();
      //modifico el estado de la Base de Datos
      this.isDBReady.next(true);

    }catch(e){
      this.presentAlert('Creación de Tablas', 'Error en crear las tablas: ' + JSON.stringify(e));
    }
  }

  seleccionarUsuarios(){
    return this.database.executeSql('SELECT * FROM usuario', []).then(res=>{
       //variable para almacenar el resultado de la consulta
       let items: Usuarios[] = [];
       //valido si trae al menos un registro
       if(res.rows.length > 0){
        //recorro mi resultado
        for(var i=0; i < res.rows.length; i++){
          //agrego los registros a mi lista
          items.push({
            id_usuario: res.rows.item(i).id_usuario,
            nombre: res.rows.item(i).nombre,
            estatura: res.rows.item(i).estatura,
            peso: res.rows.item(i).peso,
            objetivo: res.rows.item(i).objetivo,
            id_rol: res.rows.item(i).id_rol,
            pregunta1: res.rows.item(i).pregunta1,
            pregunta2: res.rows.item(i).pregunta2,
          })
        }
        
       }
       //actualizar el observable
       this.listadoUsuarios.next(items as any);

    })
  }

  eliminarUsuario(id:string){
    return this.database.executeSql('DELETE FROM usuario WHERE id_usuario = ?',[id]).then(res=>{
      this.presentAlert("Eliminar","Usuario Eliminado");
      this.seleccionarUsuarios();
    }).catch(e=>{
      this.presentAlert('Eliminar', 'Error: ' + JSON.stringify(e));
    })
  }

  modificarUsuario(id:string, nombre:string, id_rol : string){
    return this.database.executeSql('UPDATE usuario SET nombre = ?, id_rol = ? WHERE id_usuario = ?',[nombre,id_rol,id]).then(res=>{
      this.presentAlert("Modificar","Usuario Modificado");
      this.seleccionarUsuarios();
    }).catch(e=>{
      this.presentAlert('Modificar', 'Error: ' + JSON.stringify(e));
    })

  }

  insertarUsuario(nombre:string, id_rol:number){
    return this.database.executeSql('INSERT INTO usuario(nombre,id_rol) VALUES (?,?)',[nombre, id_rol]).then(res=>{
      this.presentAlert("Insertar","Usuario Registrado");
      this.seleccionarUsuarios();
    }).catch(e=>{
      this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    })
  }

  registrarUsuario(nombre: string, contrasena: string, id_rol: number) {
    return this.database.executeSql('INSERT INTO usuario(nombre, contrasena, id_rol) VALUES (?, ?, ?)', [nombre, contrasena, id_rol]).then(res => {
      this.presentAlert("Registro", "Usuario Registrado");
      this.seleccionarUsuarios();
    }).catch(e => {
      this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    });
  }

  verificarUsuario(nombre: string, contrasena: string) {
    return this.database.executeSql('SELECT * FROM usuario WHERE nombre = ? AND contrasena = ?', [nombre, contrasena])
      .then(res => {
        if (res.rows.length > 0) {
          // Si se encuentra el usuario, devolver sus datos, incluido el id_rol
          return {
            id_usuario: res.rows.item(0).id_usuario,
            nombre: res.rows.item(0).nombre,
            id_rol: res.rows.item(0).id_rol // Aquí obtenemos el rol del usuario
          };
        }
        return null; // Si no se encuentra, devolver null
      });
  } 

  actualizarDatosUsuario(id: string, estatura: number, peso: number, imc: number, objetivo: string) {
    return this.database.executeSql('UPDATE usuario SET estatura = ?, peso = ?, imc = ?, objetivo = ? WHERE id_usuario = ?', [estatura, peso, imc, objetivo, id])
      .then(res => {
        this.presentAlert('Actualizar', 'Datos del usuario actualizados');
      }).catch(e => {
        this.presentAlert('Error', 'Error al actualizar los datos: ' + JSON.stringify(e));
      });
  }

  obtenerUsuarioPorNombre(nombre: string): Promise<any> {
    return this.database.executeSql('SELECT * FROM usuario WHERE nombre = ?', [nombre]).then(res => {
      if (res.rows.length > 0) {
        return {
          id_usuario: res.rows.item(0).id_usuario,
          nombre: res.rows.item(0).nombre,
          estatura: res.rows.item(0).estatura,
          peso: res.rows.item(0).peso,
          imc: res.rows.item(0).imc,
          foto: res.rows.item(0).foto,
        };
      }
      return null;
    });
  }

  async verificarUsuarioExistente(nombre: string): Promise<boolean> {
    const usuario = await this.obtenerUsuarioPorNombre(nombre);
    return usuario !== null;
  }

  cambiarContrasena(nombreUsuario: string, nuevaContrasena: string): Promise<any> {
    return this.database.executeSql('UPDATE usuario SET contrasena = ? WHERE nombre = ?', [nuevaContrasena, nombreUsuario])
      .then(res => {
        this.presentAlert('Éxito', 'Contraseña cambiada con éxito');
      }).catch(e => {
        this.presentAlert('Error', 'Error al cambiar la contraseña: ' + JSON.stringify(e));
      });
  }

  
  
  
  actualizarFotoUsuario(id: string, foto: string) {
    return this.database.executeSql('UPDATE usuario SET foto = ? WHERE id_usuario = ?', [foto, id])
      .then(res => {
        this.presentAlert('Actualizar', 'Foto del usuario actualizada');
      }).catch(e => {
        this.presentAlert('Error', 'Error al actualizar la foto: ' + JSON.stringify(e));
      });
  }

  seleccionarComentarios() {
    return this.database.executeSql('SELECT * FROM comentario', []).then(res => {
      let items: Comentarios[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_comentario: res.rows.item(i).id_comentario,
            nombre_usuario: res.rows.item(i).nombre_usuario,
            motivo: res.rows.item(i).motivo,
            texto: res.rows.item(i).texto,
            respuesta: res.rows.item(i).respuesta
          });
        }
      }
      // Asegúrate de emitir los comentarios correctamente
      this.listadoComentarios.next(items as any);  // Actualiza el BehaviorSubject
    })
  }
  

  insertarComentario(nombre_usuario:string, motivo:string, texto:string){
    return this.database.executeSql('INSERT INTO comentario(nombre_usuario,motivo,texto) VALUES (?,?,?)',[nombre_usuario, motivo, texto]).then(res=>{
      this.presentAlert("Mensaje enviado","Gracias por sus comentarios!!");
      this.seleccionarComentarios();
    }).catch(e=>{
      this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    })
  }

  eliminarComentario(id:string){
    return this.database.executeSql('DELETE FROM comentario WHERE id_comentario = ?',[id]).then(res=>{
      this.presentAlert("Eliminar","Comentario Eliminado");
      this.seleccionarComentarios();
    }).catch(e=>{
      this.presentAlert('Eliminar', 'Error: ' + JSON.stringify(e));
    })
  }

  responderComentario(id:string, respuesta: string){
    return this.database.executeSql('UPDATE comentario SET respuesta = ? WHERE id_comentario = ?',[respuesta,id]).then(res=>{
      this.presentAlert("Responder","Respuesta Enviada");
      this.seleccionarComentarios();
    }).catch(e=>{
      this.presentAlert('Modificar', 'Error: ' + JSON.stringify(e));
    })
  }


  seleccionarProductos(){
    return this.database.executeSql('SELECT * FROM producto', []).then(res=>{
       //variable para almacenar el resultado de la consulta
       let items: Productos[] = [];
       //valido si trae al menos un registro
       if(res.rows.length > 0){
        //recorro mi resultado
        for(var i=0; i < res.rows.length; i++){
          //agrego los registros a mi lista
          items.push({
            id_producto: res.rows.item(i).id_producto,
            nombre_producto: res.rows.item(i).nombre_producto,
            descripcion_producto: res.rows.item(i).descripcion_producto,
            foto_producto: res.rows.item(i).foto_producto
          })
        }
        
       }
       //actualizar el observable
       this.listadoProductos.next(items as any);

    })
  }

  insertarProducto(nombre_producto:string, descripcion_producto:string, foto_producto:string){
    return this.database.executeSql('INSERT INTO producto(nombre_producto,descripcion_producto, foto_producto) VALUES (?,?,?)',[nombre_producto, descripcion_producto, foto_producto]).then(res=>{
      this.presentAlert("Insertar","Producto Registrado");
      this.seleccionarProductos();
    }).catch(e=>{
      this.presentAlert('Insertar', 'Error: ' + JSON.stringify(e));
    })
  }

  eliminarProducto(id:string){
    return this.database.executeSql('DELETE FROM producto WHERE id_producto = ?',[id]).then(res=>{
      this.presentAlert("Eliminar","Producto Eliminado");
      this.seleccionarProductos();
    }).catch(e=>{
      this.presentAlert('Eliminar', 'Error: ' + JSON.stringify(e));
    })
  }

  modificarProducto(id_producto:string, nombre_producto:string, descripcion_producto : string, foto_producto : string){
    return this.database.executeSql('UPDATE producto SET nombre_producto = ?, descripcion_producto = ?, foto_producto = ? WHERE id_producto = ?',[nombre_producto,descripcion_producto,foto_producto,id_producto]).then(res=>{
      this.presentAlert("Modificar","Producto Modificado");
      this.seleccionarUsuarios();
    }).catch(e=>{
      this.presentAlert('Modificar', 'Error: ' + JSON.stringify(e));
    })

  }
}
