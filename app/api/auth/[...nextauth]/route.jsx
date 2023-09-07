import NextAuth from "next-auth/next";
import prisma from "@app/libs/prismaDB";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import bcrypt from "bcryptjs";

import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import sendWelcomeEmail from "@app/libs/email/sendWelcomeEmail";

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
        CredentialsProvider({
            name: "credentials",
            credentials:{
                username: {label: "Username", type: "text", placeholder: "Username"},
                password: {label: "Password", type: "password"},
                email: {label: "Email", type: "email"}
            },
            async authorize(credentials){
                if(!credentials.email || !credentials.password){
                    throw new Error("Please provide email and password")
                }

                const user = await prisma.user.findUnique({
                    where:{
                        email: credentials.email
                    }
                    
                })

                if(!user){
                    throw new Error("No user found")
                }

                const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword);

                if(!passwordMatch){
                    throw new Error("Invalid Email or Password")
                }

                return user;
            },
        })
    ],
    callbacks: {
        async jwt({token, user}) {
      
           if (user?.id) {
               token.id = user.id
           }
           if (user?.userName) {
               token.userName = user.userName;
           }
          
           return token
        },
        async session({session, token}) {
            session.id = token.id;
            session.userName = token.userName;
            
            return session;
        },
        async signIn({user, account}) {
            if (account.provider === 'google') {
                console.log("user:", user)
                if(user.welcomeEmailSent === false){
                    await prisma.user.update({
                        where: {
                            id: user.id
                        },
                        data: {
                            welcomeEmailSent: true
                        }});
                    sendWelcomeEmail(user?.email, user?.name)
                }
            }
            return true
          },
      },
    secret: process.env.SECRET,
    session: {
         strategy: "jwt",
    },
    debug: process.env.NODE_ENV === "development"
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};