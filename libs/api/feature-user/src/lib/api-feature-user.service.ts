import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from '@shared/domain';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ApiFeatureUserService {
  private users$$ = new BehaviorSubject<IUser[]>([
    { id: '1', email: 'test1@test.com' },
    { id: '2', email: 'test2@test.com' },
    { id: '3', email: 'test3@test.com' },
  ]);

  getAll(): IUser[] {
    return this.users$$.value;
  }

  getOne(id: string): IUser {
    const user = this.users$$.value.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User was not found');
    }
    return user;
  }

  create(user: Pick<IUser, 'email'>): IUser {
    const currentUsers = this.users$$.value;
    const newUser: IUser = {
      ...user,
      id: `${Math.floor(Math.random() * 1000000)}`,
    };
    this.users$$.next([...currentUsers, newUser]);
    return newUser;
  }
}
