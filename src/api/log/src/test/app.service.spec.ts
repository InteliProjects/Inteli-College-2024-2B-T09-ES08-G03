import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  it('deve formatar o timestamp corretamente', () => {
    const timestamp = 1718028912000; // Exemplo de timestamp
    const formatted = service.formatTimestamp(timestamp);
    expect(formatted).toBe('11:15:12 10/06/2024');
  });

  it('deve adicionar logs corretamente sem Duration', async () => {
    const result = await service.addLogService('12345');
    expect(result).toBe('Log Criado');
    expect(service.logs).toHaveLength(1);
    expect(service.logs[0]).toHaveProperty('uploadId', '12345');
    expect(service.logs[0]).toHaveProperty('startTime');
    expect(service.logs[0]).toHaveProperty('startTimeFormat');
  });

  it('deve adicionar logs corretamente com Duration e MaxDuration', async () => {
    const result = await service.addLogService('67890', Date.now(), 1200, 600);
    expect(result).toBe('Log Criado');
    expect(service.logs).toHaveLength(1);
    expect(service.logs[0]).toHaveProperty('MaxDuration', 1200);
    expect(service.logs[0]).toHaveProperty('Duration', 600);
  });

  it('deve retornar mensagem quando não há logs', async () => {
    service.logs = [];
    const result = await service.listLogService();
    expect(result).toBe(JSON.stringify({ message: 'Nenhum Log Existente' }));
  });

  it('deve listar os logs corretamente', async () => {
    await service.addLogService('12345');
    const result = await service.listLogService();
    const logs = JSON.parse(result);

    expect(logs).toHaveLength(1);
    expect(logs[0]).toHaveProperty('uploadId', '12345');
  });
});
