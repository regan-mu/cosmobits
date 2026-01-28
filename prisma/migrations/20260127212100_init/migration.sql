-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('POTENTIAL_LEAD', 'FOLLOW_UP_EMAIL_SENT', 'DISCOVERY_CALL_BOOKED', 'SUCCESSFUL_CLOSURE', 'FAILED_CLOSURE');

-- CreateTable
CREATE TABLE "ContactSubmission" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "company" TEXT,
    "phone" TEXT,
    "service" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "emailSent" BOOLEAN NOT NULL DEFAULT false,
    "emailError" TEXT,
    "currentStatus" "LeadStatus" NOT NULL DEFAULT 'POTENTIAL_LEAD',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StatusUpdate" (
    "id" TEXT NOT NULL,
    "status" "LeadStatus" NOT NULL,
    "comment" TEXT,
    "updatedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contactId" TEXT NOT NULL,

    CONSTRAINT "StatusUpdate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ContactSubmission_email_idx" ON "ContactSubmission"("email");

-- CreateIndex
CREATE INDEX "ContactSubmission_currentStatus_idx" ON "ContactSubmission"("currentStatus");

-- CreateIndex
CREATE INDEX "ContactSubmission_createdAt_idx" ON "ContactSubmission"("createdAt");

-- CreateIndex
CREATE INDEX "StatusUpdate_contactId_idx" ON "StatusUpdate"("contactId");

-- CreateIndex
CREATE INDEX "StatusUpdate_status_idx" ON "StatusUpdate"("status");

-- AddForeignKey
ALTER TABLE "StatusUpdate" ADD CONSTRAINT "StatusUpdate_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "ContactSubmission"("id") ON DELETE CASCADE ON UPDATE CASCADE;
