# 🎧 VibeSync — Auto-Playlist Generator Based on Mood & Weather

VibeSync is a dynamic full-stack web app that creates music playlists tailored to your **mood** and **local weather**. With a stunning UI and intelligent backend logic, it helps users discover and enjoy the perfect tracks for any vibe — whether it's sunny and happy, rainy and chill, or a focused study session.

![VibeSync Preview](./public/Home.png) <!-- Replace with an actual image if available -->

---

## 🌐 Tech Stack

### 🔥 Frontend
- **Framework**: [Next.js](https://nextjs.org)
- **Styling**: Tailwind CSS, Responsive Design
- **State Management**: Zustand
- **Animations**: Framer Motion (used in visual UI effects like waves)
- **UI Effects**: Custom canvas rendering for mood-based visuals

### 🔧 Backend
- **Server**: [Next.js](https://nextjs.org)
- **Database**: PostgreSQL
- **Security**: JWT-based authentication using Cookies via NextAuth
- **ORM**: Prisma

### 🧠 APIs Used
- 🎵 Spotify API (Playlist data)
- ☁️ OpenWeatherMap API (Weather data)

---

## ✨ Features

- 🎶 Generates personalized playlists based on your selected **mood** & **weather**
- 📍 Fetches real-time weather based on your location
- 🔐 User Authentication via NextAuth (JWT)
- 💾 Save and display generated playlists from the database

- 📤 Share your playlists with others

---

## 📸 Screenshots

| Play | Playlist | Share |
|----------|-------------|----------|
| ![Play](./public/Play.png) | ![Playlist](./public/Playlist.png) | ![Share](./public/Share.png)|

---

# 🗃️ Folder Structure

```

/
├── prisma/              # Prisma schema + migrations
├── public/              # Static files and preview images
├── app/                 # Next.js app directory
├── components/          # UI Components
├── store/               # Zustand state logic
├── lib/                 # Utility functions
├── middleware.ts        # Auth middleware
├── next.config.js
├── Dockerfile
├── .env


```


## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/vibesync.git

cd vibesync

```

### 2. Install Dependencies

```bash

npm install

```

### 3. Set Up Environment Variables


 ```dotenv
DATABASE_URL=postgresql://user:password@localhost:5432/vibesyncdb
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000

SPOTIFY_CLIENT_ID=your-client-id
SPOTIFY_CLIENT_SECRET=your-client-secret

OPENWEATHER_API_KEY=your-openweather-api-key

```
### 4. Set Up Prisma

```bash

npx prisma generate
npx prisma migrate dev --name init

```

### 5. Run the App

```bash

npm run dev

```


The app will be live at: http://localhost:3000


# 🐳 Running with Docker

### 1. Build Docker Image

```bash

docker build -t vibesync .

```

### 2. Run Container

```bash

docker run -p 3000:3000 --env-file .env vibesync

```

