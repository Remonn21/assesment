import { plainToInstance } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MinLength,
  validateSync,
} from 'class-validator';

class EnvironmentVariables {
  @IsString()
  @IsNotEmpty()
  DATABASE_URL: string;

  @IsString()
  @MinLength(32)
  JWT_SECRET: string;

  @IsInt()
  @IsPositive()
  JWT_EXPIRES_IN_SECONDS: number;

  @IsInt()
  PORT: number;
}

export function validateEnv(config: Record<string, unknown>) {
  const env = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(env);
  if (errors.length > 0) throw new Error(errors.toString());
  return env;
}
