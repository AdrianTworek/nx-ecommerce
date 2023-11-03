import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { IUser } from '@shared/domain';

export class CreateUserDto implements Pick<IUser, 'email' | 'password'> {
  @ApiProperty({
    type: String,
    example: 'test@test.com',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @ApiProperty({
    type: String,
    example: 'password',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password!: string;
}
