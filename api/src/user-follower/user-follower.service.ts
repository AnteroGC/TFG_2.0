import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserFollowerDto } from './dto/create-user-follower.dto';
import { UpdateUserFollowerDto } from './dto/update-user-follower.dto';
import { UserFollower } from './entities/user-follower.entity';

@Injectable()
export class UserFollowerService {
  constructor(@InjectRepository(UserFollower)private readonly repo: Repository<UserFollower>) {

  }
  async create(createUserFollowerDto: CreateUserFollowerDto) {
    const userFollow = new UserFollower()
    
    Object.assign(userFollow, createUserFollowerDto);
    
    this.repo.create(userFollow);
    return await this.repo.save(userFollow);
  }

  findAll() {
    return `This action returns all userFollower`;
  }

  async findOneFollowing(following_id: number) {
    try {
      const listUser = await this.repo.find({
        where: [
            { following_id: following_id },
            
        ],
    });
      return listUser;
    } catch (err) {
      throw new BadRequestException(`El usuario con ID ${following_id} no tiene existe`);
    }
  
  }

  async findOneFollower(follower_id: number) {
    try {
      const listUser = await this.repo.find({
        where: [
            { follower_id: follower_id },
            
        ],
    });
      return listUser;
    } catch (err) {
      throw new BadRequestException(`El usuario con ID ${follower_id} no existe`);
    }
  
  }

  async ifFollower(following_id: number, follower_id: number) {
    try {
      const listUser = await this.repo.find({
        where: [
            { following_id: following_id, follower_id: follower_id },
            
        ],
    });
      return listUser;
    } catch (err) {
      throw new BadRequestException(`El usuario con ID ${following_id} no tiene seguidores`);
    }
  
  }

  update(id: number, updateUserFollowerDto: UpdateUserFollowerDto) {
    return `This action updates a #${id} userFollower`;
  }

  async remove(following_id: number, follower_id: number) {
    const listUser = await this.repo.find({
      where: [
          { following_id: following_id, follower_id: follower_id },
          
      ],
  });
    await this.repo.remove(listUser);
    return { success: true, listUser };
  }
}
