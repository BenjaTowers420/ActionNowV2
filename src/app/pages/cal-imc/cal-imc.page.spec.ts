import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalImcPage } from './cal-imc.page';

describe('CalImcPage', () => {
  let component: CalImcPage;
  let fixture: ComponentFixture<CalImcPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CalImcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
