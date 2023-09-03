import prisma from "@app/libs/prismaDB";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route"

//CREATE A NEW ORDER FOR A USER
export async function POST(request){
    const session = await getServerSession(authOptions);
    const body = await request.json();
    const {subtotal, shipping, total, cartItems, orderAddress, boughtItems} = body;

    console.log("boughtItems:", boughtItems)

    if(!session){
        try{
            const newOrder = await prisma.order.create({
                data: {
                    subTotal: subtotal,
                    shipping: shipping,
                    total: total,
                    cartItems: {
                        connect: cartItems.map(cartItem => ({id: cartItem})),
                       
                    },
                    orderAddress: orderAddress,
                    boughtItems: boughtItems.map((boughtItem) => ({
                        item: boughtItem.item,
                        size: boughtItem.size,
                      })),
                },
                include: {
                    cartItems: {
                        include: {
                        availableSize: true,
                          item: true, // Include the associated Item for each CartItem
                        },
                      },
                   
                }
            });
    
            return new Response(JSON.stringify(newOrder), {status: 200});
        }
        catch(error){
            console.log(error);
            return new Response("Something went wrong", {status: 500});
        }
    } else if(session ){
        try{
            const newOrder = await prisma.order.create({
                data: {
                    subTotal: subtotal,
                    shipping: shipping,
                    total: total,
                    cartItems: {
                        connect: cartItems.map(cartItem => ({id: cartItem})),
                       
                    },
                    orderAddress: orderAddress,
                    boughtItems: boughtItems.map((boughtItem) => ({
                        item: boughtItem.item,
                        size: boughtItem.size,
                      })),
                    user: {
                        connect: {
                            id: session.id
                        }
                    }
                },
                include: {
                    cartItems: {
                        include: {
                          item: true, 
                        },
                      },
                      user: true,
                }
            });
    
            return new Response(JSON.stringify(newOrder), {status: 200});
        }
        catch(error){
            console.log(error);
            return new Response("Something went wrong", {status: 500});
        }
    }

   
}