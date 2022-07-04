
// import { ApplyUser } from './current-user.guard';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/userLogin.dto';
import { Request, Response } from 'express';
// import { User } from './entities/user.entity';
// import { CurrentUser } from './user.decorator';
 import { CreateUserDto } from './dto/create-auth.dto';
import { ApplyUser } from './current-user.guard';
import { CurrentUser } from './user.decorator';
import { User } from './entities/user.entity';
// import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async loginUser(@Body() loginDto: any, @Res() res: Response) {
    const { token, user } = await this.authService.login(
      loginDto as UserLoginDto,
    );
    /*res.setHeader('Set-Cookie', token);
    return res.send({ success: true });
*/

    res.cookie('IsAuthenticated', true, { maxAge: 2 * 60 * 60 * 1000 });
    res.cookie('Authentication', token, {
      httpOnly: true,
      maxAge: 2 * 60 * 60 * 1000,
    }); // max age 2 hours

    return res.send({ success: true, user });
  }

  @Post('register')
  @UsePipes(ValidationPipe)
  registerUser(@Body() body: CreateUserDto) {
    return this.authService.register(body);
  }

  @Get('authstatus')
  @UseGuards(ApplyUser)
  authStatus(@CurrentUser() user: User) {
    console.log('en el authstatus')
    console.log(user);
    return { status: !!user, user };
  }

  @Post('logout')
  @UseGuards(ApplyUser)
  logout(@CurrentUser() user: User, @Req() req: Request, @Res() res: Response) {
    console.log(user)
    res.clearCookie('Authentication');


    return res.status(200).send({ success: true });
  }
  @Get('/name/:name')
  findBySlug(@Param('name') slug: string) {
    return this.authService.findByName(slug);
  }

  @Get('/name')
  findAllUser() {
    return this.authService.findAll();
  }
}
