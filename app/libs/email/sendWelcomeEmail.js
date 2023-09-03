import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = async ( email, name) => {
   
    const msg = {
        to: email,
        from : "swooshlandcustoms@outlook.com",
        subject: "Welcome to Swooshland Customs",
        templateId: "d-29896d2b21204c1abae815c54a89d4ca",
        dynamic_template_data: {
            name: name
        }
    }

    try{
        await sgMail.send(msg);
        console.log("Email sent")
    }
    catch(error){
        console.log(error);
    }
};

export default sendWelcomeEmail;