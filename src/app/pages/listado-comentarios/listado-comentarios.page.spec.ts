import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoComentariosPage } from './listado-comentarios.page';

describe('ListadoComentariosPage', () => {
  let component: ListadoComentariosPage;
  let fixture: ComponentFixture<ListadoComentariosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoComentariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
