import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

export class SuccessResponse<T> {
  @ApiProperty({
    description: 'API response message',
    example: 'Successful',
  })
  message: string;

  @ApiProperty({
    description: 'API response data',
  })
  data?: T;

  constructor(data?: T, message = 'Successful') {
    this.data = data;
    this.message = message;
  }

  static make<T = any>(data?: T): SuccessResponse<T> {
    return new SuccessResponse(data);
  }
}

export class ErrorResponse {
  code: number;

  @ApiProperty({
    description: 'API response data',
  })
  message: string;

  @ApiProperty({
    description: 'Exception',
  })
  exception?: HttpException;

  constructor(
    message = 'Bad request',
    code: number = HttpStatus.BAD_REQUEST,
    exception?: HttpException,
  ) {
    this.message = message;
    this.code = code;
    this.exception = exception;
  }

  static make(
    message = 'Bad request',
    code: number = HttpStatus.BAD_REQUEST,
    exception?: HttpException,
  ): HttpException {
    return new HttpException(new ErrorResponse(message, code, exception), code);
  }
}
