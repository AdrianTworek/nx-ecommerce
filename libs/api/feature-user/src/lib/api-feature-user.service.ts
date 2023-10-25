import { UserEntitySchema } from '@api/data-access-user';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser } from '@shared/domain';
import { Repository } from 'typeorm';

@Injectable()
export class ApiFeatureUserService {
  constructor(
    @InjectRepository(UserEntitySchema)
    private userRepository: Repository<IUser>,
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

  async create(
    user: Pick<IUser, 'email' | 'password'>,
  ): Promise<Omit<IUser, 'password'>> {
    const newUser = await this.userRepository.save(user);
    const { password, ...data } = newUser;
    return data;
  }

  async delete(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User was not found');
    }
    await this.userRepository.remove(user);
  }
}
