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
      host: 'roundhouse.proxy.rlwy.net',
      port: 46105,
      username: 'root',
      password: 'cE2cBAAGhCE6dfh5hHEh2a2ChegA66hF',
      database: 'railway',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    CharactersModule,
    StatusModule,
    GenderModule]
})
export class AppModule {}
