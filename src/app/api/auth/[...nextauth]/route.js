import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectMongo from '../../../../../server/models/config';
import User from '../../../../../server/models/User';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'

const handler = NextAuth({
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
            const user = await User.findOne({email:credentials.email})
            console.log(user)
            if(user === null) return;


            let password = user.password
            const match = await compare(credentials.password, password)


          
            if(match) {
              return {
                email: user.email,
              };
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
    async session({ session, user, token }) {
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      const accessToken = jwt.sign(token, process.env.JWT_SECRET);
      return {
         email: token.email,
         accessToken: accessToken
      }
    }
}
});

export { handler as GET, handler as POST };