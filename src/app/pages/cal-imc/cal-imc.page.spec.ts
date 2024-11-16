import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalImcPage } from './cal-imc.page';
import { IonicModule } from '@ionic/angular'; // Importa IonicModule para los servicios de Ionic
import { ServicebdService } from 'src/app/services/servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx'; // Si usas este plugin
import { of } from 'rxjs'; // Para simular respuestas de observables

describe('CalImcPage', () => {
  let component: CalImcPage;
  let fixture: ComponentFixture<CalImcPage>;
  let servicebdService: jasmine.SpyObj<ServicebdService>;

  beforeEach(async () => {
    // Creamos un espía para el servicio ServicebdService
    const spyServicebd = jasmine.createSpyObj('ServicebdService', ['obtenerUsuarioPorNombre', 'dbState']);

    // Simulamos el comportamiento del método 'obtenerUsuarioPorNombre'
    spyServicebd.obtenerUsuarioPorNombre.and.returnValue(Promise.resolve({ nombre: 'Usuario Test', objetivo: 'Ganar masa muscular' }));
    spyServicebd.dbState.and.returnValue(of(true)); // Simula dbState si es necesario

    await TestBed.configureTestingModule({
      declarations: [CalImcPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ServicebdService, useValue: spyServicebd },
        {
          provide: SQLite,
          useValue: {
            create: () => Promise.resolve({}),
            executeSql: jasmine.createSpy('executeSql').and.callFake((sql: string, params: any[]) => {
              return Promise.resolve({
                rows: {
                  item: (index: number) => ({ id: 1, producto: 'Producto de prueba', precio: 10 })
                }
              });
            })
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalImcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Validación cuando los campos tienen valores menores a cero', () => {
    // Caso 1: Peso negativo
    component.peso = -1;
    component.estatura = 180;
    component.onValidate();
    expect(component.errorMessage).toBe("Debe ingresar un numero válido");
  
    // Caso 2: Estatura negativa
    component.peso = 70;
    component.estatura = -1;
    component.onValidate();
    expect(component.errorMessage).toBe("Debe ingresar un numero válido");
  
    // Caso 3: Ambos valores negativos
    component.peso = -1;
    component.estatura = -1;
    component.onValidate();
    expect(component.errorMessage).toBe("Debe ingresar un numero válido");
  
    // Caso 4: Datos válidos
    component.peso = 70;
    component.estatura = 180;
    component.onValidate();
    expect(component.errorMessage).toBe("");  // Sin error
  });
  

});
