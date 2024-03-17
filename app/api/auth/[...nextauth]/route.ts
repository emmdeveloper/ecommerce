import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/db/prisma";
import { env } from "@/lib/env";
import NextAuth from "next-auth/next";
import { mergerAnonymousCartIntoUserCart } from "@/lib/db/cart";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SERCET,
    }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
  events: {
    async signIn({ user }) {
      await mergerAnonymousCartIntoUserCart(user.id);
    },
  },
  secret: env.NEXTAUTH_SERCET
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
