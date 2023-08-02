import prisma from "@app/libs/prismaDB";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route"

//CREATE A NEW ORDER FOR A USER
export async function POST(request){
    const session = await getServerSession(authOptions);
    const body = await request.json();
    const {subtotal, shipping, total, cartItems, addressId} = body;

    if(!session){
        return new Response("You are not authorized to create orders", {status: 401});
    }

    try{
        const newOrder = await prisma.order.create({
            data: {
                subTotal: subtotal,
                shipping: shipping,
                total: total,
                cartItems: {
                    connect: cartItems.map(cartItem => ({id: cartItem})),
                   
                },
                address: {
                    connect: {
                        id: addressId
                    }
                },
                user: {
                    connect: {
                        id: session.id
                    }
                }
            },
            include: {
                cartItems: {
                    include: {
                      item: true, // Include the associated Item for each CartItem
                    },
                  },
                address: true
            }
        });

        return new Response(JSON.stringify(newOrder), {status: 200});
    }
    catch(error){
        console.log(error);
        return new Response("Something went wrong", {status: 500});
    }
}