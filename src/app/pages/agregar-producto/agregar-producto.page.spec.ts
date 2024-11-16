import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarProductoPage } from './agregar-producto.page';
import { Vibration } from '@awesome-cordova-plugins/vibration/ngx';
import { ModalController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service'; // Si usas este servicio
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { IonicModule } from '@ionic/angular';

describe('AgregarProductoPage', () => {
  let component: AgregarProductoPage;
  let fixture: ComponentFixture<AgregarProductoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarProductoPage],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: Vibration,
          useValue: { vibrate: () => {} } // Simula el método vibrate
        },
        {
          provide: ModalController,
          useValue: { create: () => Promise.resolve({ present: () => {} }) } // Simula ModalController si se usa en tu página
        },
        {
          provide: ServicebdService,
          useValue: { // Simula el servicio ServicebdService si lo necesitas en las pruebas
            // Métodos simulados si es necesario
          }
        },
        {
          provide: SQLite,
          useValue: { // Simula SQLite para evitar errores en las pruebas
            create: () => Promise.resolve({}),
            executeSql: (sql: string, params: any[]) => Promise.resolve({ rows: { item: () => ({ id: 1, name: 'Producto de prueba' }) } })
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Validacion de producto válido', () => {
    // Caso 1: Campos vacíos
    component.nombre_producto = "";
    component.descripcion_producto = "xdddd";
    component.foto_producto = "http.skajdfakjsfd";
    component.onValidate();
    expect(component.errorMessage).toBe("Debe rellenar el campo nombre"); 
  
    // Caso 2: Solo el motivo vacío
    component.nombre_producto = "trembolona";
    component.descripcion_producto = "";
    component.foto_producto = "http.asdfasfdasf";
    component.onValidate();
    expect(component.errorMessage).toBe("Debe ingresar una descripcion para el producto");
  
    // Caso 3: Solo el texto vacío
    component.nombre_producto = "proteina";
    component.descripcion_producto = "descrisao";
    component.foto_producto = "";
    component.onValidate();
    expect(component.errorMessage).toBe("Debe ingresar una foto para el producto"); 
  });
});
