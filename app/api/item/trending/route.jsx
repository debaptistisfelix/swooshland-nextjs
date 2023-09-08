import prisma from "@app/libs/prismaDB";

export async function GET(request){
    try {
        const items = await prisma.item.findMany({});
        const trendingItems = items.slice(0, 6);
        return new Response(JSON.stringify(trendingItems), {status: 200});

    } catch (error) {
        console.error(error)
        return new Response(JSON.stringify("Something went wrong"), {status: 500});
        
    }
}