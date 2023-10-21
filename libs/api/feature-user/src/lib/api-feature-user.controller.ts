import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiFeatureUserService } from './api-feature-user.service';
import { IUser } from '@shared/domain';
import { CreateUserDto } from './dtos/user.dto';

@Controller('api-feature-user')
export class ApiFeatureUserController {
  constructor(private apiFeatureUserService: ApiFeatureUserService) {}

  @Get('')
  getAll(): IUser[] {
    return this.apiFeatureUserService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): IUser {
    return this.apiFeatureUserService.getOne(id);
  }

  @Post('')
  create(@Body() data: CreateUserDto): IUser {
    return this.apiFeatureUserService.create(data);
  }
}
