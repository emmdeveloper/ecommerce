import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/db/prisma";

import NextAuth from "next-auth/next";
import { mergerAnonymousCartIntoUserCart } from "@/lib/db/cart";

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SERCET as string,
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
  secret: process.env.NEXTAUTH_SERCET as string,
};

export default authOptions;
