import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { getServerSession } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import jsonwebtoken from "jsonwebtoken";
import { NextAuthOptions, User } from "next-auth";
import { SessionInterface, UserProfile } from "@/common.types";
import { createUser, getUser } from "./actions";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_ID!,
    }),
  ],
  jwt: {
    encode: ({ secret, token }) => {
      const encodedToken = jsonwebtoken.sign(
        {
          ...token,
          iss: "grafbase",
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        secret
      );
      return encodedToken;
    },
    decode: ({ secret, token }) => {
      const decodedToken = jsonwebtoken.verify(token!, secret) as JWT;
      return decodedToken;
    },
  },
  theme: { colorScheme: "light", logo: "/logo.png" },
  callbacks: {
    async session({ session }) {
      try {
        const data = (await getUser(session?.user?.email as string)) as {
          user?: UserProfile;
        };
        const newSession = {
          ...session,
          user: {
            ...session.user,
            ...data?.user,
          },
        };

        return newSession;
      } catch (error) {
        console.log("error while getting session");
        return session;
      }
      //   session.id = usermodel.id;
      //   return session;
    },
    async signIn({ user }: { user: AdapterUser | User }) {
      try {
        // if user exist
        const userExist = (await getUser(user?.email as string)) as {
          user?: UserProfile;
        };

        // if not create one
        if (!userExist.user) {
          await createUser(
            user?.name as string,
            user?.email as string,
            user?.image as string
          );
        }
        return true;
      } catch (error: any) {
        console.log("the error while signing in ", error);
        return false;
      }
    },
  },
};

export const getCurrentUser = async () => {
  const session = (await getServerSession(authOptions)) as SessionInterface;
  return session;
};
