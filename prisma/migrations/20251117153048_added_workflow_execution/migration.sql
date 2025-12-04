/*
  Warnings:

  - A unique constraint covering the columns `[name,userId]` on the table `Workflow` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "WorkflowExecution" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "workflowId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "trigger" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startedAt" DATETIME,
    "completedAt" DATETIME NOT NULL,
    CONSTRAINT "WorkflowExecution_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "Workflow" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ExecutionPhase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "node" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startedAt" DATETIME,
    "completedAt" DATETIME,
    "inputs" TEXT,
    "outputs" TEXT,
    "creditCost" INTEGER,
    "workflowExecutionId" TEXT NOT NULL,
    CONSTRAINT "ExecutionPhase_workflowExecutionId_fkey" FOREIGN KEY ("workflowExecutionId") REFERENCES "WorkflowExecution" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Workflow_name_userId_key" ON "Workflow"("name", "userId");
