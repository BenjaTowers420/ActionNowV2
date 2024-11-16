import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { Vibration } from '@awesome-cordova-plugins/vibration/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx'; // Importar SQLite
import { ServicebdService } from 'src/app/services/servicebd.service'; // Asegúrate de tener el import de tu servicio

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      providers: [
        {
          provide: Vibration,
          useValue: {
            vibrate: () => {} // Simulación del método vibrate
          }
        },
        {
          provide: SQLite, 
          useValue: {
            create: jasmine.createSpy('create') // Simulamos el método 'create' de SQLite
          }
        },
        ServicebdService, // Agregar tu servicio si es necesario
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe validar correctamente los datos de usuario', () => {
    // Caso 1: Campos vacíos
    component.datosLogin.usuario = "";
    component.datosLogin.contrasena = "";
    component.onValidate();
    expect(component.errorMessage).toBe("Debe rellenar el campo nombre y contraseña");
  
    // Caso 2: Contraseña sin mayúscula ni número
    component.datosLogin.usuario = "jose";
    component.datosLogin.contrasena = "contraseña";  
    component.onValidate();
    expect(component.errorMessage).toBe("La contraseña debe contener al menos una mayúscula y un número");
  
    // Caso 3: Contraseña sin mayúscula
    component.datosLogin.usuario = "jose";
    component.datosLogin.contrasena = "contraseña123";  
    component.onValidate();
    expect(component.errorMessage).toBe("La contraseña debe contener al menos una mayúscula");
  
    // Caso 4: Contraseña sin número
    component.datosLogin.usuario = "jose";
    component.datosLogin.contrasena = "Contraseña";  
    component.onValidate();
    expect(component.errorMessage).toBe("La contraseña debe contener al menos un número");
  
    // Caso 5: Contraseña válida
    component.datosLogin.usuario = "jose";
    component.datosLogin.contrasena = "Contraseña123";  
    component.onValidate();
    expect(component.errorMessage).toBe("");  
  });
  
  
});
