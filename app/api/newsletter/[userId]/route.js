import prisma from "@app/libs/prismaDB";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route"
import sendSubscribedToNewsletterMail from "@app/libs/email/sendSubscribedToNewsletterMail";
import sendUnsubscribedFromNewsletterMail from "@app/libs/email/sendUnsubscribedFromNewsletterMail";

export async function PATCH(request, {params}){
    const {userId} = params;
    const session = await getServerSession(authOptions);

    if(!session){
        return new Response("You are not authorized to update addresses", {status: 401});
    }

    const user = await prisma.user.findUnique({
        where:{
            id: userId
        }
    })

    if(!user){
        return new Response("User not found", {status: 404});
    }

    let updatedUser;

    if(user.newsLetterSub === true){
         try{
            updatedUser = await prisma.user.update({
                where:{
                    id: userId
                },
                data:{
                    newsLetterSub: false
                }
            })

            await prisma.SubscribedEmailAddress.delete({
                where:{
                    email: user.email
                }
            })
            await sendUnsubscribedFromNewsletterMail(user.email);
         }
         catch(error){
            console.log(error);
         }
    } else if(user.newsLetterSub === false){
        try{
            updatedUser = await prisma.user.update({
                where:{
                    id: userId
                },
                data:{
                    newsLetterSub: true
                }
            })

            await prisma.SubscribedEmailAddress.create({
                data:{
                    email: user.email
                }
            })

            const cancelURL = `http://localhost:3000/unsubscribe/${user.email}`
          await sendSubscribedToNewsletterMail(user.email, cancelURL);
        }
        catch(error){
            console.log(error)
        }
    }


    return new Response(JSON.stringify(updatedUser.newsLetterSub), {status: 200});
}