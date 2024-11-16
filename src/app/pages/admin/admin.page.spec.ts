import { TestBed } from '@angular/core/testing';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx' // o donde tengas la librería
import { Platform } from '@ionic/angular'; // si estás usando Ionic

describe('ServicebdService', () => {
  let service: ServicebdService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ServicebdService,
        SQLite,
        Platform, // Si estás usando Ionic
        { provide: SQLite, useValue: {} } // O un mock de SQLite
      ]
    });
    service = TestBed.inject(ServicebdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
