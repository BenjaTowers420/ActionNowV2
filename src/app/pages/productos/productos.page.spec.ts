import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductosPage } from './productos.page';
import { IonicModule, ModalController } from '@ionic/angular'; // Asegúrate de importar ModalController
import { ServicebdService } from 'src/app/services/servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx'; // Si usas este plugin
import { ActivatedRoute } from '@angular/router'; // Si lo usas en tu página
import { of } from 'rxjs'; // Para simular respuestas de observables

describe('ProductosPage', () => {
  let component: ProductosPage;
  let fixture: ComponentFixture<ProductosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductosPage],
      imports: [IonicModule.forRoot()], // Importa IonicModule para los servicios de Ionic
      providers: [
        {
          provide: ModalController,
          useValue: { // Simula el ModalController
            create: jasmine.createSpy('create').and.returnValue(Promise.resolve({
              present: jasmine.createSpy('present'),
              dismiss: jasmine.createSpy('dismiss')
            }))
          }
        },
        {
          provide: SQLite,
          useValue: {
            create: () => Promise.resolve({}),
            executeSql: (sql: string, params: any[]) => Promise.resolve({ rows: { item: () => ({ id: 1, producto: 'Producto de prueba', precio: 10 }) } })
          }
        },
        {
          provide: ServicebdService,
          useValue: {
            dbState: jasmine.createSpy('dbState').and.returnValue(of(true)), // Simula dbState
            // Otros métodos simulados si es necesario
          }
        },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } } // Si lo necesitas en tu página
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
