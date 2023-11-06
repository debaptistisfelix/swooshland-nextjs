import prisma from "@app/libs/prismaDB";
import sendBugDetectorMail from "@app/libs/email/sendBugDetectorMail";
export const dynamic = 'force-dynamic';

export async function POST(request){
    const body = await request.json();
    const {name, description} = body;
    const email = process.env.DEV_EMAIL

  

 try{
        sendBugDetectorMail(email, name, description)
        return new Response(JSON.stringify({message: "success"}), {status: 200})
    }
    catch(error){
        console.log(error)
        return new Response(JSON.stringify("Something went wrong"), {status: 500})
    } 
  
  
    
}