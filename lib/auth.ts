import { PrismaAdapter } from "@auth/prisma-adapter";
import { getServerSession, NextAuthOptions } from "next-auth";
import { db } from "./db";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { generateFromEmail } from "unique-username-generator";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    error: "/sign-in",
    signIn: "/sign-in",
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      async profile(profile) {
        const username = generateFromEmail(profile.email, 5);
        return {
          id: profile.sub,
          username,
          name: profile.given_name ? profile.given_name : profile.name,
          surname: profile.family_name ? profile.family_name : "",
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter email and password.");
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("User was not found, Please enter valid email");
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!passwordMatch) {
          throw new Error(
            "The entered password is incorrect, please enter the correct one."
          );
        }

        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.username = token.username;
        session.user.surname = token.surname;
        session.user.completedOnboarding = !!token.completedOnboarding;
        session.user.isOnline = !!token.isOnline;
        session.user.workspaceId =
          typeof token.workspaceId === "string" ? token.workspaceId : null;
      }

      const user = await db.user.findUnique({
        where: { id: token.id as string },
        include: { subscriptions: true },
      });

      if (user) {
        session.user.image = user.image;
        session.user.completedOnboarding = user.completedOnboarding;
        session.user.username = user.username;
        session.user.isOnline = user.isOnline;

        const subscription = user.subscriptions[0];
        if (subscription) {
          session.user.workspaceId = subscription.workspaceId;
        }
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await db.user.findFirst({
          where: { email: token.email },
          include: { subscriptions: true },
        });

        if (!dbUser) {
          token.id = user!.id;
          return token;
        }

        if (dbUser) {
          await db.user.update({
            where: { id: dbUser.id },
            data: { isOnline: true },
          });

          const subscription = dbUser.subscriptions[0];
          return {
            id: dbUser.id,
            username: dbUser.username,
            email: dbUser.email,
            picture: dbUser.image,
            isOnline: true,
            workspaceId: subscription ? subscription.workspaceId : null,
          };
        }

        token.id = user.id as string;
        return token;
      }

      return {
        ...token,
        isOnline: token.isOnline || false,
      };
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
