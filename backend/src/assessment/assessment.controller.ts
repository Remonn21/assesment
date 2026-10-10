import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { SubmitAssessmentDto } from './dto/submit-assessment.dto';

@Controller('assessment/:token')
export class AssessmentController {
  constructor(private readonly assessment: AssessmentService) {}

  @Get()
  get(@Param('token', ParseUUIDPipe) token: string) {
    return this.assessment.getAssessment(token);
  }

  @Post('submit')
  submit(
    @Param('token', ParseUUIDPipe) token: string,
    @Body() dto: SubmitAssessmentDto,
  ) {
    return this.assessment.submit(token, dto);
  }

  @Get('result')
  result(@Param('token', ParseUUIDPipe) token: string) {
    return this.assessment.getResult(token);
  }
}
