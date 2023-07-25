import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharactersModule } from './characters/characters.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusModule } from './status/status.module';
import { GenderModule } from './gender/gender.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'containers-us-west-181.railway.app',
      port: 7704,
      username: 'root',
      password: 'g7bRAPB1tEXyRERGI1K6',
      database: 'railway',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    CharactersModule,
    StatusModule,
    GenderModule]
})
export class AppModule {}
