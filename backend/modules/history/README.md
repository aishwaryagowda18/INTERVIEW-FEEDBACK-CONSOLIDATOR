# Report History API (standalone)

Runs separately from `main.py` on **port 8001**.

## Start server

From the `backend` directory (with venv activated):

```bash
python -m modules.history.standalone_app
```

Or:

```bash
uvicorn modules.history.standalone_app:app --host 0.0.0.0 --port 8001 --reload
```

## Database

- SQLite file: `modules/history/data/hireinsight_history.db`
- Table: `report_history`
- On first start, **5 sample reports** are inserted if the table is empty.

## Endpoints

| Method | Path |
|--------|------|
| POST | `/history/reports` |
| GET | `/history/reports` |
| GET | `/history/reports/{report_id}` |
| PUT | `/history/reports/{report_id}` |
| DELETE | `/history/reports/{report_id}` |

Interactive docs: http://localhost:8001/docs

## List query parameters

`search`, `recommendation`, `department`, `date_from`, `date_to`, `sort` (`latest` \| `oldest` \| `highest` \| `lowest`), `page`, `page_size`
