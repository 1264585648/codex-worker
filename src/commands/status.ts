import { getStatus } from '../status/status-service.js';

export function printStatus() {
  console.table(getStatus());
}
