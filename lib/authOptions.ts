import CredentialsProvider from "next-auth/providers/credentials";
import SpotifyProvider from "next-auth/providers/spotify";
import { loginSchema, userAccountSchema } from "./zod/userZod";
import { userDb } from "./db/userDb";
import bcrypt from "bcrypt";
import { Session, User } from "next-auth";
import { Account } from "next-auth";
import { accountSchema } from "./zod/accountZod";
import { accountDb } from "./db/accountDb";
import { JWT } from "next-auth/jwt";

// Extend the Session type to include user.id
declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add custom properties here
      email: string;
      image?: string;
      name?: string;
    };
  }
}

interface CustomToken extends JWT {
  id?: string;
}

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "abc@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // ✅ Input validation using Zod
        const parsedInput = loginSchema.safeParse({
          email: credentials?.email,
          password: credentials?.password,
        });

        if (!parsedInput.success) {
          console.error("Validation failed:", parsedInput.error.format());
          throw new Error("Invalid email or password format");
        }

        try {
          // ✅ Fetch user from DB
          const user = await userDb.getUser(credentials?.email as string);

          console.log(JSON.stringify(user));
          if (!user) {
            throw new Error("User not found"); // Authentication failed
          }

          // ✅ Compare password
          const isMatch = await bcrypt.compare(
            credentials?.password as string,
            user.password
          );
          if (!isMatch) {
            console.log("Incorrect Password");
            throw new Error("Incorrect password"); // Authentication failed
          }

          return user; // ✅ Authentication successful
        } catch (error) {
          console.error("Authentication error:", error);
          return null; // ⬅️ Return `null` instead of throwing an error
        }
      },
    }),
    // Spotify OAuth Authentication
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
      authorization: {
        url: "https://accounts.spotify.com/authorize",
        params: {
          scope:
            "user-read-email user-read-private playlist-modify-public playlist-modify-private user-top-read user-library-read user-read-playback-state user-modify-playback-state streaming",
          show_dialog: true, // ✅ Forces Spotify to re-authenticate
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }: { user: User; account: Account | null }) {
      // ✅ Allow Credentials Provider
      if (account?.provider === "credentials") {
        console.log("User logged in with email/password.");
        return true; // Allow normal login
      }

      // ✅ Handle Spotify OAuth
      if (account?.provider === "spotify") {
        if (!user.email) {
          const split = user.name?.split(" ");
          const hashedPassword = await bcrypt.hash(user.id, 10);

          await userDb.createUserAccount({
            id: user.id,
            firstName: (split ?? [])[0],
            lastName: (split ?? [])[1],
            email: user.email || `spotify-${crypto.randomUUID()}@noemail.com`,
            password: hashedPassword,
            image: user.image as string,
            provider: account.provider,
            token_type: account.token_type as string,
            access_token: account.access_token as string,
            refresh_token: account.refresh_token as string,
          });

          return true;
        } else {
          // Check if user exists, if not, create a new user
          const existingUser = await userDb.getUser(user.email);
          if (!existingUser) {
            const split = user.name?.split(" ");
            const hashedPassword = await bcrypt.hash(user.id, 10);

            const parsedInput = userAccountSchema.safeParse({
              id: user.id,
              firstName: (split ?? [])[0],
              lastName: (split ?? [])[1],
              email: user.email,
              password: hashedPassword,
              image: user.image as string,
              provider: account.provider,
              token_type: account.token_type as string,
              access_token: account.access_token as string,
              refresh_token: account.refresh_token as string,
            });

            if (!parsedInput.success) {
              return false;
            }

            await userDb.createUserAccount({
              id: parsedInput.data.id,
              firstName: (split ?? [])[0],
              lastName: (split ?? [])[1],
              email: parsedInput.data.email,
              password: parsedInput.data.password,
              image: parsedInput.data.image,
              provider: parsedInput.data.provider,
              token_type: parsedInput.data.token_type,
              access_token: parsedInput.data.access_token,
              refresh_token: parsedInput.data.refresh_token,
            });

            return true;
          } else {
            const parsedInput = accountSchema.safeParse({
              id: user.id,
              userId: existingUser.id,
              emailAddress: existingUser.email,
              provider: account.provider,
              image: user.image,
              token_type: account.token_type,
              access_token: account.access_token,
              refresh_token: account.refresh_token,
            });

            if (!parsedInput.success) {
              return false;
            }

            await accountDb.createAccount({
              id: parsedInput.data.id,
              userId: parsedInput.data.userId,
              emailAddress: parsedInput.data.emailAddress,
              image: parsedInput.data.image,
              provider: parsedInput.data.provider,
              token_type: parsedInput.data.token_type,
              access_token: parsedInput.data.access_token,
              refresh_token: parsedInput.data.refresh_token,
            });

            // console.log("Existing Account", existingAccount);

            return true;
          }
        }
      }

      throw new Error("Invalid user data from Spotify.");
    },

    async jwt({
      token,
      user,
      account,
    }: {
      token: CustomToken;
      user: User;
      account: Account | null;
    }) {
      if (user && account?.provider === "credentials") {
        token.id = user.id;
        token.email = user.email;
        return token;
      }

      if (user && account?.provider === "spotify") {
        const getUser = await userDb.getUser(user.email as string);
        token.id = getUser?.id;
        token.email = getUser?.email;
        return token;
      }

      // On subsequent requests, just return existing token
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: Session;
      token: CustomToken;
    }) {
      if (token?.id) {
        session.user.id = token.id as string; // ✅ Add ID from token
        session.user.email = token.email as string;
      }
      return session;
    },
    // authorized: async ({ auth }: { auth: Session | null }) => {
    //   // Logged in users are authenticated, otherwise redirect to login page
    //   return !!auth
    // }
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login", // Redirect failed login attempts here
  },
};

export default authOptions;
