import { Module } from '@nestjs/common';
import { ApiFeatureUserController } from './api-feature-user.controller';
import { ApiFeatureUserService } from './api-feature-user.service';

@Module({
  controllers: [ApiFeatureUserController],
  providers: [ApiFeatureUserService],
  exports: [ApiFeatureUserService],
})
export class ApiFeatureUserModule {}
