import { Injectable } from '@nestjs/common';

interface requestBodyLog {
  userId: any
  uploadId: string
}

interface requestBodyFileUpload {
  userId: any
  uploadId: string
  fileSize: number
}

interface requestBodyTempoResposta {
  uploadId: string
  maxResponseTime: number // Tempo máximo permitido em milissegundos
  emailsWarning: string[]
}

@Injectable()
export class AppService {
  emailsWarning: string[] = []
  uploadIdCount: number = 1

  emailPush(email: string[]) {
    this.emailsWarning.push(...email) // Colocar regra de retirar duplicados
    return "Email Adicionado com sucesso"
  }

  emailServiceGet(){
    return this.emailsWarning
  }

  // Gerar hash apartir do número para usar no uploadId
  gerarHashNumero() {
    let str = this.uploadIdCount.toString();
    this.uploadIdCount++
    let hash = 0;

    for (let i = 0; i < str.length; i++) {
      let char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Converte para um inteiro de 32 bits
    }

    // Para representar o hash como uma string hexadecimal
    let hashHex = (hash >>> 0).toString(16);
    return hashHex;
  }

  // Função genérica para enviar requisições POST
  async sendPostRequest(url: string, body: any): Promise<any> {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body), // Converte o body para JSON
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
      }

      const data = await response.text()
      return data;
    } catch (error) {
      console.error("Erro ao enviar a requisição POST:", error);
      throw error;
    }
  }


  async fileUploadService(userId: any, fileSize: number) {
    const uploadId_ = this.gerarHashNumero()

    const requestBodyLog: requestBodyLog = {
      userId,
      uploadId: uploadId_
    }

    const requestBodyFileUpload: requestBodyFileUpload = {
      userId,
      uploadId: uploadId_,
      fileSize: fileSize
    }

    const requestBodyTempoResposta: requestBodyTempoResposta = {
      uploadId: uploadId_,
      emailsWarning: this.emailsWarning,
      maxResponseTime: Math.ceil(fileSize * 1.3)
    }
    try {
      // Enviar as requisições
      const results = await Promise.all([
        this.sendPostRequest('http://127.0.0.1:3001/log/add', requestBodyLog),
        this.sendPostRequest('http://127.0.0.1:3002/file/upload', requestBodyFileUpload),
        this.sendPostRequest('http://127.0.0.1:3003/timer/start', requestBodyTempoResposta)
      ]);

      return results

    } catch (error) {
      throw new error("erro ao enviar múltiplas requisições:", error)
    }
  }

  async getLogsService(userId: any) {
    try {
      const response = await fetch(`http://127.0.0.1:3001/log/${userId}`, { method: "GET" });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json()
      return data;
    } catch (error) {
      console.error("Erro ao enviar a requisição GET:", error);
      throw error;
    }
  }
}
