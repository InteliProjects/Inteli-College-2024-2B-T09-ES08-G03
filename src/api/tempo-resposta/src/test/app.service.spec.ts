import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../app.service';
import timer from '../timer.class'; // Importa a classe Timer

jest.mock('../timer.class'); // Mocka a classe Timer

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appService = module.get<AppService>(AppService);
  });

  it('deve ser definido', () => {
    expect(appService).toBeDefined();
  });

  it('deve criar um novo timer', async () => {
    const uploadId = 'test123';
    const maxResponseTime = 3000;
    const emailsWarning = ['test@example.com'];

    const response = await appService.startTimerService(
      uploadId,
      maxResponseTime,
      emailsWarning,
    );

    expect(appService.timerStore[uploadId]).toBeDefined();
    expect(response).toBe('Timer Criado');
  });

  it('não deve criar um timer se já existir um com o mesmo uploadId', async () => {
    const uploadId = 'test123';
    const maxResponseTime = 3000;
    const emailsWarning = ['test@example.com'];

    // Adiciona manualmente um timer na store
    appService.timerStore[uploadId] = new timer(uploadId, maxResponseTime, emailsWarning);

    const response = await appService.startTimerService(
      uploadId,
      maxResponseTime,
      emailsWarning,
    );

    expect(response).toBe('Timer para esse upload já existente');
  });

  it('deve encerrar um timer existente e enviar um log', async () => {
    const uploadId = 'test123';
    const mockTimerInstance = {
      stop: jest.fn().mockReturnValue({
        startTime: 0,
        maxResponseTime: 3000,
        duration: 1500,
      }),
    };

    appService.timerStore[uploadId] = mockTimerInstance as any;

    global.fetch = jest.fn().mockResolvedValue({ ok: true } as Response);

    const response = await appService.endTimerService(uploadId);

    expect(mockTimerInstance.stop).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(
      'http://127.0.0.1:3001/log/add',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          uploadId,
          startTime: 0,
          maxDuration: 3000,
          duration: 1500,
        }),
      }),
    );
  });

  it('deve retornar mensagem se não houver timer com o uploadId', async () => {
    const response = await appService.endTimerService('nonexistent123');

    expect(response).toBe('Nenhum timer com esse Id Existente');
  });
});
