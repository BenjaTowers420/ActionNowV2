import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComentariosPage } from './comentarios.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('ComentariosPage', () => {
  let component: ComentariosPage;
  let fixture: ComponentFixture<ComentariosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComentariosPage],
      providers: [
        ServicebdService,
        {
          provide: SQLite,
          useValue: {
            create: () => Promise.resolve({ /* Puedes agregar métodos simulados aquí */ })
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComentariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Validacion de comentario válido', () => {
    // Caso 1: Campos vacíos
    component.nombre_usuario = "";
    component.motivo = "";
    component.texto = "";
    component.onValidate();
    expect(component.errorMessage).toBe("Debe rellenar el campo nombre"); // Mensaje para nombre
  
    // Caso 2: Solo el motivo vacío
    component.nombre_usuario = "Juan";
    component.motivo = "";
    component.texto = "Texto del comentario";
    component.onValidate();
    expect(component.errorMessage).toBe("Debe ingresar un motivo"); // Mensaje para motivo
  
    // Caso 3: Solo el texto vacío
    component.nombre_usuario = "Juan";
    component.motivo = "Motivo";
    component.texto = "";
    component.onValidate();
    expect(component.errorMessage).toBe("Debe ingresar un texto"); // Mensaje para texto
  });
  
  
});
