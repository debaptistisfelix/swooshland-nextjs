import prisma from "@app/libs/prismaDB";

export async function POST(request){
    //get body from request
    const body = await request.json();
    const {
        name,
        model,
        category,
        images,
        paletteColors,
        tag,
        description,
        price,
        availableSizes
    } = body;

    //check if all fields are provided
    if(!name || !model || !category || !images || !paletteColors || !tag || !description || !price || !availableSizes){
        return new Response("Please provide the necessary infos", {status: 400});
    }

    try{
        //create the new item
        const newItem = await prisma.item.create({
            data: {
                name,
                model,
                category,
                images,
                paletteColors:{
                    create: paletteColors,
                },
                tag,
                description,
                price,
                availableSizes: {
                    create: availableSizes,
                  },
            },
            include:{
                availableSizes: true,
                paletteColors: true,
            }
        });

        //return the new item
        return new Response(JSON.stringify(newItem), {status: 200});
    }
    catch(error){
        console.log(error);
        return new Response("Something went wrong", {status: 500});
    }
}