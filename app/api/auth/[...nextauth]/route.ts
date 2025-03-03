import NextAuth from "next-auth";
import { authOptions } from "../../../auth"; // Relative import (if needed)


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
