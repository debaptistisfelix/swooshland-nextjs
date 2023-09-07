import prisma from "@app/libs/prismaDB";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route"

export async function PATCH(request, {params}){
    const {id} = params;
    const session = await getServerSession(authOptions);

    if(!session){
        return new Response(JSON.stringify("You are not authorized to update addresses"), {status: 401});
    }

    const updatedNotDefaultAddresses = await prisma.address.updateMany({
        where: {
            id : {
                not: id
            }
    },
        data: {
            default: false
        }
    })

    const updatedNewDefaultAddress = await prisma.address.update({
        where:{
            id: id
        },
        data: {
            default: true
        }
    })

    if(!updatedNewDefaultAddress){
        return new Response(JSON.stringify("Address not found"), {status: 404});
    }

    return new Response(JSON.stringify(updatedNewDefaultAddress), {status: 200});

}
