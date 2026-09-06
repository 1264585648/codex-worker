# CLI Design

## Commands

```bash
codex-worker task create
codex-worker task list
codex-worker worker start
codex-worker status
codex-worker logs
```

## Worker flow

Task -> Scheduler -> Worker Runtime -> Codex Executor -> Context Recovery
