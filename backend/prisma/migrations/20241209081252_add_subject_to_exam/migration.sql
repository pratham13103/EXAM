/*
  Warnings:

  - Added the required column `subject` to the `Exam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exam" ADD COLUMN     "subject" TEXT NOT NULL;
