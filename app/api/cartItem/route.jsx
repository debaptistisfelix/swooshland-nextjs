import prisma from "@app/libs/prismaDB";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route"


//Get all the cart items for a user
export async function GET(request){
    const session = await getServerSession(authOptions);
    console.log("session:", session)
    if(!session){
        try{
            const cartItems = await prisma.cartItem.findMany({
                where: {
                    guestUser: guestId
                },  
                include: {
                    item: true,
                    availableSize: true
                }
            })
    
            return new Response(JSON.stringify(cartItems), {status: 200});
        }
        catch(error){
            console.log(error);
            return new Response(JSON.stringify("Something went wrong"), {status: 500});
        }
    } else {
        try{
            const cartItems = await prisma.cartItem.findMany({
                where: {
                    userId: session.id
                },  
                include: {
                    item: true,
                    availableSize: true
                }
            })
    
            return new Response(JSON.stringify(cartItems), {status: 200});
        }
        catch(error){
            console.log(error);
            return new Response(JSON.stringify("Something went wrong"), {status: 500});
        }
    }
}

