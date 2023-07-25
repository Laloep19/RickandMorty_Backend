import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { Status } from 'src/status/entities/status.entity';
import { HttpModule } from '@nestjs/axios';
import { Gender } from 'src/gender/entities/gender.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Character,Status,Gender]),HttpModule],
  controllers: [CharactersController],
  providers: [CharactersService]
})
export class CharactersModule {}
