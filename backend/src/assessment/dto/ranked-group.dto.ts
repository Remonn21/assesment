import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsInt,
} from 'class-validator';

export class RankedGroupDto {
  @IsInt()
  groupId: number;

  @IsArray()
  @ArrayMinSize(4)
  @ArrayMaxSize(4)
  @ArrayUnique()
  @IsInt({ each: true })
  wordIds: number[];
}
