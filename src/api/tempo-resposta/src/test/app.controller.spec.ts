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

  it('deve chamar startTimerService com os argumentos corretos', async () => {
    const startTimerSpy = jest
      .spyOn(appService, 'startTimerService')
      .mockResolvedValue('Timer Criado');

    const payload = {
      uploadId: 'test123',
      maxResponseTime: 3000,
      emailsWarning: ['test@example.com'],
    };

    const response = await appController.startTimer(payload);

    expect(startTimerSpy).toHaveBeenCalledWith(
      payload.uploadId,
      payload.maxResponseTime,
      payload.emailsWarning,
    );
    expect(response).toBe('Timer Criado');
  });

  it('deve chamar endTimerService com o argumento correto', async () => {
    const endTimerSpy = jest
      .spyOn(appService, 'endTimerService')
      .mockResolvedValue('Timer Encerrado');

    const payload = { uploadId: 'test123' };
    const response = await appController.endTimer(payload);

    expect(endTimerSpy).toHaveBeenCalledWith(payload.uploadId);
    expect(response).toBe('Timer Encerrado');
  });
});
