import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async uploadService(userId: any, uploadId: string, fileSize: number) {
    const bodyEnd = {
      userId,
      uploadId
    }

    setTimeout(async () => {
      //Enviar requisição quando o timer acaabar
      try {
        const response = await fetch("http://127.0.0.1:3003/timer/end", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyEnd), // Converte o body para JSON
        });

        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
        }
      } catch (error) {
        console.error("Erro ao enviar a requisição POST:", error);
        throw error;
      }
    }, fileSize);
  }
}
