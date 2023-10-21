import { Test } from '@nestjs/testing';
import { ApiFeatureUserController } from './api-feature-user.controller';
import { ApiFeatureUserService } from './api-feature-user.service';

describe('ApiFeatureUserController', () => {
  let controller: ApiFeatureUserController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiFeatureUserService],
      controllers: [ApiFeatureUserController],
    }).compile();

    controller = module.get(ApiFeatureUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
