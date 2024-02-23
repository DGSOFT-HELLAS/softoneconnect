import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import connectMongo from '../../../../../server/models/config';
import User from "../../../../../server/models/User";

export const authOptions = {
    session: {
      strategy: 'jwt',
    },
    pages: {
      signIn: '/login',
    },
    providers: [
      CredentialsProvider({
        credentials: {
          email: {},
          password: {},
        },
        async authorize(credentials, req) {
  
  
          try {
            await connectMongo()
            const user = await User.findOne({ email: credentials.email })
            if (user === null) return;
  
            console.log('user fetched')
            console.log(user)
            let password = user.password
            const match = await compare(credentials.password, password)
  
  
            const accessToken = jwt.sign({
              email: user.email,
              role: user.role,
  
            }, process.env.JWT_SECRET);
  
  
  
            if (match) {
              return {
                email: user.email,
                name: user.name,
                surname: user.surname,
                role: user.role,
                accessToken: accessToken
              }
            }
  
  
  
          } catch (e) {
            console.log(e)
            throw new Error(e)
          }
          return null;
        },
      }),
    ],
    callbacks: {
      async jwt({ token, user, account }) {
  
        return { ...token, ...user };
      },
      async session({ session, token, user }) {
        // console.log(user)
        // console.log('toke')
        // console.log(token)
        session = token;
        return session;
      },
    },
  }

  const handler = NextAuth(authOptions);

  export { handler as GET, handler as POST };