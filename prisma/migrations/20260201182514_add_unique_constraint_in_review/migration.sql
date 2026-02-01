/*
  Warnings:

  - A unique constraint covering the columns `[studentId,tutorId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Review_studentId_tutorId_key" ON "Review"("studentId", "tutorId");
