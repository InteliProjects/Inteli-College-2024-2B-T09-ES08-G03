import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../app.service';

jest.useFakeTimers(); // Para simular o comportamento de `setTimeout`
jest.spyOn(global, 'setTimeout'); // Mock do setTimeout

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

  it('deve enviar a requisição POST após o tempo especificado', async () => {
    const fetchMock = jest.fn().mockResolvedValue({ ok: true });
    global.fetch = fetchMock as any;

    const uploadId = 'test123';
    const fileSize = 5000;

    appService.uploadService(uploadId, fileSize);

    // Simula a execução do setTimeout
    jest.runAllTimers();

    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), fileSize);
    expect(fetchMock).toHaveBeenCalledWith(
      'http://127.0.0.1:3003/timer/end',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ uploadId }),
      }),
    );
  });

  it('deve tratar erros ao enviar a requisição POST', async () => {
    const fetchMock = jest.fn().mockResolvedValue({ ok: false, status: 500, statusText: 'Internal Server Error' });
    global.fetch = fetchMock as any;

    const uploadId = 'test123';
    const fileSize = 5000;

    await expect(appService.uploadService(uploadId, fileSize)).rejects.toThrow(
      'Erro na requisição: 500 - Internal Server Error',
    );

    jest.runAllTimers();

    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), fileSize);
    expect(fetchMock).toHaveBeenCalledWith(
      'http://127.0.0.1:3003/timer/end',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ uploadId }),
      }),
    );
  });
});
