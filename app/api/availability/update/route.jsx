import prisma from "@app/libs/prismaDB";
export const dynamic = 'force-dynamic';

export async function PATCH(request, repsonse){
    const body = await request.json();
    const {availableSizeIds} = body;

    try {
        const updatedAvailableSizes = await prisma.availableSize.updateMany({
            where: {
                id: {
                    in: availableSizeIds
                }
            },
            data: {
                availability: {
                    decrement: 1
                }
            }
        });

        return new Response(JSON.stringify("Availability updated"), {status: 200});
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify("Something went wrong"), {status: 500});
    }
}