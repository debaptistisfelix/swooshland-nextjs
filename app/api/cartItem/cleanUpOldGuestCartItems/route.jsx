import prisma from "@app/libs/prismaDB";
export const dynamic = 'force-dynamic';


export async function GET(request){
    try{
        const expirationThreshold = new Date();
        expirationThreshold.setDate(expirationThreshold.getDate() - 7);
       
      

        const expiredCartItems = await prisma.cartItem.findMany({
            where: {
                guestUser: {
                    not: null
                },
                createdAt: {
                    lt: expirationThreshold
                }
            }
        });

        for(let cartItem of expiredCartItems){
            await prisma.cartItem.delete({
                where: {
                    id: cartItem.id
                }
            })
        }

        return new Response(JSON.stringify(expiredCartItems),{status:200})
    }catch(error){
        console.log(error)
        return new Response(JSON.stringify("Something went wrong"),{status:500})
    }
}