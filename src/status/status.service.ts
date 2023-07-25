import { Injectable } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { HttpService } from '@nestjs/axios';
import { Status } from './entities/status.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StatusService {
  constructor(@InjectRepository(Status) 
  private statusRepository: Repository<Status>,private httpService: HttpService){}
    async apiFind(){
      let response
      let results = []
      let status = []
      for(let i=1;i<=2;i++){
        response = await 
        this.httpService.axiosRef.get
        (`https://rickandmortyapi.com/api/character/?page=`+i)
        results.push(...response.data["results"])
      }
      for(let i=0;i<results.length;i++){
        status.push({status: results[i]['status']})
      }
      var hash = {};
      status = status.filter(function(current) {
        var exists = !hash[current.status];
        hash[current.status] = true;
        return exists;
      });  
      const newCharacter = this.statusRepository.create(status)
      return this.statusRepository.save(newCharacter)
    }
    getStatus(){
      return this.statusRepository.find()
    }
}
