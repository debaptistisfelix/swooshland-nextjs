import prisma from "@app/libs/prismaDB";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route"


export async function POST(request){
    //get body content from request
    const session = await getServerSession(authOptions);

    if(!session){
        return new Response("You are not authorized to create Addresses", {status: 401});
    }

    console.log("session: ", session)

    const body = await request.json();
    const { name, surname, street, city, state, zip, country, phone} = body;

    //check if all fields are provided
    if(!name || !surname || !street || !city || !state || !zip || !country || !phone ){
        return new Response("Please provide the all necessary infos", {status: 400});
    }

    

    try {

        const existingAddresses = await prisma.address.findMany({
            where: {
                user: {
                    id: session.id
                }
            }
        })

        let defaultAddressValue;

        if(existingAddresses.length === 0){
            defaultAddressValue = true;
        } else if(existingAddresses.length > 0){
            defaultAddressValue = false;
        }
       //create the new address
        const newAddress = await prisma.address.create({
        data: {
            user: {
                connect: {
                    id: session.id
                }
            },
            name,
            surname,
            street,
            city,
            state,
            zip,
            country,
            phone,
            default: defaultAddressValue
        }
    });

        //return the new address
        return new Response(JSON.stringify(newAddress), {status: 200}); 
    } catch (error) {
        console.log(error)
        return new Response("Something went wrong", {status: 500});
    }
}