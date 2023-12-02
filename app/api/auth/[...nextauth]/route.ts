import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb, verifyUserDetails } from "@/lib/helpers";
import prisma from "@/prisma";
import bcrypt from "bcrypt";

import { authOptions } from "./authOptionsFile";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
