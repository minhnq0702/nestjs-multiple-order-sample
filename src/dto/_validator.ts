import { BadRequestException, ValidationError } from '@nestjs/common';
import { ValidatorOptions } from 'class-validator';

// ? how to add validationPipeOptions
export interface ValidationPipeOptions extends ValidatorOptions {
  transform?: boolean;
  disableErrorMessages?: boolean;
  exceptionFactory?: (errors: ValidationError[]) => any;
}

export class MyValidationPipeOptions implements ValidationPipeOptions {
  transform?: true;
  disableErrorMessages?: boolean;
  exceptionFactory?: (errors: ValidationError[]) => any;

  constructor() {
    this.transform = true;
    this.disableErrorMessages = false;
    this.exceptionFactory = (errors) => {
      const result = errors.map((error) => ({
        field: error.property,
        msg: error.constraints[Object.keys(error.constraints)[0]],
      }));
      return new BadRequestException({ msg: result });
    };
  }
}
