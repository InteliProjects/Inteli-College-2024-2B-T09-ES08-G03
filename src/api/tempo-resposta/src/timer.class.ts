export interface TimerReturnProp {
    uploadId: string
    maxResponseTime: number //milissegundos
    emailsWarning: string[]
    startTime: number
    duration: number
}

export default class timer {
    uploadId: string
    maxResponseTime: number //milissegundos
    emailsWarning: string[]
    private startTime_: number

    constructor(uploadId: string, maxResponseTime: number, emailsWarning: string[]) {
        this.uploadId = uploadId
        this.maxResponseTime = maxResponseTime
        this.emailsWarning = emailsWarning
        this.start()
    }

    get startTime(){
        return this.startTime_
    }

    private start() {
        this.startTime_ = Date.now();
        console.log("Timer iniciado.");
    }

    public stop(): TimerReturnProp {
        const duration = Date.now() - this.startTime_;
        if (duration > this.maxResponseTime){
            // Envia Email
        }
        return {uploadId: this.uploadId, maxResponseTime: this.maxResponseTime, emailsWarning: this.emailsWarning, startTime: this.startTime_, duration}
    }
}