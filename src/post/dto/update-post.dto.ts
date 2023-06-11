import { PartialType } from '@nestjs/mapped-types';
import { UpdateBaseDto } from 'src/base/dto/update-base.dto copy';

export class UpdatePostDto extends PartialType(UpdateBaseDto) {}
