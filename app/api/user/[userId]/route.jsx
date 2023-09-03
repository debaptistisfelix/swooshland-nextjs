import prisma from "@app/libs/prismaDB";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route"

export async function GET(request, {params}){
    const {userId} = params;
    const session = await getServerSession(authOptions);

    if(!session){
        return new Response("You are not authorized to update addresses", {status: 401});
    }

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
    });

    console.log(user)

    if(!user){
        return new Response("User not found", {status: 404});
    }


    return new Response(JSON.stringify(user.newsLetterSub), {status: 200});


}