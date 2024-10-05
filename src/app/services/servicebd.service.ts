import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
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
tablaRol: string = 
  "CREATE TABLE IF NOT EXISTS rol (" +
  "id_rol INTEGER PRIMARY KEY, " +
  "nombre_rol VARCHAR(20) NOT NULL);";

tablaSuplemento: string = 
  "CREATE TABLE IF NOT EXISTS suplemento (" +
  "id_suplemento INTEGER PRIMARY KEY, " +
  "nombre_sup VARCHAR(20) NOT NULL, " +
  "descripcion_sup VARCHAR(500) NOT NULL);";

tablaAlimento: string = 
  "CREATE TABLE IF NOT EXISTS alimento (" +
  "id_alimento INTEGER PRIMARY KEY, " +
  "nom_alimento VARCHAR(20) NOT NULL, " +
  "calorias_alim INTEGER NOT NULL);";


//Tablas con Clave

tablaUsuario: string = 
    "CREATE TABLE IF NOT EXISTS usuario (" +
    "id_usuario INTEGER PRIMARY KEY, " +
    "nombre VARCHAR(100) NOT NULL, " +
    "estatura INTEGER, " +
    "peso INTEGER, " +
    "objetivo VARCHAR(60), " +
    "id_rol INTEGER NOT NULL, " +
    "FOREIGN KEY (id_rol) REFERENCES rol(id_rol));";

tablaAyuda: string = 
    "CREATE TABLE IF NOT EXISTS ayuda (" +
    "id_ayuda INTEGER PRIMARY KEY, " +
    "asunto VARCHAR(30) NOT NULL, " +
    "mensaje VARCHAR(200) NOT NULL, " +
    "id_usuario INTEGER, " +
    "FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario));";

tablaRutina: string = 
    "CREATE TABLE IF NOT EXISTS rutina (" +
    "id_rutina INTEGER PRIMARY KEY, " +
    "nombre_rutina VARCHAR(30) NOT NULL, " +
    "descripcion VARCHAR(2000) NOT NULL, " +
    "id_usuario INTEGER, " +
    "FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario));";

tablaEjercicio: string = 
    "CREATE TABLE IF NOT EXISTS ejercicio (" +
    "id_ejercicio INTEGER PRIMARY KEY, " +
    "nom_ejercicio VARCHAR(30) NOT NULL, " +
    "descripcion VARCHAR(60) NOT NULL, " +
    "id_rutina INTEGER, " +
    "FOREIGN KEY (id_rutina) REFERENCES rutina(id_rutina));";

  //INSERT
  registroRol: string = "INSERT OR IGNORE INTO rol (id_rol, nombre_rol) " +
    "VALUES (1, 'administrador'), " +
    "(2, 'usuario'), ";
    

  registroUsuario: string = "INSERT or IGNORE INTO (" +
    "usuario(id_usuario, nombre, estatura, peso, objetivo, id_rol) (" +
    "VALUES(1, 'Josue Machaca', 1, 1, '', 1), " +
    "(2, 'Dalas Review', 170, 500, 'bajar de peso', 2), ";

  //GUARDAR DATOS DE LAS CONSULTAS EN LAS TABLAS
  listadoUsuarios = new BehaviorSubject ([]);

  //variable para el status de la Base de datos
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, private alertController: AlertController) { }

  async presentAlert(titulo: string, msj:string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  //metodos para manipular los observables
  fetchUSuarios(): Observable<Usuarios[]>{
    return this.listadoUsuarios.asObservable();
  }

  dbState(){
    return this.isDBReady.asObservable();
  }


}
