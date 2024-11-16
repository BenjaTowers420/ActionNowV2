import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoProductosPage } from './listado-productos.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx'; // Asegúrate de importar SQLite correctamente

describe('ListadoProductosPage', () => {
  let component: ListadoProductosPage;
  let fixture: ComponentFixture<ListadoProductosPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoProductosPage],
      providers: [
        { provide: SQLite, useValue: { /* mock de métodos de SQLite si es necesario */ } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoProductosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
