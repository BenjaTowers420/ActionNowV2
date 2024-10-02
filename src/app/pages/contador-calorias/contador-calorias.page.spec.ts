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
});
