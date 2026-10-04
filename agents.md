# Agent Instructions

## Planning Protocol
- Every time a new plan is created, it must be stored in a `.md` file inside the `docs/` directory.
- The file should be named using the current date, e.g., `docs/YYYY-MM-DD-plan.md`. If multiple plans are made on the same day, append a suffix like `docs/YYYY-MM-DD-plan-1.md`.

## Context Maintenance
- The project must maintain a single file named `context.md` in the root directory.
- `context.md` stores the current state of the project, including completed features, ongoing work, and architectural decisions.
- With every plan execution, the agent must update `context.md` to reflect the latest state.

## Version Control
- The agent must keep adding atomic commits throughout the implementation process. Changes should be grouped logically and committed frequently with descriptive messages.
