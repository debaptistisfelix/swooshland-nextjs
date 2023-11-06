import prisma from "@app/libs/prismaDB";
export const dynamic = 'force-dynamic';

export async function PATCH(request, {params}){
    const {id} = params; 

    if(!id || id.length < 12){
        return new Response(JSON.stringify("Order not found"), {status: 404});
    }

   try{
    const orderToFind = await prisma.order.findUnique({
        where: {
            id: id
        }, 
        include: {
            cartItems: {
                include: {
                availableSize: true,
                  item: true, // Include the associated Item for each CartItem
                },
              },
           
        }
    });

    if(!orderToFind){
        return new Response(JSON.stringify("Order not found"), {status: 404});
    }

    const order = await prisma.order.update({
        where: {
            id: id
        },
        data: {
            status: "failed"
        }
    });

    return new Response(JSON.stringify(order), {status: 200});
   } catch(error){
    console.log(error);
    return new Response(JSON.stringify("Something went wrong"), {status: 500});
   }
}