import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(@InjectRepository(Post)private readonly repo: Repository<Post>) {

  }
  async create(createPostDto: CreatePostDto, user: User) {    
    const post = new Post();
    Object.assign(post, createPostDto);
    post.user = user;
    this.repo.create(post);
    return await this.repo.save(post);
  }

  async findAll(query: string ) {

    console.log('entrando ' + query)
   

    if(!(Object.keys(query).length === 0) && query.constructor === Object) {
      const myquery = `Select p.*, us.*, c.tittle as cattittle FROM posts p
      INNER JOIN user_followers u
      on u.follower_id = p.userId
      INNER JOIN users us
      on us.id = p.userId
      INNER JOIN categories c
      on c.id = p.categoryId
      where u.following_id = ${query['id']};`
   

      
      let res= await this.repo.query(myquery);
      let array: any[] =res.map((pos)=>{
        
        const{firstName,lastName,email, password, profilePic, roles, cattittle, categoryId, userId, isLogin, ...rest} = pos
       
      const user = {
        email: email,
        id: userId,
        firstName: firstName,
        lastName: lastName,
        profilePic: profilePic,
        roles: roles,
        isLogin: isLogin
      };
     
      const category ={
        id : categoryId,
        tittle : cattittle
      }
      const finalResult ={
        ...rest, 
        category: {
          ...category
        },
        user :{
          ...user
        }
      }
      return  finalResult
      
      })

      
      return array
    }
    else{
      const myquery = `Select p.*, us.*, c.tittle as cattittle FROM posts p
      INNER JOIN users us
      on us.id = p.userId
      INNER JOIN categories c
      on c.id = p.categoryId`
      let res= await this.repo.query(myquery);
      let array: any[] =res.map((pos)=>{
        
        const{firstName,lastName,email, password, profilePic, roles, cattittle, categoryId, userId, isLogin, ...rest} = pos
        
      const user = {
        email: email,
        id: userId,
        firstName: firstName,
        lastName: lastName,
        profilePic: profilePic,
        roles: roles,
        isLogin: isLogin
      };
      
      const category ={
        id : categoryId,
        tittle : cattittle
      }
      const finalResult ={
        ...rest, 
        category: {
          ...category
        },
        user :{
          ...user
        }
      }
      return  finalResult
      
      })

 
      return array
    }
      
    
  
  }


  async findOne(id: number) {
    console.log('que haces aqui')
    
    try {
      const post = await this.repo.findOneOrFail(id);
      return post;
    } catch (err) {
      throw new BadRequestException('Post no encontrado');
    }
  }

  async findByUser(id: number) {
    console.log('hola guapeton')
    try {
      const listPostUser = await this.repo.find({
        where: [
            { user: id },
            
        ],
    });
      return listPostUser;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async findBySlug(slug: string) {
    try {
      const post = await this.repo.findOne({ slug });
      return post;
    } catch (err) {
      throw new BadRequestException(`Post con slug ${slug} no encontrado`);
    }
  }

  async update(slug: string, updatePostDto: UpdatePostDto) {
    const post = await this.repo.findOne({ slug });

    if (!post) {
      throw new BadRequestException('post no encontrado');
    }

    post.modifiedAt = new Date(Date.now());
    post.category = updatePostDto.category;
    Object.assign(post, updatePostDto);
    return this.repo.save(post);
  }

  async remove(id: number) {
    const post = await this.repo.findOne(id);
    await this.repo.remove(post);
    return { success: true, post };
  }
}
