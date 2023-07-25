import { Injectable } from '@nestjs/common';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { Gender } from './entities/gender.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class GenderService {
  constructor(@InjectRepository(Gender) 
  private genderRepository: Repository<Gender>,private httpService: HttpService){}
    async apiFind(){
      let response
      let results = []
      let genders = []
      for(let i=1;i<=2;i++){
        response = await 
        this.httpService.axiosRef.get
        (`https://rickandmortyapi.com/api/character/?page=`+i)
        results.push(...response.data["results"])
      }
      for(let i=0;i<results.length;i++){
        genders.push({gender: results[i]['gender']})
      }
      var hash = {};
      genders = genders.filter(function(current) {
        var exists = !hash[current.gender];
        hash[current.gender] = true;
        return exists;
      });      
      const newGender = this.genderRepository.create(genders)
      return this.genderRepository.save(newGender)
    }
    getGenders(){
      return this.genderRepository.find()
    }
}
