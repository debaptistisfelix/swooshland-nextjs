import prisma from "@app/libs/prismaDB";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route"

//Get all the cart items for a user
export async function GET(request){
    const session = await getServerSession(authOptions);

    if(!session){
        return new Response("You are not authorized to get cart items", {status: 401});
    }

    try{
       const wishlistItems = await prisma.wishListItem.findMany({
            where: {
                userId: session.id
            },
            include: {
                item: true
            }
        })

        return new Response(JSON.stringify(wishlistItems), {status: 200});


    }
    catch(error){
        console.log(error);
        return new Response(JSON.stringify("Something went wrong"), {status: 500});
    }
}