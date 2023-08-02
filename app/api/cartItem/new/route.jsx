import prisma from "@app/libs/prismaDB";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route"

//CREATE A NEW CART ITEM FOR A USER
export async function POST(request){
    const session = await getServerSession(authOptions);
    const body = await request.json();
    const {itemId, chosenSize} = body;

    if(!session){
        return new Response("You are not authorized to create a cart item", {status: 401});
    }

    try{
        const newCartItem = await prisma.cartItem.create({
            data: {
                user: {
                    connect: {
                        id: session.id
                    }
                },
                item: {
                    connect: {
                        id: itemId
                    }
                },
                chosenSize: chosenSize
            },
            include: {
                item: true
            }
        })

        return new Response(JSON.stringify(newCartItem), {status: 200});
    }
    catch(error){
        console.log(error);
        return new Response("Something went wrong", {status: 500});
    }
}