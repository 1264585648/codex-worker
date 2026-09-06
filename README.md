# codex-worker

A persistent task runner for Codex CLI — schedule, resume and automate long-running coding tasks.

## Status

M0 implementation started.

Current capabilities:

- Task storage with SQLite
- CLI task creation
- Task listing
- Codex CLI executor abstraction

## Roadmap

- [ ] Background daemon
- [ ] Scheduler engine
- [ ] Codex quota/reset detection
- [ ] Context recovery
- [ ] Git state tracking
- [ ] Desktop UI

## Example

```bash
codex-worker task:add \
  --name "continue project" \
  --workspace ~/code/project \
  --prompt "Continue previous development work"

codex-worker task:list
```
