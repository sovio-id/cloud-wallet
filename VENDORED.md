# Vendored libraries — provenance

The `libs/` tree in this repository consists of **byte-identical copies** of the
`@credebl/*` libraries from the `credebl/platform` monorepo. These libraries are
**not published to npm** and exist in the monorepo only as tsconfig path aliases,
so they are vendored here to make this service independently buildable.

| | |
|---|---|
| **Source repository** | `credebl/platform` |
| **Base commit** | `a41b79922a17349550239140e074fc508cc45b8a` (`feat/cloud-wallet-improvement`) |
| **Copied on** | 2026-10-21 |
| **Copied by** | extraction work (see repo history) |

## Per-lib notes

| Lib | Notes |
|---|---|
| `libs/common` | `package.json` **deleted** (declared `"main": "src/index"` → raw TS; would create a bogus pnpm workspace package). `*.spec.ts` and `__fixtures__/` excluded. **Divergences:** (1) `src/interfaces/oid4vp-verification.ts` imports `SignerOption` from `@prisma/client` in the platform; the trimmed schema here has no model using that enum so the client generator prunes it from the generated types — the import was replaced with an identical local type alias (type-only, no runtime impact). (2) `src/interfaces/cloud-wallet.interface.ts` tightened: `email` and `userId` are now **required** on every payload interface (mandatory-email requirement); `ICreateConnection` fields loosened to `?` (gateway DTO sends them optional); `IGetProofPresentation.threadId` made `?`. Re-apply after any re-sync. |
| `libs/config` | Includes `secret-storage/` (OpenBao provider + loader). |
| `libs/context` | nestjs-CLS based correlation-id propagation from NATS RPC headers. |
| `libs/enum` | `*.spec.ts` excluded. |
| `libs/logger` | **Diverges from `a41b799` by one platform fix** (applied in `credebl/platform` branch `feat/cloud-wallet-extraction` before vendoring): the `apps/api-gateway/src/tracer` import was replaced with an injected `OTEL_LOGGER` token (`otel.interface.ts`, `@Optional()` injection in `logger.service.ts`). Without this fix the lib cannot compile outside the monorepo. |
| `libs/prisma-service` | `prisma/schema.prisma` is **divergent** in this repo: only `model cloud_wallet_user_info` + 1 enum (platform has 50+ models); `model user` removed (no platform `user` dependency); `cloud_wallet_user_info.email` is `NOT NULL @unique`; no FK relation to `user`. `prisma/migrations/0001_init/` is this service's own initial migration (service owns DDL). Platform's `prisma/data/`, `prisma/scripts/`, `prisma/seed.ts`, and `cli.ts` are not copied. Re-apply after any re-sync. |

## Re-syncing

Use [`scripts/sync-from-platform.sh`](scripts/sync-from-platform.sh) to pull an
upstream fix:

```bash
./scripts/sync-from-platform.sh <git-sha-or-branch> [lib ...]
```

After re-syncing `libs/logger` or `libs/common`/`libs/prisma-service`, re-apply
the divergences noted above (OTEL_LOGGER injection; interface tightening;
trimmed/standalone schema) and update this file.
