import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../app.service';

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

  it('deve adicionar emails corretamente', () => {
    const response = appService.emailPush(['test@example.com', 'user@example.com']);
    expect(response).toBe('Email Adicionado com sucesso');
    expect(appService.emailsWarning).toEqual(['test@example.com', 'user@example.com']);
  });

  it('deve gerar hashes únicos para uploadId', () => {
    const hash1 = appService.gerarHashNumero();
    const hash2 = appService.gerarHashNumero();
    expect(hash1).not.toBe(hash2);
  });
});
