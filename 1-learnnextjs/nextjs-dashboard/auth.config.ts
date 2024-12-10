import type { NextAuthConfig } from "next-auth";
// ... Prisma Imports

export const authConfig = {
  //providers: [...],
  pages: {
    signIn: "/login",
    error: "/error",
  },
  session: { strategy: "jwt" },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
