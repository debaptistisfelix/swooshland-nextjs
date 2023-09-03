import prisma from "@app/libs/prismaDB";
import sendSubscribedToNewsletterMail from "@app/libs/email/sendSubscribedToNewsletterMail";



export async function POST(request){
    const body = await request.json();
    const {email} = body;

    if(!email){
        return new Response(JSON.stringify("Please provide the necessary infos"), {status: 400});
    }

    const alreadyRegisteredEmail = await prisma.SubscribedEmailAddress.findUnique({
        where: {
            email
        }
    });

    if(alreadyRegisteredEmail){
        return new Response(JSON.stringify("You are already registered to our newsletter"), {status: 400});
    }

    // Check if the email address is from a registered User

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    // If it is, add it to the newsletterSubscription table and update the user field "Subscribed to newsletter"
    if(user){
        const newNewsletterSubscription = await prisma.SubscribedEmailAddress.create({
            data: {
                email
            }
        });
        const updatedUser = await prisma.user.update({
            where: {
                email
            },
            data: {
                newsLetterSub: true
            }
        });

        const cancelURL = `http://localhost:3000/unsubscribe/${email}`

        await sendSubscribedToNewsletterMail(email, cancelURL);
        return new Response(JSON.stringify(newNewsletterSubscription), {status: 200});
    } else {
          // if it isn't, add it to the newsletterSubscription table
        const newNewsletterSubscription = await prisma.SubscribedEmailAddress.create({
            data: {
                email
            }
        });
        await sendSubscribedToNewsletterMail(email, cancelURL);
        return new Response(JSON.stringify(newNewsletterSubscription), {status: 200});
    }
}