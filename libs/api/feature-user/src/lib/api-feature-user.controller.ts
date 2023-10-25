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
import { ApiOperation } from '@nestjs/swagger';

@Controller({ path: 'users' })
export class ApiFeatureUserController {
  constructor(private apiFeatureUserService: ApiFeatureUserService) {}

  @ApiOperation({
    summary: 'Returns all users',
    tags: ['Users'],
  })
  @Get('')
  @UseGuards(AuthGuard)
  getAll() {
    return this.apiFeatureUserService.getAll();
  }

  @ApiOperation({
    summary: 'Returns current user',
    tags: ['Users'],
  })
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }

  @ApiOperation({
    summary: 'Returns user',
    parameters: [
      {
        in: 'path',
        name: 'id',
        required: true,
      },
    ],
    tags: ['Users'],
  })
  @Get(':id')
  @UseGuards(AuthGuard)
  getOne(@Param('id') id: string) {
    return this.apiFeatureUserService.getById(id);
  }

  @ApiOperation({
    summary: 'Creates user',
    tags: ['Users'],
  })
  @Post('register')
  register(@Body() data: CreateUserDto) {
    return this.apiFeatureUserService.create(data);
  }

  @ApiOperation({
    summary: 'Logs user in',
    tags: ['Users'],
  })
  @Post('login')
  @HttpCode(200)
  signIn(@Body() signInDto: SignInDto) {
    return this.apiFeatureUserService.signIn(
      signInDto.email,
      signInDto.password,
    );
  }

  @ApiOperation({
    summary: 'Deletes user',
    parameters: [
      {
        in: 'path',
        name: 'id',
        required: true,
      },
    ],
    tags: ['Users'],
  })
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
