import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { CompletedBriefService } from './completed-brief.service';
import { CompleteBriefDto } from './dto/complete-brief.dto';
import { UpdateBriefDto } from './dto/update-brief.dto';
import { AtGuard } from '../auth/guards/at.guard';

@Controller('completed-brief')
export class CompletedBriefController {
  constructor(private readonly completedBriefService: CompletedBriefService) {}

  @Get()
  findAll() {
    return this.completedBriefService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.completedBriefService.findById(id);
  }

  @Post(':briefId')
  completeBrief(
    @Param('briefId') briefId: string,
    @Body() completeBriefDto: CompleteBriefDto[],
  ) {
    return this.completedBriefService.completeBrief(briefId, completeBriefDto);
  }

  @UseGuards(AtGuard)
  @Put(':id')
  updateAnswers(
    @Param('id') id: string,
    @Body() completeBriefDto: UpdateBriefDto[],
  ) {
    return this.completedBriefService.updateAnswers(id, completeBriefDto);
  }
}
