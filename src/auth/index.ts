import NextAuth, { User, NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "../../prisma/client";
import bcrypt from "bcryptjs";

export const BASE_PATH = "/api/auth";

const authOptions: NextAuthConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "john.doe@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        const user = await prisma.user.findUnique({
          where: {
            email: `${credentials.email}`,
          },
        });
        if (!user) return null;

        const passwordMatch = await bcrypt.compare(
          `${credentials.password}`,
          user.passwordHash
        );
        if (!passwordMatch) return null;

        return { id: `${user.id}`, email: user.email, name: "My Name" };
      },
    }),
  ],
  basePath: BASE_PATH,
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
