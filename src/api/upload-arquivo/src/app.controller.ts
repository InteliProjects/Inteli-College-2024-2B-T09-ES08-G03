import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

interface uplaodPayload {
  userId: any
  uploadId: string,
  fileSize: number
}

@Controller('file')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('upload')
  async upload(@Body() payload: uplaodPayload): Promise<string> {
    this.appService.uploadService(payload.userId, payload.uploadId, payload.fileSize);
    return "Upload Iniciado"
  }
}
