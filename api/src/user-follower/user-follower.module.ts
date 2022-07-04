import { Module } from '@nestjs/common';
import { UserFollowerService } from './user-follower.service';
import { UserFollowerController } from './user-follower.controller';
import { UserFollower } from './entities/user-follower.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [UserFollowerController],
  providers: [UserFollowerService],
  imports: [
    TypeOrmModule.forFeature([UserFollower])
  ]
})
export class UserFollowerModule {}
