import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { RankedGroupDto } from './ranked-group.dto';

export class SubmitAssessmentDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RankedGroupDto)
  groups: RankedGroupDto[];
}
