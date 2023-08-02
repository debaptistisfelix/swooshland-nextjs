import prisma from "@app/libs/prismaDB";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route"


//API Route to get all the adresses of db
export async function GET(request){
    const session = await getServerSession(authOptions);

    if(!session){
        return new Response("You are not authorized to get addresses", {status: 401});
    }

    const addresses = await prisma.address.findMany({
        where: {
            userId: session.id
        }
    });

    if(!addresses){
        return new Response("No addresses found", {status: 404});
    }

    return new Response(JSON.stringify(addresses), {status: 200});
}

//API Route to delete all the adresses of db
export async function DELETE(request){
    const addresses = await prisma.address.deleteMany();

    if(!addresses){
        return new Response("No addresses found", {status: 404});
    }

    return new Response(JSON.stringify(addresses), {status: 200});
}