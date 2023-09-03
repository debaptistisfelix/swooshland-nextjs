const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export  async function POST(request, {params}){
    const body = await request.json();
    const {items} = body;
    const {orderId} = params;
    console.log("items: ", items)
   try{
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: items,
        discounts: [
            {
              coupon: 'nkeTdjXu',
            },
          ],
        mode: 'payment',
        success_url: `http://localhost:3000/orderCompleted/${orderId}`,
        cancel_url: `http://localhost:3000/orderFailed/${orderId}`
    });

    return new Response(JSON.stringify({id: session.id}), {status: 200});
   }
   catch(error){
         console.log(error);
         return new Response(JSON.stringify("Something went wrong"), {status: 500});
   }
};