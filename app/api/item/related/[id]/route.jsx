import prisma from "@app/libs/prismaDB";

//Get related items based on Id
export async function GET(request, {params}){
    const {id} = params;
    let relatedItems;

    try {
        //Find the specific item
    const product = await prisma.item.findUnique({
        where: {
            id: id
        }
    });
    
    if(!product){
        return new Response(JSON.stringify("Item not found"), {status: 404});
    }

    //Find all Items
    const allItems = await prisma.item.findMany({
        include: {
            availableSizes: true
        }
    });

   

    if(!allItems){
        return new Response(JSON.stringify("Items not found"), {status: 404});
    }

    // filter out to remove same name and same brand items
    const relatedItems = allItems.filter((item, index, self) => self.findIndex(s => s.name === item.name) === index).filter(item =>{
        return item.brand === product.brand && item.tag === product.tag && item.id !== product.id && item.name !== product.name
      }).slice(0, 4);

  

    // keep adding items if the length of 4 was not reached with the related items
    while(relatedItems.length < 4){
        const randomItem = allItems[Math.floor(Math.random() * allItems.length)];
        if (!relatedItems.includes(randomItem)) {
          relatedItems.push(randomItem);
        }
      }

    return new Response(JSON.stringify(relatedItems), {status: 200}); 
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify("Something went wrong"), {status: 500});
    } 

}