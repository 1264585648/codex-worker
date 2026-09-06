export type QuotaStatus = 'AVAILABLE' | 'WAITING_RESET';

export interface QuotaState {
  status: QuotaStatus;
  resetAt?: number;
}

export class QuotaManager {
  constructor(private readonly resetAt?: number) {}

  getState(): QuotaState {
    if (!this.resetAt || Date.now() >= this.resetAt) {
      return { status: 'AVAILABLE' };
    }

    return {
      status: 'WAITING_RESET',
      resetAt: this.resetAt,
    };
  }

  canRun() {
    return this.getState().status === 'AVAILABLE';
  }
}
