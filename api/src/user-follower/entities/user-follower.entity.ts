import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';

import { User } from 'src/auth/entities/user.entity';
 
  
  export enum Status {
    blocked = 'blocked',
    accepted = 'accepted',
    pending = 'pending',
  }
  
  @Entity({ name: 'user_followers' })
  export class UserFollower  {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'number' })
    // tslint:disable-next-line: variable-name
    following_id: number;
  
    @Column({ type: 'number' })
    // tslint:disable-next-line: variable-name
    follower_id: number;
  
    @ManyToOne(
      () => User,
      (u: User) => u.followers,
      { eager: true }
    )
    @JoinColumn({ name: 'follower_id' })
    followers: User;
  
    @ManyToOne(
      type => User,
      (u: User) => u.following,
      { eager: true }
    )
    @JoinColumn({ name: 'following_id' })
    following: User;
  
    @Column({ enum: Status, type: 'enum', default: Status.accepted })
    status: Status;
  }