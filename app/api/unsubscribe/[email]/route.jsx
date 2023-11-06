import prisma from "@app/libs/prismaDB";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route"
import sendUnsubscribedFromNewsletterMail from "@app/libs/email/sendUnsubscribedFromNewsletterMail";
export const dynamic = 'force-dynamic';

export async function PATCH(request, {params}){
    const {email} = params;

    if(!email){
        return new Response(JSON.stringify("No email Address found"), {status: 400});
    }

   try{
    //check if this email address is still registered in newsletter list
    const alreadyRegisteredEmail = await prisma.SubscribedEmailAddress.findUnique({
        where: {
            email
        }
    });
    if(!alreadyRegisteredEmail){
        return new Response(JSON.stringify("You are not registered to our newsletter"), {status: 404});
    }



    //Check if user with this email is registered 
    const user = await prisma.user.findUnique({
        where:{
            email: email
        }
    })

    // if user with this email exists, update both the user and the newsletterSubscription table
    if(user){
        const updatedUser = await prisma.user.update({
            where: {
                email
            },
            data: {
                newsLetterSub: false
            }
        });
        await prisma.SubscribedEmailAddress.delete({
            where:{
                email: email
            }
        })

        await sendUnsubscribedFromNewsletterMail(email);
        return new Response(JSON.stringify("Newsletter subscription Cancelled"), {status: 200});
    } else {
        // if user with this email doesn't exist, update the newsletterSubscription table
        await prisma.SubscribedEmailAddress.delete({
            where:{
                email: email
            }
        })
        await sendUnsubscribedFromNewsletterMail(email);
        return new Response(JSON.stringify("Newsletter subscription Cancelled"), {status: 200});
    }
   }catch(error){
    console.log(error);
    return new Response(JSON.stringify("There was an error"), {status: 200});
   }

   
}