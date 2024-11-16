import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoComentariosPage } from './listado-comentarios.page';
import { ServicebdService } from 'src/app/services/servicebd.service'; // Si usas este servicio
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router'; // Si lo necesitas en tu página
import { of } from 'rxjs'; // Para simular respuestas de observables

describe('ListadoComentariosPage', () => {
  let component: ListadoComentariosPage;
  let fixture: ComponentFixture<ListadoComentariosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListadoComentariosPage],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: SQLite,
          useValue: { 
            create: () => Promise.resolve({}),
            executeSql: (sql: string, params: any[]) => Promise.resolve({ rows: { item: () => ({ id: 1, comentario: 'Comentario de prueba', respuesta: null }) } })
          }
        },
        {
          provide: ServicebdService,
          useValue: {
            dbState: jasmine.createSpy('dbState').and.returnValue(of(true)), // Simula el método dbState
            // Otros métodos simulados si es necesario
          }
        },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } } // Simula el ActivatedRoute si lo usas
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoComentariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
