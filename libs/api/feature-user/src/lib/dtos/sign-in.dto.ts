import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { IUser } from '@shared/domain';

export class SignInDto implements Pick<IUser, 'email' | 'password'> {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password!: string;
}
