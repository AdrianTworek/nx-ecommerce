import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiFeatureUserModule } from '@api/feature-user';

@Module({
  imports: [ApiFeatureUserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
