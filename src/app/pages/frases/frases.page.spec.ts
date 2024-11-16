import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FrasesPage } from './frases.page';
import { ConsumoapiService } from 'src/app/services/consumoapi.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FrasesPage', () => {
  let component: FrasesPage;
  let fixture: ComponentFixture<FrasesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrasesPage],
      imports: [HttpClientTestingModule], // Importa HttpClientTestingModule aquí
      providers: [ConsumoapiService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrasesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
