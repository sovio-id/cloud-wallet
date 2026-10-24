-- CreateEnum
CREATE TYPE "CloudWalletType" AS ENUM ('CLOUD_BASE_WALLET', 'CLOUD_SUB_WALLET');

-- CreateTable
CREATE TABLE "cloud_wallet_user_info" (
    "id" UUID NOT NULL,
    "label" TEXT,
    "tenantId" TEXT,
    "email" VARCHAR(500) NOT NULL,
    "type" "CloudWalletType" NOT NULL,
    "createDateTime" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" UUID NOT NULL,
    "lastChangedDateTime" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastChangedBy" UUID NOT NULL,
    "userId" UUID,
    "agentEndpoint" TEXT,
    "agentApiKey" TEXT,
    "key" TEXT,
    "connectionImageUrl" TEXT,

    CONSTRAINT "cloud_wallet_user_info_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cloud_wallet_user_info_email_key" ON "cloud_wallet_user_info"("email");

