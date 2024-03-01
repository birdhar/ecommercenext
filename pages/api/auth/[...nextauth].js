import NextAuth, { getServerSession } from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/user";

// export const authproviders = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET,
//     }),
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {},
//       async authorize(credentials) {
//         const { email, password } = credentials;

//         try {
//           await mongooseConnect();
//           const user = await User.findOne({ email });

//           if (!user) {
//             return null;
//           }
//           const correctPassword = await bcrypt.compare(password, user.password);
//           if (!correctPassword) {
//             return null;
//           }
//           return user;
//         } catch (error) {
//           throw new Error(error);
//         }
//       },
//     }),
//   ],
//   session: {
//     jwt: true,
//     callbacks: {
//       async session({ session, user }) {
//         if (user) {
//           session.user.name = user.name;
//           session.user.email = user.email;
//           session.user.id = user.id;
//         }
//         console.log("session:", session);
//         return session;
//       },
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "/login",
//   },
//   adapter: MongoDBAdapter(clientPromise),
// };

export const authproviders = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEW_GOOGLE_ID,
      clientSecret: process.env.NEW_GOOGLE_SECRET,
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
          throw new Error("Invalid email password");
        }
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },

  adapter: MongoDBAdapter(clientPromise),
};

export default NextAuth(authproviders);
