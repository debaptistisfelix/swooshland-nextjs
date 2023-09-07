import prisma from "@app/libs/prismaDB";

//to get ALL REVIEWS OF AN ITEM
export async function GET(request, {params}){
    const {itemId} = params;

    try{
        const reviews = await prisma.review.findMany({
            where: {
                itemId: itemId
            },
            include: {
                user: true,
                item: true
            }
        });

        return new Response(JSON.stringify(reviews), {status: 200});
    }
    catch(error){
        console.log(error);
        return new Response(JSON.stringify("Something went wrong"), {status: 500});
    }
}