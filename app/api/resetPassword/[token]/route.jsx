import prisma from "@app/libs/prismaDB";
import { hash } from "bcryptjs";
import crypto from "crypto";

export async function POST(request, {params}) {
    const body = await request.json();
    const {password, passwordConfirm} = body;
    const {token} = params;

    if(password !== passwordConfirm){
        return new Response("Passwords do not match", {status: 400});
    }

    try{
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const user = await prisma.user.findFirst({
            where: {
                passwordResetToken: hashedToken,
                passwordResetExpires: {
                    gte: new Date(Date.now())
                }
            }
        })

        if(!user){
            return new Response("Token is invalid or has expired", {status: 400});
        }

        const hashedPassword = await hash(password, 12);

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                hashedPassword: hashedPassword,
                passwordResetToken: null,
                passwordResetExpires: null
            }
        });

        return new Response(JSON.stringify({message: "Password reset successful"}), {status: 200});
    }
    catch(error){
        console.log(error);
        return new Response("Something went wrong", {status: 500});
    }
}