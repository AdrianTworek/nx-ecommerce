import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntitySchema } from './schemas/user.entity-schema';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntitySchema])],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
