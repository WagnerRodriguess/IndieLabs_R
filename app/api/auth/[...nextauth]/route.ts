import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Dados inválidos');
        }

        const user = await prisma.user.findUnique({
          where: { username: credentials.username }
        });

        if (!user || !user.password) {
          throw new Error('Usuário não encontrado');
        }

        const isCorrect = await bcrypt.compare(credentials.password, user.password);

        if (!isCorrect) {
          throw new Error('Senha incorreta');
        }

        return user;
      }
    })
  ],
  

  secret: "wingman_desenvolvimento_de_sistemas",
  

  debug: process.env.NODE_ENV === 'development',

  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token }) {
        if (token && session.user) {
            session.user.name = token.username as string;
        }
        return session;
    },
    async jwt({ token, user }) {
        if (user) {
            token.username = user.username;
        }
        return token;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
