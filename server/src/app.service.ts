import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'available';
  }

  getHealth(): { status: string } {
    return { status: 'available' };
  }
}
