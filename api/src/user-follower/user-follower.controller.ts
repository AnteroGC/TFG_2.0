import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserFollowerService } from './user-follower.service';
import { CreateUserFollowerDto } from './dto/create-user-follower.dto';
import { UpdateUserFollowerDto } from './dto/update-user-follower.dto';

@Controller('user-follower')
export class UserFollowerController {
  constructor(private readonly userFollowerService: UserFollowerService) {}

  @Post()
  create(@Body() createUserFollowerDto: CreateUserFollowerDto) {
    return this.userFollowerService.create(createUserFollowerDto);
  }

  @Get()
  findAll() {
    return this.userFollowerService.findAll();
  }

  @Get(':id')
  findFollowing(@Param('id') id: string) {
    return this.userFollowerService.findOneFollowing(+id);
  }

  @Get('followers/:id')
  findFollowers(@Param('id') id: string) {
    return this.userFollowerService.findOneFollower(+id);
  }
  @Get(':idUserLoged/:idUserSearch')
  isFollower(@Param('idUserLoged') idUserLoged: string, @Param('idUserSearch') idUserSearch: string) {
    return this.userFollowerService.ifFollower(+idUserLoged, +idUserSearch );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserFollowerDto: UpdateUserFollowerDto) {
    return this.userFollowerService.update(+id, updateUserFollowerDto);
  }

  @Delete(':idUserLoged/:idUserSearch')
  remove(@Param('idUserLoged') idUserLoged: string, @Param('idUserSearch') idUserSearch: string) {
    return this.userFollowerService.remove(+idUserLoged, +idUserSearch);
  }
}
