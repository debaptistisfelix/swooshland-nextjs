import prisma from "@app/libs/prismaDB";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route"


export  async function POST(request) {
    const session = await getServerSession(authOptions);
    const body = await request.json();
    const {cartItems} = body;


    try{
  
        

        const cartItemQuantities = {}; // To keep track of product quantities in cart
        const cartItemDetails = {}; // To keep track of cartItem details for products exceeding availability

        // Calculate cumulative quantities for each product and store cartItem details
        for (let cartItem of cartItems) {
            const sizeId = cartItem.availableSizeId;

            if (sizeId in cartItemQuantities) {
                cartItemQuantities[sizeId] += 1; // Increment quantity
            } else {
                cartItemQuantities[sizeId] = 1; // Initialize quantity
            }

            // Store cartItem details for all encountered cartItems
            if (!(sizeId in cartItemDetails)) {
                cartItemDetails[sizeId] = [];
            }
            cartItemDetails[sizeId].push({
                ...cartItem
            });
        }


        const cartItemsToDelete = [];

        // Compare available quantities with cumulative quantities
        for (let sizeId in cartItemQuantities) {
            const availableSize = await prisma.availableSize.findUnique({
                where: {
                    id: sizeId
                }
            });

            if (availableSize && availableSize.availability < cartItemQuantities[sizeId]) {
                const numItemsToDelete = cartItemQuantities[sizeId] - availableSize.availability;
                const itemsToDelete = cartItemDetails[sizeId].slice(0, numItemsToDelete); // Get the first N items to delete
                cartItemsToDelete.push(...itemsToDelete);
            }
        }

     

        // Prepare response
        return new Response(JSON.stringify({
            cartItemsToDelet: cartItemsToDelete.length,
            cartItemsToDelete: cartItemsToDelete // Array of cart items with IDs and details
        }), { status: 200 });
    }catch(error){
        console.log(error)
        return new Response(JSON.stringify(error),{status:500} )
    } 
  
}
