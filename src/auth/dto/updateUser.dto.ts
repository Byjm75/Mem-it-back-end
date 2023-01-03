import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto';
export class UpdateUserDto extends PartialType(CreateAuthDto) {
  email?: string;
  pseudo?: string;
  password?: string;
  picture?: string;
}
