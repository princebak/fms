import NextAuth from "next-auth/next";
import { authenticate } from "@/services/UserService";

import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        console.log("credentials >> ", credentials);
        return await authenticate(credentials);
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (trigger === "update") {
        user = session.user;
      }
      user && (token.user = user);

      return token;
    },
    session: async ({ session, token }: any) => {
      const user: any = token.user;
      session.user = user;

      return session;
    },
  },
  jwt: {
    secret: "$2b$10$8KMPRzUEQ.7flfiT7FVf3.4AKnerb9BsblPqanw.M44nOReKoh6wu",
  },
  secret: "*FmsApp@2023*",
});

export { handler as GET, handler as POST };
