import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import ImmudbClient from 'immudb-node';

interface log {
  uploadId: string,
  startTime: number,
  startTimeFormat: string,
  MaxDuration?: number
  Duration?: number
}

@Injectable()
export class AppService implements OnModuleInit, OnModuleDestroy {
  private client: ImmudbClient;

  async onModuleInit() {
    this.client = new ImmudbClient({
      host: 'localhost', // Substitua pelo endereço do servidor ImmuDB
      port: 3322,        // Porta padrão do ImmuDB
    });

    await this.client.login({
      user: 'immudb',    // Usuário padrão
      password: 'immudb', // Senha padrão
    });
    console.log('Conectado ao ImmuDB');
  }

  async onModuleDestroy() {
    if (this.client) {
      await this.client.logout();
    }
  }

  async set(key: string, value: string): Promise<any> {
    const result = await this.client.set({ key, value });
    console.log('Key armazenada:', result);
    return result
  }

  async scanByUserId(userId: string): Promise<{ key: string; value: any }[]> {
    const prefix = `${userId}:`;
    const entries = await this.client.scan({ prefix });

    return entries.entriesList.map((entry) => {
      const rawValue = entry.value.toString();

      // Este regex encontra qualquer chave não aspeada após { ou ,
      // e insere aspas ao redor da chave.
      const fixedValue = rawValue.replace(/([{,])(\w+):/g, '$1"$2":');

      let parsedValue;
      try {
        parsedValue = JSON.parse(fixedValue);
      } catch (e) {
        console.error('Erro ao parsear JSON:', rawValue, e.message);
        parsedValue = rawValue; // Se não der certo, retorna a string original
      }

      return {
        key: entry.key.toString(),
        value: parsedValue,
      };
    });
  }

  formatTimestamp(timestamp: number): string {
    const date = new Date(timestamp);

    const pad = (n: number) => n.toString().padStart(2, '0');

    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1); // Os meses começam em 0
    const year = date.getFullYear();

    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
  }

  async addJsonImmuDB(key: string, data: Record<string, any>): Promise<any> {
    try {
      // Convertendo o objeto JSON para uma string no formato esperado
      const jsonString = JSON.stringify(data).replace(/"([^"]+)":/g, '$1:'); // Remove aspas das chaves

      const result = await this.set(key, jsonString)
      return {
        success: true,
        transactionId: result.id || "Não foi possível encontrar",
      };
    } catch (error) {
      console.error('Error adding JSON to immudb:', error);
      throw error;
    }
  }

  async addLogService(userId: string, uploadId: string, startTime?: number, MaxDuration?: number, Duration?: number) {
    if (!startTime) {
      startTime = Date.now()
    }

    const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '');
    if (!Duration) {
      this.addJsonImmuDB(`${userId}:${timestamp}`, { userId, uploadId, startTime, startTimeFormat: this.formatTimestamp(startTime) })
    } else {
      this.addJsonImmuDB(`${userId}:${timestamp}`, { userId, uploadId, startTime, startTimeFormat: this.formatTimestamp(startTime), MaxDuration, Duration })
    }
    return 'Log Criado'
  }

  async listLogService(userId) {
    const result = await this.scanByUserId(userId)
    return result
  }
}
