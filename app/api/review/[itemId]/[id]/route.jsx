import prisma from "@app/libs/prismaDB";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route"

//get a single review from a certain item
export async function GET(request, {params}){
    const { id} = params;

    try{
        const review = await prisma.review.findUnique({
            where: {
                id: id,
            }
        });

        return new Response(JSON.stringify(review), {status: 200});
    }
    catch(error){
        console.log(error);
        return new Response("Something went wrong", {status: 500});
    }
}

//update a review of an item
export async function PATCH(request, {params}){
    const {id} = params;
    const body = await request.json();
    const session = await getServerSession(authOptions);

    try{
        const updatedReview = await prisma.review.update({
            where: {
                id: id
            },
            data: {...body}
        });

        if(!updatedReview){
            return new Response("Review not found", {status: 404});
        }

        if(updatedReview.userId !== session?.id){
            return new Response("You are not authorized to update this review", {status: 401});
        }

        return new Response(JSON.stringify(updatedReview), {status: 200});
    }
    catch(error){
        console.log(error);
        return new Response("Something went wrong", {status: 500});
    }
}

//delete a review of an item
export async function DELETE(request, {params}){
    const {id} = params;
    const session = await getServerSession(authOptions);

    try{
        const reviewToDelet = await prisma.review.findUnique({
            where: {
                id: id
            }
        });

        if(!reviewToDelet){
            return new Response("Review not found", {status: 404});
        }

        if(reviewToDelet.userId !== session?.id){   
            return new Response("You are not authorized to delete this review", {status: 401});
        }

        const deletedReview = await prisma.review.delete({
            where: {
                id: id
            }
        });

        return new Response("review deleted succesfully!", {status: 200});
    }
    catch(error){
        console.log(error);
        return new Response("Something went wrong", {status: 500});
    }
}