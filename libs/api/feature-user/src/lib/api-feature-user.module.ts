import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ApiFeatureUserController } from './api-feature-user.controller';
import { ApiFeatureUserService } from './api-feature-user.service';
import { ApiDataAccessUserModule } from '@api/data-access-user';
import { jwtConstants } from './constants';

@Module({
  controllers: [ApiFeatureUserController],
  providers: [ApiFeatureUserService],
  exports: [ApiFeatureUserService],
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
    ApiDataAccessUserModule,
  ],
})
export class ApiFeatureUserModule {}
