import { Test } from '@nestjs/testing';
import { ApiFeatureUserService } from './api-feature-user.service';

describe('ApiFeatureUserService', () => {
  let service: ApiFeatureUserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiFeatureUserService],
    }).compile();

    service = module.get(ApiFeatureUserService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
