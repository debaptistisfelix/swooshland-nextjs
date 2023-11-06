import prisma from "@app/libs/prismaDB";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route"
export const dynamic = 'force-dynamic';

//To create a new comment
export async function POST(request, {params}){
    const {itemId} = params;    
    const body = await request.json();
    const {comment, rating, title} = body;
    const session = await getServerSession(authOptions);
   
  

    const item = await prisma.item.findUnique({
        where: {
            id: itemId
        }
    })

    const user = await prisma.user.findUnique({
        where: {
            id: session?.id
        }
    })

    console.log("item", item)
    if(!item){
        return new Response(JSON.stringify("Item not found"), {status: 404});
    }

    if(!user){
        return new Response(JSON.stringify("User not found"), {status: 404});
    }

    

    try {
        const newReview = await prisma.review.create({
            data: {
                title: title,
                comment: comment,
                rating: rating,
                authorName: user.name,
                item: {
                    connect: {
                        id: itemId
                    }
                },
                user: {
                    connect: {
                        id: session.id
                    }
                }
            },
            include: {
                user: true,
                item: true
            }
        });

        console.log("review", newReview)


        const updatedRatingsQuantity = item.ratingsQuantity + 1;
        const updatedRatingsSum = item.ratingsAverage * item.ratingsQuantity + rating;
        const updatedRatingsAverage = updatedRatingsSum / updatedRatingsQuantity;

        await prisma.item.update({
            where: {
                id: itemId
            },
            data: {
                ratingsQuantity: updatedRatingsQuantity,
                ratingsAverage: updatedRatingsAverage
            }
        });

        return new Response(JSON.stringify(newReview), {status: 200});
    } catch (error) {
        console.log(error);
        return new Response("Something went wrong", {status: 500});
    }
};