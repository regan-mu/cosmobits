import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/lib/prisma';
import { UserRole } from '@/generated/prisma/enums';

// Super admin email from env - always has access
const superAdminEmail = process.env.CONTACT_EMAIL;

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  callbacks: {
    async signIn({ user }) {
      // Super admin always has access
      if (user.email === superAdminEmail) {
        return true;
      }
      
      // Check if user has ADMIN role in database
      if (user.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
          select: { role: true },
        });
        
        if (dbUser?.role === UserRole.ADMIN) {
          return true;
        }
      }
      
      // Deny access to non-admins
      return false;
    },
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        
        // Fetch role from database
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { role: true },
        });
        
        // Add role to session
        (session.user as any).role = dbUser?.role || UserRole.USER;
      }
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      // Auto-promote super admin to ADMIN role when they first sign up
      if (user.email === superAdminEmail) {
        await prisma.user.update({
          where: { id: user.id },
          data: { role: UserRole.ADMIN },
        });
      }
    },
  },
});
