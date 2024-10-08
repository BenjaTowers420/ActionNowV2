import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Rol } from './rol';
import { Usuarios } from './usuarios';

@Injectable({
  providedIn: 'root'
})
export class ServicebdService {

  //variable de conexión a Base de Datos
  public database!: SQLiteObject;

  //variables de creación de Tablas
  //tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario(idusuario INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(100) NOT NULL, edad INTEGER NOT NULL, imc NUMBER NOT NULL, objetivo VARCHAR(60), idrol INTEGER NOT NULL, idrutina INTEGER NOT NULL);";
  //tablaRol: string = "CREATE TABLE IF NOT EXISTS rol(idrol INTEGER PRIMARY KEY autoincrement, nomrol VARCHAR(60))";
  //tablaRutina: string ="CREATE TABLE IF NOT EXISTS rutina(idrutina INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(100) NOT NULL, descripcion VARCHAR(150), dificultad VARCHAR(60) NOT NULL";
  //tablas sin Clave Foranea
tablaRol: string = "CREATE TABLE IF NOT EXISTS rol (id_rol INTEGER PRIMARY KEY, nombre_rol VARCHAR(20) NOT NULL);";

// tablaSuplemento: string = 
//   "CREATE TABLE IF NOT EXISTS suplemento (" +
//   "id_suplemento INTEGER PRIMARY KEY, " +
//   "nombre_sup VARCHAR(20) NOT NULL, " +
//   "descripcion_sup VARCHAR(500) NOT NULL);";

// tablaAlimento: string = 
//   "CREATE TABLE IF NOT EXISTS alimento (" +
//   "id_alimento INTEGER PRIMARY KEY, " +
//   "nom_alimento VARCHAR(20) NOT NULL, " +
//   "calorias_alim INTEGER NOT NULL);";


//Tablas con Clave

tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario (id_usuario INTEGER PRIMARY KEY, nombre VARCHAR(100) NOT NULL, estatura INTEGER, peso INTEGER, objetivo VARCHAR(60), id_rol INTEGER NOT NULL, FOREIGN KEY (id_rol) REFERENCES rol(id_rol));";

// tablaAyuda: string = 
//     "CREATE TABLE IF NOT EXISTS ayuda (" +
//     "id_ayuda INTEGER PRIMARY KEY, " +
//     "asunto VARCHAR(30) NOT NULL, " +
//     "mensaje VARCHAR(200) NOT NULL, " +
//     "id_usuario INTEGER, " +
//     "FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario));";

// tablaRutina: string = 
//     "CREATE TABLE IF NOT EXISTS rutina (" +
//     "id_rutina INTEGER PRIMARY KEY, " +
//     "nombre_rutina VARCHAR(30) NOT NULL, " +
//     "descripcion VARCHAR(2000) NOT NULL, " +
//     "id_usuario INTEGER, " +
//     "FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario));";

// tablaEjercicio: string = 
//     "CREATE TABLE IF NOT EXISTS ejercicio (" +
//     "id_ejercicio INTEGER PRIMARY KEY, " +
//     "nom_ejercicio VARCHAR(30) NOT NULL, " +
//     "descripcion VARCHAR(60) NOT NULL, " +
//     "id_rutina INTEGER, " +
//     "FOREIGN KEY (id_rutina) REFERENCES rutina(id_rutina));";

  //INSERT
  registroRol: string = "INSERT OR IGNORE INTO rol (id_rol, nombre_rol) VALUES (1, 'administrador'), (2, 'usuario')";
    

  registroUsuario: string = "INSERT OR IGNORE INTO usuario (id_usuario, nombre, estatura, peso, objetivo, id_rol) VALUES(1, 'Josue Machaca', 1, 1, '', 1), (2, 'Don Evo', 170, 500, 'Bajar de peso', 2);";

  //POr si da error al agregar datos
  // borrarTablad:string="DROP TABLE usuario;";

  //GUARDAR DATOS DE LAS CONSULTAS EN LAS TABLAS
  listadoRol = new BehaviorSubject([]);
  listadoUsuarios = new BehaviorSubject ([]);

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

  fetchUSuarios(): Observable<Usuarios[]>{
    return this.listadoUsuarios.asObservable();
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

      //ejecuto la creación de Tablas
      await this.database.executeSql(this.tablaRol, []);
      await this.database.executeSql(this.tablaUsuario, []);

      //ejecuto los insert por defecto en el caso que existan
      await this.database.executeSql(this.registroRol, []);
      await this.database.executeSql(this.registroUsuario, []);

      this.seleccionarUsuarios();
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
            id_rol: res.rows.item(i).id_rol
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
    this.presentAlert("service","ID: " + id);
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


}
