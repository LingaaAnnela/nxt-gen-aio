import { TestBed } from '@angular/core/testing';
import { NxtHomeService } from './home.service';

describe('NxtHomeService', () => {
  let service: NxtHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NxtHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
