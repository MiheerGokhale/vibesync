/*
  Warnings:

  - A unique constraint covering the columns `[access_token]` on the table `SpotifyAccount` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SpotifyAccount_access_token_key" ON "SpotifyAccount"("access_token");
