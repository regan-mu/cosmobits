import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/lib/prisma';
import { UserRole } from '@/generated/prisma/enums';

// Super admin email from env - always has access
const superAdminEmail = process.env.CONTACT_EMAIL;

// Helper to check if email is in allowed admins list
async function isAllowedAdmin(email: string): Promise<boolean> {
  const allowed = await prisma.allowedAdmin.findUnique({
    where: { email },
  });
  return !!allowed;
}

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
      if (!user.email) return false;
      
      // Super admin always has access
      if (user.email === superAdminEmail) {
        return true;
      }
      
      // Check if user already has ADMIN role in database
      const dbUser = await prisma.user.findUnique({
        where: { email: user.email },
        select: { role: true },
      });
      
      if (dbUser?.role === UserRole.ADMIN) {
        return true;
      }
      
      // Check if email is in AllowedAdmin list
      if (await isAllowedAdmin(user.email)) {
        return true;
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
      if (!user.email) return;
      
      // Auto-promote to ADMIN role if super admin OR in AllowedAdmin list
      const shouldBeAdmin = 
        user.email === superAdminEmail || 
        await isAllowedAdmin(user.email);
      
      if (shouldBeAdmin) {
        await prisma.user.update({
          where: { id: user.id },
          data: { role: UserRole.ADMIN },
        });
      }
    },
  },
});
