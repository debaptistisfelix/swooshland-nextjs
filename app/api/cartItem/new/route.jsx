import prisma from "@app/libs/prismaDB";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route"
import { v4 as uuidv4 } from 'uuid';
import { getCookies, setCookie } from 'cookies-next';
export const dynamic = 'force-dynamic';

//CREATE A NEW CART ITEM FOR A USER
export async function POST(request){
    const session = await getServerSession(authOptions);
    const body = await request.json();
    const {itemId, chosenSize, guestId} = body;

    /* CHECK IF ITEM IS STILL AVAILABLE IN THIS SIZE */
    const availableSize = await prisma.availableSize.findUnique({
        where: {
            id: chosenSize.id
        },
    })

    if(availableSize.availability === 0){
        return new Response(JSON.stringify("This Size is no more available"), {status: 400});
    }

    

    if(!session){
        try{
          
            const newCartItem = await prisma.cartItem.create({
                data: {
                    guestUser: guestId,
                    item: {
                        connect: {
                            id: itemId
                        }
                    },
                    availableSize: {
                        connect: {
                            id: chosenSize.id
                        }
                    }
                },
                include: {
                    item: true,
                    availableSize: true
                }
            })
    
           
    
           
               /*  const updatedItem = await prisma.availableSize.update({
                    where: {
                        id: chosenSize.id
                    },
                    data: {
                        availability: { decrement: 1 },
                        reserved: { increment: 1 }
                    }
                }); */
    
    
                
           
    
            return new Response(JSON.stringify(newCartItem), {status: 200});
        }
        catch(error){
            console.log(error);
            return new Response(JSON.stringify("Something went wrong"), {status: 500});
        }
    } else {
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
                    availableSize: {
                        connect: {
                            id: chosenSize.id
                        }
                    }
                },
                include: {
                    item: true,
                    availableSize: true,
                    user: true
                }
            })
    
           
    
           
               /*  const updatedItem = await prisma.availableSize.update({
                    where: {
                        id: chosenSize.id
                    },
                    data: {
                        availability: { decrement: 1 },
                        reserved: { increment: 1 }
                    }
                }); */
    
    
           
    
            return new Response(JSON.stringify(newCartItem), {status: 200});
        }
        catch(error){
            console.log(error);
            return new Response(JSON.stringify("Something went wrong"), {status: 500});
        }
    }
}