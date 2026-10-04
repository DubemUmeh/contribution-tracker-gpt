# Class Contribution Tracker

A TanStack Start contribution ledger for class/community collections, using MongoDB for persistence and Better Auth for administrator authentication.

## Features
- Public name checker with privacy-safe participation summaries.
- Administrator dashboard, events, roster, payments and admin access.
- WhatsApp-style contribution parser with `2k`, `5k`, commas and numbered rows.
- Review-first imports; no bulk row is saved directly from pasted text.
- MongoDB data model designed around roster members, events, payments and administrator roles.
- Sales CRM-inspired dense tables, metrics, compact navigation and mobile layouts.

## Development
```bash
pnpm install
pnpm dev
```

Set `MONGODB_URI`, `MONGODB_DB`, and `BETTER_AUTH_SECRET` before enabling persistence/auth.

The included UI starts with the supplied Eze Kelvin event as local seed data so the product can be evaluated immediately. Production writes should go through protected TanStack server functions and the MongoDB indexes/role checks documented in `src/server/db.ts`.