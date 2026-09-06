export type ScheduleStrategy =
  | 'IMMEDIATE'
  | 'WAIT_QUOTA_RESET';

export interface ScheduleDecision {
  runnable: boolean;
  reason?: string;
}

export class Scheduler {
  canRun(strategy: ScheduleStrategy): ScheduleDecision {
    if (strategy === 'WAIT_QUOTA_RESET') {
      return {
        runnable: true,
        reason: 'quota provider not enabled yet',
      };
    }

    return { runnable: true };
  }
}
