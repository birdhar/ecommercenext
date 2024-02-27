import NextAuth, { getServerSession } from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/lib/mongodb";

const adminEmails = ["birat.dhar.89@gmail.com"];

export const authproviders = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: ({ session }) => {
      if (adminEmails?.includes(session?.user?.email)) {
        return session;
      } else {
        return false;
      }
    },
  },
};

export default NextAuth(authproviders);

export async function checkAdmin(req, res) {
  const session = await getServerSession(req, res, authproviders);

  if (!session || !adminEmails.includes(session.user.email)) {
    res.status(401).json({
      err: "You are not authorized.",
    });
    res.end();
  }
}
