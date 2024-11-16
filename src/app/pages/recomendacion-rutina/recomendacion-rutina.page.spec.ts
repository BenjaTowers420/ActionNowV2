import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecomendacionRutinaPage } from './recomendacion-rutina.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('RecomendacionRutinaPage', () => {
  let component: RecomendacionRutinaPage;
  let fixture: ComponentFixture<RecomendacionRutinaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecomendacionRutinaPage],
      providers: [
        ServicebdService,
        {
          provide: SQLite,
          useValue: {
            create: () => Promise.resolve({ /* Métodos simulados aquí si son necesarios */ })
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecomendacionRutinaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
