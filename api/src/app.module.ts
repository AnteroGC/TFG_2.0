import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './models/user-roles.models';
import { UserFollowerModule } from './user-follower/user-follower.module';


@Module({
  imports: [
     PostModule,
    CategoryModule,
    TypeOrmModule.forRoot({ 
      type: 'mysql',
      host: 'localhost',
      database: 'PureMusicDB',
      username: 'root',
      password: '',
      port: 3306,
      autoLoadEntities: true,
      //synchronize: true,
      migrationsRun: false, 
    }),
    
    AuthModule,
    AccessControlModule.forRoles(roles),
    UserFollowerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
