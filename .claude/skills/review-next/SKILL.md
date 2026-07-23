---
name: review-next
description: Review code for React/TypeScript best practices, common gotchas, and project conventions
---

## Scope

If "$ARGUMENTS" is "all", read all source files under `app/`, `components/`, and `hooks/` (excluding test files, `.next/`, and `node_modules/`) and review the entire codebase against the checklist.

Otherwise, review only the current diff:

!`git diff HEAD`

## TypeScript

- State typed as `string` instead of a union literal (e.g. `"asc" | "desc"` not `string`)
- Missing types on function parameters or return values
- Type assertions (`as`) used instead of a type guard or runtime validation
- Unused imports

## React

- `key={index}` on lists that can reorder — use a stable unique value
- `useCallback` or `useMemo` with no memoized children (premature optimization)
- Logic that belongs in a lib function or custom hook left inline in a component
- State that could be derived from existing state stored in `useState`
- Areas where sections of code should be extracted into a separate component
- Also check for any other common React gotchas not listed above

## Project conventions

- Inline `style={{}}` instead of Tailwind classes
- Fetch logic or data transformation inline in a page instead of `app/lib/`
- Raw `useState` setter exposed in a hook's public API instead of named actions

## Output format

For each issue: file path, line number, what's wrong, and a suggested fix.
If the code is clean, say so explicitly.
