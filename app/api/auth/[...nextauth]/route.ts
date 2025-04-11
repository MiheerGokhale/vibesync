import authOptions from "@/lib/authOptions"
import NextAuth from "next-auth"

const handler = NextAuth(authOptions);

// export {auth};
export { handler as GET, handler as POST }