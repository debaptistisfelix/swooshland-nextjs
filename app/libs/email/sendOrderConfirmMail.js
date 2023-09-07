import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendOrderConfirmMail = async ( email, order) => {
   const {subTotal, shipping, total, boughtItems, orderAddress, id} = order;
   const {name, surname, street, city, state, country, zip, phone} = orderAddress;
    const msg = {
        to: email,
        from : "swooshlandcustoms@outlook.com",
        subject: `Order Nr: ${id} - Swooshland Customs`,
        templateId: "d-16437128dd3e40eb8f9f873ddfc36a75",
        dynamic_template_data: {
            subtotal: subTotal.toFixed(2),
            shipping: shipping.toFixed(2),
            total: total.toFixed(2),
            boughtItems: boughtItems,
            name: name,
            surname: surname,
            street: street,
            city: city,
            state: state,
            country: country,
            zip: zip,
            phone: phone,
            id: id
        }
    }

    try{
        await sgMail.send(msg);
        console.log("Confirmation Email sent")
    }
    catch(error){
        console.log(error);
    }
};

export default sendOrderConfirmMail;