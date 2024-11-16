import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroPage } from './registro.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { Vibration } from '@awesome-cordova-plugins/vibration/ngx';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';  // Importa FormsModule para usar ngForm

describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroPage],
      imports: [IonicModule.forRoot(), FormsModule],  // Asegúrate de importar FormsModule aquí
      providers: [
        ServicebdService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: of({ get: () => 'dummyId' }) }
          }
        },
        {
          provide: SQLite,
          useValue: {
            create: () => Promise.resolve({}),
            executeSql: (sql: string, params: any[]) => Promise.resolve({ rows: { item: () => ({ id: 1, name: 'Test' }) } })
          }
        },
        {
          provide: Vibration,
          useValue: { vibrate: () => {} }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe validar correctamente los datos de registro', () => {
    // Caso 1: Campos vacíos
    component.datosRegistro.usuario = "";
    component.datosRegistro.contrasena = "";
    component.onValidate();
    expect(component.errorMessage).toBe("Debe rellenar el campo nombre y contraseña");
  
    // Caso 2: Contraseña sin mayúscula ni número
    component.datosRegistro.usuario = "jose";
    component.datosRegistro.contrasena = "contraseña";  
    component.onValidate();
    expect(component.errorMessage).toBe("La contraseña debe contener al menos una mayúscula y un número");
  
    // Caso 3: Contraseña sin mayúscula
    component.datosRegistro.usuario = "jose";
    component.datosRegistro.contrasena = "contraseña123";  
    component.onValidate();
    expect(component.errorMessage).toBe("La contraseña debe contener al menos una mayúscula");
  
    // Caso 4: Contraseña sin número
    component.datosRegistro.usuario = "jose";
    component.datosRegistro.contrasena = "Contraseña";  
    component.onValidate();
    expect(component.errorMessage).toBe("La contraseña debe contener al menos un número");
  
    // Caso 5: Contraseñas no coinciden
    component.datosRegistro.usuario = "jose";
    component.datosRegistro.contrasena = "Contraseña123";
    component.datosRegistro.confirmarContrasena = "Contraseña124";  
    component.onValidate();
    expect(component.errorMessage).toBe("Las contraseñas no coinciden.");

    
    // Caso 6: Contraseña válida
    component.datosRegistro.usuario = "jose";
    component.datosRegistro.contrasena = "Contraseña123";
    component.datosRegistro.confirmarContrasena = "Contraseña123";
    component.onValidate();
    expect(component.errorMessage).toBe("");  

  });
});
