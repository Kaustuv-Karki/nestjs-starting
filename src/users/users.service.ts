import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

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
      const rolesArray = this.users.filter((user) => user.role === role);
      if (rolesArray.length === 0) {
        throw new NotFoundException(`User with role ${role} not found`);
      }
    } else {
      return this.users;
    }
  }

  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }

  create(createUserDto: CreateUserDto) {
    const usersByHighestID = [...this.users].sort((a, b) => b.id - a.id);
    const newID = usersByHighestID[0].id + 1;
    this.users.push({ id: newID, ...createUserDto });

    return createUserDto;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
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
