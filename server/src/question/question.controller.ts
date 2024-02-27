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

import { SaveQuestionDto } from './dto/save-question.dto';
import { QuestionService } from './question.service';
import { AtGuard } from '../auth/guards/at.guard';

@UseGuards(AtGuard)
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.questionService.findById(id);
  }

  @Post(':briefId')
  create(
    @Param('briefId') briefId: string,
    @Body() saveQuestionDto: SaveQuestionDto,
  ) {
    return this.questionService.create(briefId, saveQuestionDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() saveQuestionDto: SaveQuestionDto) {
    return this.questionService.update(id, saveQuestionDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.questionService.delete(id);
  }
}
