import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarProductoPage } from './modificar-producto.page';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx'; // Asegúrate de que el import sea correcto

describe('ModificarProductoPage', () => {
  let component: ModificarProductoPage;
  let fixture: ComponentFixture<ModificarProductoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificarProductoPage],
      providers: [
        ServicebdService,
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ producto: { id_producto: 1, nombre_producto: 'Producto 1', descripcion_producto: 'Descripción 1' } }), // Simula los queryParams con un objeto 'producto'
          }
        },
        {
          provide: SQLite,
          useValue: {
            create: () => Promise.resolve({}) // Simula el método create de SQLite
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
