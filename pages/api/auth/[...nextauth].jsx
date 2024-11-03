// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter"; // Optional if using Prisma
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma), // Optional, only if you're using Prisma
  secret: process.env.NEXTAUTH_SECRET, // Optional, but recommended for security
  session: {
    jwt: true, // Store session as JWT (default)
  },
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id; // Attach user ID to session
      return session;
    },
  },
});
