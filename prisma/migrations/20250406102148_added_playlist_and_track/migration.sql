-- DropForeignKey
ALTER TABLE "SpotifyAccount" DROP CONSTRAINT "SpotifyAccount_userId_fkey";

-- CreateTable
CREATE TABLE "Playlist" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Playlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Track" (
    "id" TEXT NOT NULL,
    "playlistId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "uri" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Playlist_accountId_idx" ON "Playlist"("accountId");

-- CreateIndex
CREATE INDEX "Playlist_date_idx" ON "Playlist"("date");

-- CreateIndex
CREATE INDEX "Track_playlistId_idx" ON "Track"("playlistId");

-- CreateIndex
CREATE INDEX "Track_name_idx" ON "Track"("name");

-- CreateIndex
CREATE INDEX "SpotifyAccount_emailAddress_idx" ON "SpotifyAccount"("emailAddress");

-- CreateIndex
CREATE INDEX "SpotifyAccount_userId_idx" ON "SpotifyAccount"("userId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- AddForeignKey
ALTER TABLE "SpotifyAccount" ADD CONSTRAINT "SpotifyAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "SpotifyAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
