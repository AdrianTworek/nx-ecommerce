import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { ApiFeatureUserService } from './api-feature-user.service';
import { CreateUserDto } from './dto/user.dto';
import { SignInDto } from './dto/sign-in.dto';
import { ApiOperation } from '@nestjs/swagger';

import { AuthGuard, CurrentUser, ICurrentUser } from '@api/common';

@SkipThrottle()
@Controller({ path: 'users' })
export class ApiFeatureUserController {
  constructor(private readonly apiFeatureUserService: ApiFeatureUserService) {}

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
  getProfile(@CurrentUser() user: ICurrentUser) {
    return user;
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
  @SkipThrottle({ default: false })
  @Throttle({ default: { ttl: 60000, limit: 3 } })
  @Post('register')
  register(@Body() data: CreateUserDto) {
    return this.apiFeatureUserService.create(data);
  }

  @ApiOperation({
    summary: 'Logs user in',
    tags: ['Users'],
  })
  @SkipThrottle({ default: false })
  @Throttle({ default: { ttl: 60000, limit: 3 } })
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
  delete(@CurrentUser() user: ICurrentUser, @Param('id') id: string) {
    if (user.sub !== id) {
      throw new ForbiddenException();
    }
    return this.apiFeatureUserService.delete(id);
  }
}
