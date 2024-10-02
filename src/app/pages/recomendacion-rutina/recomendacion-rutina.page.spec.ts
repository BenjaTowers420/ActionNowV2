import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecomendacionRutinaPage } from './recomendacion-rutina.page';

describe('RecomendacionRutinaPage', () => {
  let component: RecomendacionRutinaPage;
  let fixture: ComponentFixture<RecomendacionRutinaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecomendacionRutinaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
