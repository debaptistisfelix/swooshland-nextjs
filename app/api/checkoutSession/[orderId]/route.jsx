const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export  async function POST(request, {params}){
    const body = await request.json();
    const {items, hasOnSaleItem} = body;
    const {orderId} = params;
    console.log("items: ", items)
    console.log("hasOnSaleItem: ", hasOnSaleItem)
   try{

    const sessionData = {
        payment_method_types: ['card'],
        line_items: items,
        mode: 'payment',
        success_url: `https://${process.env.VERCEL_URL}/orderCompleted/${orderId}`,
        cancel_url: `https://${process.env.VERCEL_URL}/orderFailed/${orderId}`
    }

    

    if(hasOnSaleItem === true){
        sessionData.discounts = [
            {
              coupon: 'kvcbABrQ',
            },
          ];
    }


    const session = await stripe.checkout.sessions.create({...sessionData});

    return new Response(JSON.stringify({id: session.id}), {status: 200});
   }
   catch(error){
         console.log(error);
         return new Response(JSON.stringify("Something went wrong"), {status: 500});
   }
};