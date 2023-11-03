import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser } from '@shared/domain';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntitySchema } from '@api/data-access-user';

@Injectable()
export class ApiFeatureUserService {
  constructor(
    @InjectRepository(UserEntitySchema)
    private readonly userRepository: Repository<IUser>,
    private readonly jwtService: JwtService,
  ) {}

  async getAll(): Promise<IUser[]> {
    return await this.userRepository.find();
  }

  async getById(id: string): Promise<IUser> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User was not found');
    }
    return user;
  }

  async getByEmail(email: string): Promise<IUser> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException('User was not found');
    }
    return user;
  }

  async create(
    user: Pick<IUser, 'email' | 'password'>,
  ): Promise<Omit<IUser, 'password'>> {
    const existingUser = await this.userRepository.findOneBy({
      email: user.email,
    });
    if (existingUser) {
      throw new HttpException(
        'User with this email address already exists',
        HttpStatus.CONFLICT,
      );
    }

    const hashedPassword = await bcrypt.hash(user.password as string, 10);
    const newUser = await this.userRepository.save({
      ...user,
      password: hashedPassword,
    });
    const { password, ...result } = newUser;
    return result;
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findOne({
      where: { email },
      select: { id: true, email: true, password: true },
    });

    if (!user || !(await bcrypt.compare(password, user.password as string))) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email };
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        secret: process.env['JWT_ACCESS_TOKEN_SECRET'],
      }),
    };
  }

  async delete(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User was not found');
    }
    await this.userRepository.remove(user);
  }
}
