import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RespuestaUsuarioPage } from './respuesta-usuario.page';

describe('RespuestaUsuarioPage', () => {
  let component: RespuestaUsuarioPage;
  let fixture: ComponentFixture<RespuestaUsuarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RespuestaUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
