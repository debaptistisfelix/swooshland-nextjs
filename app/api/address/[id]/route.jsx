import prisma from "@app/libs/prismaDB";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route"
export const dynamic = 'force-dynamic';

//API Route to get a single address from db
export async function GET(request, {params}){
    const {id} = params;
    const address = await prisma.address.findUnique({
        where: {
            id: id
        }
    });

    if(!address){
        return new Response(JSON.stringify("Address not found"), {status: 404});
    }

    return new Response(JSON.stringify(address), {status: 200});
}

//API Route to update a single address from db
export async function PATCH(request, {params}){
    const session = await getServerSession(authOptions);

    if(!session){
        return new Response(JSON.stringify("You are not authorized to update addresses"), {status: 401});
    }

    const body = await request.json();

    const {id} = params;
 


    const updatedAddress = await prisma.address.update({
        where : {
            id: id
        },
        data: {
            ...body
        }, 
        
        
    });

    console.log(updatedAddress)

    if(!updatedAddress){
        return new Response(JSON.stringify("Address not found"), {status: 404});
    }

    return new Response(JSON.stringify(updatedAddress), {status: 200});
}

//API Route to delete a single address from db
export async function DELETE(request, {params}){
    const session = await getServerSession(authOptions);

    if(!session){
        return new Response(JSON.stringify("You are not authorized to update addresses"), {status: 401});
    }
    const {id} = params;


    const deletedAddress = await prisma.address.delete({
        where: {
            id: id
        }
    });

    if(!deletedAddress){
        return new Response(JSON.stringify("Address not found"), {status: 404});
    }

    return new Response(JSON.stringify("Address deleted from db"), {status: 200});
};