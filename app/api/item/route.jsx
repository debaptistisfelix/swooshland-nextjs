import prisma from "@app/libs/prismaDB";
import { NextResponse } from "next/server";


//to get ALL items
export async function GET(request){
    const {searchParams} = new URL(request.url);
    console.log(searchParams)
    const query = searchParams.get("query");
    console.log(query)
 
  
    try {
        if(query){
            const searchResults = await prisma.item.findMany({
                where:{
                    OR:[
                        {name: {contains: query, mode: "insensitive"}},
                        {brand: {contains: query, mode: "insensitive"}},
                        {model: {contains: query, mode: "insensitive"}},
                        {category: {contains: query, mode: "insensitive"}},
                        {fullName: {contains: query, mode: "insensitive"}},
                    ]
                },
                include:{
                    availableSizes: true,
                    reviews: true
                }
            })

            console.log("searchResults: ", searchResults)

            return new Response(JSON.stringify(searchResults), {status: 200});
        } else {
            const items = await prisma.item.findMany({
                include:{
                    availableSizes: true,
                    reviews: true
                }
            });

            console.log("items: ", items)
    
            /* return new Response(JSON.stringify(items), {status: 200}); */
            return NextResponse.json({items}, {status: 200});
        }

       
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify("Something went wrong"), {status: 500});
    }
};

