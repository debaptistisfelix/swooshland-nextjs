import prisma from "@app/libs/prismaDB";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route"
export const dynamic = 'force-dynamic';

//Get a specific cart item for a user
export async function GET(request, {params}){
    const {id} = params;
    const session = await getServerSession(authOptions);

  /*   if(!session){
        return new Response(JSON.stringify("You are not authorized to get cart items"), {status: 401});
    } */

    try{
        const cartItem = await prisma.cartItem.findUnique({
            where: {
                id : id,
              
            },
            include: {
                item: true,
                availableSize: true
            }
        });

        if(!cartItem){
            return new Response(JSON.stringify("Cart item not found"), {status: 404});
        }

        return new Response(JSON.stringify(cartItem), {status: 200});
    }
    catch(error){
        console.log(error);
        return new Response(JSON.stringify("Something went wrong"), {status: 500});
    }
}


//Update a specific cart item for a user
export async function PATCH(request, {params}){
    const {id} = params;
    const session = await getServerSession(authOptions);
    const body = await request.json();

   /*  if(!session){
        return new Response(JSON.stringify("You are not authorized to update cart items"), {status: 401});
    } */

    try{
        const updatedCartItem = await prisma.cartItem.update({
            where: {
                id: id,
            },
            data: {
                chosenSize: body.chosenSize
            },
            include: {
                item: true,
                availableSize: true
            }
        });

        if(!updatedCartItem){
            return new Response(JSON.stringify("Cart item not found"), {status: 404});
        }

        return new Response(JSON.stringify(updatedCartItem), {status: 200});
    }
    catch(error){
        console.log(error);
        return new Response(JSON.stringify("Something went wrong"), {status: 500});
    }
}

//Delete a specific cart item for a user
export async function DELETE(request, {params}){
    const {id, sizeId} = params;
    const session = await getServerSession(authOptions);


    /* if(!session){
        return new Response(JSON.stringify("You are not authorized to delete cart items"), {status: 401});
    } */

    try{
        const deletedCartItem = await prisma.cartItem.delete({
            where: {
                id: id,
            }
        });

        if(!deletedCartItem){
            return new Response(JSON.stringify("Cart item not found"), {status: 404});
        }

      /*   const updatedItem = await prisma.availableSize.update({
            where: {
                id: sizeId
            },
            data: {
                availability: { increment: 1 },
                reserved: { decrement: 1 }
            }
        }) */

        return new Response(JSON.stringify("CartItem deleted"), {status: 200});
    }
    catch(error){
        console.log(error)
        return new Response(JSON.stringify("Something went wrong"), {status: 500});
    }
};