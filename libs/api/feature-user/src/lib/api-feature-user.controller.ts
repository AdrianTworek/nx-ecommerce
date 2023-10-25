import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiFeatureUserService } from './api-feature-user.service';
import { CreateUserDto } from './dtos/user.dto';
import { SignInDto } from './dtos/sign-in.dto';
import { AuthGuard } from './api-feature-user.guard';

@Controller({ path: 'users' })
export class ApiFeatureUserController {
  constructor(private apiFeatureUserService: ApiFeatureUserService) {}

  @Get('')
  getAll() {
    return this.apiFeatureUserService.getAll();
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.apiFeatureUserService.getById(id);
  }

  @Post('register')
  register(@Body() data: CreateUserDto) {
    return this.apiFeatureUserService.create(data);
  }

  @Post('login')
  @HttpCode(200)
  signIn(@Body() signInDto: SignInDto) {
    return this.apiFeatureUserService.signIn(
      signInDto.email,
      signInDto.password,
    );
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @HttpCode(204)
  delete(@Request() req: any, @Param('id') id: string) {
    if (req.user.sub !== id) {
      throw new ForbiddenException();
    }
    return this.apiFeatureUserService.delete(id);
  }
}
