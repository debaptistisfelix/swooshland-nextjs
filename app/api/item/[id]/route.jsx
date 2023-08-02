import prisma from "@app/libs/prismaDB";

// To get a specific item
export async function GET(request, {params}){
    const {id} = params;

    try{
        const item = await prisma.item.findUnique({
            where: {
                id : id
            }
        })

        return new Response(JSON.stringify(item), {status: 200});
    }
    catch(error){
        console.log(error)
        return new Response("Something went wrong", {status: 500});
    }
}

// To update a specific item
export async function PATCH(request, {params}){
    const {id} = params;
    const body = await request.json();

    try{
       const updatedItem = await prisma.item.update({
            where: {
                id: id
            },
            data: {
                ...body
            }
        });

        if(!updatedItem){
            return new Response("Item not found", {status: 404});
        }

        return new Response(JSON.stringify(updatedItem), {status: 200});


    }catch(error){
        console.log(error)
        return new Response("Something went wrong", {status: 500});
    }
}

//To delete a specific item
export async function DELETE(request, {params}){
    const {id} = params;

    try{
        const deletedItem = await prisma.item.delete({
            where: {
                id: id
            }
        });

        if(!deletedItem){
            return new Response("Item not found", {status: 404});
        }

        return new Response("Item Deleted succesfully!", {status: 200});
    }catch(error){
        console.log(error)
        return new Response("Something went wrong", {status: 500});
    }
}