import { TestBed } from '@angular/core/testing';

import { TeacherAuthService } from './teacher-auth.service';

describe('TeacherAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeacherAuthService = TestBed.get(TeacherAuthService);
    expect(service).toBeTruthy();
  });
});
