import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
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
