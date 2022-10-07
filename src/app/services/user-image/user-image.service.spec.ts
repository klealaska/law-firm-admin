/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserImageService } from './user-image.service';

describe('Service: UserImage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserImageService]
    });
  });

  it('should ...', inject([UserImageService], (service: UserImageService) => {
    expect(service).toBeTruthy();
  }));
});
