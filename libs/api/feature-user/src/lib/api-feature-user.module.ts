import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ApiFeatureUserController } from './api-feature-user.controller';
import { ApiFeatureUserService } from './api-feature-user.service';
import { ApiDataAccessUserModule } from '@api/data-access-user';

@Module({
  controllers: [ApiFeatureUserController],
  providers: [ApiFeatureUserService],
  exports: [ApiFeatureUserService],
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env['JWT_ACCESS_TOKEN_SECRET'],
      signOptions: { expiresIn: process.env['JWT_ACCESS_TOKEN_EXPIRES_IN'] },
    }),
    ApiDataAccessUserModule,
  ],
})
export class ApiFeatureUserModule {}
