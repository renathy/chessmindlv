# Chess Lessons App (MVP)

Basic Next.js app for chess lessons with:

- Login as **student** or **teacher** with predefined username/password accounts from JSON.
- User levels (0-3) controlling lesson-path access.
- Lesson page with embedded video and interactive chess puzzles.
- Puzzles powered by open-source `react-chessboard` and `chess.js`.
- Lesson and user content sourced from local JSON (`data/lessons.json`, `data/users.json`).

## Demo accounts

- `student0 / chess123` (level 0)
- `student1 / chess123` (level 1)
- `teacher1 / teach123` (teacher, level 3)

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.
