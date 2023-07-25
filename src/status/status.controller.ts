import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Status } from './entities/status.entity';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get('list/api')
  findAll() {
    return this.statusService.apiFind()
  }
  @Get()
  getStatus(): Promise<Status[]> {
    return this.statusService.getStatus();
  }
}
