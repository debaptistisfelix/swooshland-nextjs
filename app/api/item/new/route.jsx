import prisma from "@app/libs/prismaDB";
export const dynamic = 'force-dynamic';

export async function POST(request){
    //get body from request
    const body = await request.json();
    const {
        name,
        model,
        fullName,
        brand,
        category,
        images,
        tag,
        description,
        price,
        gender,
        onSale,
        discountPercentage,
        availableSizes
    } = body;

    console.log(body)

    //check if all fields are provided
    /* if(!name || !model || !brand || !images ||  !tag || !description || !price || !availableSizes || gender){
        return new Response("Please provide the necessary infos", {status: 400});
    } */

    try{
        //create the new item
        const newItem = await prisma.item.create({
            data: {
                name,
                model,
                fullName,
                brand,
                category,
                images,
                tag,
                description,
                price,
                gender,
                onSale,
                discountPercentage,
                availableSizes: {
                    create: availableSizes,
                  },
            },
            include:{
                availableSizes: true,
            }
        });

        //return the new item
        return new Response(JSON.stringify(newItem), {status: 200});
    }
    catch(error){
        console.log(error);
        return new Response(JSON.stringify("Something went wrong"), {status: 500});
    }
}