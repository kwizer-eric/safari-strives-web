# Safari Platform

Monorepo for the Safari Strives platform.

## Structure

```
safari-platform/
  apps/
    public-web/          Marketing site               (port 3000)
    admin-dashboard/     Staff administration         (port 3001)
    applicant-portal/    Applicants & founders        (port 3002)
    mentor-portal/       Mentors                      (port 3003)
    partner-portal/      Sponsors & funders           (port 3004)
  packages/
    ui/                  Shared React components + Tailwind styles
    api-client/          Typed fetch wrapper for the backend
    auth/                Session / JWT helpers, useAuth hook, guards
    shared/              Shared types, constants, utils
  backend/               Express + TypeScript API     (port 4000)
  docker/                Dockerfiles + compose
  scripts/               Dev / build helpers
```

## Prerequisites

- Node.js 20.9+
- npm 10+

## Quick start

```bash
npm install
npm run dev
```

`npm run dev` starts every app and the backend in parallel.

## Individual workspaces

```bash
npm run dev:backend     # http://localhost:4000
npm run dev:public      # http://localhost:3000
npm run dev:admin       # http://localhost:3001
npm run dev:applicant   # http://localhost:3002
npm run dev:mentor      # http://localhost:3003
npm run dev:partner     # http://localhost:3004
```

## Seeded logins

Every portal uses the backend's `/auth/login` endpoint. Seed users:

| Role      | Email                        | Password  |
| --------- | ---------------------------- | --------- |
| admin     | admin@safari.local           | password  |
| applicant | applicant@safari.local       | password  |
| mentor    | mentor@safari.local          | password  |
| partner   | partner@safari.local         | password  |

## Testing

```bash
npm run test:backend
```
