import { TestBed } from '@angular/core/testing';

import { ZahtevRegService } from './zahtev-reg.service';

describe('ZahtevRegService', () => {
  let service: ZahtevRegService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZahtevRegService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
