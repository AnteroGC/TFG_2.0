import { User } from "src/auth/entities/user.entity";
import { Post } from "src/post/entities/post.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'categories', schema: 'public' })
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tittle: string;

    @Column()
    description: string;

    @OneToMany(() => Post, (post:Post) => post.category )
    post:Post;


}
