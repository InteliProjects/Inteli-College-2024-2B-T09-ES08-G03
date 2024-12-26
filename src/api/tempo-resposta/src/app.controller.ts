import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';


interface MonitorPayload {
  uploadId: string;
  maxResponseTime: number; // Tempo máximo permitido em milissegundos
  emailsWarning: string[]
}

@Controller('timer')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('start')
  async startTimer(@Body() payload: MonitorPayload): Promise<any> {
    return this.appService.startTimerService(payload.uploadId, payload.maxResponseTime, payload.emailsWarning)
  }

  @Post('end')
  async endTimer(@Body() payload: {userId: any, uploadId: string}): Promise<any> {
    return this.appService.endTimerService(payload.userId, payload.uploadId)
  }
}
