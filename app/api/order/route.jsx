import prisma from "@app/libs/prismaDB";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route"

//GET ALL THE ORDERS OF A USER
export async function GET(request){
    const session = await getServerSession(authOptions);

    if(!session){
        return new Response("You are not authorized to get orders", {status: 401});
    }

    try{
        const orders = await prisma.order.findMany({
            where: {
                userId: session.id
            },
            include: {
                cartItems: {
                    include: {
                      item: true, // Include the associated Item for each CartItem
                        availableSize: true,
                    },
                  },
                address: true,
                user: true
            }
        });

        return new Response(JSON.stringify(orders), {status: 200});
    }
    catch(error){
        console.log(error);
        return new Response("Something went wrong", {status: 500});
    }
}