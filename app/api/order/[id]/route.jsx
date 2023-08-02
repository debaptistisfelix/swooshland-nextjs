import prisma from "@app/libs/prismaDB";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route"

//To update an order
export async function PATCH(request, {params}){
    const {id} = params;    
    const body = await request.json();
    const {status} = body;
    const session = await getServerSession(authOptions);
   

    const order = await prisma.order.findUnique({
        where: {
            id: id
        }
    })

    if(!order){
        return new Response("Order not found", {status: 404});
    }

    if(!session){
        return new Response("You are not authorized to update this order", {status: 401});
    }

    if(order.userId !== session.id){
        return new Response("You are not authorized to update this order", {status: 401});
    }

    try {
        const updatedOrder = await prisma.order.update({
            where: {
                id: id
            },
            data: {
                status: status
            },
            include: {
                cartItems: {
                    include: {
                      item: true, // Include the associated Item for each CartItem
                    },
                  },
                address: true,
                user: true
            }
        });

        return new Response(JSON.stringify(updatedOrder), {status: 200});
    }
    catch(error){
        console.log(error);
        return new Response("Something went wrong", {status: 500});
    }
}