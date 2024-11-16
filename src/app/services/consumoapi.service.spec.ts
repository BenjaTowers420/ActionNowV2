import { TestBed } from '@angular/core/testing';
import { ConsumoapiService } from './consumoapi.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ConsumoapiService', () => {
  let service: ConsumoapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importa HttpClientTestingModule aquí
      providers: [ConsumoapiService]
    });
    service = TestBed.inject(ConsumoapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
