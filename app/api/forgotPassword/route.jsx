import prisma from "@app/libs/prismaDB";
import crypto from 'crypto';
import sendPasswordForgotEmail from "@app/libs/email/sendPasswordForgotEmail";


export async function POST(request){
    const body = await request.json();
    const {email} = body;

    try{
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if(!user){
            return new Response(JSON.stringify("User not found"), {status: 404});
        }

        const token = crypto.randomBytes(20).toString('hex');
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        await prisma.user.update({
            where: {
                email: email
            },
            data: { 
               passwordResetToken: hashedToken,
               passwordResetExpires: new Date(Date.now() + 10 * 60 * 1000),
            }
        })

        const resetUrl = `https://${process.env.VERCEL_URL}/resetPassword/${token}` ;

        await sendPasswordForgotEmail(email, user.name, resetUrl);

        return new Response(JSON.stringify({message: "Email inviata correttamente"}), {status: 200})
    } catch(error){
        console.log(error);
        return new Response(SON.stringify("Something went wrong"), {status: 500});
    }
}