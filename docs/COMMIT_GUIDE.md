# Commit Guide

The assignment requires that **each feature commit says how much time the feature took.**
Use this format for every commit:

```
<type>: <short description> [time: <hours>h]

<optional details about what changed>
```

## Types
- `feat`: a new feature
- `fix`: a bug fix
- `style`: visual/CSS changes
- `docs`: README, time log, or other documentation
- `refactor`: code cleanup with no behavior change

## Examples
```
feat: add room creation form with width/length in feet [time: 1.5h]
feat: drag furniture from palette into room [time: 2h]
feat: couch dropdown to set width and length [time: 1h]
fix: furniture snapping outside room walls [time: 0.5h]
docs: update README with demo video [time: 0.75h]
```

## Workflow for each feature
1. Note your start time.
2. Build the feature, working in small steps.
3. Add a row to `TIME_LOG.md` with the time spent and the new running total.
4. Commit the code and the time log together:
   ```bash
   git add .
   git commit -m "feat: <what you built> [time: Xh]"
   git push
   ```

## Tip
Commit once per feature, not once per day. Many small, honest commits spread over
several weeks show real, steady work in the history.
