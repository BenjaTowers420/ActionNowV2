import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RespuestaUsuarioPage } from './respuesta-usuario.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx'; // Si usas este plugin
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router'; // Si usas ActivatedRoute en tu página
import { of } from 'rxjs'; // Para simular respuestas de observables

describe('RespuestaUsuarioPage', () => {
  let component: RespuestaUsuarioPage;
  let fixture: ComponentFixture<RespuestaUsuarioPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RespuestaUsuarioPage],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: SQLite,
          useValue: {
            create: () => Promise.resolve({}),
            executeSql: (sql: string, params: any[]) => Promise.resolve({ rows: { item: () => ({ id: 1, comentario: 'Comentario de prueba', respuesta: 'Respuesta de prueba' }) } })
          }
        },
        {
          provide: ServicebdService,
          useValue: {
            dbState: jasmine.createSpy('dbState').and.returnValue(of(true)), // Simulación de dbState
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
    fixture = TestBed.createComponent(RespuestaUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
