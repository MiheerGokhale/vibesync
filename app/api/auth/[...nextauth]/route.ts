import authOptions from "@/lib/authOptions"
import NextAuth from "next-auth"

const handler = NextAuth({
  providers:authOptions,
  secret:process.env.NEXTAUTH_SECRET,
  session:{
    strategy:"jwt"
  },
  pages:{
    signIn:"/login"
  }
})

export { handler as GET, handler as POST }