import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';

describe('AppController', () => {
  let controller: AppController;
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    controller = module.get<AppController>(AppController);
    service = module.get<AppService>(AppService);
  });

  it('deve ser definido', () => {
    expect(controller).toBeDefined();
  });

  it('deve chamar addLogService ao receber POST /log/add', async () => {
    const addLogSpy = jest.spyOn(service, 'addLogService').mockResolvedValue('Log Criado');
    const payload = { uploadId: '12345', startTime: Date.now(), maxDuration: 1200, duration: 600 };
    const result = await controller.addLog(payload);

    expect(addLogSpy).toHaveBeenCalledWith(payload.uploadId, payload.startTime, payload.maxDuration, payload.duration);
    expect(result).toBe('Log Criado');
  });

  it('deve chamar listLogService ao receber GET /log', async () => {
    const listLogSpy = jest.spyOn(service, 'listLogService').mockResolvedValue(JSON.stringify([{ uploadId: '12345' }]));
    const result = await controller.listLog();

    expect(listLogSpy).toHaveBeenCalled();
    expect(result).toBe(JSON.stringify([{ uploadId: '12345' }]));
  });
});
