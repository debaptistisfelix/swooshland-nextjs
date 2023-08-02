import prisma from "@app/libs/prismaDB";



//to get ALL items
export async function GET(request){
  
    try {
        const items = await prisma.item.findMany({});

        return new Response(JSON.stringify(items), {status: 200});
    } catch (error) {
        console.log(error);
        return new Response("Something went wrong", {status: 500});
    }
};

