import prisma from "@app/libs/prismaDB";
import sendOrderConfirmMail from "@app/libs/email/sendOrderConfirmMail";

export async function PATCH(request, {params}){
    const {id} = params;  

    if(!id || id.length < 12){
        return new Response(JSON.stringify("Order not found"), {status: 404});
    }

    // Check if order has confirmed "true" or "false"
    const order = await prisma.order.findUnique({
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
    // if true, return 

    if(!order){
        return new Response(JSON.stringify("Order not found"), {status: 404});
    }

    if(order.confirmed === true){
        return new Response(JSON.stringify(order), {status: 400});
    } else {
         //if it's not confirmed, update availability and delete cart items
    try {
        //Get the cartItems and availableSizes ids from the order 
        const cartItems = order.cartItems;
        const cartItemsIds = cartItems.map(cartItem => cartItem.id);
    

        // Update availability of bought products
     
        for(let cartItem of cartItems){
            const {availableSizeId} = cartItem;
            await prisma.availableSize.update({
                where: {
                  id: availableSizeId,
                },
                data: {
                  availability: {
                    decrement: 1,
                  },
                },
              });
        }

        // Delete cart items to have empty cart
        const deletedCartItems = await prisma.cartItem.deleteMany({
            where: {
                id: {
                    in: cartItemsIds
                }
            }
        });

        // Update order to confirmed
        const updatedOrder = await prisma.order.update({
            where: {
                id: id
            },
            data: {
                confirmed: true,
                status: "confirmed"
            }
        });

        // Send confirmation email
        const email = order.orderAddress.email;
        await sendOrderConfirmMail(email, order);

        return new Response(JSON.stringify(updatedOrder), {status: 200});
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify("Something went wrong"), {status: 500});
    }
    }

   
}