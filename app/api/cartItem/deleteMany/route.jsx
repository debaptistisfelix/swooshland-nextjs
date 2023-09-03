import prisma from "@app/libs/prismaDB";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route"

export async function POST(request){
    const body = await request.json();
    const {cartItemsIds} = body;

   try{
        const deletedCartItems = await prisma.cartItem.deleteMany({
            where: {
                id: {
                    in: cartItemsIds
                }
            }
        });

        return new Response(JSON.stringify(JSON.stringify("Cart items  deleted")), {status: 200});
    } catch(error){
        console.log(error);
        return new Response(JSON.stringify("Something went wrong"), {status: 500});
    }
    
}