import { SetMetadata } from '@nestjs/common';

export const Validator = (...args: string[]) => SetMetadata('validator', args);
