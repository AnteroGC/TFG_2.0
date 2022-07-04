import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class ApplyUser2 extends AuthGuard('jwt') {
  handleRequest(err: any, user: any) {
    if (user){
      console.log('en el aply2 '+ user)
      return user;
    } 
    return null;
  }
}