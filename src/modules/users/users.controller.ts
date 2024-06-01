import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers() {
    // TODO: Implement logic to get all users
    return this.usersService.listUsers();
  }

  @Get(':id')
  getUserById() {
    // TODO: Implement logic to get a user by ID
  }

  @Post()
  createUser() {
    // TODO: Implement logic to create a new user
  }

  @Put(':id')
  updateUser() {
    // TODO: Implement logic to update a user by ID
  }

  @Delete(':id')
  deleteUser() {
    // TODO: Implement logic to delete a user by ID
  }
}
