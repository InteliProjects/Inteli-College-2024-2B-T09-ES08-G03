import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

interface fileUploadPayload {
  userId: any
  fileSize: number //Tempo em segundos que vai demorar
}

interface emailPayload{
  emailArray: string[]
}

@Controller('gateway')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('email')
  async emailUpload(@Body() payload: emailPayload){
    return this.appService.emailPush(payload.emailArray)
  }

  @Get("email")
  async emailGet(){
    return this.appService.emailServiceGet()
  }

  @Post('upload')
  async fileUpload(@Body() payload: fileUploadPayload): Promise<any> {
    return this.appService.fileUploadService(payload.userId, payload.fileSize)
  }

  @Get('Logs/:userId')
  async getLogs(@Param("userId") userId: any): Promise<any>{
    return await this.appService.getLogsService(userId)
  }
}
