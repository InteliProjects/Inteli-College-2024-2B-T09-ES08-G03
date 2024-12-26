import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  it('deve ser definido', () => {
    expect(appController).toBeDefined();
  });

  it('deve chamar emailPush no service ao receber /gateway/email', async () => {
    const emailPushSpy = jest.spyOn(appService, 'emailPush').mockImplementation(() => 'Email Adicionado com sucesso');
    const payload = { emailArray: ['test@example.com'] };
    const response = await appController.emailUpload(payload);

    expect(emailPushSpy).toHaveBeenCalledWith(payload.emailArray);
    expect(response).toBe('Email Adicionado com sucesso');
  });

  it('deve chamar fileUploadService no service ao receber /gateway/upload', async () => {
    const fileUploadSpy = jest.spyOn(appService, 'fileUploadService').mockResolvedValue(['Success', 'Success', 'Success']);
    const payload = { fileSize: 5000 };
    const response = await appController.fileUpload(payload);

    expect(fileUploadSpy).toHaveBeenCalledWith(payload.fileSize);
    expect(response).toEqual(['Success', 'Success', 'Success']);
  });
  it('deve chamar fileUploadService no service ao receber /gateway/upload', async () => {
    const fileUploadSpy = jest
      .spyOn(appService, 'fileUploadService')
      .mockResolvedValue(['Log Added', 'File Uploaded', 'Timer Started']); 
  
    const payload = { fileSize: 5000 };
    const response = await appController.fileUpload(payload);
  
    expect(fileUploadSpy).toHaveBeenCalledWith(payload.fileSize);
 
    expect(response).toEqual(['Log Added', 'File Uploaded', 'Timer Started']);

  });
  
});
