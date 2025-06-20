import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions"; // ✅ safe to import from here

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
