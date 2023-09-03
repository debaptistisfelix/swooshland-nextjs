import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendSubscribedToNewsletterMail = async (email, cancelURL) => {
   
    const msg = {
        to: email,
        from : "swooshlandcustoms@outlook.com",
        subject: "Swooshland Newsletter Subscription",
        templateId: "d-362d8a24b55b460e8fbe2d4267d80168",
        dynamic_template_data:{
            cancelURL: cancelURL
        }
    }

    try{
        await sgMail.send(msg);
        console.log("Email sent")
    }
    catch(error){
        console.log(error);
        console.log(error.response.body.errors);
    }
};

export default sendSubscribedToNewsletterMail;