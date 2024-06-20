import { Controller, Get, Post, Body, Param, Delete, Put, Query, Headers, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import * as jwt from 'jsonwebtoken';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {
    console.log('UserController initialized');
  }
  

  @Get('auth')
  async checkAuth(@Query('user') userId: string, @Headers('authorization') authHeader: string): Promise<{ auth: boolean }> {
    const token = authHeader.split(' ')[1]; // Assume 'Bearer <token>'
    const userIdNumber = parseInt(userId, 10);
  
    if (!token) {
      return {auth:false}
    }

    try {
      const decoded = jwt.verify(token, 'your_jwt_secret') as jwt.JwtPayload;
      const user = await this.userService.findOne(userIdNumber);

      if (decoded.email == user.email && decoded.password == user.password) {
        console.log('User authenticated successfully:', user.name);
        return { auth: true };
      } else {
        console.log('User ID does not match token ID');
        return { auth: false };
      }
    } catch (err) {
      console.error('Error during token verification:', err.message);
      throw new UnauthorizedException('Invalid token');
    }
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.userService.findOne(+id);
  }

  @Get('/email/:email')
  async findByEmail(@Param('email') email: string): Promise<User> {
    return await this.userService.findByEmail(email);
  }

  @Post()
  async create(@Body() user: User): Promise<{ message: string; user: User }> {
    const newUser = await this.userService.create(user);
    return {
      message: 'ok',
      user: newUser,
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: Partial<User>): Promise<User> {
    return await this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.userService.remove(+id);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }): Promise<{ token: string | false }> {
    const user = await this.userService.validateUser(body.email, body.password);
    if (!user) {
      return { token: false };
    }
    const token = this.userService.generateJwtToken(user);
    return { token };
  }
}
