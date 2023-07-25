import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Character } from './entities/character.entity';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post()
  create(@Body() newCharacter: CreateCharacterDto) {
    return this.charactersService.createCharacter(newCharacter);
  }
  @Get('list/api')
  findAll() {
    return this.charactersService.apiFind()
  }
  @Get()
  getCharacters(): Promise<Character[]> {
    return this.charactersService.getCharacters();
  }
  @Get(':id')
  getCharacter(@Param('id', ParseIntPipe) id: number) {
    return this.charactersService.getCharacter(id);
  }
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.charactersService.deleteCharacter(id);
  }
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateCharacterDto) {
    return this.charactersService.updateCharacter(id, user);
  }
}
