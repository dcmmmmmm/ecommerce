import bcrypt from "bcrypt"
import {  AuthOptions, NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from './prismadb'

// cac kieu dang nhap su dung next-auth 
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      //kiểm tra thông tin đăng nhập 
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }
        // tìm kiếm user trong database
        // với điều kiện email trùng với email đã đăng kí
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });
        //kiểm tra email và password nhập vào
        if (!user || !user?.hashedPassword) {
          throw new Error('Invalid credentials');
        }
        // so sánh password
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        //nếu khác mật khẩu đúng  => in ra thông báo sai mật khẩu
        if (!isCorrectPassword) {
          throw new Error('Invalid credentials');
        }

        return user;
      }
    })
  ],
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({token, session }) {
      if(token) {
        session.user.role = token.role
      }
      return session
    },
    async jwt({token, user}) {
      const dbUser = await prisma.user.findUnique({
        where: {
          email: token.email!,
        }
      })
      if(!dbUser) {
        token.id = user!.id
        return token
      }
      return {
        id: dbUser.id,
        name: dbUser.name,
        role: dbUser.role,
        email: dbUser.email,
        picture: dbUser.image
      }
    },
  },
}
