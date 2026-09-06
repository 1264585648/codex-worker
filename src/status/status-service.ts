export interface WorkerStatus {
  running: boolean;
  queued: number;
  active: number;
}

export class StatusService {
  getStatus(): WorkerStatus {
    return {
      running: false,
      queued: 0,
      active: 0,
    };
  }
}
