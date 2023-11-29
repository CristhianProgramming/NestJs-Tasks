import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type:'postgres',
    port: 5432,
    host: 'localhost',
    username: 'postgres',
    password: '12345',
    database: 'pruebas_node',
    logging:true,
    entities:[__dirname +'/**/*.entity.{ts,js}'],
    synchronize:true
  }),UsersModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
