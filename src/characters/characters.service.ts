import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Character } from './entities/character.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from 'src/status/entities/status.entity';
import { HttpService } from '@nestjs/axios';
import { Gender } from 'src/gender/entities/gender.entity';

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(Character) 
    private characterRepository: Repository<Character>,
    @InjectRepository(Status) 
    private statusRepository: Repository<Status>,
    @InjectRepository(Gender) 
    private genderRepository: Repository<Gender>,
    private httpService: HttpService
      ){}
    async apiFind(){
      let response
      let results = []
      for(let i=1;i<=2;i++){
        response = await 
        this.httpService.axiosRef.get
        (`https://rickandmortyapi.com/api/character/?page=`+i)
        results.push(...response.data["results"])
      }
    const status = await this.statusRepository.find()
    const gender = await this.genderRepository.find()
    let error=true;
    for(let i=0;i<results.length;i++){
      for(let j=1;j<=status.length;j++){
        if(status[j-1].status==results[i]['status']){
          results[i]['status']=j
          error=false
        }
      }
      for(let j=1;j<=gender.length;j++){
        if(gender[j-1].gender==results[i]['gender']){
          results[i]['gender']=j
          error=false
        }
      }
    }
    if(error){
      return new HttpException('Entrada de estado invalida', HttpStatus.NOT_ACCEPTABLE)
    }
    /*var hash = {};
    results = results.filter(function(current) {
      var exists = !hash[current.name];
      hash[current.name] = true;
      return exists;
    });*/
    
    const newCharacter = this.characterRepository.create(results)
    return this.characterRepository.save(newCharacter)
    }
  async createCharacter(character: CreateCharacterDto){
    const characterFound = await this.characterRepository.findOne({
      where: {
        name: character.name,
      }
    })
    if (characterFound){
      return new HttpException('Personaje ya existente', HttpStatus.CONFLICT)
    }
    const newCharacter = this.characterRepository.create(character)
    return this.characterRepository.save(newCharacter)
  }
  getCharacters(){
    return this.characterRepository.find({
      relations: ['status', 'gender']
    })
  }
  async getCharacter(id: number) {
    const characterFound= await this.characterRepository.findOne({
      where:{
        id
      },relations: ['status', 'gender']
    });
    if(!characterFound){
      return new HttpException('Personaje no encontrado', HttpStatus.NOT_FOUND  )
    }
    return characterFound;
  }
  async deleteCharacter(id: number){
    const result = await this.characterRepository.delete({id});
    
    if(result.affected === 0){
      return new HttpException('Personaje no encontrado', HttpStatus.NOT_FOUND  )
    }

    return result;
  }
  updateCharacter(id: number, character: UpdateCharacterDto){
    return this.characterRepository.update({id},character)
  }
}
