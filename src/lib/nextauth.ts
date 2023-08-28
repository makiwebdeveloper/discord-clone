import { NextAuthOptions, getServerSession } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
import { verify } from "argon2";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }

        const user = await db.user.findUnique({
          where: {
            username: credentials.username,
          },
        });

        if (!user) {
          return null;
        }

        const isPasswordCorrect = await verify(
          user.hashedPassword!,
          credentials.password
        );
        if (!isPasswordCorrect) {
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token }) => {
      const dbUser = await db.user.findFirst({
        where: {
          OR: [{ email: token?.email }, { username: token?.username }],
        },
      });

      if (!dbUser) {
        token.id = dbUser!.id;
        return token;
      }

      if (!dbUser.username) {
        let count = 0;
        let isCorrect = false;

        while (!isCorrect) {
          const checkedUser = await db.user.findUnique({
            where: {
              username:
                count === 0
                  ? dbUser.email?.split("@")[0].toLowerCase()
                  : dbUser.email?.split("@")[0].toLowerCase() + "_" + count,
            },
          });

          if (checkedUser) {
            count += 1;
          } else {
            isCorrect = true;
          }
        }

        await db.user.update({
          where: {
            id: dbUser.id,
          },
          data: {
            username:
              count === 0
                ? dbUser.email?.split("@")[0].toLowerCase()
                : dbUser.email?.split("@")[0].toLowerCase() + "_" + count,
          },
        });
      }

      return {
        id: dbUser.id,
        email: dbUser.email,
        username: dbUser.username,
        name: dbUser.name,
        image: dbUser.image,
      };
    },
    session: ({ session, token }) => {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

export async function getAuthSession() {
  return getServerSession(authOptions);
}
