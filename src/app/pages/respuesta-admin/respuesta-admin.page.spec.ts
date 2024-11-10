import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RespuestaAdminPage } from './respuesta-admin.page';

describe('RespuestaAdminPage', () => {
  let component: RespuestaAdminPage;
  let fixture: ComponentFixture<RespuestaAdminPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RespuestaAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
