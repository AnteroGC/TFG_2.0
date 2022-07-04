import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class ApplyUser extends AuthGuard('jwt') {
  handleRequest(err: any, user: any) {
    if (user){
      console.log('en el aply '+ user)
      return user;
    } 
    return null;
  }
}