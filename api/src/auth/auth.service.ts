import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';

import { UserLoginDto } from './dto/userLogin.dto';
import * as bcrypt from 'bcryptjs';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
    private jwt: JwtService,
  ) {}

  // Login User
  async login(loginDto: UserLoginDto) {
    const user = await this.repo
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email: loginDto.email })
      .getOne();
    if (!user) {
      throw new UnauthorizedException('credenciales invalidas');
    } else {
      if (await this.verifyPassword(loginDto.password, user.password)) {
        const token = await this.jwt.signAsync({
          email: user.email,
          id: user.id,
        });
        const userloged = await this.repo.findOne(user.id );
        console.log(userloged);
        userloged.isLogin=true;
        this.repo.save(userloged);
        delete user.password;
        return { token, user };
      } else {
        throw new UnauthorizedException('credenciales invalidas, contraseña incorrecta');
      }
    }
  }


  async verifyPassword(password: string, userHash: string) {
    return await bcrypt.compare(password, userHash);
  }



  async register(createUserDto: CreateUserDto) {
    const { firstName, lastName, email, password, profilePic } = createUserDto;
    console.log('hola')
    /*Check if the user is already present in database, if yes, throw error */
    const checkUser = await this.repo.findOne({ where: { email } });
    if (checkUser) {
      throw new BadRequestException('Este email ya ha sido registrado');
    } else {
      const user = new User();
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.password = password;
      user.profilePic = profilePic;

      this.repo.create(user); // this will run any hooks present, such as password hashing
      await this.repo.save(user);
      delete user.password;
      return user;
    }
  }

  
  async findByName(firstName: string) {
    try {
      const user = await this.repo.findOneOrFail({firstName});
      return user;
    } catch (err) {
      throw new BadRequestException('user no encontrado');
    }
  }
  async findAll() {
    return await this.repo.find();
  }
}
