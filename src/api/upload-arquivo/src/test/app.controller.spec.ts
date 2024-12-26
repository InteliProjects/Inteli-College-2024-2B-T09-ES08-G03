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

  it('deve chamar uploadService com os argumentos corretos', async () => {
    const uploadSpy = jest
      .spyOn(appService, 'uploadService')
      .mockImplementation(() => Promise.resolve());

    const payload = { uploadId: 'test123', fileSize: 5000 };
    const response = await appController.upload(payload);

    expect(uploadSpy).toHaveBeenCalledWith(payload.uploadId, payload.fileSize);
    expect(response).toBe('Upload Iniciado');
  });
});
