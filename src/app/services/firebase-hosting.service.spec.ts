import { TestBed } from '@angular/core/testing';

import { FirebaseHostingService } from './firebase-hosting.service';

describe('FirebaseHostingService', () => {
  let service: FirebaseHostingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseHostingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
