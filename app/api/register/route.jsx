import prisma from "@app/libs/prismaDB";
import bcrypt from "bcryptjs";
import sendWelcomeEmail from "@app/libs/email/sendWelcomeEmail";

export async function POST(request){
    const body = await request.json();
    const {name, email, password} = body;

    

    if(!name || !email || !password){
        return new Response(JSON.stringify("Please provide username, email and password"), {status: 400});
    }

    const exists = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if(exists){
        return new Response(JSON.stringify("Email already registered"), {status: 400});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            hashedPassword
        }
    });

    await sendWelcomeEmail(email, user.name);

    await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            welcomeEmailSent : true
        }
    })

    return new Response(JSON.stringify(user), {status: 200});
}