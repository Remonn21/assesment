import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../generated/prisma/enums';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { ParticipantsService } from './participants.service';

@Controller('participants')
@Auth(Role.FACILITATOR, Role.MANAGER)
export class ParticipantsController {
  constructor(private readonly participants: ParticipantsService) {}

  @Get()
  list() {
    return this.participants.list();
  }

  @Post()
  create(@Body() dto: CreateParticipantDto) {
    return this.participants.create(dto);
  }

  @Get(':id')
  report(@Param('id') id: string) {
    return this.participants.getReport(id);
  }
}
