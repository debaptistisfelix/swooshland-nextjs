import prisma from "@app/libs/prismaDB";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route"

//CREATE A NEW CART ITEM FOR A USER
export async function POST(request){
    const session = await getServerSession(authOptions);
    const body = await request.json();
    const {itemId} = body;

    if(!session){
        return new Response(JSON.stringify("You are not authorized to create a wishlist item"), {status: 401});
    }

    const alreadyExistingFav = await prisma.wishListItem.findFirst({
        where: {
            userId: session.id,
            itemId: itemId
        }
    })

    if(alreadyExistingFav){
        return new Response(JSON.stringify("Item already exists in wishlist"), {status: 400});
    }

    try{
        const newWishlistItem = await prisma.wishListItem.create({
            data: {
                user: {
                    connect: {
                        id: session.id
                    }
                },
                item:{
                    connect: {
                        id: itemId
                    }
                },
            }
        
        });

        return new Response(JSON.stringify(newWishlistItem), {status: 200});
    }
    catch(error){
        console.log(error);
        return new Response(JSON.stringify("Something went wrong"), {status: 500});
    }
}