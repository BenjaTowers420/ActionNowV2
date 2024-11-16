import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuperarContraPage } from './recuperar-contra.page';
import { Vibration } from '@awesome-cordova-plugins/vibration/ngx';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('RecuperarContraPage', () => {
  let component: RecuperarContraPage;
  let fixture: ComponentFixture<RecuperarContraPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecuperarContraPage],
      providers: [
        ServicebdService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: of({ get: () => 'dummyId' }) } // Simula el parámetro de la ruta
          }
        },
        {
          provide: Vibration,
          useValue: {
            vibrate: () => {} // Simula el método vibrate de Vibration
          }
        },
        {
          provide: SQLite,
          useValue: {
            create: () => Promise.resolve({}) // Simula el método create de SQLite
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperarContraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
