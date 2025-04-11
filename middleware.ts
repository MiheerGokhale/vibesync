// middleware.ts
import { withAuth } from "next-auth/middleware";

// Protect all routes under /dashboard and /api/protected/*
export default withAuth({
  pages: {
    signIn: "/", // redirect here if not authenticated
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*",       // Protect dashboard and its subpaths
    "/api/:path*",   // Protect specific API routes
  ],
};
