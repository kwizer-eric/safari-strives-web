# Safari Backend API

Base URL: `http://localhost:4000`

Authenticated endpoints expect `Authorization: Bearer <jwt>` where the token
is issued by `POST /auth/login`.

## Health

- `GET /health` -> `{ ok: true, service: "safari-backend" }`

## Auth

- `POST /auth/login` — body `{ email, password }` -> `{ token, user }`
- `GET /auth/me` (auth) -> `{ user }`

## Users (admin)

- `GET /users` — list all users.

## Applications

- `GET /applications` (admin) — list all.
- `GET /applications/mine` (auth) — list current applicant's applications.
- `POST /applications` (applicant) — `{ ventureName, ventureSummary }`.
- `POST /applications/:id/submit` (applicant) — transition to submitted.
- `PATCH /applications/:id/status` (admin) — update status.

## Programs

- `GET /programs` (auth) — list programs.

## Sessions

- `GET /sessions/mine` (mentor) — mentor's upcoming and past sessions.
- `GET /sessions` (admin) — all sessions.

## Partner projects

- `GET /partner-projects/mine` (partner) — projects funded by current partner.
- `GET /partner-projects` (admin) — all projects.

## Donations

- `POST /donations` — public. `{ name, email, amount, message? }`.

## Seeded users

| Role      | Email                        | Password |
| --------- | ---------------------------- | -------- |
| admin     | admin@safari.local           | password |
| applicant | applicant@safari.local       | password |
| mentor    | mentor@safari.local          | password |
| partner   | partner@safari.local         | password |
