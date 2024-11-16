import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarUsuarioPage } from './agregar-usuario.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('AgregarUsuarioPage', () => {
  let component: AgregarUsuarioPage;
  let fixture: ComponentFixture<AgregarUsuarioPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarUsuarioPage],
      providers: [
        ServicebdService,
        {
          provide: SQLite,
          useValue: {
            create: () => Promise.resolve({ /* Agrega métodos simulados si son necesarios */ })
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
