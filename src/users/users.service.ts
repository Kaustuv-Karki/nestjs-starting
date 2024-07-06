import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'John Doe',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'Jane Doe',
      role: 'ENGINEER',
    },
    {
      id: 3,
      name: 'Jim Doe',
      role: 'INTERN',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    } else {
      return this.users;
    }
  }

  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }

  create(user: {
    name: string;
    email: string;
    role: 'INTERN' | 'ENGINEER' | 'ADMIN';
  }) {
    const usersByHighestID = [...this.users].sort((a, b) => b.id - a.id);
    const newID = usersByHighestID[0].id + 1;
    this.users.push({ id: newID, ...user });

    return user;
  }

  update(id: number, userUpdate: { name?: string; email?: string }) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...userUpdate };
      } else {
        return user;
      }
    });
    return this.findOne(id);
  }

  delete(id: number) {
    this.users = this.users.filter((user) => user.id !== id);
    return `User with id ${id} has been deleted`;
  }
}
