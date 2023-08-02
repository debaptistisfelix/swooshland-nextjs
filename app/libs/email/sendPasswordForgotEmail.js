import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const  sendPasswordForgotEmail = async ( email, name, resetUrl) => {
    const msg = {
        to: email,
        from : "swooshlandcustoms@outlook.com",
        subject: "Password Reset for Swooshland Custom",
        templateId: "d-c2c86869c1c747eabbe03a45ccdf9ed8",
        dynamic_template_data: {
            name: name,
            resetUrl: resetUrl
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

export default sendPasswordForgotEmail;