import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContadorCaloriasPage } from './contador-calorias.page';

describe('ContadorCaloriasPage', () => {
  let component: ContadorCaloriasPage;
  let fixture: ComponentFixture<ContadorCaloriasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ContadorCaloriasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Validacion del campo nombre cuando esta vacío', () => {
    //caso 1: alimento no seleccionado
    component.alimentoSeleccionado = "";
    component.cantidadGramos = 14;
    component.onValidate();
    expect(component.errorMessage).toBe("Debe seleccionar un alimento");

    // Caso 2: cantidad negativa
    component.alimentoSeleccionado = "Manzana";
    component.cantidadGramos = -1;
    component.onValidate();
    expect(component.errorMessage).toBe("Debe ingresar una cantidad válida");

    // Caso 3: Datos válidos
    component.alimentoSeleccionado = "Manzana";
    component.cantidadGramos = 180;
    component.onValidate();
    expect(component.errorMessage).toBe("");  
  });
  
});
