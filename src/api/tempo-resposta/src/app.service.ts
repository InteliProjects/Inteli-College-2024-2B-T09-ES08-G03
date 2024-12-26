import { Injectable } from '@nestjs/common';
import timer, { TimerReturnProp } from './timer.class';

@Injectable()
export class AppService {
  timerStore = {}

  async startTimerService(uploadId: string, maxResponseTime: number, emailsWarning: string[]) {
    if (this.timerStore[uploadId]) {
      return 'Timer para esse upload já existente'
    }
    this.timerStore[uploadId] = new timer(uploadId, maxResponseTime, emailsWarning)
    return 'Timer Criado'
  }

  async endTimerService(userId: any, uploadId: string) {
    if (this.timerStore[uploadId]) {
      const timerStop: TimerReturnProp = this.timerStore[uploadId].stop() //Email Warning Aqui

      console.log(timerStop)
      const bodyLogAdd = {
        userId,
        uploadId,
        startTime: timerStop.startTime,
        maxDuration: timerStop.maxResponseTime,
        duration: timerStop.duration
      }
      try {
        const response = await fetch("http://127.0.0.1:3001/log/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyLogAdd), // Converte o body para JSON
        });

        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
        }
      } catch (error) {
        console.error("Erro ao enviar a requisição POST:", error);
        throw error;
      }
    }
    return 'Nenhum timer com esse Id Existente'
  }
}
