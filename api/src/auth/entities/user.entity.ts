import { Post } from "src/post/entities/post.entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcryptjs'
import { UserRoles } from "src/models/user-roles.models";
import { UserFollower } from "src/user-follower/entities/user-follower.entity";

@Entity({ name: 'users', schema: 'public' })
export class User {
@PrimaryGeneratedColumn()
id: number;

@Column()
firstName: string;

@Column()
lastName: string;

@Column()
email: string;

@Column()
password: string;

@Column()
profilePic: string;

@Column({ type: 'enum', enum: UserRoles, enumName: 'roles', default: UserRoles.Reader })
roles: UserRoles;

@Column({default:false})
isLogin: boolean;

@OneToMany(() => Post, (post:Post)=> post.user)
posts: Post[];

@OneToMany(
  () => UserFollower,
  (uf: UserFollower) => uf.followers,
)
followers: UserFollower[];

@OneToMany(
  () => UserFollower,
  (uf: UserFollower) => uf.following,
)
following: UserFollower[];

@BeforeInsert()
hashPass() {
  this.password = bcrypt.hashSync(this.password, 10);
}

}
