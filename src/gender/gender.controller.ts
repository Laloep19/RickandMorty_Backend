import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GenderService } from './gender.service';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { Gender } from './entities/gender.entity';

@Controller('gender')
export class GenderController {
  constructor(private readonly genderService: GenderService) {}

  @Get('list/api')
  findAll() {
    return this.genderService.apiFind()
  }
  @Get()
  getCharacters(): Promise<Gender[]> {
    return this.genderService.getGenders();
  }
}
