import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

interface logAddUpload {
  userId: any
  uploadId: string
  startTime?: number
  maxDuration?: number
  duration?: number
}

@Controller('log')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('add')
  async addLog(@Body() payload: logAddUpload): Promise<string> {
    console.log(payload)
    return this.appService.addLogService(payload.userId, payload.uploadId, payload.startTime, payload.maxDuration, payload.duration)
  }

  @Get(':userId')
  async listLog(@Param('userId') userId: any): Promise<any> {
    return this.appService.listLogService(userId)
  }
}
