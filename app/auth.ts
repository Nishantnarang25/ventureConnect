import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Firestore } from "firebase/firestore";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Import Firestore DB
import { NextAuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.sub as string; // Assign Firebase UID to session user
      }
      return session;
    },
    
    async signIn({ user }: { user: User }) {
      if (!user.email) return false; // Prevent users without an email
  
      const userRef = doc(db, "users", user.email);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        // Save user if they are new
        await setDoc(userRef, {
          name: user.name,
          email: user.email,
          createdAt: new Date(),
        });
      }
      return true;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
