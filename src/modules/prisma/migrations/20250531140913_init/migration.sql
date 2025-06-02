/*
  Warnings:

  - You are about to drop the column `leaderId` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `isLeader` on the `User` table. All the data in the column will be lost.
  - Added the required column `phoneNumber` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Team` DROP FOREIGN KEY `Team_leaderId_fkey`;

-- DropIndex
DROP INDEX `Team_leaderId_key` ON `Team`;

-- AlterTable
ALTER TABLE `Team` DROP COLUMN `leaderId`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `isLeader`,
    ADD COLUMN `phoneNumber` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `UserTeam` ADD COLUMN `role` ENUM('MEMBER', 'LEADER', 'INTERN') NOT NULL DEFAULT 'MEMBER';
