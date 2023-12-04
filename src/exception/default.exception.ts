import { ApiProperty } from '@nestjs/swagger';

export class DefaultException {
  constructor(prefix: string, code: number, message: string | null) {
    this.errorCode = `${prefix}-${`${code}`.padStart(3, '0')}`;
    this.errorMessage = message;
  }

  @ApiProperty()
  errorCode: string;

  @ApiProperty()
  errorMessage: string;
}
