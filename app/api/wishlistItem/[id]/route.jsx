import prisma from "@app/libs/prismaDB";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route"

//Get a specific cart item for a user
export async function GET(request, {params}){
    const {id} = params;
    const session = await getServerSession(authOptions);

    if(!session){
        return new Response(JSON.stringify("You are not authorized to get wishlst items"), {status: 401});
    }

    try{
        const wishlistItem = await prisma.wishListItem.findUnique({
            where: {
                id: id,
            },
            include: {
                item: true
            }
        });

        if(!wishlistItem){
            return new Response(JSON.stringify("Wishlist item not found"), {status: 404});
        }

        return new Response(JSON.stringify(wishlistItem), {status: 200});
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

    if(!session){
        return new Response(JSON.stringify("You are not authorized to update wishlist items"), {status: 401});
    }

    try{
       const updatedWishlistItem = await prisma.wishListItem.update({
            where: {
                id: id,
            },
            data: {
                chosenSize: body.chosenSize
            },
            include: {
                item: true
            }
       });

        if(!updatedWishlistItem){
            return new Response(JSON.stringify("Wishlist item not found"), {status: 404});
        }

        return new Response(JSON.stringify(updatedWishlistItem), {status: 200});
    }
    catch(error){
        console.log(error);
        return new Response(JSON.stringify("Something went wrong"), {status: 500});
    }
}

//Delete a specific cart item for a user
export async function DELETE(request, {params}){
    const {id} = params;
    const session = await getServerSession(authOptions);

    if(!session){
        return new Response(JSON.stringify("You are not authorized to delete wishlist items"), {status: 401});
    }

    try{
       const deletedWishlistItem = await prisma.wishListItem.delete({
            where: {
                id: id,
            },
       });

        if(!deletedWishlistItem){
            return new Response(JSON.stringify("Wishlist item not found"), {status: 404});
        }

        return new Response(JSON.stringify("Wishlist item deleted succesfully"), {status: 200});
    }
    catch(error){
        console.log(error)
        return new Response(JSON.stringify("Something went wrong"), {status: 500});
    }
};