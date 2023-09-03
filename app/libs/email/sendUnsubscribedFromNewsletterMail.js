import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendUnsubscribedFromNewsletterMail = async (email) => {
   
    const msg = {
        to: email,
        from : "swooshlandcustoms@outlook.com",
        subject: "Swooshland Newsletter Subscription",
        templateId: "d-0d53d77bd0c045199684a9fd20f52229",
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

export default sendUnsubscribedFromNewsletterMail;