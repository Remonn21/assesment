# Talentology DISC assessment

Participants rank 14 groups of 4 words, get their DISC scores and profile. Facilitators invite people and read their reports, managers see the overall results.

## Stack

- Frontend: Next.js 16, React 19, Tailwind CSS 4, dnd-kit, Recharts
- Backend: NestJS 12, Prisma 7, PostgreSQL, JWT auth
- Node.js 22+

## Run locally

Backend:

```bash
cd backend
cp .env.example .env   # set DATABASE_URL and JWT_SECRET
npm install
npm run db:migrate
npm run db:seed
npm run start:dev      # http://localhost:4100/api
```

Frontend:

```bash
cd frontend
cp .env.example .env   # API_URL=http://localhost:4100/api
npm install
npm run dev            # http://localhost:3000
```

Tests: `cd backend && npm test`

## Logins

| Role | Email |
|---|---|
| Manager | admin@testing.com |
| Facilitator | facilitator@testing.com |

Password: `123123` (change it with `SEED_STAFF_PASSWORD` before seeding). The seed also adds 8 sample participants (5 completed).

Participants don't log in, they open their personal invite link (`/assessment/<token>`), copied from the participants page.

## Scoring

- In each group the 1st word gets 4 points, 2nd 3, 3rd 2, 4th 1.
- Each word belongs to D, I, S or C (from the Excel columns), so each dimension ends between 14 and 56, and all four always add up to 140.
- The two highest dimensions give the profile, e.g. D then I = DI.
- Ties are broken in D, I, S, C order.
- Scoring runs on the server; the browser never gets the word-to-dimension mapping. Words are shuffled per participant.

## Notes on the Excel sheet

- The sheet has no profile descriptions, so none are shown. The `description` field exists and shows up if filled.
- Profile names are kept in Arabic as written in the sheet.
- The English keywords come from columns P to R (hidden in the sheet). Only spelling was fixed: acheiver, councler, perfecionist, enthusiasts.
