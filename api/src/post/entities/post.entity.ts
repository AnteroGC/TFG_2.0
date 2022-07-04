import slugify from "slugify";
import { User } from "src/auth/entities/user.entity";
import { Category } from "src/category/entities/category.entity";
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'posts', schema: 'public' })
export class Post {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    tittle: string;

    @Column()
    content: string;

    @Column()
    slug: string;

    @Column({type: 'timestamp', default: ()=> 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({type: 'timestamp', default: ()=> 'CURRENT_TIMESTAMP'})
    modifiedAt: Date;

    @Column({
        default:
          'https://i0.wp.com/clicxy.com/wp-content/uploads/2016/04/dummy-post-horisontal.jpg?ssl=1',
        nullable: true,
      })
    mainImageUrl: string;

    @Column({
      
      nullable: true,
    })
    song: string;

    @ManyToOne(() => Category, (cat) => cat.post, { eager: true })
    @JoinColumn({
        referencedColumnName: 'id',
        name: 'categoryId',
    })
    category: Category;

    @ManyToOne(() => User, (user) => user.posts, { eager: true })
    @JoinColumn({
    referencedColumnName: 'id',
    name: 'userId',
    })
    user: User;

    @BeforeInsert()
    slugifyPost(){
      this.slug = slugify(this.tittle.substring(0, 20), { 
        replacement: '_',
        lower: true,
      });

    }
}
