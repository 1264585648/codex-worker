export type QuotaStatus = 'AVAILABLE' | 'WAITING_RESET';

export interface QuotaState {
  status: QuotaStatus;
  resetAt?: number;
}

export class QuotaManager {
  constructor(private readonly resetAt?: number) {}

  getState(now = Date.now()): QuotaState {
    if (!this.resetAt || now >= this.resetAt) {
      return { status: 'AVAILABLE' };
    }

    return { status: 'WAITING_RESET', resetAt: this.resetAt };
  }

  canRun() {
    return this.getState().status === 'AVAILABLE';
  }

  async waitForReset() {
    const state = this.getState();
    if (state.status === 'AVAILABLE') return;
    await new Promise((resolve) => setTimeout(resolve, state.resetAt! - Date.now()));
  }
}
