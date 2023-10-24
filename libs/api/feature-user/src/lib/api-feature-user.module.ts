import { Module } from '@nestjs/common';
import { ApiFeatureUserController } from './api-feature-user.controller';
import { ApiFeatureUserService } from './api-feature-user.service';
import { ApiDataAccessUserModule } from '@api/data-access-user';

@Module({
  controllers: [ApiFeatureUserController],
  providers: [ApiFeatureUserService],
  exports: [ApiFeatureUserService],
  imports: [ApiDataAccessUserModule],
})
export class ApiFeatureUserModule {}
