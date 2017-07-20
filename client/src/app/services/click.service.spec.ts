import { TestBed, inject } from '@angular/core/testing';

import { ClickService } from './click.service';

describe('ClickService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClickService]
    });
  });

  it('should ...', inject([ClickService], (service: ClickService) => {
    expect(service).toBeTruthy();
  }));
});
