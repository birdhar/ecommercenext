import NextAuth, { getServerSession } from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/user";

export const authproviders = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEW_GOOGLE_ID,
      clientSecret: process.env.NEW_GOOGLE_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          role: profile.role ?? "User",
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        await mongooseConnect();

        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("No user found");
        }
        const correctPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!correctPassword || credentials.email !== user.email) {
          throw new Error("Invalid credentials");
        }
        return user;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    //   async signIn({ user, account, metadata }) {
    //     await mongooseConnect();

    //     try {
    //       const userToFind = await User.findOne({ email: user.email });
    //       if (userToFind) {
    //         return true;
    //       }
    //       await User.create({ email: user.email, name: user.name, role: "User" });
    //     } catch (error) {
    //       console.log("Sign in Error");
    //       return false;
    //     }
    //   },
    async jwt({ token, user }) {
      // if (user) {
      //   user.role = user.role === null ? "User" : user.role;
      //   token.user = user;
      // }
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user.role = token.role;

      return session;
    },
  },

  adapter: MongoDBAdapter(clientPromise),
};

export default NextAuth(authproviders);
