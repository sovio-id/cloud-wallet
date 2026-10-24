# NATS contract — cloud-wallet

**Generated from:** `credebl/platform` @ `a41b79922a17349550239140e074fc508cc45b8a`

This service exposes **27 NATS message patterns** on queue/service name **`cloud-wallet`**
(`CommonConstants.CLOUD_WALLET_SERVICE`). The **only** inbound caller is the
platform `apps/api-gateway` (`cloud-wallet.service.ts` → `NATSClient.sendNatsMessage`).

> ⚠️ The 27 `cmd` string literals are duplicated on both sides (this repo's
> `src/cloud-wallet.controller.ts` and platform's api-gateway). Any change to a
> command name or payload shape requires a **coordinated change in both repos**.
> Payload/interface types live in `libs/common/src/interfaces/cloud-wallet.interface.ts`
> (vendored copy of the platform original).

## Commands

| # | `cmd` | Handler | Payload types (see interface file) |
|---|---|---|---|
| 1 | `configure-cloud-base-wallet` | `configureBaseWallet` | base-wallet config (agentEndpoint, walletKey, apiKey) |
| 2 | `create-connection-by-holder` | `createConnection` | `ICreateConnection` |
| 3 | `accept-proof-request-by-holder` | `acceptProofRequest` | proof record id + body |
| 4 | `get-proof-by-proof-id-holder` | `getProofById` | proofRecordId |
| 5 | `get-proof-presentation-holder` | `getProofPresentation` | threadId |
| 6 | `create-cloud-wallet` | `createCloudWallet` | email, label, user context |
| 7 | `receive-invitation-by-url` | `receiveInvitationByUrl` | invitation URL |
| 8 | `accept-credential-offer` | `acceptOffer` | credentialRecordId + body |
| 9 | `create-cloud-wallet-did` | `createDid` | DID write payload |
| 10 | `cloud-wallet-did-list` | `getDidList` | pagination |
| 11 | `get-cloud-wallet-connection-by-id` | `getconnectionById` | connectionId |
| 12 | `get-all-cloud-wallet-connections-list-by-id` | `getAllconnectionById` | pagination/filters |
| 13 | `wallet-credential-by-id` | `getCredentialListById` | pagination/filters |
| 14 | `wallet-credential-by-record-id` | `getCredentialByCredentialRecordId` | credentialRecordId |
| 15 | `basic-message-list-by-connection-id` | `getBasicMessageByConnectionId` | connectionId |
| 16 | `send-basic-message` | `sendBasicMessage` | connectionId + message |
| 17 | `holder-sd-jwt-credentials` | `getSdJwtCredentials` | — (OID4VC holder) |
| 18 | `holder-mdoc-credentials` | `getMdocCredentials` | — (OID4VC holder) |
| 19 | `holder-w3c-credentials` | `getW3cCredentials` | — (OID4VC holder) |
| 20 | `holder-decode-mdoc` | `decodeMdoc` | `IDecodeMdoc` |
| 21 | `holder-decode-sdjwt` | `decodeSdJwt` | `IDecodeSdJwt` |
| 22 | `holder-delete-credential` | `deleteHolderCredential` | `IDeleteHolderCredential` |
| 23 | `oid4vc-holder-resolve-credential-offer` | `resolveCredentialOffer` | `IResolveCredentialOffer` |
| 24 | `oid4vc-holder-authorization-request` | `authorizationRequest` | `IAuthorizeRequestCredential` |
| 25 | `oid4vc-holder-request-credential` | `requestCredential` | `IRequestCredential` (authorizationCode, codeVerifier, txCode) |
| 26 | `oid4vc-holder-resolve-proof-request` | `resolveProofRequest` | `IResolveProofRequest` |
| 27 | `oid4vc-holder-accept-proof-request` | `acceptProofRequestOid4vc` | `IAcceptOid4vpProofRequest` |

## Identity trust model

- **NATS (current):** the api-gateway authenticates the end user (Keycloak JWT at
  the HTTP layer) and injects `userId` / `email` into the NATS payload. This
  service **trusts the caller** — any NATS client with valid credentials can
  invoke any pattern. NATS transport auth (nkey/creds) is the only protection.
- **Payload validation:** every command's payload is validated by a global
  `ValidationPipe({ whitelist: true, transform: true })` against its DTO in
  `src/dtos/`. `userId` (UUID) and `email` (valid email) are **mandatory on
  every command** (`BasePayloadDto`); undeclared fields are stripped; invalid
  payloads are rejected with a `BadRequestException` before reaching the service.
- **HTTP (future, Keycloak separate realm):** when a public REST surface is
  added, identity MUST be derived from validated token claims — never from
  request bodies.

## Outbound

No NATS outbound calls. The service makes HTTP calls only to the external agent
(`agentEndpoint` from `cloud_wallet_user_info`, authenticated with the decrypted
`agentApiKey`).
