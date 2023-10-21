import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { IUser } from '@shared/domain';

export class CreateUserDto implements Pick<IUser, 'email'> {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;
}
