# Codex Worker Architecture

## Overview

Codex Worker is a persistent runtime for Codex CLI tasks.

```
Task Queue
    |
Worker Runtime
    |
Codex Executor
    |
Codex CLI
```

## Runtime lifecycle

```
CREATED
  |
QUEUED
  |
RUNNING
  |
COMPLETED / FAILED
```

## Future extensions

- quota aware scheduling
- context handoff
- git integration
- codex app-server adapter
