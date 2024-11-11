import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FrasesPage } from './frases.page';

describe('FrasesPage', () => {
  let component: FrasesPage;
  let fixture: ComponentFixture<FrasesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FrasesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
