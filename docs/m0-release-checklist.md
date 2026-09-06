# Codex Worker M0 Release Checklist

## Runtime

- [x] Task model
- [x] Worker runtime abstraction
- [x] Codex executor abstraction
- [x] Context persistence design
- [x] Scheduler policy abstraction
- [x] Quota state abstraction

## Remaining integration work

- [ ] Wire CLI commands to runtime services
- [ ] Add worker start/stop lifecycle commands
- [ ] Add end-to-end task execution test
- [ ] Add release workflow

## Target usage

```bash
codex-worker task create
codex-worker worker start
codex-worker status
```

The M0 goal is a local persistent Codex CLI worker that can queue tasks, execute them, and preserve enough state for future continuation.
