import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiFeatureUserService } from './api-feature-user.service';
import { CreateUserDto } from './dtos/user.dto';

@Controller({ path: 'users' })
export class ApiFeatureUserController {
  constructor(private apiFeatureUserService: ApiFeatureUserService) {}

  @Get('')
  getAll() {
    return this.apiFeatureUserService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.apiFeatureUserService.getOne(id);
  }

  @Post('')
  create(@Body() data: CreateUserDto) {
    return this.apiFeatureUserService.create(data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.apiFeatureUserService.delete(id);
  }
}
