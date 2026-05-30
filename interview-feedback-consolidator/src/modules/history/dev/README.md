# Report History — dev preview

Run from `interview-feedback-consolidator`:

```bash
npx vite --config vite.history.config.js
```

Opens [http://localhost:5174/history-dev.html](http://localhost:5174/history-dev.html) (port 5174).

Does not use `App.jsx` or the main assessment flow.

## API (Step 4)

Requires the standalone history backend on **http://localhost:8001**:

```bash
cd backend
python -m modules.history.standalone_app
```

Required when using standalone backend on port **8001**:

`VITE_HISTORY_API_URL=http://localhost:8001 npx vite --config vite.history.config.js`

Integrated main app uses `http://localhost:8000` by default (no env needed).
