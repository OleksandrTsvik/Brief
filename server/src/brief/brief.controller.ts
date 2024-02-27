import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { BriefService } from './brief.service';
import { BriefDto } from './dto/brief.dto';
import { AtGuard } from '../auth/guards/at.guard';

@Controller('brief')
export class BriefController {
  constructor(private readonly briefService: BriefService) {}

  @Get('active')
  findActive() {
    return this.briefService.findActive();
  }

  @UseGuards(AtGuard)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.briefService.findById(id);
  }

  @UseGuards(AtGuard)
  @Get()
  findAll() {
    return this.briefService.findAll();
  }

  @UseGuards(AtGuard)
  @Get('/questions/:id')
  findByIdWithQuestions(@Param('id') id: string) {
    return this.briefService.findByIdWithQuestions(id);
  }

  @UseGuards(AtGuard)
  @Post()
  create(@Body() briefDto: BriefDto) {
    return this.briefService.create(briefDto);
  }

  @UseGuards(AtGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() briefDto: BriefDto) {
    return this.briefService.update(id, briefDto);
  }

  @UseGuards(AtGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.briefService.delete(id);
  }
}
